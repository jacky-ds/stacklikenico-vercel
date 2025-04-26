import express from 'express';
import cors from 'cors';
import { fetchExchangeRates } from './exchange-rate.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ['https://stacklikenicobpc.web.app', 'http://localhost:5173'],
};

app.use(cors(corsOptions));

app.get('/api/exchange-rate', async (req, res) => {
  const result = await fetchExchangeRates();
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
