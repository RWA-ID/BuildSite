import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export { normalize };

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC),
});

export const ETH_REGISTRAR_CONTROLLER =
  "0x253553366Da8546fC250F225fe3d25d0C782303b" as const;

export const ENS_REGISTRY = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" as const;
export const ENS_PUBLIC_RESOLVER =
  "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63" as const;
export const ENS_NAMEWRAPPER =
  "0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401" as const;

export const ensRegistryAbi = [
  {
    name: "resolver",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ type: "address" }],
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ type: "address" }],
  },
  {
    name: "setResolver",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "resolver", type: "address" },
    ],
    outputs: [],
  },
] as const;

export const nameWrapperAbi = [
  {
    name: "ownerOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [{ type: "address" }],
  },
  {
    name: "setResolver",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "resolver", type: "address" },
    ],
    outputs: [],
  },
] as const;

export async function getResolverForNode(
  node: `0x${string}`
): Promise<`0x${string}`> {
  const r = await publicClient.readContract({
    address: ENS_REGISTRY,
    abi: ensRegistryAbi,
    functionName: "resolver",
    args: [node],
  });
  return r as `0x${string}`;
}

export async function getOwnerOfNode(
  node: `0x${string}`
): Promise<`0x${string}`> {
  const o = await publicClient.readContract({
    address: ENS_REGISTRY,
    abi: ensRegistryAbi,
    functionName: "owner",
    args: [node],
  });
  return o as `0x${string}`;
}

export const registrarControllerAbi = [
  {
    name: "available",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "label", type: "string" }],
    outputs: [{ type: "bool" }],
  },
  {
    name: "rentPrice",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "label", type: "string" },
      { name: "duration", type: "uint256" },
    ],
    outputs: [
      { name: "base", type: "uint256" },
      { name: "premium", type: "uint256" },
    ],
  },
  {
    name: "makeCommitment",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "name", type: "string" },
      { name: "owner", type: "address" },
      { name: "duration", type: "uint256" },
      { name: "secret", type: "bytes32" },
      { name: "resolver", type: "address" },
      { name: "data", type: "bytes[]" },
      { name: "reverseRecord", type: "bool" },
      { name: "ownerControlledFuses", type: "uint16" },
    ],
    outputs: [{ type: "bytes32" }],
  },
  {
    name: "commit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "commitment", type: "bytes32" }],
    outputs: [],
  },
  {
    name: "register",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "name", type: "string" },
      { name: "owner", type: "address" },
      { name: "duration", type: "uint256" },
      { name: "secret", type: "bytes32" },
      { name: "resolver", type: "address" },
      { name: "data", type: "bytes[]" },
      { name: "reverseRecord", type: "bool" },
      { name: "ownerControlledFuses", type: "uint16" },
    ],
    outputs: [],
  },
] as const;

export async function checkENSAvailability(label: string): Promise<boolean> {
  return publicClient.readContract({
    address: ETH_REGISTRAR_CONTROLLER,
    abi: registrarControllerAbi,
    functionName: "available",
    args: [label],
  });
}

export async function getENSRentPrice(
  label: string
): Promise<{ base: bigint; premium: bigint }> {
  const price = await publicClient.readContract({
    address: ETH_REGISTRAR_CONTROLLER,
    abi: registrarControllerAbi,
    functionName: "rentPrice",
    args: [label, BigInt(365 * 24 * 60 * 60)],
  });
  return { base: price[0], premium: price[1] };
}
