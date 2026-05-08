# buildsite.eth

The internet's permanent layer for ENS names. A fully decentralized, serverless ENS-powered website builder. Connect your wallet, pick a template, fill in your data, and publish a permanent IPFS-hosted website tied to your ENS contenthash — all client-side, in a single session.

**Live at:** [buildsite.eth.limo](https://buildsite.eth.limo)

---

## Features

- **17 production templates** across 5 categories (Builder/Web3, Professional, Creative, Business, Community)
- **6-step wizard**: ENS name → Category → Template → Profile → Preview → Publish
- **Two ENS modes**: register a new `.eth` name in-flow, or use one you already own
- **Permanent IPFS hosting** via Pinata, with the CID written to your ENS contenthash on-chain
- **Self-contained HTML output** — no external JS framework, no build step, single file
- **Fully client-side** — no servers, no API routes, exports to static IPFS bundle

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router, TypeScript, `output: 'export'`) |
| Styling | Tailwind CSS, Space Grotesk + JetBrains Mono + Instrument Serif |
| Wallet | RainbowKit + wagmi v2 + viem |
| ENS | viem ENS utils, ETHRegistrarController, Public Resolver |
| IPFS | Pinata SDK (`pinata-web3`), client-side upload |
| State | Zustand |
| Forms | React Hook Form + zod |
| Animation | Framer Motion |

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your WalletConnect Project ID, Pinata JWT, fee recipient, Alchemy RPC
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

All variables are `NEXT_PUBLIC_` — fully client-side static app, no server.

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
NEXT_PUBLIC_PLATFORM_FEE_RECIPIENT=0x...
NEXT_PUBLIC_PLATFORM_FEE_ETH=0.00825
NEXT_PUBLIC_PINATA_JWT=...           # scoped upload-only key
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud
NEXT_PUBLIC_ALCHEMY_RPC=https://eth-mainnet.g.alchemy.com/v2/...
NEXT_PUBLIC_TEST_MODE=true           # waives platform fee for existing ENS owners
```

## Build & Deploy to IPFS

```bash
npm run build
# Output: /out
# Upload /out to Pinata, set the resulting CID as the contenthash on buildsite.eth
```

## License

MIT — see [LICENSE](./LICENSE).

---

Built by [ensgiant.eth](https://ensgiant.eth.limo). Powered by ENS, hosted on IPFS, owned by no one.
