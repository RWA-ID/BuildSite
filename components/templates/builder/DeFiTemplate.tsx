"use client";
import { ProfileData, StatEntry } from "@/lib/store";

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-7"/></svg>`,
  vault: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v.01M12 15v.01M9 12h.01M15 12h.01"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-3 7a4 4 0 0 0 6 0l-3-7z"/><path d="M19 7l-3 7a4 4 0 0 0 6 0l-3-7z"/><path d="M8 21h8"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  block: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></svg>`,
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function twitterUrl(handle: string | undefined): string {
  if (!handle) return "";
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://x.com/${h}` : "";
}

function telegramUrl(handle: string | undefined): string {
  if (!handle) return "";
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://t.me/${h}` : "";
}

export function generateDeFiHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const bio = escapeHtml(
    profileData.bio || "Onchain researcher tracking liquidity, invariants, and the systems that make capital move."
  );
  const stats: StatEntry[] = profileData.stats || [];
  const chains: string[] = profileData.chains || [];
  const profileImg = uploadedImages["profileImage"] || "";

  const tw = twitterUrl(profileData.twitter);
  const tg = telegramUrl(profileData.telegram);
  const email = profileData.email || "";

  const heroStats: StatEntry[] = stats.length >= 3
    ? stats.slice(0, 3)
    : [
        ...stats,
        ...[
          { label: "TVL touched", value: "$—" },
          { label: "Audits reviewed", value: "—" },
          { label: "Chains active", value: String(chains.length || "—") },
        ].slice(stats.length),
      ];

  const primaryChain = chains[0] || "mainnet";
  const focus = chains.length > 1 ? `${chains.length} chains` : "liquidity research";

  const audits = [
    { kind: "Reviewed", title: "Protocol invariants", note: "Stress-testing oracle and liquidation paths against adversarial flow." },
    { kind: "Authored", title: "Liquidation mechanism", note: "Cascading auction with partial fills to keep solvency under thin books." },
    { kind: "Contributed", title: "Vault strategy", note: "Yield routing across stable pairs with risk-adjusted rebalancing." },
  ];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: "DeFi Researcher",
    description: profileData.bio || "Onchain researcher tracking liquidity and protocol invariants.",
    url: `https://${ensName}.limo`,
    sameAs: [tw, tg, email ? `mailto:${email}` : ""].filter(Boolean),
  });

  const statsHTML = stats.length > 0 ? `
<section id="stats">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Onchain stats</div>
        <h2 class="section-title">Numbers that <span class="ital">settle on a block.</span></h2>
      </div>
      <p class="section-sub">Every figure verifiable onchain. No vanity metrics.</p>
    </div>
    <div class="stats-grid reveal">
      ${stats.map((s) => `
      <div class="stat-card">
        <div class="stat-card-icon">${SVG.chart}</div>
        <div class="stat-card-val">${escapeHtml(s.value)}</div>
        <div class="stat-card-lbl">${escapeHtml(s.label)}</div>
      </div>`).join("")}
    </div>
    <div class="stats-foot">
      <span class="dot-live"></span>
      <span>verify onchain · all figures sourced from public mempool &amp; explorers</span>
    </div>
  </div>
</section>` : "";

  const auditsHTML = `
<section id="audits">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Audits &amp; contributions</div>
        <h2 class="section-title">Where the work<br><span class="ital">leaves a trail.</span></h2>
      </div>
      <p class="section-sub">Selected research, audits, and protocol contributions.</p>
    </div>
    <div class="audit-grid">
      ${audits.map((a, i) => `
      <article class="audit-card reveal">
        <div class="audit-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="audit-tag">${escapeHtml(a.kind)}</div>
        <div class="audit-title">${escapeHtml(a.title)}</div>
        <p class="audit-note">${escapeHtml(a.note)}</p>
        <div class="audit-icon">${i === 0 ? SVG.shield : i === 1 ? SVG.scale : SVG.vault}</div>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  const chainsHTML = chains.length > 0 ? `
<section id="chains">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Active across chains</div>
        <h2 class="section-title">Liquidity is <span class="ital">multichain</span> — so is the work.</h2>
      </div>
      <p class="section-sub">Currently watching, providing, or contributing on:</p>
    </div>
    <div class="chains-strip reveal">
      ${chains.map((c) => `
      <div class="chain-chip">
        <span class="chain-dot"></span>
        <span class="chain-name">${escapeHtml(c)}</span>
        <span class="chain-status">live</span>
      </div>`).join("")}
    </div>
  </div>
</section>` : "";

  const engageHTML = `
<section id="engage">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 04 — Engage</div>
        <h2 class="section-title">Open for <span class="ital">research collabs,</span><br>audit advisory, and strategy work.</h2>
      </div>
      <p class="section-sub">Selective engagements per quarter — protocols that care about doing it right.</p>
    </div>
    <div class="engage-grid">
      <div class="reveal">
        <p class="engage-copy">From mechanism review to live-fire incident response, I work with teams that treat onchain capital like the load-bearing thing it is.</p>
        <div class="engage-pillars">
          <div class="pillar"><div class="pillar-num">01</div><div class="pillar-body"><h4>Research collabs</h4></div></div>
          <div class="pillar"><div class="pillar-num">02</div><div class="pillar-body"><h4>Audit advisory</h4></div></div>
          <div class="pillar"><div class="pillar-num">03</div><div class="pillar-body"><h4>Strategy &amp; positioning</h4></div></div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">// Contact</div>
          <div class="contact-title">Reach out.</div>
          <p class="contact-note">Best signal via X or Telegram. Email for longer-form work.</p>
        </div>
        <div class="contact-links">
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink primary" target="_blank" rel="noopener">${SVG.twitter} ${escapeHtml(profileData.twitter || "Twitter")} ${SVG.arrow}</a>` : ""}
          ${tg ? `<a href="${escapeHtml(tg)}" class="plink" target="_blank" rel="noopener">${SVG.telegram} ${escapeHtml(profileData.telegram || "Telegram")}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — DeFi Native</title>
<meta name="description" content="${escapeHtml(profileData.bio || "Onchain researcher tracking liquidity and protocol invariants.")}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${escapeHtml(profileData.bio || "DeFi research, audits, and strategy.")}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#050807;--bg-1:#0a1410;--bg-2:#102420;--bg-3:#163029;--line:#15302a;--line-2:#1f4239;--ink:#eaf6f1;--ink-2:#a9c6bd;--ink-3:#6c8a83;--ink-4:#475e58;--green:#34d399;--cyan:#22d3ee;--amber:#f5b041;--grad:linear-gradient(135deg,#34d399 0%,#22d3ee 100%);--grad-soft:linear-gradient(135deg,rgba(52,211,153,.10) 0%,rgba(34,211,238,.10) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,rgba(52,211,153,.16),transparent 60%),radial-gradient(ellipse 700px 500px at 88% 22%,rgba(34,211,238,.13),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(245,176,65,.06),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(52,211,153,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,.025) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(5,8,7,.7);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease;font-family:'JetBrains Mono',monospace}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--grad) !important;color:var(--bg) !important;font-weight:700 !important;font-family:'Space Grotesk',sans-serif !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(52,211,153,.04);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px;text-wrap:balance}
.hero h1 .name{font-family:'JetBrains Mono',monospace;font-weight:600;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.04em}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--ink-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--grad);color:var(--bg)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(52,211,153,.25)}
.btn-ghost{background:rgba(234,246,241,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(234,246,241,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.6rem;font-weight:600;color:var(--green);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.12em;margin-top:6px;font-family:'JetBrains Mono',monospace}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:14px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(.95) hue-rotate(-5deg)}
.profile-card::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(52,211,153,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,.08) 1px,transparent 1px);background-size:24px 24px;z-index:1;mix-blend-mode:overlay}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(5,8,7,.85) 100%);pointer-events:none;z-index:1}
.profile-tag{position:absolute;bottom:12px;left:12px;right:12px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.74rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--green)}
.profile-glow{position:absolute;inset:-2px;border-radius:16px;background:var(--grad);z-index:-1;opacity:.35;filter:blur(20px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3)}
.profile-meta-row b{color:var(--ink);font-weight:500}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--green)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px}
.stat-card{position:relative;background:var(--bg-1);border:1px solid var(--line);border-radius:14px;padding:28px;transition:all .25s ease;overflow:hidden}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--grad);opacity:.4}
.stat-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.stat-card-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--bg-3);color:var(--green);margin-bottom:18px}
.stat-card-icon svg{width:18px;height:18px}
.stat-card-val{font-family:'JetBrains Mono',monospace;font-size:2.2rem;font-weight:600;color:var(--ink);letter-spacing:-.03em;line-height:1}
.stat-card-lbl{font-family:'JetBrains Mono',monospace;font-size:.74rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.12em;margin-top:10px}
.stats-foot{display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);padding-top:18px;border-top:1px dashed var(--line)}
.dot-live{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:pulse 2.4s ease-in-out infinite}
.audit-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.audit-grid{grid-template-columns:1fr}}
.audit-card{position:relative;background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:28px;overflow:hidden;transition:all .25s ease}
.audit-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.audit-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.audit-card:hover::before{opacity:1}
.audit-card>*{position:relative;z-index:1}
.audit-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--ink-4);font-weight:500;margin-bottom:18px}
.audit-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:.12em;padding:3px 8px;border-radius:4px;background:rgba(52,211,153,.08);color:var(--green);border:1px solid rgba(52,211,153,.25);margin-bottom:14px}
.audit-title{font-size:1.25rem;font-weight:600;letter-spacing:-.015em;line-height:1.2;margin-bottom:10px}
.audit-note{color:var(--ink-2);font-size:.95rem;line-height:1.55;text-wrap:pretty;margin-bottom:24px}
.audit-icon{color:var(--ink-3);opacity:.5}
.audit-icon svg{width:28px;height:28px}
.chains-strip{display:flex;flex-wrap:wrap;gap:10px}
.chain-chip{display:inline-flex;align-items:center;gap:10px;padding:12px 18px;background:var(--bg-1);border:1px solid var(--line);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:.88rem;color:var(--ink);transition:all .2s ease}
.chain-chip:hover{border-color:var(--line-2);transform:translateY(-2px)}
.chain-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)}
.chain-name{font-weight:500}
.chain-status{color:var(--ink-3);font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;padding-left:8px;border-left:1px solid var(--line-2)}
.engage-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.engage-grid{grid-template-columns:1fr;gap:40px}}
.engage-copy{font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty}
.engage-pillars{display:grid;gap:14px;margin-top:28px}
.pillar{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--line-2);transform:translateX(4px)}
.pillar-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--green);font-weight:500;min-width:32px;padding-top:1px}
.pillar-body h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(52,211,153,.6),rgba(34,211,238,.6),transparent)}
.contact-title{font-size:1.25rem;font-weight:600;letter-spacing:-.01em}
.contact-note{color:var(--ink-3);font-size:.92rem;margin-top:4px}
.contact-links{display:flex;flex-direction:column;gap:12px}
.plink{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s ease}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink svg{width:14px;height:14px}
.plink.primary{background:var(--grad);color:var(--bg);border-color:transparent}
.plink.primary:hover{background:var(--ink);color:var(--bg)}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--green);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
@media(max-width:480px){.container{padding:0 20px}.hero{padding:64px 0 56px}section{padding:72px 0}.section-head{margin-bottom:32px}.audit-card,.stat-card{padding:22px}.engage-pillars{margin-top:20px}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      ${stats.length > 0 ? '<a href="#stats">Stats</a>' : ""}
      <a href="#audits">Audits</a>
      ${chains.length > 0 ? '<a href="#chains">Chains</a>' : ""}
      <a href="#engage" class="nav-cta">Engage</a>
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>// DeFi Native · Onchain since ${new Date().getFullYear() - 4}</span></div>
        <h1>Reading the book.<br>Pricing the <span class="name">risk</span>.<br><span class="ital">Shipping the fix.</span></h1>
        <p class="hero-bio"><b style="color:var(--ink)">${escapeHtml(ensName)}</b> — ${bio}</p>
        <div class="hero-actions">
          ${tw ? `<a href="${escapeHtml(tw)}" class="btn btn-primary" target="_blank" rel="noopener">${SVG.twitter} Follow research ${SVG.arrowRight}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="btn btn-ghost">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#0a1410,#102420);display:flex;align-items:center;justify-content:center;color:#34d399;">${SVG.chart}</div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">● live</span></div>
        </div>
        <div class="profile-meta">
          <div class="profile-meta-row"><span>chain</span><b>${escapeHtml(primaryChain)}</b></div>
          <div class="profile-meta-row"><span>focus</span><b>${escapeHtml(focus)}</b></div>
          <div class="profile-meta-row"><span>status</span><b style="color:var(--green)">● researching</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${statsHTML}
${auditsHTML}
${chainsHTML}
${engageHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || "Onchain researcher tracking liquidity, invariants, and the systems that make capital move.")}</p>
      </div>
      <div class="foot-col">
        <h5>Sections</h5>
        ${stats.length > 0 ? '<a href="#stats">Onchain stats</a>' : ""}
        <a href="#audits">Audits &amp; contributions</a>
        ${chains.length > 0 ? '<a href="#chains">Chains</a>' : ""}
        <a href="#engage">Engage</a>
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">X / Twitter</a>` : ""}
        ${tg ? `<a href="${escapeHtml(tg)}" target="_blank" rel="noopener">Telegram</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(ensName)} — All onchain, all the time.</span>
      <span class="built"><span class="dot"></span>Built with buildsite.eth · Hosted on IPFS</span>
    </div>
  </div>
</footer>
<script>
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
</body>
</html>`;
}

export function DeFiTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateDeFiHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="DeFi Native Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
