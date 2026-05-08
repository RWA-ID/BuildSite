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
  github: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  branch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  fork: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></svg>`,
  pkg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
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
  if (!h) return "";
  return h.startsWith("http") ? h : `https://x.com/${h}`;
}

function telegramUrl(handle: string | undefined): string {
  if (!handle) return "";
  const h = handle.replace(/^@/, "").trim();
  if (!h) return "";
  return h.startsWith("http") ? h : `https://t.me/${h}`;
}

function linkedinUrl(handle: string | undefined): string {
  if (!handle) return "";
  const h = handle.trim();
  if (!h) return "";
  return h.startsWith("http") ? h : `https://www.linkedin.com/in/${h.replace(/^@/, "")}`;
}

export function generateBuilderHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const rawBio = profileData.bio || "Open-source engineer building tools and primitives in public.";
  const bio = escapeHtml(rawBio);
  const gh = (profileData.githubUsername || "").replace(/^@/, "").trim();
  const ghUrl = gh ? `https://github.com/${gh}` : "";
  const tech: string[] = (profileData.techStack || []).filter(Boolean);
  const profileImg = uploadedImages["profileImage"] || "";

  const tw = twitterUrl(profileData.twitter);
  const li = linkedinUrl(profileData.linkedin);
  const tg = telegramUrl(profileData.telegram);
  const email = profileData.email || "";

  const primaryStack = tech[0] || "Polyglot";
  const langCount = tech.length;

  // Split tech stack into 3 buckets if 6+ items: Languages / Frameworks / Tools
  const split = (() => {
    if (tech.length < 6) return [{ label: "Stack", items: tech }];
    const a = Math.ceil(tech.length / 3);
    const b = Math.ceil((tech.length * 2) / 3);
    return [
      { label: "Languages", items: tech.slice(0, a) },
      { label: "Frameworks", items: tech.slice(a, b) },
      { label: "Tools", items: tech.slice(b) },
    ];
  })();

  const heroStats = [
    { label: "Years coding", value: "5+" },
    { label: "Repos", value: gh ? "↗ live" : "open" },
    { label: "Languages", value: langCount > 0 ? String(langCount) : "—" },
  ];

  // Synth principles from bio keywords with sensible defaults
  const principles = [
    {
      title: "Read the source",
      body: "Frameworks lie. Source files don't. Every fix begins with the code that ships.",
    },
    {
      title: "Ship small, ship often",
      body: "Tight feedback loops compound. Small commits, real users, fast iteration.",
    },
    {
      title: "Open by default",
      body: "If it can be public, it should be. Public artifacts attract contributors and accountability.",
    },
  ];

  const placeholderRepos = gh
    ? [
        { slug: `${gh}/cli`, lang: tech[0] || "TypeScript", desc: "Personal command-line toolkit." },
        { slug: `${gh}/lab`, lang: tech[1] || tech[0] || "Rust", desc: "Experiments and small libraries." },
        { slug: `${gh}/notes`, lang: "Markdown", desc: "Working notes and write-ups." },
      ]
    : [];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: "Software Engineer",
    description: rawBio,
    url: `https://${ensName}.limo`,
    sameAs: [ghUrl, tw, li, tg].filter(Boolean),
  });

  const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Builder · ${escapeHtml(ensName)}</title>
<meta name="description" content="${escapeHtml(rawBio.slice(0, 160))}">
<meta property="og:title" content="${name} — Builder">
<meta property="og:description" content="${escapeHtml(rawBio.slice(0, 160))}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${escapeHtml(ensName)}.limo">
${profileImg ? `<meta property="og:image" content="${escapeHtml(profileImg)}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
${fontLink}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#06080c;--bg-1:#0c0f17;--bg-2:#131826;--bg-3:#1b2233;--line:#1c2233;--line-2:#2a3247;--ink:#e8edf5;--ink-2:#a8b1c3;--ink-3:#6b7488;--ink-4:#454c61;--cyan:#22d3ee;--blue:#3b82f6;--violet:#818cf8;--green:#34d399;--grad:linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%);--grad-soft:linear-gradient(135deg,rgba(34,211,238,.10) 0%,rgba(59,130,246,.10) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,rgba(34,211,238,.16),transparent 60%),radial-gradient(ellipse 700px 500px at 88% 20%,rgba(59,130,246,.14),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(129,140,248,.07),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.mono{font-family:'JetBrains Mono',ui-monospace,Menlo,monospace}
.ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em;color:var(--ink-2)}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(6,8,12,.7);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em;color:var(--ink-2)}
.nav-brand b{color:var(--ink);font-weight:500}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease;font-family:'JetBrains Mono',monospace}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--ink) !important;color:var(--bg) !important;font-weight:600 !important;display:inline-flex;align-items:center;gap:6px}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}

.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .name{font-family:'JetBrains Mono',monospace;font-weight:500;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.04em}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--ink);color:var(--bg)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(34,211,238,.18)}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.6rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.75rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px;font-family:'JetBrains Mono',monospace}

.profile-frame{position:relative;width:300px;flex-shrink:0}
.profile-card{position:relative;width:100%;border-radius:14px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-1);box-shadow:0 30px 80px rgba(0,0,0,.5)}
.term-bar{display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--bg-2);border-bottom:1px solid var(--line)}
.term-dot{width:10px;height:10px;border-radius:50%;background:var(--ink-4)}
.term-dot.r{background:#ff5f57}
.term-dot.y{background:#febc2e}
.term-dot.g{background:#28c840}
.term-title{margin-left:auto;font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink-3);letter-spacing:.04em}
.profile-photo{width:100%;aspect-ratio:1;background:var(--bg-2);position:relative}
.profile-photo img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-photo::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 55%,rgba(6,8,12,.85) 100%);pointer-events:none}
.profile-photo-fallback{width:100%;height:100%;background:var(--grad);display:flex;align-items:center;justify-content:center}
.profile-meta{padding:14px 16px;display:flex;flex-direction:column;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.78rem;background:var(--bg-1);border-top:1px solid var(--line)}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3);gap:12px}
.profile-meta-row b{color:var(--ink);font-weight:500;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:60%}
.profile-glow{position:absolute;inset:-2px;border-radius:16px;background:var(--grad);z-index:-1;opacity:.4;filter:blur(22px)}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:240px}}

section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}

.stack-group{margin-bottom:28px}
.stack-group:last-child{margin-bottom:0}
.stack-group-label{font-family:'JetBrains Mono',monospace;font-size:.74rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.12em;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.stack-group-label::before{content:'';width:14px;height:1px;background:var(--line-2)}
.stack-group-label::after{content:'';flex:1;height:1px;background:var(--line)}
.stack-chips{display:flex;flex-wrap:wrap;gap:8px}
.stack-chip{font-family:'JetBrains Mono',monospace;font-size:.85rem;color:var(--ink);padding:7px 12px;border-radius:8px;background:var(--bg-1);border:1px solid var(--line);transition:all .18s ease;cursor:default}
.stack-chip:hover{border-color:var(--cyan);color:var(--cyan);background:rgba(34,211,238,.05)}

.repos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.repos-grid{grid-template-columns:1fr}}
.repo{background:var(--bg-1);border:1px solid var(--line);border-radius:14px;padding:22px;display:flex;flex-direction:column;transition:all .25s ease;position:relative;overflow:hidden}
.repo::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.repo:hover{border-color:var(--line-2);transform:translateY(-3px)}
.repo:hover::before{opacity:1}
.repo>*{position:relative;z-index:1}
.repo-head{display:flex;align-items:center;gap:8px;color:var(--ink-3);font-family:'JetBrains Mono',monospace;font-size:.82rem;margin-bottom:10px}
.repo-slug{color:var(--ink);font-family:'JetBrains Mono',monospace;font-size:.95rem;font-weight:500;margin-bottom:8px;word-break:break-all}
.repo-desc{color:var(--ink-2);font-size:.92rem;line-height:1.55;margin-bottom:16px;flex:1;text-wrap:pretty}
.repo-foot{display:flex;align-items:center;gap:14px;color:var(--ink-3);font-family:'JetBrains Mono',monospace;font-size:.78rem;padding-top:14px;border-top:1px dashed var(--line)}
.repo-foot .lang{display:inline-flex;align-items:center;gap:6px;color:var(--cyan)}
.repo-foot .lang::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--cyan)}
.repo-foot .meta{display:inline-flex;align-items:center;gap:5px}
.repo-empty{padding:32px;text-align:center;border:1px dashed var(--line);border-radius:14px;color:var(--ink-3);font-family:'JetBrains Mono',monospace;font-size:.9rem}

.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:880px){.pillars{grid-template-columns:1fr}}
.pillar{padding:24px;border:1px solid var(--line);border-radius:14px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--line-2);transform:translateY(-2px)}
.pillar-num{font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--cyan);font-weight:500;margin-bottom:12px;letter-spacing:.04em}
.pillar h4{font-size:1.1rem;font-weight:600;margin-bottom:8px;letter-spacing:-.01em}
.pillar p{color:var(--ink-2);font-size:.94rem;line-height:1.55;text-wrap:pretty}

.partner-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-pillars{display:grid;gap:14px;margin-top:28px}
.tile{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease;align-items:flex-start}
.tile:hover{border-color:var(--line-2);transform:translateX(4px)}
.tile-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--ink-3);font-weight:500;min-width:32px;padding-top:1px}
.tile-body h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em}
.tile-body p{color:var(--ink-2);font-size:.9rem;line-height:1.5}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,.6),rgba(59,130,246,.6),transparent)}
.contact-list{display:flex;flex-direction:column;gap:10px;margin-top:18px}
.plink{display:inline-flex;align-items:center;gap:10px;padding:10px 14px;border-radius:9px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s ease;font-family:'JetBrains Mono',monospace}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary:hover{background:transparent;color:var(--ink)}

footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease;font-family:'JetBrains Mono',monospace}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green)}

.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}

@media(max-width:480px){.container{padding:0 20px}.nav-inner{padding:14px 20px}.hero{padding:64px 0 56px}section{padding:64px 0}.section-head{margin-bottom:32px}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="dot"></span><span>~/<b>${escapeHtml(ensName)}</b></span></div>
    <div class="nav-links">
      ${tech.length > 0 ? `<a href="#stack">Stack</a>` : ""}
      ${gh ? `<a href="#activity">Activity</a>` : ""}
      <a href="#principles">Principles</a>
      ${ghUrl ? `<a href="${escapeHtml(ghUrl)}" class="nav-cta" target="_blank" rel="noopener">${SVG.github}<span>GitHub</span></a>` : `<a href="#connect" class="nav-cta">${SVG.terminal}<span>Connect</span></a>`}
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>// Open source · Shipping in public</span></div>
        <h1><span class="ital">Building</span> in the open as<br><span class="name">${escapeHtml(ensName)}</span>.</h1>
        <p class="hero-bio">I'm <b style="color:var(--ink)">${name}</b> — ${bio}</p>
        <div class="hero-actions">
          ${ghUrl ? `<a href="${escapeHtml(ghUrl)}" class="btn btn-primary" target="_blank" rel="noopener">${SVG.github}<span>View GitHub</span> ${SVG.arrowRight}</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="btn btn-ghost" target="_blank" rel="noopener">${SVG.twitter}<span>Twitter / X</span></a>` : `<a href="#connect" class="btn btn-ghost">${SVG.mail}<span>Get in touch</span></a>`}
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          <div class="term-bar">
            <span class="term-dot r"></span><span class="term-dot y"></span><span class="term-dot g"></span>
            <span class="term-title">~/${escapeHtml(ensName)} — bash</span>
          </div>
          <div class="profile-photo">
            ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div class="profile-photo-fallback">${SVG.terminal}</div>`}
          </div>
          <div class="profile-meta">
            <div class="profile-meta-row"><span>github</span><b>${gh ? `@${escapeHtml(gh)}` : "—"}</b></div>
            <div class="profile-meta-row"><span>stack</span><b>${escapeHtml(primaryStack)}</b></div>
            <div class="profile-meta-row"><span>status</span><b style="color:var(--green)">● online</b></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

${tech.length > 0 ? `
<section id="stack">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Stack</div>
        <h2 class="section-title">Tools I reach for<br><span class="ital">when the work starts.</span></h2>
      </div>
      <p class="section-sub">${langCount} tool${langCount === 1 ? "" : "s"} in regular rotation — chosen for the job, not the trend.</p>
    </div>
    <div class="reveal">
      ${split.map((g) => `
      <div class="stack-group">
        <div class="stack-group-label">${escapeHtml(g.label)}</div>
        <div class="stack-chips">
          ${g.items.map((t) => `<span class="stack-chip">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>` : ""}

${gh ? `
<section id="activity">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Recent activity</div>
        <h2 class="section-title">What I'm working on,<br><span class="ital">in the open.</span></h2>
      </div>
      <p class="section-sub">Live counts on GitHub — these slugs are placeholders that link through to my profile.</p>
    </div>
    <div class="repos-grid reveal">
      ${placeholderRepos.map((r) => `
      <article class="repo">
        <div class="repo-head">${SVG.branch}<span>repo</span></div>
        <div class="repo-slug">${escapeHtml(r.slug)}</div>
        <p class="repo-desc">${escapeHtml(r.desc)}</p>
        <div class="repo-foot">
          <span class="lang">${escapeHtml(r.lang)}</span>
          <span class="meta">${SVG.star}<span>—</span></span>
          <span class="meta">${SVG.fork}<span>—</span></span>
        </div>
      </article>`).join("")}
    </div>
    <div style="margin-top:24px;text-align:center" class="reveal">
      <a href="${escapeHtml(ghUrl)}" class="btn btn-ghost" target="_blank" rel="noopener">${SVG.github}<span>See all on GitHub</span> ${SVG.arrow}</a>
    </div>
  </div>
</section>` : `
<section id="activity">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Recent activity</div>
        <h2 class="section-title">Code lives where<br><span class="ital">the commits land.</span></h2>
      </div>
      <p class="section-sub">Add a GitHub username to surface live repos here.</p>
    </div>
    <div class="repo-empty reveal">${SVG.pkg} <span style="margin-left:8px">No GitHub linked yet — repos and stars will surface here once connected.</span></div>
  </div>
</section>`}

<section id="principles">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Principles</div>
        <h2 class="section-title">How I write<br><span class="ital">code that ships.</span></h2>
      </div>
      <p class="section-sub">Three habits I keep, in roughly the order they save the most time.</p>
    </div>
    <div class="pillars">
      ${principles.map((p, i) => `
      <div class="pillar reveal">
        <div class="pillar-num">${String(i + 1).padStart(2, "0")} //</div>
        <h4>${escapeHtml(p.title)}</h4>
        <p>${escapeHtml(p.body)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>

<section id="connect">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 04 — Connect</div>
        <h2 class="section-title">Open to OSS, code reviews,<br><span class="ital">and the occasional contract.</span></h2>
      </div>
      <p class="section-sub">If it's a real bug, a real bounty, or a real project — I'll read it.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty">I take on a small number of contracts, code reviews, and OSS sponsorships each year. The shorter the path from message to merge, the better.</p>
        <div class="partner-pillars">
          <div class="tile">
            <div class="tile-num">01</div>
            <div class="tile-body"><h4>Open-source contributions</h4><p>Issues, PRs, reviews on projects I care about — paid or unpaid.</p></div>
          </div>
          <div class="tile">
            <div class="tile-num">02</div>
            <div class="tile-body"><h4>Code reviews &amp; audits</h4><p>Architecture, security, ergonomics — second-pair-of-eyes on production code.</p></div>
          </div>
          <div class="tile">
            <div class="tile-num">03</div>
            <div class="tile-body"><h4>Short-form contracts</h4><p>Two-to-six week scopes where the spec is clear and the team ships.</p></div>
          </div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:18px">
          <div class="section-label" style="margin-bottom:6px">// Contact</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em">Let's talk.</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px">Pick the channel you actually check.</p>
        </div>
        <div class="contact-list">
          ${ghUrl ? `<a href="${escapeHtml(ghUrl)}" class="plink primary" target="_blank" rel="noopener">${SVG.github}<span>github.com/${escapeHtml(gh)}</span> ${SVG.arrow}</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener">${SVG.twitter}<span>${escapeHtml((profileData.twitter || "").replace(/^@/, "")) || "twitter"}</span></a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink">${SVG.mail}<span>${escapeHtml(email)}</span></a>` : ""}
          ${li ? `<a href="${escapeHtml(li)}" class="plink" target="_blank" rel="noopener">${SVG.linkedin}<span>LinkedIn</span></a>` : ""}
          ${tg ? `<a href="${escapeHtml(tg)}" class="plink" target="_blank" rel="noopener">${SVG.telegram}<span>${escapeHtml((profileData.telegram || "").replace(/^@/, "")) || "telegram"}</span></a>` : ""}
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
        <div class="nav-brand" style="margin-bottom:16px"><span class="dot"></span><span>~/<b>${escapeHtml(ensName)}</b></span></div>
        <p class="foot-tag">${escapeHtml(rawBio)}</p>
      </div>
      <div class="foot-col">
        <h5>Sections</h5>
        ${tech.length > 0 ? `<a href="#stack">Stack</a>` : ""}
        <a href="#activity">Activity</a>
        <a href="#principles">Principles</a>
        <a href="#connect">Connect</a>
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${ghUrl ? `<a href="${escapeHtml(ghUrl)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">Twitter / X</a>` : ""}
        ${li ? `<a href="${escapeHtml(li)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${tg ? `<a href="${escapeHtml(tg)}" target="_blank" rel="noopener">Telegram</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(ensName)} — All commits, all the time.</span>
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

export function BuilderTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateBuilderHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Builder Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
