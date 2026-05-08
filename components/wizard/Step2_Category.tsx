"use client";
import { motion } from "framer-motion";
import { useBuilderStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/templates";

const CATEGORY_DETAILS: Record<string, { description: string; accent: string; examples: string[] }> = {
  builder: {
    description: "ENS giants, founders, developers, DeFi natives.",
    accent: "from-blue-500 to-cyan-500",
    examples: ["ENS Giant", "Founder", "Builder", "DeFi", "ENS Maxi"],
  },
  professional: {
    description: "Doctors, lawyers, engineers, consultants, architects.",
    accent: "from-emerald-500 to-teal-500",
    examples: ["Doctor", "Lawyer", "Engineer", "Consultant", "Architect"],
  },
  creative: {
    description: "Content creators, streamers, artists, musicians.",
    accent: "from-fuchsia-500 to-rose-500",
    examples: ["Creator", "Streamer", "Artist", "Musician"],
  },
  business: {
    description: "Agencies, freelancers, startups.",
    accent: "from-amber-500 to-orange-500",
    examples: ["Agency", "Freelancer"],
  },
  community: {
    description: "DAOs, collectives, open-source projects.",
    accent: "from-violet-500 to-purple-500",
    examples: ["DAO"],
  },
};

export function Step2_Category({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { category, setCategory } = useBuilderStore();

  function handleSelect(id: string) {
    setCategory(id);
    onNext();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400 mb-3">— STEP 02</div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          What kind of <span className="text-gradient-blue">page</span> are you building?
        </h2>
        <p className="text-white/50 text-lg">Pick the category that fits your work. We'll show templates designed for it.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, i) => {
          const d = CATEGORY_DETAILS[cat.id];
          const isActive = category === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all hover:-translate-y-1 ${
                isActive ? "glass-strong" : "glass hover:border-white/15"
              }`}
            >
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${d.accent} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity`} />
              <div className="relative p-6">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.accent} grid place-items-center text-lg mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1.5">{cat.label}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-4">{d.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.examples.slice(0, 4).map((ex) => (
                    <span key={ex} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/50">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="mt-10 text-white/50 hover:text-white text-sm transition-colors"
      >
        ← Back
      </button>
    </div>
  );
}
