"use client";

interface IPhoneFrameProps {
  src?: string;
  srcDoc?: string;
  title?: string;
  className?: string;
}

export function IPhoneFrame({ src, srcDoc, title = "preview", className = "" }: IPhoneFrameProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: "320px" }}>
      {/* Glow */}
      <div className="absolute -inset-8 bg-gradient-to-b from-blue-500/20 via-violet-500/20 to-cyan-400/20 blur-3xl opacity-70 pointer-events-none" />

      {/* Outer body / titanium frame */}
      <div className="relative rounded-[52px] bg-gradient-to-b from-[#2a2a2e] via-[#1a1a1c] to-[#0e0e10] p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        {/* Inner bezel */}
        <div className="relative rounded-[50px] bg-black p-[10px]">
          {/* Side buttons */}
          <span className="absolute left-[-3px] top-24 w-[3px] h-8 rounded-l-sm bg-[#1a1a1c]" />
          <span className="absolute left-[-3px] top-36 w-[3px] h-12 rounded-l-sm bg-[#1a1a1c]" />
          <span className="absolute left-[-3px] top-52 w-[3px] h-12 rounded-l-sm bg-[#1a1a1c]" />
          <span className="absolute right-[-3px] top-32 w-[3px] h-16 rounded-r-sm bg-[#1a1a1c]" />

          {/* Screen */}
          <div className="relative rounded-[42px] bg-[#06070a] overflow-hidden aspect-[9/19.5]">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[88px] h-[26px] rounded-full bg-black flex items-center justify-end pr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1c]" />
            </div>

            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 z-20 h-10 flex items-center justify-between px-6 pt-1.5 pointer-events-none">
              <span className="text-[11px] font-semibold text-white">9:41</span>
              <div className="flex items-center gap-1">
                {/* Signal */}
                <svg className="w-3 h-3 text-white" viewBox="0 0 16 12" fill="currentColor">
                  <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
                  <rect x="3.5" y="6" width="2.5" height="5" rx="0.5" />
                  <rect x="7" y="4" width="2.5" height="7" rx="0.5" />
                  <rect x="10.5" y="2" width="2.5" height="9" rx="0.5" />
                </svg>
                {/* Wifi */}
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 12" fill="currentColor">
                  <path d="M8 11.5a1 1 0 100-2 1 1 0 000 2zM5 8a4.5 4.5 0 016 0l1-1a6 6 0 00-8 0l1 1zM2 5a9 9 0 0112 0l1-1a10.5 10.5 0 00-14 0l1 1z" />
                </svg>
                {/* Battery */}
                <svg className="w-5 h-3 text-white" viewBox="0 0 24 12" fill="none">
                  <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" />
                  <rect x="2" y="2" width="14" height="8" rx="1" fill="currentColor" />
                  <rect x="21.5" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Iframe content */}
            {src ? (
              <iframe
                src={src}
                title={title}
                className="absolute inset-0 w-full h-full border-0 bg-[#06070a]"
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
              />
            ) : srcDoc ? (
              <iframe
                srcDoc={srcDoc}
                title={title}
                className="absolute inset-0 w-full h-full border-0 bg-[#06070a]"
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
            ) : null}

            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 w-28 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
