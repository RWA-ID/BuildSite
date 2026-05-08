"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAMES = ["vitalik.eth", "ensgiant.eth", "yourname.eth", "founder.eth", "artist.eth"];

export function LiveENSPreview() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % NAMES.length), 3500);
    return () => clearInterval(t);
  }, []);

  const name = NAMES[idx];

  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Glow */}
      <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-violet-500/20 blur-3xl opacity-60" />

      {/* Browser frame */}
      <div className="relative glass-strong rounded-2xl overflow-hidden shadow-2xl">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5">
            <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <AnimatePresence mode="wait">
              <motion.span
                key={name}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-mono text-white/80"
              >
                https://{name}.limo
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-7 bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Live · IPFS</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">CID: bafy...</span>
            </div>
            <div className="text-2xl font-display font-extrabold text-gradient leading-tight">
              {name.split(".")[0]}
            </div>
            <div className="text-xs text-white/50 mt-1 mb-5">
              Building permanent identity onchain.
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/5 border border-white/5 p-2">
                <div className="text-[10px] text-white/40">Projects</div>
                <div className="text-sm font-bold text-white mt-0.5">12</div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/5 p-2">
                <div className="text-[10px] text-white/40">Years</div>
                <div className="text-sm font-bold text-white mt-0.5">4+</div>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/5 p-2">
                <div className="text-[10px] text-white/40">Chains</div>
                <div className="text-sm font-bold text-white mt-0.5">∞</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1 h-7 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 grid place-items-center text-[11px] font-bold text-white">
                Visit Site
              </div>
              <div className="px-3 h-7 rounded-md border border-white/10 grid place-items-center text-[11px] text-white/70">
                EFP
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
