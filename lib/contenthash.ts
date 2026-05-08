// eslint-disable-next-line @typescript-eslint/no-require-imports
const contentHash = require("@ensdomains/content-hash");

export function encodeCIDasContenthash(cid: string): `0x${string}` {
  return `0x${contentHash.encode("ipfs", cid)}` as `0x${string}`;
}
