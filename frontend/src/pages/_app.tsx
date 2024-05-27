import type { AppProps } from "next/app";
import "../styles/globals.css";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { EthPriceProvider } from '../lib/EthPriceContext';
import Head from "next/head";

const testnetRedstone = {
  id: 17069,
  name: 'Garnet Holesky',
  network: 'garnetHolesky',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.garnetchain.com'],
      websocket: ['wss://rpc.garnetchain.com'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.garnetchain.com/' },
  },
  testnet: true,
};

// const mainnetRedstone = {
//   id: 690,
//   name: 'Redstone',
//   network: 'redstone',
//   nativeCurrency: {
//     name: 'Ethereum',
//     symbol: 'ETH',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://rpc.redstonechain.com'],
//       websocket: ['wss://rpc.garnetchain.com'],
//     },
//   },
//   blockExplorers: {
//     default: { name: 'Explorer', url: 'https://explorer.garnetchain.com' },
//   },
//   testnet: false,
// };

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [testnetRedstone],
    transports: {
      [testnetRedstone.id]: http(testnetRedstone.rpcUrls.default.http[0]),
    },
    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    ssr: true,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Run this effect once on mount
    const handleResize = () => {
      // Consider "mobile" if width is less than or equal to 768 pixels
      setIsMobile(window.innerWidth <= 768);
    };
    // Check once on mount
    handleResize();
    // Optionally listen for resize events if you want to dynamically change the view
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <EthPriceProvider>
          <Head>
            <title>Night Market</title>
              <meta property='og:title' content='Night Market' />
              <meta
                property='og:description'
                content='NightMarket is a prediction market protocol that focuses on fully onchain games.'
              />
              <meta property='og:image' content='/ogp.png' />
              <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
              <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
              <link rel='apple-touch-icon' sizes='200x200' href='/apple-touch-icon.png' />
              <meta name='twitter:card' content='summary_large_image' />
              <meta name='twitter:title' content='Night Market' />
              <meta
                name='twitter:description'
                content='NightMarket is a prediction market protocol that focuses on fully onchain games.'
              />
              <meta
                name='twitter:image'
                content='https://0xnight.com/ogp.png'
              />
            </Head>
            <div className="bg-default text-default h-auto">
              {!isMobile ? (
                <div className="mx-16">
                  <Header />
                  <Component {...pageProps} />
                </div>
              ) : (
                <div className="flex flex-col h-screen">
                  <div className="w-full h-full flex items-center justify-center">
                    <span>Unavailable on mobile</span>
                  </div>
                </div>
              )}
            </div>
          </EthPriceProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
