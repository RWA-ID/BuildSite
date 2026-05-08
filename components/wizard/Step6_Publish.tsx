"use client";
import { useState } from "react";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { useBuilderStore } from "@/lib/store";
import { FEE_RECIPIENT, TEST_MODE, getEffectiveFee, getEffectiveFeeETH } from "@/lib/fee";
import { uploadHTMLToIPFS } from "@/lib/pinata";
import { encodeCIDasContenthash } from "@/lib/contenthash";
import { ConnectButton } from "@/components/ui/ConnectButton";
import { normalize } from "@/lib/ens";
import { namehash } from "viem/ens";

const ENS_PUBLIC_RESOLVER = "0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63" as `0x${string}`;

const resolverAbi = [
  {
    name: "setContenthash",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "hash", type: "bytes" },
    ],
    outputs: [],
  },
] as const;

function Step({ n, label, status }: { n: number; label: string; status: "idle" | "loading" | "done" | "error" | "skipped" }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
        status === "done" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
        status === "skipped" ? "bg-gray-500/20 text-gray-500 border border-gray-500/20" :
        status === "loading" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 animate-pulse" :
        status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
        "bg-white/5 text-gray-600 border border-white/10"
      }`}>
        {status === "done" ? "✓" : status === "skipped" ? "–" : status === "error" ? "✕" : n}
      </div>
      <div>
        <p className={`font-semibold text-sm ${
          status === "loading" ? "text-white" :
          status === "done" ? "text-green-400" :
          status === "skipped" ? "text-gray-500" :
          status === "error" ? "text-red-400" : "text-gray-500"
        }`}>
          {label}
        </p>
        {status === "loading" && <p className="text-xs text-gray-500 mt-0.5">In progress…</p>}
        {status === "done" && <p className="text-xs text-green-600 mt-0.5">Complete</p>}
        {status === "skipped" && <p className="text-xs text-gray-600 mt-0.5">Skipped (test mode)</p>}
      </div>
    </div>
  );
}

export function Step6_Publish({ onBack }: { onBack: () => void }) {
  const { ensName, ensMode, generatedHtml, publishStatus, publishError, ipfsCid, setPublishStatus, setPublishError, setIpfsCid } = useBuilderStore();
  const { address, isConnected } = useAccount();

  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  type StepStatus = "idle" | "loading" | "done" | "error" | "skipped";
  const [step1Status, setStep1Status] = useState<StepStatus>("idle");
  const [step2Status, setStep2Status] = useState<StepStatus>("idle");
  const [step3Status, setStep3Status] = useState<StepStatus>("idle");
  const [cid, setCid] = useState(ipfsCid);

  const effectiveFee = getEffectiveFee(ensMode);
  const effectiveFeeETH = getEffectiveFeeETH(ensMode);
  const isFree = effectiveFee === BigInt(0);

  async function handlePublish() {
    if (!address || !ensName || !generatedHtml) return;
    setPublishStatus("paying");
    setPublishError(null);

    // Step 1: Pay fee (skip if free)
    if (isFree) {
      setStep1Status("skipped");
    } else {
      setStep1Status("loading");
      try {
        await sendTransactionAsync({
          to: FEE_RECIPIENT,
          value: effectiveFee,
        });
        setStep1Status("done");
      } catch (err: unknown) {
        setStep1Status("error");
        setPublishError((err as Error).message || "Fee payment failed");
        setPublishStatus("error");
        return;
      }
    }

    // Step 2: Upload to IPFS
    setPublishStatus("uploading");
    setStep2Status("loading");
    let uploadedCid = "";
    try {
      uploadedCid = await uploadHTMLToIPFS(generatedHtml, ensName);
      setCid(uploadedCid);
      setIpfsCid(uploadedCid);
      setStep2Status("done");
    } catch (err: unknown) {
      setStep2Status("error");
      setPublishError((err as Error).message || "IPFS upload failed");
      setPublishStatus("error");
      return;
    }

    // Step 3: Set contenthash
    setPublishStatus("setting_contenthash");
    setStep3Status("loading");
    try {
      const node = namehash(normalize(ensName));
      const contenthashHex = encodeCIDasContenthash(uploadedCid);
      await writeContractAsync({
        address: ENS_PUBLIC_RESOLVER,
        abi: resolverAbi,
        functionName: "setContenthash",
        args: [node, contenthashHex as `0x${string}`],
      });
      setStep3Status("done");
      setPublishStatus("done");
    } catch (err: unknown) {
      setStep3Status("error");
      setPublishError((err as Error).message || "Contenthash update failed");
      setPublishStatus("error");
    }
  }

  const finalCid = cid || ipfsCid;
  const isDone = publishStatus === "done";
  const isError = publishStatus === "error";
  const isRunning = ["paying", "uploading", "setting_contenthash"].includes(publishStatus);

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">Publish Your Site</h2>
      <p className="text-gray-400 mb-8">
        {isFree
          ? "Test mode — fee waived for existing ENS owners. Upload to IPFS and set your contenthash."
          : "3 steps to put your site on IPFS and link it to your ENS name forever."}
      </p>

      {!isConnected && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm text-gray-400 mb-3">Connect your wallet to publish</p>
          <ConnectButton />
        </div>
      )}

      {TEST_MODE && isFree && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <p className="text-yellow-400 text-sm font-semibold">🧪 Test Mode Active</p>
          <p className="text-yellow-400/70 text-xs mt-1">Platform fee waived for existing ENS owners. Gas for contenthash transaction still applies.</p>
        </div>
      )}

      {/* Cost summary */}
      {publishStatus === "idle" && (
        <div className="mb-6 p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
          <h3 className="font-semibold text-white text-sm">Publishing Costs</h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Platform fee</span>
            {isFree
              ? <span className="text-green-400 font-mono">FREE (test)</span>
              : <span className="text-white font-mono">{effectiveFeeETH} ETH</span>
            }
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">ENS contenthash gas</span>
            <span className="text-gray-400">~$2–5</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">IPFS storage</span>
            <span className="text-green-400">Free (Pinata)</span>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-3 mb-8">
        <Step n={1} label={`Pay ${effectiveFeeETH} ETH platform fee`} status={step1Status} />
        <Step n={2} label="Upload HTML to IPFS via Pinata" status={step2Status} />
        <Step n={3} label={`Set ENS contenthash on ${ensName}`} status={step3Status} />
      </div>

      {isError && publishError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400 text-sm font-semibold mb-1">Error</p>
          <p className="text-red-400/80 text-xs">{publishError}</p>
        </div>
      )}

      {isDone && finalCid && (
        <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl space-y-4">
          <div className="text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-bold text-green-400 text-lg">Your site is live!</h3>
            <p className="text-gray-400 text-sm mt-1">{ensName} now points to your IPFS site</p>
          </div>
          <div className="space-y-2">
            <a href={`https://${ensName}.limo`} target="_blank" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <span className="text-sm text-gray-300">🌐 {ensName}.limo</span>
              <span className="text-xs text-gray-600">Open →</span>
            </a>
            <a href={`https://app.ens.domains/name/${ensName}`} target="_blank" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <span className="text-sm text-gray-300">🔷 ENS App</span>
              <span className="text-xs text-gray-600">View record →</span>
            </a>
            <a href={`https://gateway.pinata.cloud/ipfs/${finalCid}`} target="_blank" className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <span className="text-sm font-mono text-gray-400 text-xs truncate">{finalCid.slice(0, 30)}…</span>
              <span className="text-xs text-gray-600 shrink-0 ml-2">IPFS →</span>
            </a>
          </div>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just built my ENS site at ${ensName} using buildsite.eth — deployed to IPFS, zero servers. ⚡\n\nhttps://${ensName}.limo`)}`}
            target="_blank"
            className="block w-full text-center py-3 rounded-xl bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 text-[#1DA1F2] text-sm font-semibold hover:bg-[#1DA1F2]/30 transition-colors"
          >
            Share on X →
          </a>
        </div>
      )}

      <div className="flex gap-4">
        {!isRunning && !isDone && (
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">← Back</button>
        )}
        {!isDone && (
          <button
            onClick={handlePublish}
            disabled={!isConnected || isRunning}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold disabled:opacity-50 transition-colors"
          >
            {isRunning ? "Publishing…" : isError ? "Retry" : isFree ? "Publish Free →" : "Publish Now →"}
          </button>
        )}
      </div>
    </div>
  );
}
