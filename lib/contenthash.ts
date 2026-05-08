// eslint-disable-next-line @typescript-eslint/no-require-imports
const contentHash = require("@ensdomains/content-hash");

// CRITICAL: use the namespaced codec id "ipfs-ns" (or fromIpfs), NOT "ipfs".
// Calling encode("ipfs", cid) silently mis-detects modern CIDv1 strings as
// libp2p peer keys (multicodec 0x01a5 -> bytes 0xa503...) and writes a
// contenthash that .eth.limo / .eth.link refuse to resolve. We use
// contentHash.fromIpfs which is purpose-built and produces the proper
// ENSIP-7 prefix 0xe301 + the binary CIDv1.
export function encodeCIDasContenthash(cid: string): `0x${string}` {
  return `0x${contentHash.fromIpfs(cid)}` as `0x${string}`;
}
