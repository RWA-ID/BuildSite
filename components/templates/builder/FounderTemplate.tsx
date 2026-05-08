"use client";
import { ProfileData } from "@/lib/store";

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  building: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>`,
  chartUp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18M7 14l4-4 4 4 5-5"/></svg>`,
  mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`,
  twitter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  pin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
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

function linkedinUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://www.linkedin.com/in/${h}` : "";
}

function monogram(s: string): string {
  const cleaned = (s || "").trim().replace(/\.eth$/i, "");
  if (!cleaned) return "·";
  const parts = cleaned.split(/[\s\-_·.]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return cleaned.slice(0, 2).toUpperCase();
}

function isInitialism(s: string): boolean {
  const t = (s || "").trim();
  if (!t) return false;
  if (t.length <= 4 && /^[A-Z0-9.&]+$/.test(t)) return true;
  return false;
}

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

export function generateFounderHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const company = escapeHtml(profileData.company || "");
  const companyRaw = profileData.company || "";
  const role = escapeHtml(profileData.role || "Founder & CEO");
  const bio = escapeHtml(
    profileData.bio || "Building the next chapter of an enduring company — quietly, with a small team, and the long view in mind."
  );
  const raised = escapeHtml(profileData.raised || "");
  const investors: string[] = profileData.investors || [];
  const calendarUrl = profileData.calendarUrl || "";
  const email = profileData.email || "";
  const tw = twitterUrl(profileData.twitter);
  const li = linkedinUrl(profileData.linkedin);
  const location = escapeHtml(profileData.location || "");
  const profileImg = uploadedImages["profileImage"] || "";
  const companyLogo = uploadedImages["companyLogo"] || "";

  const companyMono = monogram(companyRaw || profileData.displayName || ensName);
  const eyebrowText = company
    ? `// Founder · Building ${company}`
    : `// Founder · Building in stealth`;

  const pillars = [
    {
      label: "What we're building",
      body: company
        ? `${company} is a focused product company solving a problem its founders lived through. Compounding wins over flashy launches.`
        : "A focused product company solving a problem the founders lived through. Compounding wins over flashy launches.",
    },
    {
      label: "Why now",
      body: "The wedge is real, the market is moving, and the team is small enough to ship without permission. Distribution and trust are the moats — both built one customer at a time.",
    },
    {
      label: "How we operate",
      body: "Senior team, bias to direct ownership, weekly customer calls. Rituals over rules. We measure progress in revenue and the depth of the relationships behind it.",
    },
  ];

  const investorChipsHTML = investors.map((inv) => {
    const v = inv.trim();
    if (!v) return "";
    if (isInitialism(v)) {
      return `<div class="inv-chip inv-logo"><span>${escapeHtml(v)}</span></div>`;
    }
    return `<div class="inv-chip"><span>${escapeHtml(v)}</span></div>`;
  }).filter(Boolean).join("");

  const heroStats = [
    { label: "Stage", value: raised ? "Funded" : "Building" },
    { label: "Role", value: role },
    { label: "Based", value: location || "Remote" },
  ];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: profileData.role || "Founder & CEO",
    description: profileData.bio || "Founder",
    url: `https://${ensName}.limo`,
    worksFor: company
      ? { "@type": "Organization", name: profileData.company }
      : undefined,
    sameAs: [tw, li].filter(Boolean),
  });

  const tagline = profileData.bio
    ? escapeHtml(profileData.bio.slice(0, 160))
    : "Founder building an enduring company.";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — ${role}${company ? ` · ${company}` : ""}</title>
<meta name="description" content="${tagline}">
<meta property="og:title" content="${name}${company ? ` · ${company}` : ""}">
<meta property="og:description" content="${tagline}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#06070b;--bg-1:#0e1018;--bg-2:#141722;--bg-3:#1a1d2a;--line:#23262f;--line-2:#2e3140;--ink:#f4f0e8;--ink-2:#c2bcae;--ink-3:#857d6c;--ink-4:#52503f;--gold:#f5b041;--amber:#fb923c;--ember:#e76f51;--grad:linear-gradient(135deg,#f5b041 0%,#fb923c 100%);--grad-soft:linear-gradient(135deg,rgba(245,176,65,.10) 0%,rgba(251,146,60,.10) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -10%,rgba(245,176,65,.16),transparent 60%),radial-gradient(ellipse 700px 500px at 90% 20%,rgba(251,146,60,.10),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(231,111,81,.06),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.014) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(6,7,11,.7);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.brand-mono{width:28px;height:28px;border-radius:6px;background:var(--bg-2);border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:600;color:var(--gold);letter-spacing:0}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--grad) !important;color:#1a1206 !important;font-weight:600 !important;display:inline-flex !important;align-items:center;gap:6px}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--ink-2)}
.hero h1 .gold{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.company-line{display:inline-flex;align-items:center;gap:12px;color:var(--ink-2);font-size:1.05rem;margin-bottom:18px;padding:8px 14px 8px 8px;border:1px solid var(--line);border-radius:100px;background:var(--bg-1)}
.company-mono{width:30px;height:30px;border-radius:6px;background:var(--bg-2);border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:600;color:var(--gold);overflow:hidden}
.company-mono img{width:100%;height:100%;object-fit:cover}
.company-line b{color:var(--ink);font-weight:500}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--grad);color:#1a1206}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(245,176,65,.25)}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'Space Grotesk',sans-serif;font-size:1.4rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1.1}
.stat-label{font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.12em;margin-top:6px}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:4/5;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(6,7,11,.85) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-glow{position:absolute;inset:-2px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.32;filter:blur(22px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3);gap:12px}
.profile-meta-row b{color:var(--ink);font-weight:500;text-align:right;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:62%}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
.pillars-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.pillars-3{grid-template-columns:1fr}}
.pillar-card{background:var(--bg-1);border:1px solid var(--line);border-radius:14px;padding:26px 24px;transition:all .25s ease;position:relative;overflow:hidden}
.pillar-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--grad);opacity:.5}
.pillar-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.pillar-card .pl-icon{width:36px;height:36px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:18px}
.pillar-card h4{font-size:1.05rem;font-weight:600;letter-spacing:-.01em;margin-bottom:8px}
.pillar-card p{color:var(--ink-2);font-size:.95rem;line-height:1.55;text-wrap:pretty}
.raised-card{background:linear-gradient(135deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:20px;padding:56px 48px;position:relative;overflow:hidden}
.raised-card::before{content:'';position:absolute;top:-40%;right:-10%;width:520px;height:520px;background:radial-gradient(circle,rgba(245,176,65,.16),transparent 70%);pointer-events:none}
.raised-grid{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
@media(max-width:880px){.raised-card{padding:36px 24px}.raised-grid{grid-template-columns:1fr;gap:32px}}
.raised-amt{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.2rem,7vw,5rem);font-weight:600;letter-spacing:-.04em;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.raised-cap{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.15em;margin-top:12px}
.raised-copy h3{font-size:1.4rem;font-weight:600;letter-spacing:-.02em;margin-bottom:10px}
.raised-copy p{color:var(--ink-2);text-wrap:pretty}
.investors-row{margin-top:40px;position:relative;z-index:1}
.investors-row .ilbl{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3);margin-bottom:14px}
.inv-grid{display:flex;flex-wrap:wrap;gap:8px}
.inv-chip{display:inline-flex;align-items:center;padding:10px 16px;border:1px solid var(--line);background:var(--bg-1);border-radius:8px;font-size:.9rem;color:var(--ink);font-weight:500;transition:all .2s ease}
.inv-chip:hover{border-color:var(--gold);color:var(--gold)}
.inv-chip.inv-logo{font-family:'JetBrains Mono',monospace;font-weight:600;letter-spacing:.04em;background:var(--bg-2);border-color:var(--line-2);padding:12px 18px}
.inv-chip.inv-logo:hover{border-color:var(--gold);background:rgba(245,176,65,.06)}
.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-pillars{display:grid;gap:12px;margin-top:28px}
.pillar-row{display:flex;gap:16px;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.pillar-row:hover{border-color:var(--line-2);transform:translateX(4px)}
.pillar-row .num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--ink-3);font-weight:500;min-width:32px;padding-top:1px}
.pillar-row .body h5{font-size:1rem;font-weight:600;letter-spacing:-.01em;margin-bottom:2px}
.pillar-row .body p{color:var(--ink-3);font-size:.88rem}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--grad)}
.plink{display:inline-flex;align-items:center;gap:10px;padding:11px 16px;border-radius:10px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s ease;width:100%;justify-content:flex-start}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary{background:var(--grad);color:#1a1206;border-color:transparent}
.plink.primary:hover{filter:brightness(1.05);transform:translateY(-1px)}
.plink svg{flex-shrink:0}
.plink-list{display:flex;flex-direction:column;gap:10px;margin-top:18px}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--gold)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px var(--gold)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
@media(max-width:480px){.container{padding:0 20px}.nav-inner{padding:14px 20px}section{padding:72px 0}.hero{padding:72px 0 60px}.raised-card{padding:32px 20px}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="brand-mono">${escapeHtml(companyMono)}</span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      ${company ? '<a href="#company">Company</a>' : ""}
      ${raised ? '<a href="#fundraising">Fundraising</a>' : ""}
      <a href="#connect">Connect</a>
      ${calendarUrl ? `<a href="${escapeHtml(calendarUrl)}" class="nav-cta" target="_blank">${SVG.calendar} Book a meeting</a>` : `<a href="#connect" class="nav-cta">${SVG.calendar} Get in touch</a>`}
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>${escapeHtml(eyebrowText)}</span></div>
        <h1>${name},<br><span class="ital gold">${role.split(" ")[0] || "Founder"}</span>${role.split(" ").length > 1 ? ` <span class="ital">${escapeHtml(role.split(" ").slice(1).join(" "))}</span>` : ""}.</h1>
        ${company ? `<div class="company-line"><span class="company-mono">${companyLogo ? `<img src="${escapeHtml(companyLogo)}" alt="${company}">` : escapeHtml(companyMono)}</span><span>at <b>${company}</b></span></div>` : ""}
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          ${calendarUrl ? `<a href="${escapeHtml(calendarUrl)}" class="btn btn-primary" target="_blank">${SVG.calendar} Book a meeting</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="btn btn-ghost">${SVG.mail} Email me ${SVG.arrowRight}</a>` : ""}
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#f5b041,#fb923c);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:3.4rem;font-weight:600;color:#1a1206;letter-spacing:-.04em;">${escapeHtml(monogram(profileData.displayName || ensName))}</div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">${role}</span></div>
        </div>
        <div class="profile-meta">
          ${company ? `<div class="profile-meta-row"><span>company</span><b>${company}</b></div>` : ""}
          <div class="profile-meta-row"><span>role</span><b>${role}</b></div>
          ${location ? `<div class="profile-meta-row"><span>based</span><b>${location}</b></div>` : ""}
          <div class="profile-meta-row"><span>status</span><b style="color:var(--gold)">● ${raised ? "funded · building" : "building"}</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
<section id="company">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — The Company</div>
        <h2 class="section-title">${company ? `Why we're building<br><span class="ital">${company}.</span>` : `What we're<br><span class="ital">building.</span>`}</h2>
      </div>
      <p class="section-sub">A short read on the wedge, the why-now, and how we operate as a team.</p>
    </div>
    <div class="pillars-3">
      ${pillars.map((p) => `
      <article class="pillar-card reveal">
        <div class="pl-icon">${[SVG.building, SVG.chartUp, SVG.calendar][pillars.indexOf(p)]}</div>
        <h4>${escapeHtml(p.label)}</h4>
        <p>${escapeHtml(p.body)}</p>
      </article>`).join("")}
    </div>
  </div>
</section>
${raised ? `
<section id="fundraising">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Fundraising</div>
        <h2 class="section-title">Backed for the<br><span class="ital">long arc.</span></h2>
      </div>
      <p class="section-sub">Capital from operators and funds who index on durability over hype.</p>
    </div>
    <div class="raised-card reveal">
      <div class="raised-grid">
        <div>
          <div class="raised-amt">${raised}</div>
          <div class="raised-cap">Total Raised</div>
        </div>
        <div class="raised-copy">
          <h3>A patient cap table.</h3>
          <p>We picked partners who care about the customer outcome more than the round dynamics. The runway gives us room to compound — without the pressure to optimize for the next headline.</p>
        </div>
      </div>
      ${investorChipsHTML ? `
      <div class="investors-row">
        <div class="ilbl">// Investors</div>
        <div class="inv-grid">${investorChipsHTML}</div>
      </div>` : ""}
    </div>
  </div>
</section>` : ""}
<section id="connect">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 0${raised ? "3" : "2"} — Connect</div>
        <h2 class="section-title">Let's talk —<br><span class="ital">briefly, but well.</span></h2>
      </div>
      <p class="section-sub">A short list of conversations we're open to. The best ones come from people we already share orbit with.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">A focused founder is a founder who says no often. These are the asks where the answer is most likely yes.</p>
        <div class="partner-pillars">
          <div class="pillar-row"><div class="num">01</div><div class="body"><h5>Investors</h5><p>${raised ? "Strategic operators for follow-ons, not new leads right now." : "Pre-seed and seed conversations with operator-led funds."}</p></div></div>
          <div class="pillar-row"><div class="num">02</div><div class="body"><h5>Press</h5><p>Long-form interviews and analyst conversations welcome.</p></div></div>
          <div class="pillar-row"><div class="num">03</div><div class="body"><h5>Hiring</h5><p>Senior product, engineering, and GTM. Prior founders especially.</p></div></div>
          <div class="pillar-row"><div class="num">04</div><div class="body"><h5>Partnerships</h5><p>Distribution and integrations where we can both compound.</p></div></div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:18px;">
          <div class="section-label" style="margin-bottom:6px;">// Direct</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">Reach out.</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">Pick the channel that fits — I read all of them.</p>
        </div>
        <div class="plink-list">
          ${calendarUrl ? `<a href="${escapeHtml(calendarUrl)}" class="plink primary" target="_blank">${SVG.calendar} Book a meeting ${SVG.arrow}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank">${SVG.twitter} ${escapeHtml(profileData.twitter || "Twitter")}</a>` : ""}
          ${li ? `<a href="${escapeHtml(li)}" class="plink" target="_blank">${SVG.linkedin} LinkedIn</a>` : ""}
          ${location ? `<div class="plink" style="cursor:default;">${SVG.pin} ${location}</div>` : ""}
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
        <div class="nav-brand" style="margin-bottom:16px;"><span class="brand-mono">${escapeHtml(companyMono)}</span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || "Founder building an enduring company.")}</p>
      </div>
      <div class="foot-col">
        <h5>Sections</h5>
        ${company ? '<a href="#company">The Company</a>' : ""}
        ${raised ? '<a href="#fundraising">Fundraising</a>' : ""}
        <a href="#connect">Connect</a>
      </div>
      <div class="foot-col">
        <h5>Direct</h5>
        ${calendarUrl ? `<a href="${escapeHtml(calendarUrl)}" target="_blank">Book a meeting</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank">Twitter / X</a>` : ""}
        ${li ? `<a href="${escapeHtml(li)}" target="_blank">LinkedIn</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${name}${company ? ` · ${company}` : ""} — Building for the long arc.</span>
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

export function FounderTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateFounderHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Founder Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
