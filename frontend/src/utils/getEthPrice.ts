export const getEthPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.coinpaprika.com/v1/tickers/eth-ethereum');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.quotes.USD.price;
  } catch (error) {
    console.error('Failed to fetch ETH price:', error);
    throw error;
  }
};

// export const getEthPrice = async (): Promise<number> => {
//   try {
//     const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data.ethereum.usd;
//   } catch (error) {
//     console.error('Failed to fetch ETH price:', error);
//     throw error; 
//   }
// };
