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

    const result = await textGenerator.textGenTextOnlyPromptStreaming(text);
    
    res.json({ text: result });

  } catch (error) {
    console.error(`Error generating text: ${error}`);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});