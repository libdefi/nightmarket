import type { AppProps } from "next/app";
import "../styles/globals.css";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

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
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Component {...pageProps} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
