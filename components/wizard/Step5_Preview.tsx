"use client";
import { useState, useEffect } from "react";
import { useBuilderStore } from "@/lib/store";
import { renderTemplateToHTML } from "@/lib/templateRenderer";

export function Step5_Preview({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { templateId, profileData, ensName, uploadedImages, setGeneratedHtml } = useBuilderStore();
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [html, setHtml] = useState("");

  useEffect(() => {
    const generated = renderTemplateToHTML(templateId, profileData, ensName, uploadedImages);
    setHtml(generated);
    setGeneratedHtml(generated);
  }, [templateId, profileData, ensName, uploadedImages]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Preview Your Site</h2>
          <p className="text-gray-400 text-sm mt-1">This is exactly what visitors will see.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {(["desktop", "mobile"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewport === v ? "bg-white/15 text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                {v === "desktop" ? "🖥 Desktop" : "📱 Mobile"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Browser frame */}
      <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-500 font-mono">
            {ensName || "yourname.eth"}.limo
          </div>
        </div>

        {/* Preview area */}
        <div className="bg-white flex justify-center overflow-hidden" style={{ height: "550px" }}>
          <div
            className="transition-all duration-300 h-full overflow-hidden"
            style={{ width: viewport === "desktop" ? "100%" : "375px" }}
          >
            {html && (
              <iframe
                srcDoc={html}
                className="w-full h-full border-0"
                title="Site Preview"
                sandbox="allow-same-origin"
                style={{ transform: "scale(1)", transformOrigin: "top left" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={onBack} className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">← Edit</button>
        <button onClick={onNext} className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors">
          Publish to IPFS →
        </button>
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        Publishing costs 0.00825 ETH (one-time) + ENS contenthash gas fee
      </p>
    </div>
  );
}
