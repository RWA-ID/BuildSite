"use client";
import { useSearchParams } from "next/navigation";
import { useMounted } from "@/hooks/useMounted";
import { Suspense } from "react";

function PreviewContent() {
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");
  const gateway = process.env.NEXT_PUBLIC_PINATA_GATEWAY || "https://gateway.pinata.cloud";

  if (!cid) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No CID provided</p>
          <p className="text-gray-600 text-sm">Usage: /preview?cid=Qm...</p>
        </div>
      </div>
    );
  }

  const ipfsUrl = `${gateway}/ipfs/${cid}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <div className="border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-400 font-mono">{cid.slice(0, 20)}…</span>
        <a
          href={ipfsUrl}
          target="_blank"
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          Open on IPFS →
        </a>
      </div>
      <iframe
        src={ipfsUrl}
        className="flex-1 w-full border-0"
        title="IPFS Preview"
        style={{ minHeight: "calc(100vh - 56px)" }}
      />
    </div>
  );
}

export default function PreviewPage() {
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <PreviewContent />
    </Suspense>
  );
}
