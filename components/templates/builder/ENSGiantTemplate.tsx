"use client";
import { ProfileData, ProjectEntry, StatEntry } from "@/lib/store";

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
  discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
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

export function generateENSGiantHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const tagline = escapeHtml(
    profileData.tagline || "Building digital identity infrastructure for the onchain world."
  );
  const bio = escapeHtml(
    profileData.bio || `An ENS enthusiast obsessed with identity primitives.`
  );
  const profileImg = uploadedImages["profileImage"] || "";
  const projects: ProjectEntry[] = profileData.projects || [];
  const stats: StatEntry[] = profileData.stats || [];
  const chains: string[] = profileData.chains || [];
  const focus: string[] = profileData.focus || [];
  const services: string[] = profileData.servicesOffered || [];

  const tw = twitterUrl(profileData.twitter);
  const li = profileData.linkedin
    ? profileData.linkedin.startsWith("http")
      ? profileData.linkedin
      : `https://www.linkedin.com/in/${profileData.linkedin}`
    : "";
  const tg = telegramUrl(profileData.telegram);
  const dc = profileData.discord || "";
  const efp = profileData.efpProfile || "";
  const efpUrl = efp ? (efp.startsWith("http") ? efp : `https://efp.app/${efp}`) : "";

  const connectTiles: Array<{ icon: string; label: string; handle: string; url: string }> = [];
  if (tw) connectTiles.push({ icon: SVG.twitter, label: "X / Twitter", handle: profileData.twitter || "", url: tw });
  if (li) connectTiles.push({ icon: SVG.linkedin, label: "LinkedIn", handle: profileData.linkedin || "", url: li });
  if (tg) connectTiles.push({ icon: SVG.telegram, label: "Telegram", handle: profileData.telegram || "", url: tg });
  if (dc) connectTiles.push({ icon: SVG.discord, label: "Discord", handle: dc, url: `https://discord.com/users/${dc}` });

  const connectStripHTML = connectTiles.length > 0 ? `
<section id="connect" style="padding:56px 0;">
  <div class="container">
    <div class="section-head" style="margin-bottom:24px;">
      <div>
        <div class="section-label">// Connect</div>
        <h2 class="section-title" style="font-size:1.4rem;">Find me <span class="ital">across the network</span></h2>
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

  const projectsHTML = projects.length > 0 ? `
<section id="projects">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Live Projects</div>
        <h2 class="section-title">Identity primitives,<br><span class="ital">shipped &amp; running.</span></h2>
      </div>
      <p class="section-sub">${projects.length} product${projects.length !== 1 ? "s" : ""} live — every one solving a different problem.</p>
    </div>
    <div class="projects-grid">
      ${projects.map((p) => {
        const badgeClass = p.badge?.toLowerCase() === "new" ? "tag tag-new" : p.badge?.toLowerCase() === "live" ? "tag tag-active" : "tag";
        const logoSrc = (p as ProjectEntry & { imageUrl?: string }).imageUrl || "";
        return `
      <article class="project reveal">
        <div class="project-top">
          <div class="project-logo">${logoSrc ? `<img src="${escapeHtml(logoSrc)}" alt="${escapeHtml(p.name)}">` : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#5b8def,#a855f7);"></div>`}</div>
          <div class="project-titlewrap">
            <div class="project-tags">
              ${p.badge ? `<span class="${badgeClass}">${escapeHtml(p.badge)}</span>` : ""}
              ${(p.tags || []).slice(0, 2).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
            </div>
            <div class="project-title">${escapeHtml(p.name)}</div>
          </div>
        </div>
        <p class="project-desc">${escapeHtml(p.description || "")}</p>
        ${(p.tags && p.tags.length > 2) ? `<div class="project-stack">${p.tags.slice(2).map((t) => `<span class="stack-chip">${escapeHtml(t)}</span>`).join("")}</div>` : ""}
        <div class="project-links">
          ${p.url ? `<a href="${escapeHtml(p.url)}" class="plink primary" target="_blank">Visit site ${SVG.arrow}</a>` : ""}
          ${p.twitterUrl ? `<a href="${escapeHtml(p.twitterUrl)}" class="plink" target="_blank">𝕏 Twitter</a>` : ""}
          ${p.githubUrl ? `<a href="${escapeHtml(p.githubUrl)}" class="plink" target="_blank">${SVG.github} GitHub</a>` : ""}
        </div>
      </article>`;
      }).join("")}
    </div>
  </div>
</section>` : "";

  const efpHTML = efpUrl ? `
<section id="follow">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Follow Onchain</div>
        <h2 class="section-title">Connect with me on the<br><span class="ital">Ethereum Follow Protocol.</span></h2>
      </div>
      <p class="section-sub">EFP brings the social graph onchain — no platform required.</p>
    </div>
    <div class="efp-card reveal">
      <div class="efp-info">
        <div class="efp-title">Follow ${escapeHtml(ensName)} on EFP</div>
        <p class="efp-desc">Visit my EFP profile to follow on-chain.</p>
        <a href="${escapeHtml(efpUrl)}" class="btn btn-primary" target="_blank">View EFP profile ${SVG.arrow}</a>
      </div>
      <div class="efp-qr" style="display:flex;align-items:center;justify-content:center;width:220px;height:220px;">
        <div style="font-family:'JetBrains Mono',monospace;color:#07080c;font-size:.85rem;text-align:center;padding:20px;">${escapeHtml(ensName)}</div>
      </div>
    </div>
  </div>
</section>` : "";

  const pillars = services.slice(0, 4);
  const partnerHTML = pillars.length > 0 ? `
<section id="hire">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Partner &amp; Hire</div>
        <h2 class="section-title">Building something<br>that needs <span class="ital">my expertise?</span></h2>
      </div>
      <p class="section-sub">A small number of partnerships and contracts each year — for teams who care about doing it right.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">From early-stage ideas to production systems, I help teams design and ship the layer their product depends on.</p>
        <div class="partner-pillars">
          ${pillars.map((p, i) => `
          <div class="pillar">
            <div class="pillar-num">${String(i + 1).padStart(2, "0")}</div>
            <div class="pillar-body"><h4>${escapeHtml(p)}</h4></div>
          </div>`).join("")}
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">// Contact</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">Let's talk.</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">Reach out via the channels below.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink primary" target="_blank">𝕏 ${escapeHtml(profileData.twitter || "")} ${SVG.arrow}</a>` : ""}
          ${profileData.email ? `<a href="mailto:${escapeHtml(profileData.email)}" class="plink primary">✉ ${escapeHtml(profileData.email)}</a>` : ""}
          ${tg ? `<a href="${escapeHtml(tg)}" class="plink" target="_blank">Telegram ${escapeHtml(profileData.telegram || "")}</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>` : "";

  const heroStats = stats.length > 0 ? stats.slice(0, 3) : [
    { label: "Live products", value: String(projects.length || 0) },
    { label: "Years onchain", value: "—" },
    { label: "ENS conviction", value: "∞" },
  ];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    description: profileData.bio || tagline,
    url: `https://${ensName}.limo`,
    sameAs: [tw, li, tg, efpUrl].filter(Boolean),
  });

  const heroH1 = profileData.tagline
    ? escapeHtml(profileData.tagline)
    : `Building <span class="ital">digital identity</span><br>infrastructure for the<br><span class="name">onchain</span> world.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — ${tagline}</title>
<meta name="description" content="${tagline}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${tagline}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#07080c;--bg-1:#0d0f15;--bg-2:#12141c;--bg-3:#181b25;--line:#1f2330;--line-2:#2a2f40;--ink:#f4f5f7;--ink-2:#b5b9c8;--ink-3:#6f7488;--ink-4:#4a4f63;--blue:#5b8def;--violet:#a855f7;--teal:#5bc8b4;--amber:#f5b041;--grad:linear-gradient(135deg,#5b8def 0%,#a855f7 100%);--grad-soft:linear-gradient(135deg,rgba(91,141,239,.12) 0%,rgba(168,85,247,.12) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 15% -5%,rgba(91,141,239,.18),transparent 60%),radial-gradient(ellipse 700px 500px at 85% 25%,rgba(168,85,247,.14),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(91,200,180,.08),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(7,8,12,.7);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--teal);box-shadow:0 0 10px var(--teal);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--ink) !important;color:var(--bg) !important;font-weight:600 !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .name{font-family:'JetBrains Mono',monospace;font-weight:500;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.04em}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--ink-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--ink);color:var(--bg)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(255,255,255,.15)}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.6rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.75rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(7,8,12,.85) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-glow{position:absolute;inset:-2px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.4;filter:blur(20px)}
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
.connect-strip{display:grid;grid-template-columns:repeat(${Math.max(1, Math.min(connectTiles.length, 4))},1fr);gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--bg-1)}
.connect-tile{display:flex;align-items:center;gap:14px;padding:22px 24px;border-right:1px solid var(--line);text-decoration:none;color:var(--ink);transition:background .2s ease;position:relative}
.connect-tile:last-child{border-right:none}
.connect-tile:hover{background:var(--bg-2)}
.connect-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--bg-3);color:var(--ink);flex-shrink:0}
.connect-icon svg{width:18px;height:18px}
.connect-info{flex:1;min-width:0}
.connect-info .label{font-size:.75rem;color:var(--ink-3);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em}
.connect-info .handle{font-size:.98rem;font-weight:500;color:var(--ink);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media(max-width:880px){.connect-strip{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.connect-strip{grid-template-columns:1fr}.connect-tile{border-right:none;border-bottom:1px solid var(--line)}}
.projects-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
@media(max-width:880px){.projects-grid{grid-template-columns:1fr}}
.project{position:relative;background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:28px;transition:all .25s ease;overflow:hidden;display:flex;flex-direction:column}
.project::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.project:hover{border-color:var(--line-2);transform:translateY(-3px)}
.project:hover::before{opacity:1}
.project>*{position:relative;z-index:1}
.project-top{display:flex;align-items:flex-start;gap:18px;margin-bottom:18px}
.project-logo{width:64px;height:64px;border-radius:12px;overflow:hidden;flex-shrink:0;border:1px solid var(--line-2);background:var(--bg-3)}
.project-logo img{width:100%;height:100%;object-fit:cover}
.project-titlewrap{flex:1;min-width:0;padding-top:4px}
.project-tags{display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap}
.tag{font-family:'JetBrains Mono',monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:.08em;padding:3px 8px;border-radius:4px;background:var(--bg-3);color:var(--ink-3);border:1px solid var(--line);white-space:nowrap}
.tag.tag-new{color:var(--teal);border-color:rgba(91,200,180,.3);background:rgba(91,200,180,.08)}
.tag.tag-active{color:var(--blue);border-color:rgba(91,141,239,.3);background:rgba(91,141,239,.08)}
.project-title{font-size:1.4rem;font-weight:600;letter-spacing:-.015em;line-height:1.2}
.project-desc{color:var(--ink-2);font-size:.98rem;line-height:1.55;margin-bottom:22px;flex:1;text-wrap:pretty}
.project-stack{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;padding-bottom:18px;border-bottom:1px dashed var(--line)}
.stack-chip{font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--ink-3);padding:4px 9px;border-radius:6px;background:rgba(255,255,255,.03);white-space:nowrap}
.project-links{display:flex;gap:8px;flex-wrap:wrap}
.plink{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.85rem;font-weight:500;transition:all .18s ease}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink svg{width:14px;height:14px}
.plink.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary:hover{background:transparent;color:var(--ink)}
.efp-card{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:center;padding:44px;background:linear-gradient(135deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:20px;position:relative;overflow:hidden}
.efp-card::before{content:'';position:absolute;top:-50%;right:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(245,176,65,.18),transparent 70%);pointer-events:none}
.efp-info{position:relative}
.efp-title{font-size:1.6rem;font-weight:600;letter-spacing:-.02em;margin-bottom:12px}
.efp-desc{color:var(--ink-2);margin-bottom:24px;max-width:420px}
.efp-qr{position:relative;padding:12px;background:#fff;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.4)}
@media(max-width:880px){.efp-card{grid-template-columns:1fr;padding:28px;gap:28px}}
.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-pillars{display:grid;gap:14px;margin-top:28px}
.pillar{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--line-2);transform:translateX(4px)}
.pillar-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--ink-3);font-weight:500;min-width:32px;padding-top:1px}
.pillar-body h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(91,141,239,.6),rgba(168,85,247,.6),transparent)}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
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
    <div class="nav-brand"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      ${projects.length > 0 ? '<a href="#projects">Projects</a>' : ""}
      ${efpUrl ? '<a href="#follow">Follow</a>' : ""}
      ${pillars.length > 0 ? '<a href="#hire">Partner</a>' : ""}
      ${pillars.length > 0 ? '<a href="#hire" class="nav-cta">Get in touch</a>' : ""}
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>Available for collaborations · ${new Date().getFullYear()}</span></div>
        <h1>${heroH1}</h1>
        <p class="hero-bio">I'm <b style="color:var(--ink)">${escapeHtml(ensName)}</b> — ${bio}</p>
        <div class="hero-actions">
          ${projects.length > 0 ? `<a href="#projects" class="btn btn-primary">View live projects ${SVG.arrowRight}</a>` : ""}
          ${pillars.length > 0 ? `<a href="#hire" class="btn btn-ghost">Partner or hire me</a>` : ""}
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#5b8def,#a855f7);"></div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">${escapeHtml(profileData.role || "Builder")}</span></div>
        </div>
        <div class="profile-meta">
          ${chains.length > 0 ? `<div class="profile-meta-row"><span>chain</span><b>${chains.slice(0, 3).map(escapeHtml).join(" · ")}</b></div>` : ""}
          ${focus.length > 0 ? `<div class="profile-meta-row"><span>focus</span><b>${focus.slice(0, 2).map(escapeHtml).join(" · ")}</b></div>` : ""}
          <div class="profile-meta-row"><span>status</span><b style="color:var(--teal)">● shipping</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${connectStripHTML}
${projectsHTML}
${efpHTML}
${partnerHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || tagline)}</p>
      </div>
      ${projects.length > 0 ? `<div class="foot-col"><h5>Projects</h5>${projects.slice(0, 6).map((p) => p.url ? `<a href="${escapeHtml(p.url)}" target="_blank">${escapeHtml(p.name)}</a>` : "").join("")}</div>` : ""}
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank">X / Twitter</a>` : ""}
        ${li ? `<a href="${escapeHtml(li)}" target="_blank">LinkedIn</a>` : ""}
        ${tg ? `<a href="${escapeHtml(tg)}" target="_blank">Telegram</a>` : ""}
        ${efpUrl ? `<a href="${escapeHtml(efpUrl)}" target="_blank">EFP profile</a>` : ""}
        ${profileData.email ? `<a href="mailto:${escapeHtml(profileData.email)}">${escapeHtml(profileData.email)}</a>` : ""}
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

interface ENSGiantTemplateProps {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

export function ENSGiantTemplate({ profileData, ensName, uploadedImages }: ENSGiantTemplateProps) {
  const html = generateENSGiantHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="ENS Giant Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
