"use client";
import { motion } from "framer-motion";
import { useBuilderStore } from "@/lib/store";
import { getTemplatesByCategory, TEMPLATES } from "@/lib/templates";
import { TemplatePreview } from "@/components/ui/TemplatePreview";

export function Step3_Template({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { category, templateId, setTemplate } = useBuilderStore();
  const templates = category ? getTemplatesByCategory(category) : TEMPLATES;

  function handleSelect(id: string) {
    setTemplate(id);
    onNext();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 mb-3">— STEP 03</div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
          Pick a <span className="text-gradient-violet">template</span>.
        </h2>
        <p className="text-white/50 text-lg">Each one generates a complete, self-contained HTML site. Customize everything in the next step.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((tmpl, i) => {
          const isActive = templateId === tmpl.id;
          return (
            <motion.button
              key={tmpl.id}
              onClick={() => handleSelect(tmpl.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={`group relative overflow-hidden rounded-2xl text-left transition-all hover:-translate-y-1 ${
                isActive
                  ? "glass-strong ring-2 ring-blue-400/40"
                  : "glass hover:border-white/15"
              }`}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
                <TemplatePreview templateId={tmpl.id} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
              </div>
              <div className="p-4 border-t border-white/5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-display font-bold text-white text-sm">{tmpl.name}</h3>
                  {tmpl.id === "ensgiant" && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold uppercase tracking-wider shrink-0">
                      Hero
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2 mb-3">{tmpl.description}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-white/30 uppercase tracking-wider">{tmpl.fields.length} fields</span>
                  <span className={`font-medium ${isActive ? "text-blue-400" : "text-white/40 group-hover:text-white/70"}`}>
                    {isActive ? "✓ Selected" : "Select →"}
                  </span>
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
