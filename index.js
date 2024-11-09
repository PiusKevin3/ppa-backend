const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000; // or your preferred port

const geminiApiKey = process.env.GEMINI_API_KEY; // Access API key from environment variable

app.post('/summarize', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const response = await fetch(url);
    const text = await response.text();

    const summaryResponse = await axios.post(
      'https://api.geminiai.com/v1/summarize',
      {
        text,
        max_tokens: 100,
        temperature: 0.5,
      },
      {
        headers: {
          'Authorization': `Bearer ${geminiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = summaryResponse.data.summary;

    // Split summary into sentences
    const sentences = summary.split('.').filter(sentence => sentence.trim() !== '');

    // Extract first 5 sentences or less
    const shortSummary = sentences.slice(0, 5).join('. ');

    res.json({ summary: shortSummary });
  } catch (error) {
    console.error(`Error summarizing privacy policy: ${error}`);
    res.status(500).json({ error: 'Failed to summarize privacy policy' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});