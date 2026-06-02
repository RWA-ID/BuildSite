"use client";
import { WagmiProvider } from "wagmi";
import { mainnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (typeof window !== "undefined") {
  if (!projectId || projectId === "placeholder") {
    console.error(
      "[buildsite] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not configured. " +
        "WalletConnect QR pairing will not work. Get a projectId at " +
        "https://cloud.reown.com and set it in .env.local."
    );
  }
}

const networks = [mainnet] as const;

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [...networks],
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [...networks],
  projectId,
  metadata: {
    name: "buildsite.eth",
    description:
      "Turn your ENS name into a permanent IPFS website in 6 steps.",
    url: "https://buildsite.eth.limo",
    icons: ["https://buildsite.eth.limo/icon.png"],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
