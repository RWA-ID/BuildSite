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
