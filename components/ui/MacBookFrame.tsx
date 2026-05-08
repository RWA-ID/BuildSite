"use client";

interface MacBookFrameProps {
  src?: string;
  srcDoc?: string;
  title?: string;
  className?: string;
}

export function MacBookFrame({ src, srcDoc, title = "ensgiant.eth", className = "" }: MacBookFrameProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Glow */}
      <div className="absolute -inset-12 bg-gradient-to-r from-blue-500/15 via-cyan-400/15 to-violet-500/15 blur-3xl opacity-70 pointer-events-none" />

      <div className="relative">
        {/* Screen bezel */}
        <div className="relative rounded-[18px] bg-gradient-to-b from-[#1a1a1d] to-[#0a0a0c] p-[6px] shadow-2xl">
          {/* Inner bezel */}
          <div className="relative rounded-[12px] bg-black p-[3px] overflow-hidden">
            {/* Camera notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-[#0a0a0c] z-10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#1a1a1d]" />
            </div>

            {/* URL bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1c1c1e] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-black/40 flex items-center gap-2">
                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[11px] font-mono text-white/70 truncate">{title}</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="w-1 h-1 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Iframe content - scrollable */}
            <div className="relative bg-[#0a0a0c] aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
              {src ? (
                <iframe
                  src={src}
                  title={title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  loading="lazy"
                />
              ) : srcDoc ? (
                <iframe
                  srcDoc={srcDoc}
                  title={title}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              ) : null}
              {/* Subtle scroll hint */}
              <div className="absolute bottom-3 right-3 opacity-50 pointer-events-none">
                <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur text-[10px] text-white/70 font-mono flex items-center gap-1">
                  <svg className="w-2.5 h-2.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  Scroll
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook base */}
        <div className="relative mx-auto" style={{ width: "108%", marginLeft: "-4%" }}>
          <div className="h-[6px] bg-gradient-to-b from-[#3a3a3d] to-[#1a1a1d] rounded-b-md" />
          <div className="h-[3px] bg-gradient-to-b from-[#1a1a1d] to-[#0a0a0c] rounded-b-lg" />
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[6px] rounded-b-lg bg-[#0a0a0c]" />
        </div>
      </div>
    </div>
  );
}
