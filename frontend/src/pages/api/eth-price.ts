import type { NextApiRequest, NextApiResponse } from 'next';

const COINPAPRIKA_API_KEY = process.env.COINPAPRIKA_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!COINPAPRIKA_API_KEY) {
    res.status(500).json({ error: 'API key is not set' });
    return;
  }

  try {
    const response = await fetch('https://api-pro.coinpaprika.com/v1/tickers/eth-ethereum', {
      headers: {
        'Authorization': COINPAPRIKA_API_KEY,
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: `HTTP error! status: ${response.status}` });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch ETH price:', error);
    res.status(500).json({ error: 'Failed to fetch ETH price' });
  }
}
