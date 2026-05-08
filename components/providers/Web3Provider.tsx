"use client";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (typeof window !== "undefined") {
  if (!projectId || projectId === "placeholder") {
    // WalletConnect QR will display but the relay will refuse to pair without
    // a real projectId — this is the most common cause of "scan but nothing
    // happens". Surface it loudly in the console instead of failing silently.
    console.error(
      "[buildsite] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not configured. " +
        "WalletConnect QR pairing will not work. Get a projectId at " +
        "https://cloud.walletconnect.com and set it in .env.local."
    );
  }
}

const config = getDefaultConfig({
  appName: "buildsite.eth",
  appDescription:
    "Turn your ENS name into a permanent IPFS website in 6 steps.",
  appUrl: "https://buildsite.eth.limo",
  appIcon: "https://buildsite.eth.limo/icon.png",
  projectId,
  chains: [mainnet],
  ssr: false,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
