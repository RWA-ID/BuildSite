import contentHash from "@ensdomains/content-hash";

export function encodeCIDasContenthash(cid: string): `0x${string}` {
  return `0x${contentHash.encode("ipfs", cid)}`;
}
