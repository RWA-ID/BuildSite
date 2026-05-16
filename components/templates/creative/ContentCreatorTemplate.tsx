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
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.71"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
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

function instagramUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://instagram.com/${h}` : "";
}

function formatSubs(s: string): string {
  if (!s) return "";
  const trimmed = s.trim();
  if (/[a-zA-Z]/.test(trimmed)) return trimmed;
  const n = Number(trimmed.replace(/[, ]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return trimmed;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return String(n);
}

export function generateContentCreatorHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const name = escapeHtml(profileData.displayName || ensName);
  const tagline = escapeHtml(
    profileData.tagline || "Storytelling for the open internet."
  );
  const bio = escapeHtml(
    profileData.bio ||
      "I make videos, essays, and conversations about the things I can't stop thinking about."
  );
  const profileImg = uploadedImages["profileImage"] || "";

  const ytId = (profileData.youtubeChannelId || "").trim();
  const ytChannelUrl = ytId
    ? ytId.startsWith("http")
      ? ytId
      : `https://youtube.com/channel/${ytId}`
    : "";
  const ytEmbedUrl = ytId && !ytId.startsWith("http")
    ? `https://www.youtube.com/embed?listType=user_uploads&list=${encodeURIComponent(ytId)}`
    : "";

  const subsRaw = profileData.subscriberCount || "";
  const subs = formatSubs(subsRaw);
  const sponsorEmail = profileData.sponsorshipEmail || profileData.email || "";
  const mediaKit = profileData.mediaKit || "";

  const tw = twitterUrl(profileData.twitter);
  const ig = instagramUrl(profileData.instagram);
  const email = profileData.email || "";

  const connectTiles: Array<{ icon: string; label: string; handle: string; url: string }> = [];
  if (ytChannelUrl) connectTiles.push({ icon: SVG.youtube, label: "YouTube", handle: profileData.displayName || ensName, url: ytChannelUrl });
  if (tw) connectTiles.push({ icon: SVG.twitter, label: "X / Twitter", handle: profileData.twitter || "", url: tw });
  if (ig) connectTiles.push({ icon: SVG.instagram, label: "Instagram", handle: profileData.instagram || "", url: ig });
  if (email) connectTiles.push({ icon: SVG.mail, label: "Email", handle: email, url: `mailto:${email}` });

  const taglineWords = (profileData.tagline || "").split(/\s+/).filter(Boolean);
  const italTagline = taglineWords.length > 2
    ? `${escapeHtml(taglineWords.slice(0, taglineWords.length - 2).join(" "))} <span class="ital">${escapeHtml(taglineWords.slice(-2).join(" "))}</span>`
    : tagline;

  const pillars: Array<{ title: string; body: string; icon: string }> = [
    {
      icon: SVG.mic,
      title: "Original voice",
      body: "Every script, every cut, every line — written and edited from a single point of view, not a content factory.",
    },
    {
      icon: SVG.play,
      title: "Made for the long haul",
      body: "I show up consistently and treat the audience like adults who want depth, not just throughput.",
    },
    {
      icon: SVG.spark,
      title: "Independent & onchain",
      body: "Hosted on my own ENS domain — no algorithm decides who can find me.",
    },
  ];

  const heroEyebrow = `// Creator · Storytelling on the open internet`;

  const navHTML = `
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      <a href="#story">Story</a>
      ${ytChannelUrl ? '<a href="#latest">Latest</a>' : ""}
      ${(sponsorEmail || mediaKit) ? '<a href="#sponsor">Sponsor</a>' : ""}
      ${sponsorEmail ? `<a href="mailto:${escapeHtml(sponsorEmail)}" class="nav-cta">Sponsor inquiry</a>` : ytChannelUrl ? `<a href="${escapeHtml(ytChannelUrl)}" target="_blank" rel="noopener" class="nav-cta">Subscribe</a>` : ""}
    </div>
  </div>
</nav>`;

  const heroHTML = `
<header class="hero">
  <div class="hero-banner hero-banner-fallback"></div>
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>${escapeHtml(heroEyebrow)}</span></div>
        <h1>${italTagline}</h1>
        <p class="hero-bio">I'm <b style="color:var(--ink)">${escapeHtml(profileData.displayName || ensName)}</b> — ${bio}</p>
        <div class="hero-actions">
          ${ytChannelUrl ? `<a href="${escapeHtml(ytChannelUrl)}" target="_blank" rel="noopener" class="btn btn-primary">${SVG.play} Watch on YouTube</a>` : ""}
          ${mediaKit ? `<a href="${escapeHtml(mediaKit)}" target="_blank" rel="noopener" class="btn btn-ghost">Media kit ${SVG.arrow}</a>` : ""}
          ${!mediaKit && sponsorEmail ? `<a href="mailto:${escapeHtml(sponsorEmail)}" class="btn btn-ghost">Sponsor inquiry ${SVG.arrow}</a>` : ""}
        </div>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-num">${subs ? escapeHtml(subs) : "—"}</div>
            <div class="stat-label">Subscribers</div>
          </div>
          <div class="stat">
            <div class="stat-num">∞</div>
            <div class="stat-label">Open episodes</div>
          </div>
          <div class="stat">
            <div class="stat-num">100%</div>
            <div class="stat-label">Owned by me</div>
          </div>
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#ff0033,#ff4d6d);"></div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">Creator</span></div>
        </div>
        ${subs ? `<div class="sub-pill">${SVG.youtube} <b>${escapeHtml(subs)}</b> subscribers</div>` : ""}
      </div>
    </div>
  </div>
</header>`;

  const storyHTML = `
<section id="story">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — The story</div>
        <h2 class="section-title">A channel that's actually<br><span class="ital">about something.</span></h2>
      </div>
      <p class="section-sub">Three things I care about more than the algorithm.</p>
    </div>
    <div class="pillars-grid">
      ${pillars.map((p, i) => `
      <article class="pillar-card reveal">
        <div class="pillar-icon">${p.icon}</div>
        <div class="pillar-num">0${i + 1}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  const latestHTML = ytEmbedUrl ? `
<section id="latest">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Latest</div>
        <h2 class="section-title">Fresh from<br><span class="ital">the channel.</span></h2>
      </div>
      <p class="section-sub">Latest uploads, embedded straight from YouTube. No middlemen.</p>
    </div>
    <div class="latest-frame reveal">
      <iframe src="${escapeHtml(ytEmbedUrl)}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
    </div>
    ${ytChannelUrl ? `<div style="margin-top:24px;text-align:center;"><a href="${escapeHtml(ytChannelUrl)}" target="_blank" rel="noopener" class="plink primary">View full channel ${SVG.arrow}</a></div>` : ""}
  </div>
</section>` : `
<section id="latest">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Latest</div>
        <h2 class="section-title">Fresh from<br><span class="ital">the channel.</span></h2>
      </div>
      <p class="section-sub">Recent drops — connect a YouTube channel to auto-embed.</p>
    </div>
    <div class="latest-grid reveal">
      ${[1, 2, 3].map((n) => `
      <div class="video-placeholder">
        <div class="video-thumb">${SVG.play}</div>
        <div class="video-meta">
          <div class="video-title">Episode 0${n}</div>
          <div class="video-sub">Coming soon</div>
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>`;

  const sponsorHTML = (sponsorEmail || mediaKit) ? `
<section id="sponsor">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Work with me</div>
        <h2 class="section-title">Brand fit?<br>Let's <span class="ital">make something.</span></h2>
      </div>
      <p class="section-sub">A small number of sponsorships per quarter — for partners who match the audience.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">I work with brands and operators who treat the audience as people, not impressions. Long-form integrations, sponsored episodes, and bespoke creative — never spammy pre-rolls.</p>
        <div class="partner-pillars">
          <div class="pillar">
            <div class="pillar-num">01</div>
            <div class="pillar-body"><h4>Long-form sponsor reads</h4></div>
          </div>
          <div class="pillar">
            <div class="pillar-num">02</div>
            <div class="pillar-body"><h4>Dedicated episodes &amp; collabs</h4></div>
          </div>
          <div class="pillar">
            <div class="pillar-num">03</div>
            <div class="pillar-body"><h4>Newsletter &amp; cross-platform deals</h4></div>
          </div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">// Inquiry</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">Get the deck.</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">${subs ? `${escapeHtml(subs)} subscribers, ` : ""}independent voice, full creative control.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${sponsorEmail ? `<a href="mailto:${escapeHtml(sponsorEmail)}" class="plink primary">${SVG.mail} ${escapeHtml(sponsorEmail)}</a>` : ""}
          ${mediaKit ? `<a href="${escapeHtml(mediaKit)}" target="_blank" rel="noopener" class="plink">${SVG.link} Media kit</a>` : ""}
          ${ytChannelUrl ? `<a href="${escapeHtml(ytChannelUrl)}" target="_blank" rel="noopener" class="plink">${SVG.youtube} YouTube channel</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>` : "";

  const connectHTML = connectTiles.length > 0 ? `
<section id="connect">
  <div class="container">
    <div class="section-head" style="margin-bottom:24px;">
      <div>
        <div class="section-label">// Elsewhere</div>
        <h2 class="section-title" style="font-size:1.4rem;">Find me <span class="ital">across the feed.</span></h2>
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

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: "Content Creator",
    description: profileData.bio || profileData.tagline || tagline,
    url: `https://${ensName}.limo`,
    sameAs: [ytChannelUrl, tw, ig].filter(Boolean),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — ${tagline}</title>
<meta name="description" content="${tagline}">
<meta property="og:title" content="${name}">
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
:root{--bg:#0a0a0c;--bg-1:#101015;--bg-2:#13131a;--bg-3:#1b1b25;--line:#23232f;--line-2:#30303f;--ink:#f5f5f7;--ink-2:#bdbdc8;--ink-3:#7a7a8a;--ink-4:#4a4a58;--red:#ff0033;--red-2:#ff4d6d;--amber:#ffb84d;--grad:linear-gradient(135deg,#ff0033 0%,#ff4d6d 100%);--grad-soft:linear-gradient(135deg,rgba(255,0,51,.10) 0%,rgba(255,77,109,.08) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,rgba(255,0,51,.14),transparent 60%),radial-gradient(ellipse 700px 500px at 88% 30%,rgba(255,77,109,.10),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
a{color:inherit;text-decoration:none}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(10,10,12,.72);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--red);box-shadow:0 0 10px var(--red);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--ink) !important;color:var(--bg) !important;font-weight:600 !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:0 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-banner{position:absolute;top:0;left:0;right:0;height:340px;overflow:hidden;z-index:0}
.hero-banner img{width:100%;height:100%;object-fit:cover;opacity:.45;filter:saturate(1.1) contrast(1.05)}
.hero-banner-fallback{background:radial-gradient(ellipse 800px 400px at 50% 0%,rgba(255,0,51,.35),transparent 70%),linear-gradient(180deg,rgba(255,77,109,.18),transparent 80%)}
.hero-banner::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(10,10,12,.55) 60%,var(--bg) 100%)}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center;padding-top:140px}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-2);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.03);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--red);box-shadow:0 0 8px var(--red)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero h1 .ital,.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.section-title .ital{background:none;-webkit-text-fill-color:initial;color:var(--ink-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn svg{width:16px;height:16px}
.btn-primary{background:var(--grad);color:#fff;box-shadow:0 8px 20px rgba(255,0,51,.25)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(255,0,51,.35)}
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
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(10,10,12,.85) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-glow{position:absolute;inset:-2px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.5;filter:blur(22px)}
.sub-pill{margin-top:14px;display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:100px;background:rgba(255,0,51,.08);border:1px solid rgba(255,0,51,.25);color:var(--ink);font-size:.86rem;font-family:'JetBrains Mono',monospace}
.sub-pill svg{width:14px;height:14px;color:var(--red)}
.sub-pill b{color:var(--ink);font-weight:600;letter-spacing:-.01em}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px;padding-top:110px}.profile-frame{width:200px}.hero-banner{height:260px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
.pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.pillars-grid{grid-template-columns:1fr}}
.pillar-card{position:relative;padding:28px;background:var(--bg-1);border:1px solid var(--line);border-radius:16px;overflow:hidden;transition:all .25s ease}
.pillar-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.pillar-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.pillar-card:hover::before{opacity:1}
.pillar-card>*{position:relative;z-index:1}
.pillar-icon{width:42px;height:42px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:rgba(255,0,51,.10);border:1px solid rgba(255,0,51,.25);color:var(--red-2);margin-bottom:18px}
.pillar-icon svg{width:20px;height:20px}
.pillar-card .pillar-num{font-family:'JetBrains Mono',monospace;font-size:.74rem;color:var(--ink-3);letter-spacing:.12em;margin-bottom:8px}
.pillar-card h3{font-size:1.18rem;font-weight:600;letter-spacing:-.015em;margin-bottom:8px}
.pillar-card p{color:var(--ink-2);font-size:.95rem;line-height:1.55;text-wrap:pretty}
.latest-frame{position:relative;border:1px solid var(--line);border-radius:18px;overflow:hidden;aspect-ratio:16/9;background:var(--bg-1);box-shadow:0 30px 80px rgba(0,0,0,.5)}
.latest-frame iframe{width:100%;height:100%;border:0;display:block}
.latest-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.latest-grid{grid-template-columns:1fr}}
.video-placeholder{background:var(--bg-1);border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:all .2s ease}
.video-placeholder:hover{border-color:var(--line-2);transform:translateY(-2px)}
.video-thumb{aspect-ratio:16/9;background:linear-gradient(135deg,var(--bg-2),var(--bg-3));display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.18);border-bottom:1px solid var(--line)}
.video-thumb svg{width:48px;height:48px}
.video-meta{padding:16px 18px}
.video-title{font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:4px}
.video-sub{font-size:.82rem;color:var(--ink-3);font-family:'JetBrains Mono',monospace;letter-spacing:.05em;text-transform:uppercase}
.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-pillars{display:grid;gap:14px;margin-top:28px}
.pillar{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--line-2);transform:translateX(4px)}
.pillar-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--ink-3);font-weight:500;min-width:32px;padding-top:1px}
.pillar-body h4{font-size:1.02rem;font-weight:600;margin-bottom:4px;letter-spacing:-.01em}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,0,51,.6),rgba(255,77,109,.6),transparent)}
.plink{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);font-size:.9rem;font-weight:500;transition:all .18s ease}
.plink svg{width:14px;height:14px}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary:hover{background:transparent;color:var(--ink)}
.connect-strip{display:grid;grid-template-columns:repeat(${Math.max(1, Math.min(connectTiles.length, 4))},1fr);gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--bg-1)}
.connect-tile{display:flex;align-items:center;gap:14px;padding:22px 24px;border-right:1px solid var(--line);color:var(--ink);transition:background .2s ease;position:relative}
.connect-tile:last-child{border-right:none}
.connect-tile:hover{background:var(--bg-2)}
.connect-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:var(--bg-3);color:var(--ink);flex-shrink:0}
.connect-icon svg{width:18px;height:18px}
.connect-info{flex:1;min-width:0}
.connect-info .label{font-size:.75rem;color:var(--ink-3);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em}
.connect-info .handle{font-size:.98rem;font-weight:500;color:var(--ink);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media(max-width:880px){.connect-strip{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.connect-strip{grid-template-columns:1fr}.connect-tile{border-right:none;border-bottom:1px solid var(--line)}}
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--red);box-shadow:0 0 8px var(--red)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>
${navHTML}
<main>
${heroHTML}
${storyHTML}
${latestHTML}
${sponsorHTML}
${connectHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || profileData.tagline || tagline)}</p>
      </div>
      <div class="foot-col">
        <h5>Watch</h5>
        ${ytChannelUrl ? `<a href="${escapeHtml(ytChannelUrl)}" target="_blank" rel="noopener">YouTube channel</a>` : ""}
        ${mediaKit ? `<a href="${escapeHtml(mediaKit)}" target="_blank" rel="noopener">Media kit</a>` : ""}
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">X / Twitter</a>` : ""}
        ${ig ? `<a href="${escapeHtml(ig)}" target="_blank" rel="noopener">Instagram</a>` : ""}
        ${sponsorEmail ? `<a href="mailto:${escapeHtml(sponsorEmail)}">${escapeHtml(sponsorEmail)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(ensName)} — Independent &amp; onchain.</span>
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

export function ContentCreatorTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateContentCreatorHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Content Creator Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
