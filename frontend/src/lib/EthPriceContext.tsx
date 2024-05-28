import { createContext, useContext, useEffect, useState } from 'react';

interface EthPriceContextType {
  ethPrice: number | null;
  updateEthPrice: () => Promise<void>;
}

export const EthPriceContext = createContext<EthPriceContextType>({
  ethPrice: null,
  updateEthPrice: async () => {},
});

export const useEthPrice = () => useContext(EthPriceContext);

interface EthPriceProviderProps {
  children: React.ReactNode;
}

export const EthPriceProvider: React.FC<EthPriceProviderProps> = ({ children }) => {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const updateEthPrice = async () => {
    try {
      const response = await fetch('/api/eth-price');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setEthPrice(data.quotes.USD.price);
    } catch (error) {
      console.error('Failed to fetch ETH price:', error);
    }
  };

  useEffect(() => {
    updateEthPrice();
  }, []);

  return (
    <EthPriceContext.Provider value={{ ethPrice, updateEthPrice }}>
      {children}
    </EthPriceContext.Provider>
  );
};
