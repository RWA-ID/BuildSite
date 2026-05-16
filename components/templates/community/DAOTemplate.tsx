"use client";
import { ProfileData } from "@/lib/store";

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  vote: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.23"/><path d="M21 5l-9 9-3-3"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h7M9 11h7"/></svg>`,
  vault: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v1M12 15v1M16 12h-1M9 12H8"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
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

function shortAddr(a: string): string {
  if (!a || a.length < 12) return a;
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

export function generateDAOHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const rawName = profileData.daoName || profileData.displayName || ensName;
  const name = escapeHtml(rawName);
  const tagline = escapeHtml(
    profileData.tagline || "Coordinating capital and conviction — onchain, in the open."
  );
  const bio = escapeHtml(
    profileData.bio || "A decentralized organization governed by its members. Every decision is a proposal, every proposal is a signal, every signal is recorded onchain."
  );
  const token = escapeHtml(profileData.tokenSymbol || "");
  const tokenMono = token ? `$${token}` : "";
  const snapshotUrl = profileData.snapshotUrl || "";
  const treasuryAddr = profileData.treasuryAddress || "";
  const treasuryShort = treasuryAddr ? shortAddr(treasuryAddr) : "";
  const govUrl = profileData.governanceUrl || "";
  const discordUrl = profileData.discordUrl || "";
  const proposals = escapeHtml(profileData.proposalCount || "0");
  const tw = twitterUrl(profileData.twitter);
  const profileImg = uploadedImages["profileImage"] || "";

  const monogram = (token || rawName.replace(/\.eth$/, "")).slice(0, 3).toUpperCase();

  const connectTiles: Array<{ icon: string; label: string; handle: string; url: string }> = [];
  if (snapshotUrl) connectTiles.push({ icon: SVG.vote, label: "Snapshot", handle: "Vote onchain", url: snapshotUrl });
  if (govUrl) connectTiles.push({ icon: SVG.scroll, label: "Governance", handle: "Forum & proposals", url: govUrl });
  if (discordUrl) connectTiles.push({ icon: SVG.discord, label: "Discord", handle: "Community chat", url: discordUrl });
  if (tw) connectTiles.push({ icon: SVG.twitter, label: "X / Twitter", handle: profileData.twitter || "", url: tw });

  const connectStripHTML = connectTiles.length > 0 ? `
<section id="community" style="padding:64px 0;">
  <div class="container">
    <div class="section-head" style="margin-bottom:24px;">
      <div>
        <div class="section-label">// Community</div>
        <h2 class="section-title" style="font-size:1.5rem;">Where the DAO <span class="ital">deliberates.</span></h2>
      </div>
    </div>
    <div class="connect-strip">
      ${connectTiles.map((t) => `
      <a href="${escapeHtml(t.url)}" class="connect-tile" target="_blank" rel="noopener">
        <div class="connect-icon">${t.icon}</div>
        <div class="connect-info">
          <div class="label">${escapeHtml(t.label)}</div>
          <div class="handle">${escapeHtml(t.handle)}</div>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>` : "";

  const valuesHTML = `
<section id="mission">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Mission &amp; Values</div>
        <h2 class="section-title">Coordination,<br><span class="ital">credibly neutral.</span></h2>
      </div>
      <p class="section-sub">Three principles that guide every proposal, every grant, every treasury allocation.</p>
    </div>
    <div class="values-grid">
      <article class="value-card reveal">
        <div class="value-icon">${SVG.shield}</div>
        <div class="value-num">01</div>
        <h3>Credibly neutral</h3>
        <p>Rules apply to every member equally. No backroom decisions — what's not onchain didn't happen.</p>
      </article>
      <article class="value-card reveal">
        <div class="value-icon">${SVG.vote}</div>
        <div class="value-num">02</div>
        <h3>Member-governed</h3>
        <p>${tokenMono ? `${tokenMono} holders` : "Members"} steer the protocol. Proposals come from the floor, not the founders.</p>
      </article>
      <article class="value-card reveal">
        <div class="value-icon">${SVG.vault}</div>
        <div class="value-num">03</div>
        <h3>Transparent treasury</h3>
        <p>Every transfer, every grant, every contributor stipend is public. Block explorers are our balance sheet.</p>
      </article>
    </div>
  </div>
</section>`;

  const treasuryHTML = treasuryAddr ? `
<section id="treasury">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Treasury</div>
        <h2 class="section-title">A vault, <span class="ital">multisig'd</span> and<br>watched in public.</h2>
      </div>
      <p class="section-sub">The DAO's reserves live onchain. Audit any inflow or outflow with a block explorer.</p>
    </div>
    <div class="treasury-card reveal">
      <div class="treasury-head">
        <div class="treasury-icon">${SVG.vault}</div>
        <div>
          <div class="treasury-label">// Treasury address</div>
          <div class="treasury-title">${name} Treasury</div>
        </div>
        <a href="https://etherscan.io/address/${escapeHtml(treasuryAddr)}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">View on Etherscan ${SVG.arrow}</a>
      </div>
      <div class="treasury-addr">
        <code>${escapeHtml(treasuryAddr)}</code>
        <button class="copy-btn" data-copy="${escapeHtml(treasuryAddr)}" type="button">${SVG.copy}<span>Copy</span></button>
      </div>
      <div class="treasury-stats">
        <div class="tstat"><div class="tstat-num">${proposals}</div><div class="tstat-label">Proposals onchain</div></div>
        <div class="tstat"><div class="tstat-num">${tokenMono || "—"}</div><div class="tstat-label">Governance token</div></div>
        <div class="tstat"><div class="tstat-num">${treasuryShort || "—"}</div><div class="tstat-label">Multisig</div></div>
      </div>
    </div>
  </div>
</section>` : "";

  const governanceHTML = `
<section id="governance">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Governance</div>
        <h2 class="section-title">How decisions<br><span class="ital">actually get made.</span></h2>
      </div>
      <p class="section-sub">Proposals are drafted in the forum, signaled on Snapshot, and executed onchain.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">Anyone can propose. ${tokenMono ? `${tokenMono} holders` : "Members"} signal. Multisig executes. The process is boring on purpose — boring is what you want from coordination infrastructure.</p>
        <div class="gov-flow">
          <div class="flow-step"><span class="flow-num">01</span><div><h4>Discuss</h4><p>Forum thread, snapshot of sentiment, iterate.</p></div></div>
          <div class="flow-step"><span class="flow-num">02</span><div><h4>Propose</h4><p>Formal proposal lands on Snapshot for signaling.</p></div></div>
          <div class="flow-step"><span class="flow-num">03</span><div><h4>Execute</h4><p>If quorum hits, multisig dispatches the transaction.</p></div></div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">// Get involved</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">Have a proposal?</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">Drop into the forum or jump on a community call.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${snapshotUrl ? `<a href="${escapeHtml(snapshotUrl)}" class="plink primary" target="_blank">${SVG.vote} Vote on Snapshot ${SVG.arrow}</a>` : ""}
          ${govUrl ? `<a href="${escapeHtml(govUrl)}" class="plink" target="_blank">${SVG.scroll} Governance forum</a>` : ""}
          ${discordUrl ? `<a href="${escapeHtml(discordUrl)}" class="plink" target="_blank">${SVG.discord} Community Discord</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank">${SVG.twitter} ${escapeHtml(profileData.twitter || "")}</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: rawName,
    alternateName: ensName,
    description: profileData.bio || profileData.tagline,
    url: `https://${ensName}.limo`,
    sameAs: [snapshotUrl, discordUrl, govUrl, tw].filter(Boolean),
  });

  const heroH1 = profileData.tagline
    ? escapeHtml(profileData.tagline)
    : `Coordinating capital<br>and <span class="ital">conviction</span>—<br><span class="name">${escapeHtml(rawName)}</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name}${tokenMono ? ` · ${tokenMono}` : ""} — ${tagline}</title>
<meta name="description" content="${tagline}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${tagline}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#04060d;--bg-1:#0a0f1c;--bg-2:#11182b;--bg-3:#161e36;--line:#1a2238;--line-2:#27314e;--ink:#e8edf7;--ink-2:#a4afc6;--ink-3:#6b7796;--ink-4:#475070;--cyan:#38bdf8;--indigo:#6366f1;--teal:#22d3ee;--amber:#f59e0b;--grad:linear-gradient(135deg,#38bdf8 0%,#6366f1 100%);--grad-soft:linear-gradient(135deg,rgba(56,189,248,.10) 0%,rgba(99,102,241,.10) 100%);--grad-data:linear-gradient(135deg,#22d3ee 0%,#38bdf8 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,rgba(56,189,248,.18),transparent 60%),radial-gradient(ellipse 700px 500px at 88% 22%,rgba(99,102,241,.16),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(34,211,238,.06),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
code{font-family:'JetBrains Mono',monospace}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(4,6,13,.7);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-mono{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:var(--grad);color:#04060d;font-weight:700;font-size:.74rem;letter-spacing:.04em}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--grad) !important;color:#04060d !important;font-weight:600 !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:0 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-banner{position:relative;width:100%;height:120px;overflow:hidden;border-bottom:1px solid var(--line)}
.hero-banner::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,var(--bg) 100%);pointer-events:none}
.hero-inner{padding:64px 0 0;position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(56,189,248,.04);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .name{font-family:'JetBrains Mono',monospace;font-weight:500;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.04em}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--ink-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-sm{padding:8px 14px;font-size:.82rem}
.btn-primary{background:var(--grad);color:#04060d}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(56,189,248,.30)}
.btn-ghost{background:rgba(56,189,248,.05);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(56,189,248,.10);border-color:var(--cyan);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.6rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-num.accent{background:var(--grad-data);-webkit-background-clip:text;background-clip:text;color:transparent}
.stat-label{font-size:.75rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px;font-family:'JetBrains Mono',monospace}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2);display:flex;align-items:center;justify-content:center}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card .token-mono{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:3.6rem;letter-spacing:-.04em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(4,6,13,.85) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-glow{position:absolute;inset:-2px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.4;filter:blur(20px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3);gap:12px}
.profile-meta-row b{color:var(--ink);font-weight:500;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.values-grid{grid-template-columns:1fr}}
.value-card{position:relative;background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px 28px;overflow:hidden;transition:all .25s ease}
.value-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.value-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.value-card:hover::before{opacity:1}
.value-card>*{position:relative;z-index:1}
.value-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(56,189,248,.10);border:1px solid rgba(56,189,248,.25);color:var(--cyan);margin-bottom:24px}
.value-icon svg{width:22px;height:22px}
.value-num{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);letter-spacing:.12em;margin-bottom:8px}
.value-card h3{font-size:1.2rem;font-weight:600;letter-spacing:-.015em;margin-bottom:10px}
.value-card p{color:var(--ink-2);font-size:.96rem;line-height:1.55;text-wrap:pretty}
.connect-strip{display:grid;grid-template-columns:repeat(${Math.max(1, Math.min(connectTiles.length, 4))},1fr);gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--bg-1)}
.connect-tile{display:flex;align-items:center;gap:14px;padding:22px 24px;border-right:1px solid var(--line);text-decoration:none;color:var(--ink);transition:background .2s ease;position:relative}
.connect-tile:last-child{border-right:none}
.connect-tile:hover{background:var(--bg-2)}
.connect-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--bg-3);color:var(--cyan);flex-shrink:0}
.connect-icon svg{width:18px;height:18px}
.connect-info{flex:1;min-width:0}
.connect-info .label{font-size:.75rem;color:var(--ink-3);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em}
.connect-info .handle{font-size:.98rem;font-weight:500;color:var(--ink);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media(max-width:880px){.connect-strip{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.connect-strip{grid-template-columns:1fr}.connect-tile{border-right:none;border-bottom:1px solid var(--line)}}
.treasury-card{background:linear-gradient(135deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:20px;padding:32px;position:relative;overflow:hidden}
.treasury-card::before{content:'';position:absolute;top:-40%;right:-10%;width:380px;height:380px;background:radial-gradient(circle,rgba(56,189,248,.16),transparent 70%);pointer-events:none}
.treasury-head{display:flex;align-items:center;gap:18px;margin-bottom:24px;flex-wrap:wrap;position:relative;z-index:1}
.treasury-icon{width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:12px;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.30);color:var(--cyan);flex-shrink:0}
.treasury-icon svg{width:26px;height:26px}
.treasury-label{font-family:'JetBrains Mono',monospace;font-size:.74rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:4px}
.treasury-title{font-size:1.3rem;font-weight:600;letter-spacing:-.015em}
.treasury-head .btn{margin-left:auto}
.treasury-addr{display:flex;align-items:center;gap:12px;padding:18px 20px;background:rgba(0,0,0,.35);border:1px dashed var(--line-2);border-radius:12px;margin-bottom:24px;position:relative;z-index:1;flex-wrap:wrap}
.treasury-addr code{flex:1;min-width:0;font-size:.92rem;color:var(--cyan);word-break:break-all;letter-spacing:.01em}
.copy-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink-2);border-radius:8px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:.78rem;transition:all .15s ease}
.copy-btn:hover{background:var(--cyan);color:#04060d;border-color:var(--cyan)}
.copy-btn svg{width:14px;height:14px}
.treasury-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--line);position:relative;z-index:1}
.tstat{padding:20px 0;border-right:1px solid var(--line)}
.tstat:last-child{border-right:none}
.tstat-num{font-family:'JetBrains Mono',monospace;font-size:1.4rem;font-weight:600;background:var(--grad-data);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.02em;line-height:1}
.tstat-label{font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px;font-family:'JetBrains Mono',monospace}
@media(max-width:720px){.treasury-stats{grid-template-columns:1fr}.tstat{border-right:none;border-bottom:1px solid var(--line);padding:16px}}
.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.gov-flow{display:grid;gap:14px;margin-top:28px}
.flow-step{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.flow-step:hover{border-color:var(--line-2);transform:translateX(4px)}
.flow-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--cyan);font-weight:600;min-width:32px;padding-top:1px}
.flow-step h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em}
.flow-step p{color:var(--ink-2);font-size:.9rem;line-height:1.5}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(56,189,248,.6),rgba(99,102,241,.6),transparent)}
.plink{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:10px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s ease}
.plink:hover{background:var(--cyan);color:#04060d;border-color:var(--cyan)}
.plink svg{width:14px;height:14px;flex-shrink:0}
.plink.primary{background:var(--grad);color:#04060d;border-color:transparent}
.plink.primary:hover{filter:brightness(1.05);transform:translateY(-1px)}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--cyan)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="nav-mono">${escapeHtml(monogram)}</span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      <a href="#mission">Mission</a>
      ${treasuryAddr ? '<a href="#treasury">Treasury</a>' : ""}
      <a href="#governance">Governance</a>
      ${snapshotUrl ? `<a href="${escapeHtml(snapshotUrl)}" target="_blank" class="nav-cta">Vote on Snapshot</a>` : `<a href="#governance" class="nav-cta">Get involved</a>`}
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="hero-banner"></div>
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>// Onchain Governance${tokenMono ? ` · Token: ${tokenMono}` : ""}</span></div>
        <h1>${heroH1}</h1>
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          ${snapshotUrl ? `<a href="${escapeHtml(snapshotUrl)}" class="btn btn-primary" target="_blank">Vote on Snapshot ${SVG.arrowRight}</a>` : ""}
          ${discordUrl ? `<a href="${escapeHtml(discordUrl)}" class="btn btn-ghost" target="_blank">Join the Discord</a>` : govUrl ? `<a href="${escapeHtml(govUrl)}" class="btn btn-ghost" target="_blank">Read the forum</a>` : ""}
        </div>
        <div class="hero-stats">
          <div class="stat"><div class="stat-num accent">${proposals}</div><div class="stat-label">Proposals</div></div>
          <div class="stat"><div class="stat-num">${tokenMono || "—"}</div><div class="stat-label">Token</div></div>
          <div class="stat"><div class="stat-num">${treasuryAddr ? "onchain" : "—"}</div><div class="stat-label">Treasury</div></div>
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div class="token-mono">${escapeHtml(monogram)}</div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">${tokenMono || "DAO"}</span></div>
        </div>
        <div class="profile-meta">
          ${tokenMono ? `<div class="profile-meta-row"><span>token</span><b>${tokenMono}</b></div>` : ""}
          ${treasuryShort ? `<div class="profile-meta-row"><span>treasury</span><b>${escapeHtml(treasuryShort)}</b></div>` : ""}
          <div class="profile-meta-row"><span>status</span><b style="color:var(--teal)">● governing</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${valuesHTML}
${treasuryHTML}
${governanceHTML}
${connectStripHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="nav-mono">${escapeHtml(monogram)}</span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || profileData.tagline || tagline)}</p>
      </div>
      <div class="foot-col">
        <h5>Governance</h5>
        ${snapshotUrl ? `<a href="${escapeHtml(snapshotUrl)}" target="_blank">Snapshot</a>` : ""}
        ${govUrl ? `<a href="${escapeHtml(govUrl)}" target="_blank">Forum</a>` : ""}
        ${treasuryAddr ? `<a href="https://etherscan.io/address/${escapeHtml(treasuryAddr)}" target="_blank">Treasury</a>` : ""}
      </div>
      <div class="foot-col">
        <h5>Community</h5>
        ${discordUrl ? `<a href="${escapeHtml(discordUrl)}" target="_blank">Discord</a>` : ""}
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank">X / Twitter</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(rawName)} — Governed onchain.</span>
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
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const v = btn.getAttribute('data-copy') || '';
    try { await navigator.clipboard.writeText(v); const s = btn.querySelector('span'); if (s) { const o = s.textContent; s.textContent = 'Copied'; setTimeout(() => { s.textContent = o; }, 1400); } } catch (_) {}
  });
});
</script>
</body>
</html>`;
}

export function DAOTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateDAOHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="DAO Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
