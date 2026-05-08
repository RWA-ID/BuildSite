"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import { ConnectButton } from "@/components/ui/ConnectButton";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { CATEGORIES, TEMPLATES } from "@/lib/templates";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { MacBookFrame } from "@/components/ui/MacBookFrame";
import { IPhoneFrame } from "@/components/ui/IPhoneFrame";
import { TemplatePreview } from "@/components/ui/TemplatePreview";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect & claim your name",
    desc: "Use your existing .eth name or register a new one. Ownership is verified onchain — no signups, no passwords.",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    title: "Choose a template, fill it in",
    desc: "17 production-grade templates. Your inputs are baked directly into the HTML — every byte under your control.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    step: "03",
    title: "Publish to IPFS, forever",
    desc: "One signature uploads your site to IPFS and writes the contenthash to your ENS record. Permanent. Censorship-resistant.",
    accent: "from-cyan-500 to-emerald-500",
  },
];

const STATS = [
  { value: "17", label: "Templates" },
  { value: "0", label: "Servers needed" },
  { value: "100%", label: "On IPFS" },
  { value: "∞", label: "Lifetime" },
];

const FAQS = [
  { q: "What is an ENS website?", a: "ENS names like yourname.eth can resolve to IPFS content. Your .eth becomes a permanent, censorship-resistant website at yourname.eth.limo and yourname.eth.link." },
  { q: "Is this truly permanent?", a: "Yes. Your HTML lives on IPFS — distributed, with no central server. Anyone can pin it. As long as it exists on the network, it's accessible." },
  { q: "What does the 0.00825 ETH cover?", a: "Pinata IPFS storage (pinned permanently) and platform infrastructure. ENS registration and gas fees are paid separately at cost." },
  { q: "Can I update my site later?", a: "Yes — go through the wizard again with your existing ENS name. A new IPFS CID is generated and your contenthash updated. Old version remains accessible if pinned." },
  { q: "Which wallets work?", a: "Any EVM wallet via RainbowKit — MetaMask, Coinbase Wallet, Rabby, Rainbow, Ledger, WalletConnect, and more." },
  { q: "Do I need to know how to code?", a: "Not at all. The 6-step wizard handles everything. The HTML output is professional-grade and fully self-contained — no build step, no dependencies." },
];

export default function HomePage() {
  const mounted = useMounted();
  const [activeCategory, setActiveCategory] = useState("all");
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const router = useRouter();
  const pendingBuild = useRef(false);

  // Whenever the user is connected on the home page, send them straight to
  // step 1 of the wizard. Connecting from the nav button or from a build CTA
  // both flow through here.
  useEffect(() => {
    if (isConnected) {
      pendingBuild.current = false;
      router.push("/build");
    }
  }, [isConnected, router]);

  function handleBuildClick() {
    if (isConnected) {
      router.push("/build");
    } else {
      pendingBuild.current = true;
      openConnectModal?.();
    }
  }

  const filteredTemplates = activeCategory === "all"
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <AmbientBackground />

      {/* Navbar */}
      <nav className="relative z-40 border-b border-white/5 sticky top-0 backdrop-blur-xl bg-[#06070a]/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
            </span>
            <span className="font-mono font-medium text-[15px] tracking-tight">
              buildsite<span className="text-white/40">.eth</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          {mounted && <ConnectButton />}
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass font-mono text-[11px] uppercase tracking-[0.12em] text-white/70 mb-6"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                <span className="relative rounded-full bg-emerald-400 h-1.5 w-1.5" />
              </span>
              Live on Ethereum mainnet
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-display text-[44px] sm:text-[60px] lg:text-[72px] font-semibold leading-[1.02] tracking-[-0.035em] mb-6 text-balance"
            >
              Your <span className="ital">ENS</span> name,
              <br />
              <span className="text-gradient">your home</span>
              <br />
              <span className="ital">on the</span> permanent web.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg lg:text-xl text-white/60 max-w-xl mb-10 leading-relaxed text-pretty"
            >
              Turn your <span className="text-white font-medium">.eth</span> name into a permanent, censorship-resistant website in 6 steps.
              Hosted on IPFS, owned by you, no servers in between.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              {mounted && (
                <button
                  onClick={handleBuildClick}
                  className="group relative px-7 py-4 rounded-xl bg-white text-black font-semibold text-base transition-all hover:scale-[1.02] glow-blue"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isConnected ? "Start Building" : "Connect Wallet to Start"}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              )}
              <a
                href="#how-it-works"
                className="px-7 py-4 rounded-xl glass text-white/80 hover:text-white hover:border-white/20 font-medium text-base transition-all text-center"
              >
                See how it works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center gap-6 text-xs text-white/40"
            >
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Audited contracts
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                ENS-native
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                100% client-side
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MacBookFrame
              src="/embed/ensgiant.html"
              title="ensgiant.eth"
            />
            <p className="mt-4 text-center text-xs text-white/40 font-mono">
              ensgiant.eth · scroll inside the frame ↑
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative py-12 px-6 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-extrabold text-gradient leading-none">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-white/40 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-4">// 01 — Process</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.025em] mb-5 text-balance">
              From zero to <span className="ital">decentralized</span><br/>in minutes.
            </h2>
            <p className="text-white/50 text-lg">No code. No deploys. No servers. Just sign and ship.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative spotlight glass rounded-2xl p-7 hover:border-white/15 transition-colors"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} grid place-items-center font-display text-base font-bold text-white mb-5`}>
                  {s.step}
                </div>
                <h3 className="font-display text-xl font-bold mb-3 leading-tight">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-4">// 02 — Library</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.025em] mb-5 text-balance">
              17 templates,<br/><span className="ital">one for every</span> shape of identity.
            </h2>
            <p className="text-white/50 text-lg">Each generates a complete, self-contained HTML page — no external dependencies, no JavaScript framework.</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === "all" ? "bg-white text-black" : "glass text-white/60 hover:text-white"}`}
            >
              All ({TEMPLATES.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? "bg-white text-black" : "glass text-white/60 hover:text-white"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTemplates.map((tmpl, i) => (
              <motion.button
                key={tmpl.id}
                onClick={handleBuildClick}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                className="group relative text-left rounded-2xl glass overflow-hidden hover:border-white/15 transition-all hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
                  <TemplatePreview templateId={tmpl.id} className="w-full h-full" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
                </div>
                <div className="p-4 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-display font-bold text-white text-sm">{tmpl.name}</span>
                    {tmpl.id === "ensgiant" && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-bold uppercase tracking-wider">Hero</span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed">{tmpl.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-violet-500/0 group-hover:from-blue-500/[0.04] group-hover:to-violet-500/[0.04] transition-all pointer-events-none" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured: ENS Giant */}
      <section className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 bg-gradient-to-br from-blue-600/10 via-violet-600/5 to-cyan-500/10 border border-white/10"
          >
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-medium uppercase tracking-widest mb-5">
                  ⭐ Featured Template
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.025em] mb-4 text-balance">
                  A builder profile<br /><span className="ital">that looks</span> expensive.
                </h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-7 max-w-xl">
                  The flagship template. Dark luxury aesthetic, project showcase, on-chain stats, EFP social graph, and partner CTA. Built by <a href="https://ensgiant.eth.limo" target="_blank" className="underline decoration-dotted underline-offset-4 hover:text-white">ensgiant.eth</a>, used in production.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Project cards", "Live status", "EFP graph", "Multi-chain", "Custom CTA"].map((t) => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full glass text-white/70">{t}</span>
                  ))}
                </div>
                {mounted && (
                  <button
                    onClick={handleBuildClick}
                    className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:scale-105 transition-transform"
                  >
                    Build with this template →
                  </button>
                )}
              </div>
              <div className="relative">
                <IPhoneFrame src="/embed/ensgiant.html" title="ensgiant.eth" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-4">// 03 — Pricing</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.025em] mb-5 text-balance">
              One price. <span className="ital">Forever.</span>
            </h2>
            <p className="text-white/50 text-lg">No subscriptions. No expiring tokens. No vendor lock-in.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden glass-strong p-10"
          >
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-baseline gap-3 justify-center mb-2">
                <span className="font-display text-6xl md:text-7xl font-black text-gradient">0.00825</span>
                <span className="text-2xl text-white/60 font-display font-bold">ETH</span>
              </div>
              <p className="text-center text-white/50 text-sm mb-10">≈ $25 USD · paid once · live forever</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Permanent IPFS hosting via Pinata",
                  "All 17 production templates",
                  "ENS contenthash written onchain",
                  "Self-contained HTML output",
                  "Mobile responsive by default",
                  "No vendor lock-in, ever",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                    <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              {mounted && (
                <button
                  onClick={handleBuildClick}
                  className="w-full py-4 rounded-xl bg-white text-black font-semibold text-base hover:scale-[1.02] transition-transform glow-blue"
                >
                  {isConnected ? "Start Building →" : "Connect Wallet to Start →"}
                </button>
              )}
              <p className="text-center text-xs text-white/40 mt-4">
                Plus ENS gas (~$0.05–0.50) and registration fee for new names
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-white/40 mb-4">// 04 — FAQ</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-[-0.025em] mb-3 text-balance">
              <span className="ital">Things you</span> may be wondering.
            </h2>
            <p className="text-white/50 text-lg">Everything you need to know about owning your slice of the permanent web.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group glass rounded-2xl overflow-hidden hover:border-white/15 transition-colors"
              >
                <summary className="px-6 py-5 cursor-pointer flex items-center justify-between gap-4 list-none">
                  <span className="font-medium text-white">{faq.q}</span>
                  <span className="text-white/40 text-lg shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] tracking-[-0.035em] mb-6 text-balance">
              Your name. <span className="ital">Your home</span> onchain.
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Stop renting digital real estate. Build something that outlives every server.
            </p>
            {mounted && (
              <button
                onClick={handleBuildClick}
                className="inline-flex items-center gap-2 px-8 py-5 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition-transform glow-blue"
              >
                {isConnected ? "Start Building" : "Connect Wallet to Start"}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            <span className="font-mono font-medium text-sm">
              buildsite<span className="text-white/40">.eth</span>
            </span>
          </div>
          <p className="text-white/40 text-xs text-center">
            Built on Ethereum · Powered by ENS · Hosted on IPFS
          </p>
          <div className="flex gap-6 text-white/40 text-xs">
            <a href="https://app.ens.domains" target="_blank" className="hover:text-white transition-colors">ENS</a>
            <a href="https://ipfs.tech" target="_blank" className="hover:text-white transition-colors">IPFS</a>
            <a href="https://twitter.com/ensgianteth" target="_blank" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
