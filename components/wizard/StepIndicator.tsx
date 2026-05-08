"use client";
import { motion } from "framer-motion";

const STEPS = [
  { n: 1, label: "Name" },
  { n: 2, label: "Category" },
  { n: 3, label: "Template" },
  { n: 4, label: "Profile" },
  { n: 5, label: "Preview" },
  { n: 6, label: "Publish" },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40">
          <span>Step</span>
          <span className="text-white">{currentStep}</span>
          <span>of {STEPS.length}</span>
        </div>
        <div className="text-xs font-medium text-white/70">
          {STEPS[currentStep - 1]?.label}
        </div>
      </div>
      {/* Progress bar */}
      <div className="relative h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="absolute inset-0 animate-shimmer rounded-full pointer-events-none" />
      </div>
      {/* Step dots */}
      <div className="flex justify-between mt-4">
        {STEPS.map((s) => {
          const done = s.n < currentStep;
          const current = s.n === currentStep;
          return (
            <div key={s.n} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  done
                    ? "bg-gradient-to-br from-blue-500 to-cyan-400 scale-100"
                    : current
                    ? "bg-white scale-150 ring-4 ring-white/10"
                    : "bg-white/15 scale-75"
                }`}
              />
              <span
                className={`text-[10px] font-medium hidden sm:block transition-colors ${
                  current ? "text-white" : done ? "text-white/60" : "text-white/30"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
