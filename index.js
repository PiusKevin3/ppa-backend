const express = require('express');
const textGenerator = require('./textGenerator');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;

app.post('/generate', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Append custom instructions to the text
    const modifiedText = `${text}\n\nSummarize this into less or equal to 5 short bulleted lines. 
    Please don't include asterisks (**), bold formatting, or any markdown. Remember to make the bullet explanations much shorter!`;

    console.log(modifiedText);

    // Call the text generation function
    const result = await textGenerator.textGenTextOnlyPromptStreaming(modifiedText);
    console.log(result);

    // Clean up the result to remove any unwanted formatting (e.g., asterisks, markdown, bold, etc.)
    const cleanedResult = result.replace(/\*+/g, '').trim(); // Remove asterisks or any bold markdown

    // Send cleaned summary back to the frontend
    res.json({ summary: cleanedResult });

  } catch (error) {
    console.error(`Error generating text: ${error}`);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});

