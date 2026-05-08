"use client";
import { ProfileData } from "@/lib/store";

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
  templateId: string;
}

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  disc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
  frame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  ticket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M13 5v2M13 17v2M13 11v2"/></svg>`,
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

function youtubeUrl(handle: string | undefined): string {
  if (!handle) return "";
  if (handle.startsWith("http")) return handle;
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://youtube.com/@${h}` : "";
}

interface ThemeTokens {
  bg: string;
  bg1: string;
  bg2: string;
  bg3: string;
  line: string;
  line2: string;
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  accent: string;
  accent2: string;
  gradient: string;
  gradSoft: string;
  displayFont: string;
  italFont: string;
  monoFont: string;
  bodyFont: string;
  fontsHref: string;
  jobTitle: string;
  eyebrowLabel: string;
  navCta: string;
  heroCtaPrimary: string;
  heroCtaGhost: string;
  status: string;
}

function getTheme(templateId: string, tagline: string): ThemeTokens {
  if (templateId === "musician") {
    return {
      bg: "#080807",
      bg1: "#0f0e0c",
      bg2: "#161412",
      bg3: "#1f1c18",
      line: "#231f1a",
      line2: "#322c25",
      ink: "#f8f4ee",
      ink2: "#cbbfae",
      ink3: "#867a68",
      ink4: "#574e42",
      accent: "#f59e0b",
      accent2: "#ef4444",
      gradient: "linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)",
      gradSoft:
        "linear-gradient(135deg,rgba(245,158,11,.10) 0%,rgba(239,68,68,.10) 100%)",
      displayFont: "'Bricolage Grotesque',-apple-system,sans-serif",
      italFont: "'Instrument Serif',serif",
      monoFont: "'JetBrains Mono',monospace",
      bodyFont: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
      fontsHref:
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      jobTitle: "Musician",
      eyebrowLabel: tagline ? `Musician · ${tagline}` : "Musician · Recording artist",
      navCta: "Listen",
      heroCtaPrimary: "Latest release",
      heroCtaGhost: "Tour & shows",
      status: "in studio",
    };
  }
  return {
    bg: "#0e0e10",
    bg1: "#141416",
    bg2: "#18181b",
    bg3: "#202024",
    line: "#212126",
    line2: "#2e2e34",
    ink: "#f5f1ec",
    ink2: "#cbc3b8",
    ink3: "#7c7468",
    ink4: "#544e44",
    accent: "#e879a8",
    accent2: "#f9a8d4",
    gradient: "linear-gradient(135deg,#e879a8 0%,#f9a8d4 100%)",
    gradSoft:
      "linear-gradient(135deg,rgba(232,121,168,.10) 0%,rgba(249,168,212,.08) 100%)",
    displayFont: "'Fraunces',-apple-system,serif",
    italFont: "'Instrument Serif',serif",
    monoFont: "'JetBrains Mono',monospace",
    bodyFont: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
    fontsHref:
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
    jobTitle: "Artist",
    eyebrowLabel: tagline ? `Visual Artist · ${tagline}` : "Visual Artist",
    navCta: "Inquire",
    heroCtaPrimary: "Selected works",
    heroCtaGhost: "Commissions",
    status: "in the studio",
  };
}

export function generateGenericCreativeHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>,
  templateId: string
): string {
  const isMusician = templateId === "musician";
  const name = escapeHtml(profileData.displayName || ensName);
  const taglineRaw = profileData.tagline || "";
  const tagline = escapeHtml(taglineRaw);
  const bio = escapeHtml(
    profileData.bio ||
      (isMusician
        ? "Sound shaped by years of late nights, tape hiss and patience. Releases here, the rest happens on stage."
        : "I make work about light, attention and the slow noticing of ordinary things. Studio practice spans painting, drawing and printed editions.")
  );
  const location = escapeHtml(profileData.location || "");
  const profileImg = uploadedImages["profileImage"] || "";
  const bannerImg = uploadedImages["bannerImage"] || "";
  const email = profileData.email || "";

  const tw = twitterUrl(profileData.twitter);
  const ig = instagramUrl(profileData.instagram);
  const yt = youtubeUrl(profileData.youtube);

  const t = getTheme(templateId, taglineRaw);

  const heroH1 = isMusician
    ? `Songs, takes &amp; <span class="ital">live nights.</span>`
    : `Quiet objects,<br>made <span class="ital">slowly.</span>`;

  // Section bodies per theme
  const artistSections = !isMusician
    ? `
<section id="works">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Selected works</div>
        <h2 class="section-title">Recent <span class="ital">studio output.</span></h2>
      </div>
      <p class="section-sub">A small selection. Full archive available on request — the studio is always quieter than the feed.</p>
    </div>
    <div class="works-grid">
      ${[1, 2, 3, 4]
        .map(
          (i) => `
      <article class="work reveal">
        <div class="work-frame">
          ${
            i === 1 && profileImg
              ? `<img src="${escapeHtml(profileImg)}" alt="Featured work">`
              : `<div class="work-ph" style="--i:${i};"></div>`
          }
        </div>
        <div class="work-meta">
          <div class="work-title">Untitled (${i.toString().padStart(2, "0")})</div>
          <div class="work-info"><span>${["Oil on linen", "Graphite on paper", "Pigment print", "Mixed media"][i - 1]}</span><span>${2024 + (i % 2)}</span></div>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>
<section id="exhibitions">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Exhibitions</div>
        <h2 class="section-title">Where the work has <span class="ital">been shown.</span></h2>
      </div>
      <p class="section-sub">Recent &amp; selected. CV available on request.</p>
    </div>
    <ol class="exh-list">
      <li class="exh reveal"><span class="exh-year">2026</span><div><div class="exh-title">Solo show — <em>Slow Light</em></div><div class="exh-where">${location || "Studio"}</div></div></li>
      <li class="exh reveal"><span class="exh-year">2025</span><div><div class="exh-title">Group exhibition — <em>Quiet Forms</em></div><div class="exh-where">Independent space</div></div></li>
      <li class="exh reveal"><span class="exh-year">2024</span><div><div class="exh-title">Print release — limited edition of 25</div><div class="exh-where">Online</div></div></li>
      <li class="exh reveal"><span class="exh-year">2023</span><div><div class="exh-title">Open studio — winter</div><div class="exh-where">By appointment</div></div></li>
    </ol>
  </div>
</section>
<section id="commissions">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Commissions</div>
        <h2 class="section-title">Take on a small number of<br><span class="ital">private commissions</span> each year.</h2>
      </div>
      <p class="section-sub">Best for collectors who want time spent — not turnaround.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p class="partner-lede">From small framed pieces to wall-scale work, each commission is developed in conversation. Expect studio visits, sketches and unhurried correspondence.</p>
        <div class="partner-pillars">
          ${["Conversation &amp; brief", "Studies &amp; sketches", "Studio production", "Framing &amp; delivery"]
            .map(
              (p, i) => `
          <div class="pillar">
            <div class="pillar-num">${String(i + 1).padStart(2, "0")}</div>
            <div class="pillar-body"><h4>${p}</h4></div>
          </div>`
            )
            .join("")}
        </div>
      </div>
      <div class="contact-card reveal">
        <div class="contact-head">
          <div class="section-label">// Inquire</div>
          <div class="contact-title">Studio enquiries.</div>
          <p class="contact-sub">Replies within a week — sometimes longer in summer.</p>
        </div>
        <div class="contact-links">
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink primary">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
          ${ig ? `<a href="${escapeHtml(ig)}" class="plink" target="_blank" rel="noopener">${SVG.instagram} Instagram</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener">${SVG.twitter} Twitter</a>` : ""}
          ${location ? `<div class="plink static">${SVG.pin} ${escapeHtml(location)}</div>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`
    : "";

  const musicianSections = isMusician
    ? `
<section id="latest">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Latest release</div>
        <h2 class="section-title">New record <span class="ital">out now.</span></h2>
      </div>
      <p class="section-sub">Stream wherever you listen — vinyl coming back later this year.</p>
    </div>
    <div class="release-card reveal">
      <div class="release-cover">
        ${
          profileImg
            ? `<img src="${escapeHtml(profileImg)}" alt="Cover art">`
            : `<div class="release-ph"></div>`
        }
        <div class="release-stamp">${SVG.disc}<span>LP · 2026</span></div>
      </div>
      <div class="release-body">
        <div class="release-eyebrow">Side A / Side B</div>
        <div class="release-title">Loose Tongue</div>
        <p class="release-desc">Recorded mostly live to tape over four nights. Eleven tracks. Mixed warm, mastered patient.</p>
        <ol class="tracklist">
          <li><span class="tk-num">01</span><span class="tk-name">First Light</span><span class="tk-time">3:42</span></li>
          <li><span class="tk-num">02</span><span class="tk-name">Long Way Around</span><span class="tk-time">4:11</span></li>
          <li><span class="tk-num">03</span><span class="tk-name">Loose Tongue</span><span class="tk-time">3:08</span></li>
          <li><span class="tk-num">04</span><span class="tk-name">Quiet Years</span><span class="tk-time">5:24</span></li>
          <li><span class="tk-num">05</span><span class="tk-name">Side B (Reprise)</span><span class="tk-time">2:47</span></li>
        </ol>
        <div class="release-actions">
          ${yt ? `<a href="${escapeHtml(yt)}" class="btn btn-primary" target="_blank" rel="noopener">${SVG.play} Listen on YouTube</a>` : `<a href="#shows" class="btn btn-primary">${SVG.play} Listen</a>`}
          ${ig ? `<a href="${escapeHtml(ig)}" class="btn btn-ghost" target="_blank" rel="noopener">${SVG.instagram} Follow</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>
<section id="discography">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Discography</div>
        <h2 class="section-title">Records, EPs &amp; <span class="ital">stray b-sides.</span></h2>
      </div>
      <p class="section-sub">Selected catalogue. Full archive available on streaming.</p>
    </div>
    <ol class="disc-list">
      <li class="disc reveal"><span class="disc-year">2026</span><div><div class="disc-title">Loose Tongue <span class="disc-tag">LP</span></div><div class="disc-where">Self-released · 11 tracks</div></div></li>
      <li class="disc reveal"><span class="disc-year">2024</span><div><div class="disc-title">Field Notes <span class="disc-tag">EP</span></div><div class="disc-where">Independent · 5 tracks</div></div></li>
      <li class="disc reveal"><span class="disc-year">2023</span><div><div class="disc-title">Single — <em>Slow Burner</em></div><div class="disc-where">Streaming everywhere</div></div></li>
      <li class="disc reveal"><span class="disc-year">2022</span><div><div class="disc-title">Debut LP — <em>Open Window</em></div><div class="disc-where">Available on vinyl</div></div></li>
    </ol>
  </div>
</section>
<section id="shows">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Live</div>
        <h2 class="section-title">On the road &amp; <span class="ital">in the room.</span></h2>
      </div>
      <p class="section-sub">Small rooms, late starts. Booking inquiries below.</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p class="partner-lede">Touring lightly through the year — solo and full-band sets, with occasional collaborations. Festival and listening-room friendly.</p>
        <ul class="show-list">
          <li class="show"><div class="show-date">Soon</div><div class="show-info"><b>Hometown release night</b><span>${location || "TBA"} · full band</span></div><span class="show-tag">Booking</span></li>
          <li class="show"><div class="show-date">Q3</div><div class="show-info"><b>Listening room tour</b><span>Selected cities · solo</span></div><span class="show-tag">Confirmed</span></li>
          <li class="show"><div class="show-date">Q4</div><div class="show-info"><b>Festival appearance</b><span>Lineup TBA</span></div><span class="show-tag">Hold</span></li>
        </ul>
      </div>
      <div class="contact-card reveal">
        <div class="contact-head">
          <div class="section-label">// Bookings</div>
          <div class="contact-title">Bring the show.</div>
          <p class="contact-sub">Bookings, sync &amp; press — direct line below.</p>
        </div>
        <div class="contact-links">
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink primary">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
          ${yt ? `<a href="${escapeHtml(yt)}" class="plink" target="_blank" rel="noopener">${SVG.youtube} YouTube</a>` : ""}
          ${ig ? `<a href="${escapeHtml(ig)}" class="plink" target="_blank" rel="noopener">${SVG.instagram} Instagram</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener">${SVG.twitter} Twitter</a>` : ""}
          ${location ? `<div class="plink static">${SVG.pin} ${escapeHtml(location)}</div>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`
    : "";

  const heroStats = isMusician
    ? [
        { label: "Records", value: "04" },
        { label: "Tape · digital", value: "both" },
        { label: "Status", value: t.status },
      ]
    : [
        { label: "Studio practice", value: "active" },
        { label: "Editions", value: "limited" },
        { label: "Status", value: t.status },
      ];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: t.jobTitle,
    description: profileData.bio || taglineRaw,
    url: `https://${ensName}.limo`,
    address: location || undefined,
    sameAs: [tw, ig, yt].filter(Boolean),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — ${t.jobTitle}${taglineRaw ? ` · ${tagline}` : ""}</title>
<meta name="description" content="${tagline || (isMusician ? "Musician — records, releases & live shows." : "Visual artist — studio practice, exhibitions & commissions.")}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${tagline || (isMusician ? "Musician" : "Visual artist")}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${t.fontsHref}" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:${t.bg};--bg-1:${t.bg1};--bg-2:${t.bg2};--bg-3:${t.bg3};
  --line:${t.line};--line-2:${t.line2};
  --ink:${t.ink};--ink-2:${t.ink2};--ink-3:${t.ink3};--ink-4:${t.ink4};
  --accent:${t.accent};--accent-2:${t.accent2};
  --grad:${t.gradient};--grad-soft:${t.gradSoft};
}
html{scroll-behavior:smooth}
body{font-family:${t.bodyFont};background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -8%,${t.accent}1f,transparent 60%),radial-gradient(ellipse 700px 500px at 88% 30%,${t.accent2}1a,transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:radial-gradient(circle at 50% 50%,transparent 0,rgba(0,0,0,.35) 100%);pointer-events:none;z-index:0}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.ital{font-family:${t.italFont};font-style:italic;font-weight:400;letter-spacing:-.02em;color:var(--accent)}
.section-title .ital{color:var(--ink-2)}
/* nav */
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:${t.bg}b3;border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:${t.monoFont};font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px var(--accent);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s,background .2s}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--ink) !important;color:var(--bg) !important;font-weight:600 !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
/* hero */
.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
${
  bannerImg
    ? `.hero::before{content:'';position:absolute;inset:0;background-image:url('${escapeHtml(
        bannerImg
      )}');background-size:cover;background-position:center;opacity:.18;filter:blur(6px) saturate(.85);z-index:0}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 0,${t.bg} 90%);z-index:1}`
    : ""
}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:${t.monoFont};font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}
.hero h1{font-family:${t.displayFont};font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:600;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px}
.hero-tag{font-family:${t.italFont};font-style:italic;font-size:1.1rem;color:var(--accent);margin-bottom:14px;letter-spacing:.01em}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--ink);color:var(--bg)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px ${t.accent}26}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.btn svg{width:14px;height:14px}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:${t.monoFont};font-size:1.6rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.75rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:${isMusician ? "1" : "4/5"};border-radius:${isMusician ? "12px" : "20px"};overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card .ph{width:100%;height:100%;background:var(--grad);opacity:.4}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,${t.bg}d9 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:${t.monoFont};font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-glow{position:absolute;inset:-2px;border-radius:${isMusician ? "14px" : "22px"};background:var(--grad);z-index:-1;opacity:.45;filter:blur(22px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:${t.monoFont};font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3)}
.profile-meta-row b{color:var(--ink);font-weight:500}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:220px}}
/* sections */
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:${t.monoFont};font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-family:${t.displayFont};font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}
/* artist works */
.works-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
@media(max-width:880px){.works-grid{grid-template-columns:1fr}}
.work{background:var(--bg-1);border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:transform .25s,border-color .25s}
.work:hover{transform:translateY(-3px);border-color:var(--line-2)}
.work-frame{aspect-ratio:4/3;overflow:hidden;background:var(--bg-2)}
.work-frame img{width:100%;height:100%;object-fit:cover;display:block}
.work-ph{width:100%;height:100%;background:var(--grad-soft);position:relative}
.work-ph::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at calc(20% + var(--i,1)*15%) calc(30% + var(--i,1)*10%),${t.accent}33,transparent 60%),radial-gradient(circle at calc(80% - var(--i,1)*10%) calc(70% + var(--i,1)*5%),${t.accent2}26,transparent 70%)}
.work-meta{padding:18px 22px;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.work-title{font-family:${t.italFont};font-style:italic;font-size:1.2rem;color:var(--ink)}
.work-info{display:flex;flex-direction:column;align-items:flex-end;font-family:${t.monoFont};font-size:.78rem;color:var(--ink-3);gap:2px}
/* exhibitions */
.exh-list{list-style:none;border-top:1px solid var(--line)}
.exh{display:grid;grid-template-columns:80px 1fr;gap:24px;padding:22px 0;border-bottom:1px solid var(--line);align-items:baseline}
.exh-year{font-family:${t.monoFont};font-size:.95rem;color:var(--accent);font-weight:500}
.exh-title{font-size:1.05rem;color:var(--ink);margin-bottom:4px}
.exh-title em{font-family:${t.italFont};font-style:italic;color:var(--ink)}
.exh-where{color:var(--ink-3);font-size:.9rem}
/* musician release card */
.release-card{display:grid;grid-template-columns:340px 1fr;gap:48px;align-items:flex-start;padding:36px;background:linear-gradient(135deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:20px;position:relative;overflow:hidden}
.release-card::before{content:'';position:absolute;top:-30%;right:-15%;width:420px;height:420px;background:radial-gradient(circle,${t.accent}1f,transparent 70%);pointer-events:none}
.release-cover{position:relative;width:100%;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-3);box-shadow:0 30px 80px rgba(0,0,0,.5)}
.release-cover img{width:100%;height:100%;object-fit:cover}
.release-ph{width:100%;height:100%;background:var(--grad);position:relative}
.release-ph::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 30% 30%,rgba(0,0,0,.4),transparent 70%)}
.release-stamp{position:absolute;bottom:14px;left:14px;display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);font-family:${t.monoFont};font-size:.72rem;color:var(--ink);border:1px solid rgba(255,255,255,.08)}
.release-stamp svg{width:14px;height:14px;color:var(--accent)}
.release-body{position:relative;z-index:1}
.release-eyebrow{font-family:${t.monoFont};font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3);margin-bottom:8px}
.release-title{font-family:${t.displayFont};font-size:2.4rem;font-weight:700;letter-spacing:-.025em;margin-bottom:14px}
.release-desc{color:var(--ink-2);font-size:1rem;margin-bottom:22px;max-width:440px}
.tracklist{list-style:none;border-top:1px solid var(--line);margin-bottom:24px}
.tracklist li{display:grid;grid-template-columns:36px 1fr auto;gap:14px;padding:11px 0;border-bottom:1px solid var(--line);font-family:${t.monoFont};font-size:.88rem;align-items:baseline}
.tk-num{color:var(--ink-3)}
.tk-name{color:var(--ink);font-family:${t.bodyFont};font-size:.96rem;font-weight:500}
.tk-time{color:var(--ink-3)}
.release-actions{display:flex;gap:10px;flex-wrap:wrap}
@media(max-width:880px){.release-card{grid-template-columns:1fr;padding:24px;gap:28px}.release-cover{max-width:280px}}
/* discography */
.disc-list{list-style:none;border-top:1px solid var(--line)}
.disc{display:grid;grid-template-columns:80px 1fr;gap:24px;padding:22px 0;border-bottom:1px solid var(--line);align-items:baseline}
.disc-year{font-family:${t.monoFont};font-size:.95rem;color:var(--accent);font-weight:500}
.disc-title{font-size:1.05rem;color:var(--ink);margin-bottom:4px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.disc-title em{font-family:${t.italFont};font-style:italic}
.disc-tag{font-family:${t.monoFont};font-size:.66rem;text-transform:uppercase;letter-spacing:.1em;padding:2px 7px;border-radius:4px;background:${t.accent}1a;color:var(--accent);border:1px solid ${t.accent}33}
.disc-where{color:var(--ink-3);font-size:.9rem}
/* shows list */
.show-list{list-style:none;display:grid;gap:12px;margin-top:24px}
.show{display:grid;grid-template-columns:80px 1fr auto;gap:16px;padding:16px 18px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);align-items:center}
.show-date{font-family:${t.monoFont};font-size:.9rem;color:var(--accent)}
.show-info{display:flex;flex-direction:column}
.show-info b{font-weight:600;letter-spacing:-.01em}
.show-info span{color:var(--ink-3);font-size:.86rem;margin-top:2px}
.show-tag{font-family:${t.monoFont};font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3);padding:4px 9px;border-radius:5px;border:1px solid var(--line-2)}
/* partner-grid + contact (shared) */
.partner-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.partner-lede{font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty}
.partner-pillars{display:grid;gap:14px;margin-top:28px}
.pillar{display:flex;gap:16px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s}
.pillar:hover{border-color:var(--line-2);transform:translateX(4px)}
.pillar-num{font-family:${t.monoFont};font-size:.82rem;color:var(--ink-3);font-weight:500;min-width:32px;padding-top:1px}
.pillar-body h4{font-size:1.02rem;font-weight:600;letter-spacing:-.01em}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${t.accent}99,${t.accent2}99,transparent)}
.contact-head{margin-bottom:22px}
.contact-title{font-family:${t.displayFont};font-size:1.4rem;font-weight:600;letter-spacing:-.015em;margin-top:6px}
.contact-sub{color:var(--ink-3);font-size:.92rem;margin-top:4px}
.contact-links{display:flex;flex-direction:column;gap:10px}
.plink{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink svg{width:16px;height:16px;flex-shrink:0}
.plink.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary:hover{background:transparent;color:var(--ink)}
.plink.static{background:transparent;cursor:default;color:var(--ink-2)}
.plink.static:hover{background:transparent;color:var(--ink-2);border-color:var(--line-2)}
/* footer */
footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:${t.monoFont};font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:${t.monoFont};font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
@media(max-width:480px){.exh,.disc{grid-template-columns:60px 1fr;gap:14px}.show{grid-template-columns:60px 1fr;gap:12px}.show-tag{display:none}.release-title{font-size:1.9rem}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      ${isMusician ? '<a href="#latest">Latest</a><a href="#discography">Records</a><a href="#shows">Live</a>' : '<a href="#works">Works</a><a href="#exhibitions">Exhibitions</a><a href="#commissions">Commissions</a>'}
      <a href="${isMusician ? "#shows" : "#commissions"}" class="nav-cta">${t.navCta}</a>
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>${escapeHtml(t.eyebrowLabel)}</span></div>
        <h1>${heroH1}</h1>
        ${tagline && !isMusician ? `<div class="hero-tag">${tagline}</div>` : ""}
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          <a href="${isMusician ? "#latest" : "#works"}" class="btn btn-primary">${t.heroCtaPrimary} ${SVG.arrowRight}</a>
          <a href="${isMusician ? "#shows" : "#commissions"}" class="btn btn-ghost">${t.heroCtaGhost}</a>
        </div>
        <div class="hero-stats">
          ${heroStats
            .map(
              (s) =>
                `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`
            )
            .join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div class="ph"></div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">${escapeHtml(t.jobTitle)}</span></div>
        </div>
        <div class="profile-meta">
          ${location ? `<div class="profile-meta-row"><span>based</span><b>${location}</b></div>` : ""}
          ${taglineRaw ? `<div class="profile-meta-row"><span>${isMusician ? "genre" : "medium"}</span><b>${tagline}</b></div>` : ""}
          <div class="profile-meta-row"><span>status</span><b style="color:var(--accent)">● ${escapeHtml(t.status)}</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${artistSections}
${musicianSections}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || taglineRaw || (isMusician ? "Records, releases & live shows." : "Studio practice, exhibitions & commissions."))}</p>
      </div>
      <div class="foot-col">
        <h5>${isMusician ? "Catalog" : "Studio"}</h5>
        <a href="${isMusician ? "#latest" : "#works"}">${isMusician ? "Latest release" : "Selected works"}</a>
        <a href="${isMusician ? "#discography" : "#exhibitions"}">${isMusician ? "Discography" : "Exhibitions"}</a>
        <a href="${isMusician ? "#shows" : "#commissions"}">${isMusician ? "Live shows" : "Commissions"}</a>
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${ig ? `<a href="${escapeHtml(ig)}" target="_blank" rel="noopener">Instagram</a>` : ""}
        ${yt ? `<a href="${escapeHtml(yt)}" target="_blank" rel="noopener">YouTube</a>` : ""}
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">Twitter</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(profileData.displayName || ensName)} — All rights reserved.</span>
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

export function GenericCreativeTemplate({ profileData, ensName, uploadedImages, templateId }: Props) {
  const html = generateGenericCreativeHTML(profileData, ensName, uploadedImages, templateId);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Creative Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
