"use client";
import { ProfileData } from "@/lib/store";
import { OPENSEA_SVG, GRAILS_SVG, EFP_PNG_B64 } from "./portfolioLogos";

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  diamond: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2L4 9l8 13 8-13z"/><path d="M4 9h16M12 2v20"/></svg>`,
  chain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg>`,
  vault: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v6M9 12h6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  farcaster: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 2h17v3.4h-2v13.2h1.6V22h-6.6v-3.4h1.6v-5.7c0-2.7-2.2-4.9-4.9-4.9s-4.9 2.2-4.9 4.9v5.7H7v3.4H.4v-3.4H2V5.4H0V2h3.5z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  lens: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 14c-2.5 0-4.7-1.2-6.1-3 0-2 4.1-3.1 6.1-3.1s6.1 1.1 6.1 3.1c-1.4 1.8-3.6 3-6.1 3z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
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
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://x.com/${h}` : "";
}

function farcasterUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://warpcast.com/${h}` : "";
}

function lensUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").replace(/\.lens$/, "").trim();
  return h ? `https://hey.xyz/u/${h}` : "";
}

function githubUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://github.com/${h}` : "";
}

function telegramUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://t.me/${h}` : "";
}

const CHAIN_DESC: Record<string, string> = {
  mainnet: "Settlement layer — primary identity & ENS resolution.",
  ethereum: "Settlement layer — primary identity & ENS resolution.",
  base: "Coinbase L2 — fast, cheap, where the social layer lives.",
  optimism: "OP Stack — public goods, RetroPGF, governance.",
  arbitrum: "Nitro rollup — DeFi-heavy execution.",
  linea: "ConsenSys zkEVM — ENS-aligned scaling.",
  polygon: "PoS chain — broad app distribution.",
  zora: "Creator-first L2 — onchain media & NFTs.",
  scroll: "Native zkEVM — cryptographic settlement.",
  blast: "Native yield L2 — leverage-first apps.",
  zksync: "ZK Stack — account-abstraction native.",
  starknet: "Cairo zkRollup — proof-system frontier.",
};

function describeChain(chain: string): string {
  const k = chain.toLowerCase().trim();
  return CHAIN_DESC[k] || "Active node — bridging, signing, building.";
}

export function generateENSMaxiHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const bio = escapeHtml(
    profileData.bio || "An ENS maxi — building identity onchain, one name at a time."
  );
  const profileImg = uploadedImages["profileImage"] || "";
  const chains: string[] = (profileData.chains || []).filter(Boolean);

  const tw = twitterUrl(profileData.twitter);
  const fc = farcasterUrl(profileData.farcaster);
  const ln = lensUrl(profileData.lens);
  const gh = githubUrl(profileData.github);
  const tg = telegramUrl(profileData.telegram);
  const efp = profileData.efpProfile || "";
  const efpUrl = efp ? (efp.startsWith("http") ? efp : `https://efp.app/${efp}`) : `https://efp.app/${ensName}`;

  const ensAppUrl = `https://app.ens.domains/${ensName}`;
  const primaryChain = chains[0] || "Mainnet";
  const subnames: string[] = (profileData.subdomains || []).filter(Boolean);
  const hasSubnames = subnames.length > 0;
  const donateAddress = (profileData.donateAddress || "").trim();
  const openseaUrl = (profileData.openseaUrl || "").trim();
  const grailsUrl = (profileData.grailsUrl || "").trim();
  const featuredNames = (profileData.featuredNames || [])
    .map((n) => n.trim().toLowerCase())
    .filter((n) => n.length > 0);
  const portfolioLinks = [
    openseaUrl ? { brand: "opensea", url: openseaUrl, label: "OpenSea", logo: OPENSEA_SVG } : null,
    grailsUrl ? { brand: "grails", url: grailsUrl, label: "Grails", logo: GRAILS_SVG } : null,
    { brand: "efp", url: efpUrl, label: "EFP", logo: `<img src="data:image/png;base64,${EFP_PNG_B64}" alt="Ethereum Follow Protocol" />` },
  ].filter(Boolean) as { brand: string; url: string; label: string; logo: string }[];
  const sponsors: { name: string }[] = profileData.sponsors || [];
  const sponsorEntries = sponsors
    .map((s, i) => ({
      name: (s?.name || "").trim(),
      logo: uploadedImages[`sponsorLogo${i}`] || "",
    }))
    .filter((s) => s.name.length > 0);

  const hasFollowAction = !!(fc || tw);
  const followHref = fc || tw;

  const navHtml = `
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="diamond">${SVG.diamond}</span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      <a href="#namespace">Namespace</a>
      ${chains.length > 0 ? '<a href="#chains">Chains</a>' : ""}
      <a href="#social">Social graph</a>
      <a href="${escapeHtml(ensAppUrl)}" target="_blank" rel="noopener" class="nav-cta">View on app.ens ${SVG.arrow}</a>
    </div>
  </div>
</nav>`;

  const heroStats = [
    { label: hasSubnames ? "Subnames" : "Tip ENS", value: hasSubnames ? String(subnames.length) : (donateAddress || ensName) },
    { label: "Active chains", value: String(chains.length || 1) },
    { label: "Onchain", value: "∞" },
  ];

  const chainCards = chains.length > 0 ? `
<section id="chains">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Active across chains</div>
        <h2 class="section-title">One identity,<br><span class="ital">every network.</span></h2>
      </div>
      <p class="section-sub">My ENS resolves the same wallet across L1 and every rollup that matters.</p>
    </div>
    <div class="chain-grid">
      ${chains.map((c, i) => `
      <div class="chain-card reveal">
        <div class="chain-card-head">
          <div class="chain-icon">${SVG.chain}</div>
          <div class="chain-num">${String(i + 1).padStart(2, "0")}</div>
        </div>
        <div class="chain-name">${escapeHtml(c)}</div>
        <p class="chain-desc">${escapeHtml(describeChain(c))}</p>
        <div class="chain-status"><span class="dot"></span>resolving</div>
      </div>`).join("")}
    </div>
  </div>
</section>` : "";

  const socialPillars = [
    { name: "Farcaster", icon: SVG.farcaster, handle: profileData.farcaster || "", url: fc, hint: "Decentralized social — onchain casts." },
    { name: "EFP", icon: SVG.diamond, handle: ensName, url: efpUrl, hint: "Ethereum Follow Protocol — graph onchain." },
    { name: "Lens", icon: SVG.lens, handle: profileData.lens || "", url: ln, hint: "Lens Protocol — own your social graph." },
    { name: "X / Twitter", icon: SVG.twitter, handle: profileData.twitter || "", url: tw, hint: "Where the timeline still happens." },
  ];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    description: profileData.bio || "ENS-native onchain identity.",
    url: `https://${ensName}.limo`,
    sameAs: [tw, fc, ln, gh, tg, efpUrl, ensAppUrl].filter(Boolean),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — ${escapeHtml(ensName)}</title>
<meta name="description" content="${escapeHtml(profileData.bio || `${ensName} — onchain identity, one name across every chain.`)}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${escapeHtml(profileData.bio || `${ensName} — ENS-native identity.`)}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#070815;--bg-1:#0d0f1c;--bg-2:#141832;--bg-3:#1c2244;--line:#1f2547;--line-2:#2c3463;--ink:#f4f5fb;--ink-2:#b8bdd9;--ink-3:#7177a3;--ink-4:#4a4f7a;--blue:#5b8def;--violet:#8b5cf6;--pink:#f472b6;--grad:linear-gradient(135deg,#5b8def 0%,#8b5cf6 100%);--grad-soft:linear-gradient(135deg,rgba(91,141,239,.14) 0%,rgba(139,92,246,.14) 100%);--grad-pink:linear-gradient(135deg,#8b5cf6 0%,#f472b6 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,rgba(91,141,239,.22),transparent 60%),radial-gradient(ellipse 700px 500px at 88% 20%,rgba(139,92,246,.18),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(244,114,182,.07),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(7,8,21,.7);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .diamond{width:18px;height:18px;color:var(--blue);display:inline-flex;align-items:center;justify-content:center}
.nav-brand .diamond svg{width:100%;height:100%}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease;display:inline-flex;align-items:center;gap:6px}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--grad) !important;color:var(--ink) !important;font-weight:600 !important}
.nav-cta svg{width:12px;height:12px}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--blue);box-shadow:0 0 10px var(--blue);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .name{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.02em;padding-right:.05em}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--ink-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--grad);color:var(--ink)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(139,92,246,.35)}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--blue);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.6rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.75rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card .ens-art{width:100%;height:100%;background:linear-gradient(135deg,#5b8def,#8b5cf6 60%,#f472b6);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.92);font-family:'Instrument Serif',serif;font-style:italic;font-size:2rem;letter-spacing:-.02em;padding:20px;text-align:center;text-wrap:balance}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(7,8,21,.85) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-badge{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:10px;background:rgba(7,8,21,.55);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;color:var(--ink);z-index:3;border:1px solid rgba(255,255,255,.12)}
.profile-badge svg{width:18px;height:18px}
.profile-glow{position:absolute;inset:-3px;border-radius:23px;background:var(--grad);z-index:-1;opacity:.45;filter:blur(22px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3)}
.profile-meta-row b{color:var(--ink);font-weight:500}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
.namespace-card{position:relative;padding:64px 48px;background:linear-gradient(135deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:24px;overflow:hidden}
.namespace-card::before{content:'';position:absolute;top:-30%;left:-10%;width:520px;height:520px;background:radial-gradient(circle,rgba(91,141,239,.18),transparent 70%);pointer-events:none}
.namespace-card::after{content:'';position:absolute;bottom:-30%;right:-10%;width:520px;height:520px;background:radial-gradient(circle,rgba(139,92,246,.18),transparent 70%);pointer-events:none}
.namespace-inner{position:relative;z-index:1}
.namespace-name{font-family:'Instrument Serif',serif;font-style:italic;font-size:clamp(2.4rem,7vw,5.2rem);font-weight:400;letter-spacing:-.025em;line-height:1;margin-bottom:32px;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;text-wrap:balance;word-break:break-word}
.namespace-sub{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:18px}
.subname-list{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
@media(max-width:720px){.subname-list{grid-template-columns:1fr}.namespace-card{padding:40px 24px}}
.support-card{display:flex;flex-direction:column;gap:24px;padding:32px;border:1px solid var(--line);border-radius:16px;background:var(--bg-2)}
.support-head{display:flex;gap:18px;align-items:flex-start}
.support-icon{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--grad);color:#fff;flex-shrink:0;box-shadow:0 0 24px rgba(91,141,239,.35)}
.support-icon svg{width:22px;height:22px}
.support-title{font-size:1.35rem;font-weight:600;letter-spacing:-.015em;margin-bottom:4px}
.support-desc{color:var(--ink-2);font-size:.96rem;line-height:1.55;text-wrap:pretty}
.support-addr{padding:18px 20px;border:1px dashed var(--line-2);border-radius:12px;background:rgba(255,255,255,.02)}
.support-addr-label{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.14em;margin-bottom:6px}
.support-addr-value{font-family:'JetBrains Mono',monospace;font-size:.95rem;color:var(--ink);word-break:break-all}
.support-actions{display:flex;gap:10px;flex-wrap:wrap}
.portfolio-strip{padding:48px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.02),transparent)}
.portfolio-head{display:flex;align-items:baseline;gap:16px;margin-bottom:20px;flex-wrap:wrap}
.portfolio-sub{color:var(--ink-3);font-size:.92rem}
.portfolio-row{display:flex;gap:14px;flex-wrap:wrap}
.portfolio-pill{display:inline-flex;align-items:center;gap:14px;padding:12px 18px;border-radius:14px;border:1px solid var(--line-2);background:var(--bg-2);color:var(--ink);text-decoration:none;transition:transform .2s ease,border-color .2s ease,background .2s ease;min-height:56px}
.portfolio-pill:hover{transform:translateY(-2px);border-color:var(--blue);background:var(--bg-3)}
.portfolio-logo{display:inline-flex;align-items:center;justify-content:center;height:28px}
.portfolio-logo svg{height:28px;width:auto;display:block}
.portfolio-logo img{height:28px;width:auto;display:block;border-radius:6px}
.portfolio-grails .portfolio-logo svg{filter:invert(1) brightness(1.1)}
.portfolio-name{font-family:'JetBrains Mono',monospace;font-size:.86rem;font-weight:500;letter-spacing:.01em;color:var(--ink-2)}
.portfolio-arrow{color:var(--ink-3);display:inline-flex}
.portfolio-pill:hover .portfolio-arrow{color:var(--ink)}
.featured-names{padding:96px 0;border-top:1px solid var(--line)}
.name-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
.name-card{display:flex;flex-direction:column;gap:10px;padding:22px;border:1px solid var(--line);border-radius:14px;background:var(--bg-1);color:var(--ink);text-decoration:none;transition:transform .2s ease,border-color .2s ease,background .2s ease}
.name-card:hover{transform:translateY(-3px);border-color:var(--blue);background:var(--bg-2)}
.name-card-label{font-family:'JetBrains Mono',monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.18em;color:var(--ink-3)}
.name-card-value{font-family:'JetBrains Mono',monospace;font-size:1.05rem;font-weight:500;color:var(--ink);word-break:break-all;letter-spacing:-.01em}
.name-card-foot{display:flex;align-items:center;justify-content:space-between;margin-top:6px;font-size:.78rem;color:var(--ink-3);font-family:'JetBrains Mono',monospace;letter-spacing:.04em}
.name-card:hover .name-card-foot{color:var(--ink-2)}
.sponsor-strip{padding:36px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.015),transparent)}
.sponsor-strip-inner{display:flex;flex-direction:column;align-items:center;gap:18px}
.sponsor-label{font-family:'JetBrains Mono',monospace;font-size:.74rem;text-transform:uppercase;letter-spacing:.18em;color:var(--ink-3)}
.sponsor-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:32px}
.sponsor-item{display:flex;align-items:center;gap:10px;color:var(--ink-2);font-size:.95rem;font-weight:500;opacity:.85;transition:opacity .2s}
.sponsor-item:hover{opacity:1;color:var(--ink)}
.sponsor-logo{height:32px;width:auto;max-width:120px;object-fit:contain;filter:brightness(0.96) saturate(1.05)}
.sponsor-name{font-family:'Space Grotesk',sans-serif}
@media(max-width:600px){.sponsor-row{gap:22px}.sponsor-logo{height:24px;max-width:96px}}
.subname{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:rgba(7,8,21,.45);font-family:'JetBrains Mono',monospace;font-size:.92rem;color:var(--ink);transition:all .2s ease}
.subname:hover{border-color:var(--blue);transform:translateX(3px)}
.subname-icon{width:30px;height:30px;border-radius:8px;background:var(--bg-3);display:flex;align-items:center;justify-content:center;color:var(--blue);flex-shrink:0}
.subname-icon svg{width:15px;height:15px}
.subname-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.chain-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
@media(max-width:880px){.chain-grid{grid-template-columns:1fr}}
.chain-card{position:relative;padding:28px;border:1px solid var(--line);border-radius:16px;background:var(--bg-1);transition:all .25s ease;overflow:hidden}
.chain-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.chain-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.chain-card:hover::before{opacity:1}
.chain-card>*{position:relative;z-index:1}
.chain-card-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.chain-icon{width:40px;height:40px;border-radius:10px;background:var(--bg-3);display:flex;align-items:center;justify-content:center;color:var(--blue);border:1px solid var(--line-2)}
.chain-icon svg{width:20px;height:20px}
.chain-num{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);letter-spacing:.08em}
.chain-name{font-family:'Instrument Serif',serif;font-style:italic;font-size:1.55rem;font-weight:400;letter-spacing:-.015em;margin-bottom:8px;color:var(--ink);text-transform:capitalize}
.chain-desc{color:var(--ink-2);font-size:.95rem;line-height:1.55;margin-bottom:18px;text-wrap:pretty}
.chain-status{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.74rem;text-transform:uppercase;letter-spacing:.1em;color:var(--blue);padding:5px 11px;border-radius:6px;background:rgba(91,141,239,.1);border:1px solid rgba(91,141,239,.25)}
.chain-status .dot{width:6px;height:6px;border-radius:50%;background:var(--blue);box-shadow:0 0 6px var(--blue);animation:pulse 2.4s ease-in-out infinite}
.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-pillars{display:grid;gap:14px;margin-top:28px}
.pillar{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease;text-decoration:none;color:inherit}
.pillar:hover{border-color:var(--blue);transform:translateX(4px)}
.pillar-icon{width:36px;height:36px;border-radius:8px;background:var(--bg-3);color:var(--ink);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.pillar-icon svg{width:18px;height:18px}
.pillar-body{flex:1;min-width:0}
.pillar-body h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em;display:flex;align-items:center;gap:10px;justify-content:space-between}
.pillar-body h4 .handle{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);font-weight:500}
.pillar-body p{color:var(--ink-3);font-size:.88rem;line-height:1.5}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(91,141,239,.7),rgba(139,92,246,.7),rgba(244,114,182,.5),transparent)}
.plink{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.88rem;font-weight:500;transition:all .18s ease;width:100%;justify-content:space-between}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink svg{width:14px;height:14px}
.plink.primary{background:var(--grad);color:var(--ink);border-color:transparent}
.plink.primary:hover{background:transparent;color:var(--ink);border-color:var(--blue);box-shadow:0 8px 24px rgba(139,92,246,.3)}
.plink-row{display:flex;align-items:center;gap:10px;min-width:0}
.plink-row .plink-icon{width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.plink-row .plink-handle{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--blue);box-shadow:0 0 8px var(--blue)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>
${navHtml}
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>// Onchain identity · ENS native</span></div>
        <h1>I am <span class="name">${escapeHtml(ensName)}</span></h1>
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          <a href="${escapeHtml(ensAppUrl)}" class="btn btn-primary" target="_blank" rel="noopener">View on app.ens ${SVG.arrowRight}</a>
          ${hasFollowAction ? `<a href="${escapeHtml(followHref)}" class="btn btn-ghost" target="_blank" rel="noopener">${fc ? "Follow on Farcaster" : "Follow on X"}</a>` : `<a href="${escapeHtml(efpUrl)}" class="btn btn-ghost" target="_blank" rel="noopener">Follow on EFP</a>`}
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div class="ens-art">${escapeHtml(ensName)}</div>`}
          <div class="profile-badge">${SVG.diamond}</div>
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">ENS maxi</span></div>
        </div>
        <div class="profile-meta">
          <div class="profile-meta-row"><span>chain</span><b>${escapeHtml(primaryChain)}</b></div>
          <div class="profile-meta-row"><span>subnames</span><b>${subnames.length}</b></div>
          <div class="profile-meta-row"><span>status</span><b style="color:var(--blue)">● resolving</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
<section id="namespace">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — My namespace</div>
        <h2 class="section-title">One name,<br><span class="ital">a whole personal protocol.</span></h2>
      </div>
      <p class="section-sub">${escapeHtml(ensName)} is the root. Subnames extend it into payments, vaults, agents, and more.</p>
    </div>
    <div class="namespace-card reveal">
      <div class="namespace-inner">
        <div class="namespace-sub">// root name</div>
        <div class="namespace-name">${escapeHtml(ensName)}</div>
        ${hasSubnames ? `
        <div class="namespace-sub">// my subnames</div>
        <div class="subname-list">
          ${subnames.map((s) => `
          <div class="subname">
            <div class="subname-icon">${SVG.chain}</div>
            <span class="subname-text">${escapeHtml(s)}</span>
          </div>`).join("")}
        </div>` : `
        <div class="namespace-sub">// support &amp; tip</div>
        <div class="support-card">
          <div class="support-head">
            <div class="support-icon">${SVG.diamond}</div>
            <div>
              <div class="support-title">Tip ${escapeHtml(ensName)}</div>
              <div class="support-desc">Send ETH or any token to my ENS — straight onchain, no middleman.</div>
            </div>
          </div>
          <div class="support-addr">
            <div class="support-addr-label">// send to</div>
            <div class="support-addr-value">${escapeHtml(donateAddress || ensName)}</div>
          </div>
          <div class="support-actions">
            <a href="${escapeHtml(`https://app.ens.domains/${donateAddress || ensName}`)}" target="_blank" rel="noopener" class="btn btn-primary">Open in ENS app ${SVG.arrow}</a>
          </div>
        </div>`}
      </div>
    </div>
  </div>
</section>
${portfolioLinks.length > 0 ? `
<section class="portfolio-strip">
  <div class="container">
    <div class="portfolio-head reveal">
      <div class="section-label">// Portfolio</div>
      <p class="portfolio-sub">Where my ENS names live onchain.</p>
    </div>
    <div class="portfolio-row reveal">
      ${portfolioLinks.map((p) => `
      <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener" class="portfolio-pill portfolio-${p.brand}" aria-label="${escapeHtml(p.label)}">
        <span class="portfolio-logo">${p.logo}</span>
        <span class="portfolio-name">${escapeHtml(p.label)}</span>
        <span class="portfolio-arrow">${SVG.arrow}</span>
      </a>`).join("")}
    </div>
  </div>
</section>` : ""}
${featuredNames.length > 0 ? `
<section class="featured-names">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// Featured names</div>
        <h2 class="section-title">My ENS<br><span class="ital">portfolio.</span></h2>
      </div>
      <p class="section-sub">A few names from my collection. Each one is its own onchain identity.</p>
    </div>
    <div class="name-grid">
      ${featuredNames.map((n) => `
      <a href="${escapeHtml(`https://grails.app/${n}`)}" target="_blank" rel="noopener" class="name-card reveal">
        <div class="name-card-label">// name</div>
        <div class="name-card-value">${escapeHtml(n)}</div>
        <div class="name-card-foot"><span>View on Grails</span>${SVG.arrow}</div>
      </a>`).join("")}
    </div>
  </div>
</section>` : ""}
${sponsorEntries.length > 0 ? `
<section class="sponsor-strip">
  <div class="container">
    <div class="sponsor-strip-inner reveal">
      <div class="sponsor-label">// Sponsored by</div>
      <div class="sponsor-row">
        ${sponsorEntries.map((s) => `
        <div class="sponsor-item">
          ${s.logo ? `<img src="${escapeHtml(s.logo)}" alt="${escapeHtml(s.name)}" class="sponsor-logo">` : ""}
          <span class="sponsor-name">${escapeHtml(s.name)}</span>
        </div>`).join("")}
      </div>
    </div>
  </div>
</section>` : ""}
${chainCards}
<section id="social">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 0${chains.length > 0 ? "3" : "2"} — The social graph</div>
        <h2 class="section-title">Onchain &amp; offchain,<br><span class="ital">all roads lead here.</span></h2>
      </div>
      <p class="section-sub">My social graph isn&#39;t locked in any platform — it follows my ENS wherever I go.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">Follow me anywhere. Each handle below is a different network — but it&#39;s all the same identity. ENS makes them composable.</p>
        <div class="partner-pillars">
          ${socialPillars.map((p) => {
            const has = !!p.url;
            const inner = `
            <div class="pillar-icon">${p.icon}</div>
            <div class="pillar-body">
              <h4><span>${escapeHtml(p.name)}</span><span class="handle">${escapeHtml(p.handle || "—")}</span></h4>
              <p>${escapeHtml(p.hint)}</p>
            </div>`;
            return has
              ? `<a class="pillar" href="${escapeHtml(p.url)}" target="_blank" rel="noopener">${inner}</a>`
              : `<div class="pillar" style="opacity:.6;">${inner}</div>`;
          }).join("")}
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">// Quick links</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">Reach me anywhere.</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">Pick a network — it all maps back to ${escapeHtml(ensName)}.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="${escapeHtml(ensAppUrl)}" class="plink primary" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.diamond}</span><span class="plink-handle">app.ens.domains/${escapeHtml(ensName)}</span></span>${SVG.arrow}</a>
          <a href="${escapeHtml(efpUrl)}" class="plink" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.shield}</span><span class="plink-handle">EFP profile</span></span>${SVG.arrow}</a>
          ${fc ? `<a href="${escapeHtml(fc)}" class="plink" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.farcaster}</span><span class="plink-handle">${escapeHtml(profileData.farcaster || "Farcaster")}</span></span>${SVG.arrow}</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.twitter}</span><span class="plink-handle">${escapeHtml(profileData.twitter || "X / Twitter")}</span></span>${SVG.arrow}</a>` : ""}
          ${ln ? `<a href="${escapeHtml(ln)}" class="plink" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.lens}</span><span class="plink-handle">${escapeHtml(profileData.lens || "Lens")}</span></span>${SVG.arrow}</a>` : ""}
          ${gh ? `<a href="${escapeHtml(gh)}" class="plink" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.github}</span><span class="plink-handle">${escapeHtml(profileData.github || "GitHub")}</span></span>${SVG.arrow}</a>` : ""}
          ${tg ? `<a href="${escapeHtml(tg)}" class="plink" target="_blank" rel="noopener"><span class="plink-row"><span class="plink-icon">${SVG.telegram}</span><span class="plink-handle">${escapeHtml(profileData.telegram || "Telegram")}</span></span>${SVG.arrow}</a>` : ""}
          ${profileData.email ? `<a href="mailto:${escapeHtml(profileData.email)}" class="plink"><span class="plink-row"><span class="plink-icon">${SVG.vault}</span><span class="plink-handle">${escapeHtml(profileData.email)}</span></span>${SVG.arrow}</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="diamond">${SVG.diamond}</span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || `${ensName} — one name, every chain. Built ENS-first.`)}</p>
      </div>
      <div class="foot-col">
        <h5>Namespace</h5>
        <a href="${escapeHtml(ensAppUrl)}" target="_blank" rel="noopener">app.ens.domains</a>
        <a href="${escapeHtml(efpUrl)}" target="_blank" rel="noopener">EFP profile</a>
        <a href="https://${escapeHtml(ensName)}.limo" target="_blank" rel="noopener">${escapeHtml(ensName)}.limo</a>
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${fc ? `<a href="${escapeHtml(fc)}" target="_blank" rel="noopener">Farcaster</a>` : ""}
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">X / Twitter</a>` : ""}
        ${ln ? `<a href="${escapeHtml(ln)}" target="_blank" rel="noopener">Lens</a>` : ""}
        ${gh ? `<a href="${escapeHtml(gh)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${tg ? `<a href="${escapeHtml(tg)}" target="_blank" rel="noopener">Telegram</a>` : ""}
        ${profileData.email ? `<a href="mailto:${escapeHtml(profileData.email)}">${escapeHtml(profileData.email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(ensName)} — ENS-native, chain-agnostic.</span>
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
// Hash-anchor clicks: scroll inside the document instead of letting the
// browser navigate (prevents in-iframe srcdoc previews from bouncing to the
// embedder URL on Safari/Chrome).
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
</script>
</body>
</html>`;
}

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

export function ENSMaxiTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateENSMaxiHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="ENS Maxi Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
