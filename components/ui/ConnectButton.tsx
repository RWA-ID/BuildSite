"use client";
import { useAccount, useChainId } from "wagmi";
import { mainnet } from "wagmi/chains";
import { useAppKit } from "@reown/appkit/react";
import { useMounted } from "@/hooks/useMounted";

function shorten(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function ConnectButton() {
  const mounted = useMounted();
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const wrongNetwork = isConnected && chainId !== mainnet.id;

  if (!mounted) {
    return (
      <div
        aria-hidden
        style={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}
      >
        <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm">
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!isConnected || !address) {
    return (
      <button
        onClick={() => open({ view: "Connect" })}
        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
      >
        Connect Wallet
      </button>
    );
  }

  if (wrongNetwork) {
    return (
      <button
        onClick={() => open({ view: "Networks" })}
        className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-colors"
      >
        Wrong Network
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => open({ view: "Networks" })}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors"
      >
        {mainnet.name}
      </button>
      <button
        onClick={() => open({ view: "Account" })}
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors"
      >
        {shorten(address)}
      </button>
    </div>
  );
}
