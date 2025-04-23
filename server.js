const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/vat/:country/:vatNumber', async (req, res) => {
  const { country, vatNumber } = req.params;
  const url = `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${country}/vat/${vatNumber}`;

  fetch(url)
  .then(response => {
    if (!response.ok) {
      res.status(response.status).json({ error: 'Error fetching data from VIES API' });
      throw new Error('Non-OK response'); // Prevent further execution
    }
    return response.json();
  })
  .then(data => {
    res.json(data);
    console.log('Received data:', data);
  })
  .catch(error => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
