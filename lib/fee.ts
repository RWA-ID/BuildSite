import { parseEther } from "viem";

export const PLATFORM_FEE_ETH =
  process.env.NEXT_PUBLIC_PLATFORM_FEE_ETH || "0.00825";
export const PLATFORM_FEE_WEI = parseEther(PLATFORM_FEE_ETH);
export const FEE_RECIPIENT = (
  process.env.NEXT_PUBLIC_PLATFORM_FEE_RECIPIENT ||
  "0x0000000000000000000000000000000000000000"
) as `0x${string}`;

// In test mode, existing ENS owners pay 0 — only new registrations pay the fee
export const TEST_MODE = process.env.NEXT_PUBLIC_TEST_MODE === "true";

export function getEffectiveFee(ensMode: "register" | "existing"): bigint {
  if (TEST_MODE && ensMode === "existing") return 0n;
  return PLATFORM_FEE_WEI;
}

export function getEffectiveFeeETH(ensMode: "register" | "existing"): string {
  if (TEST_MODE && ensMode === "existing") return "0";
  return PLATFORM_FEE_ETH;
}
