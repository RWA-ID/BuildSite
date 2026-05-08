"use client";

interface MiniSiteMockupProps {
  templateId: string;
  className?: string;
}

// Each template gets a unique mini visual signature.
export function MiniSiteMockup({ templateId, className = "" }: MiniSiteMockupProps) {
  const variants: Record<string, JSX.Element> = {
    ensgiant: (
      <div className="relative w-full h-full bg-[#0a0a0c] flex flex-col p-2 gap-1.5">
        <div className="flex items-center justify-between">
          <div className="text-[6px] font-bold text-blue-300">ensgiant.eth</div>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400" />
        </div>
        <div className="text-[5px] font-bold text-white leading-tight mt-0.5">Building identity infra</div>
        <div className="grid grid-cols-2 gap-0.5 mt-auto">
          <div className="h-3 rounded bg-blue-500/30" />
          <div className="h-3 rounded bg-purple-500/30" />
          <div className="h-3 rounded bg-cyan-500/30" />
          <div className="h-3 rounded bg-blue-500/30" />
        </div>
      </div>
    ),
    founder: (
      <div className="w-full h-full bg-white text-black flex flex-col p-2 gap-1">
        <div className="text-[6px] font-extrabold tracking-tight">CEO @ NewCo</div>
        <div className="text-[4px] text-gray-600">Building the future of finance.</div>
        <div className="flex gap-0.5 mt-auto">
          <div className="h-2 flex-1 rounded bg-gray-100" />
          <div className="h-2 flex-1 rounded bg-gray-100" />
          <div className="h-2 flex-1 rounded bg-gray-100" />
        </div>
      </div>
    ),
    builder: (
      <div className="w-full h-full bg-[#0d1117] text-green-400 font-mono p-2 flex flex-col gap-0.5">
        <div className="text-[5px]">~/dev $ whoami</div>
        <div className="text-[5px] text-white">→ builder.eth</div>
        <div className="text-[5px] mt-1">deploys.exe</div>
        <div className="grid grid-cols-7 gap-0.5 mt-auto">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-1 rounded-sm" style={{ background: `rgba(34,197,94,${0.2 + Math.random() * 0.7})` }} />
          ))}
        </div>
      </div>
    ),
    ens_maxi: (
      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 flex flex-col items-center justify-center p-2">
        <div className="text-white text-[10px] font-extrabold">⬣</div>
        <div className="text-white text-[5px] font-bold mt-1">name.eth</div>
        <div className="grid grid-cols-3 gap-0.5 mt-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="text-[3px] text-white/80 px-0.5 rounded bg-white/10">sub.eth</div>
          ))}
        </div>
      </div>
    ),
    defi: (
      <div className="w-full h-full bg-[#0a0e1a] flex flex-col p-2 gap-1">
        <div className="text-[5px] text-emerald-400 font-bold">$2.1B TVL</div>
        <div className="flex gap-0.5 items-end h-6 mt-1">
          {[40, 60, 35, 80, 70, 90, 65].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500 to-emerald-300" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="text-[4px] text-gray-500 mt-auto">+12.4% · 24h</div>
      </div>
    ),
    doctor: (
      <div className="w-full h-full bg-white flex flex-col p-2 gap-1">
        <div className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="text-[5px] text-blue-600 font-bold">+</div>
        </div>
        <div className="text-[5px] font-bold text-gray-900">Dr. Smith, MD</div>
        <div className="text-[4px] text-gray-500">Cardiology</div>
        <div className="mt-auto h-3 rounded bg-blue-50 flex items-center justify-center">
          <div className="text-[4px] text-blue-700 font-semibold">Book Visit</div>
        </div>
      </div>
    ),
    lawyer: (
      <div className="w-full h-full bg-[#0e1226] flex flex-col p-2 gap-1">
        <div className="text-[8px] text-amber-400">⚖</div>
        <div className="text-[5px] font-extrabold text-white">SMITH & CO.</div>
        <div className="text-[4px] text-gray-400">Counsel · Est. 2010</div>
        <div className="mt-auto flex gap-0.5">
          <div className="text-[3px] px-0.5 bg-amber-400/20 text-amber-300 rounded">M&A</div>
          <div className="text-[3px] px-0.5 bg-amber-400/20 text-amber-300 rounded">IP</div>
        </div>
      </div>
    ),
    engineer: (
      <div className="w-full h-full bg-[#0f1419] text-cyan-400 font-mono p-2 flex flex-col gap-0.5">
        <div className="text-[5px]">// principal eng</div>
        <div className="text-[5px] text-white">{"<scale.systems>"}</div>
        <div className="grid grid-cols-3 gap-0.5 mt-auto">
          <div className="text-[3px] text-center bg-cyan-500/20 rounded">Go</div>
          <div className="text-[3px] text-center bg-cyan-500/20 rounded">TS</div>
          <div className="text-[3px] text-center bg-cyan-500/20 rounded">Rust</div>
        </div>
      </div>
    ),
    consultant: (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col p-2 gap-1">
        <div className="text-[5px] font-bold text-slate-900">Strategy Co.</div>
        <div className="text-[4px] text-slate-600">Trusted by Fortune 500</div>
        <div className="mt-auto flex gap-0.5">
          <div className="flex-1 h-2 bg-slate-300 rounded" />
          <div className="flex-1 h-2 bg-slate-300 rounded" />
          <div className="flex-1 h-2 bg-slate-300 rounded" />
        </div>
      </div>
    ),
    architect: (
      <div className="w-full h-full bg-[#1a1815] flex flex-col p-2 gap-0.5">
        <div className="text-[5px] font-extrabold tracking-widest text-amber-100">ATELIER</div>
        <div className="grid grid-cols-3 gap-0.5 mt-1 flex-1">
          <div className="bg-amber-100/10 rounded-sm" />
          <div className="bg-amber-100/15 rounded-sm" />
          <div className="bg-amber-100/10 rounded-sm" />
          <div className="bg-amber-100/15 rounded-sm" />
          <div className="bg-amber-100/10 rounded-sm" />
          <div className="bg-amber-100/15 rounded-sm" />
        </div>
      </div>
    ),
    content_creator: (
      <div className="w-full h-full bg-gradient-to-br from-red-600 to-rose-700 flex flex-col p-2 gap-1">
        <div className="text-[5px] font-bold text-white">@creator</div>
        <div className="text-[8px] text-white font-black">▶ 1.2M</div>
        <div className="mt-auto h-3 rounded bg-white/20 flex items-center px-1">
          <div className="text-[4px] text-white font-bold">SUBSCRIBE</div>
        </div>
      </div>
    ),
    streamer: (
      <div className="w-full h-full bg-[#18141f] flex flex-col p-2 gap-1">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <div className="text-[5px] font-bold text-white">LIVE</div>
        </div>
        <div className="text-[6px] font-bold text-violet-300">@streamer</div>
        <div className="mt-auto h-4 rounded bg-violet-500/20 grid place-items-center">
          <div className="text-[4px] text-violet-200 font-bold">2.4K viewers</div>
        </div>
      </div>
    ),
    artist: (
      <div className="w-full h-full bg-[#1a1818] flex flex-col p-1.5 gap-0.5">
        <div className="grid grid-cols-2 gap-0.5 flex-1">
          <div className="bg-gradient-to-br from-rose-400 to-orange-300 rounded-sm" />
          <div className="bg-gradient-to-br from-violet-400 to-pink-400 rounded-sm" />
          <div className="bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-sm" />
          <div className="bg-gradient-to-br from-amber-400 to-rose-400 rounded-sm" />
        </div>
        <div className="text-[4px] text-white/80 text-center">artist.eth</div>
      </div>
    ),
    musician: (
      <div className="w-full h-full bg-[#0a0a0a] flex flex-col p-2 gap-1">
        <div className="w-full aspect-square bg-gradient-to-br from-fuchsia-500 to-orange-500 rounded-sm" />
        <div className="text-[5px] font-bold text-white">New EP</div>
        <div className="flex gap-0.5 mt-auto">
          <div className="text-[3px] px-0.5 bg-white/10 text-white rounded">▶</div>
          <div className="flex-1 h-1 bg-white/10 rounded-full">
            <div className="h-full w-1/3 rounded-full bg-fuchsia-400" />
          </div>
        </div>
      </div>
    ),
    agency: (
      <div className="w-full h-full bg-white flex flex-col p-2 gap-1">
        <div className="text-[7px] font-black text-black tracking-tight">studio/</div>
        <div className="text-[4px] text-gray-500">brand · web · 3d</div>
        <div className="mt-auto grid grid-cols-3 gap-0.5">
          <div className="aspect-square bg-black rounded-sm" />
          <div className="aspect-square bg-amber-400 rounded-sm" />
          <div className="aspect-square bg-gray-200 rounded-sm" />
        </div>
      </div>
    ),
    freelancer: (
      <div className="w-full h-full bg-[#fffbeb] flex flex-col p-2 gap-1">
        <div className="text-[5px] font-bold text-amber-900">available for hire</div>
        <div className="text-[6px] font-extrabold text-gray-900">designer</div>
        <div className="text-[4px] text-gray-700">$120/hr · ★★★★★</div>
        <div className="mt-auto h-2.5 rounded bg-amber-400 grid place-items-center">
          <div className="text-[4px] text-amber-900 font-bold">Hire me →</div>
        </div>
      </div>
    ),
    dao: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-purple-950 flex flex-col p-2 gap-1">
        <div className="text-[5px] font-bold text-indigo-300">DAO · v1</div>
        <div className="text-[8px] font-extrabold text-white">$NAME</div>
        <div className="grid grid-cols-2 gap-0.5 mt-auto">
          <div className="text-[3px] text-center bg-indigo-500/30 rounded text-white">Vote</div>
          <div className="text-[3px] text-center bg-purple-500/30 rounded text-white">Treasury</div>
        </div>
      </div>
    ),
  };

  return (
    <div className={`relative overflow-hidden rounded-md border border-white/10 ${className}`}>
      {variants[templateId] || (
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-cyan-900" />
      )}
      {/* Browser dots */}
      <div className="absolute top-1 left-1 flex gap-0.5">
        <div className="w-1 h-1 rounded-full bg-red-400/60" />
        <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
        <div className="w-1 h-1 rounded-full bg-green-400/60" />
      </div>
    </div>
  );
}
