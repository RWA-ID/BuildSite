import { parseEther } from "viem";

export const PLATFORM_FEE_ETH =
  process.env.NEXT_PUBLIC_PLATFORM_FEE_ETH || "0.00825";
export const PLATFORM_FEE_WEI = parseEther(PLATFORM_FEE_ETH);
export const FEE_RECIPIENT = (
  process.env.NEXT_PUBLIC_PLATFORM_FEE_RECIPIENT ||
  "0x0000000000000000000000000000000000000000"
) as `0x${string}`;
