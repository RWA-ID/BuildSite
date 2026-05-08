"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import { useBuilderStore } from "@/lib/store";
import { StepIndicator } from "@/components/wizard/StepIndicator";
import { Step1_ENSName } from "@/components/wizard/Step1_ENSName";
import { Step2_Category } from "@/components/wizard/Step2_Category";
import { Step3_Template } from "@/components/wizard/Step3_Template";
import { Step4_Profile } from "@/components/wizard/Step4_Profile";
import { Step5_Preview } from "@/components/wizard/Step5_Preview";
import { Step6_Publish } from "@/components/wizard/Step6_Publish";
import { ConnectButton } from "@/components/ui/ConnectButton";
import { AmbientBackground } from "@/components/ui/AmbientBackground";

export default function BuildPage() {
  const mounted = useMounted();
  const { step, setStep } = useBuilderStore();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#06070a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  function next() { setStep(step + 1); }
  function back() { setStep(Math.max(1, step - 1)); }

  return (
    <div className="relative min-h-screen text-white">
      <AmbientBackground variant="subtle" />

      {/* Header */}
      <header className="relative z-40 border-b border-white/5 sticky top-0 backdrop-blur-xl bg-[#06070a]/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
            </span>
            <span className="font-mono font-medium text-[15px] tracking-tight">
              buildsite<span className="text-white/40">.eth</span>
            </span>
          </Link>
          <ConnectButton />
        </div>
      </header>

      {/* Step indicator */}
      <div className="relative border-b border-white/5 py-6 backdrop-blur-sm bg-[#06070a]/40">
        <div className="max-w-2xl mx-auto px-6">
          <StepIndicator currentStep={step} />
        </div>
      </div>

      {/* Step content */}
      <main className="relative max-w-5xl mx-auto px-6 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {step === 1 && <Step1_ENSName onNext={next} />}
            {step === 2 && <Step2_Category onNext={next} onBack={back} />}
            {step === 3 && <Step3_Template onNext={next} onBack={back} />}
            {step === 4 && <Step4_Profile onNext={next} onBack={back} />}
            {step === 5 && <Step5_Preview onNext={next} onBack={back} />}
            {step === 6 && <Step6_Publish onBack={back} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
