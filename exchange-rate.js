import axios from 'axios';
const API_KEY = process.env.BLOCKCHAIN_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.blockchain.com/v3/exchange',
  headers: {
    'X-API-Token': API_KEY,
  },
});

export async function fetchExchangeRates() {
  try {
    const response = await apiClient.get('/tickers');
    const tickers = response.data;

    const btcUsd = tickers?.find((t) => t.symbol === 'BTC-USD');
    const btcEur = tickers?.find((t) => t.symbol === 'BTC-EUR');
    const eurUsd = tickers?.find((t) => t.symbol === 'EUR-USD');

    if (!btcUsd || !btcEur || !eurUsd) {
      throw new Error('Required trading pairs not found.');
    }

    const rates = {
      // Dollar conversions
      dollarToBitcoin: 1 / btcUsd.price_24h,
      dollarToEur: 1 / eurUsd.price_24h,

      // Bitcoin conversions
      bitcoinToDollar: btcUsd.price_24h,
      bitcoinToEur: btcEur.price_24h,

      // Euro conversions
      eurToBitcoin: 1 / btcEur.price_24h,
      eurToDollar: eurUsd.price_24h,
    };

    return { success: true, data: rates, error: null };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
