require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// CORS origin uses env var or fallback for local dev
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['POST', 'GET']  // Allow GET for root route
}));

app.use(express.json());

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// POST proxy route to StatCan API
app.post('/api/statcan', async (req, res) => {
  try {
    const statcanResponse = await axios.post(
      'https://www150.statcan.gc.ca/t1/wds/rest/getDataFromVectorsAndLatestNPeriods',
      req.body
    );
    console.log('StatCan Response:', statcanResponse.data);
    res.json(statcanResponse.data);
  } catch (error) {
    console.error('Full Error:', error);
    res.status(500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
