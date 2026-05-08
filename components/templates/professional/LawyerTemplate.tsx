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
  scales: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 21h14M7 8l-4 8a4 4 0 0 0 8 0L7 8zM17 8l-4 8a4 4 0 0 0 8 0l-4-8zM3 7l9-2 9 2"/></svg>`,
  gavel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 3.18 4.1 1 1 0 0 1 4.18 3h4.09a1 1 0 0 1 1 .75c.12.94.32 1.86.59 2.74a1 1 0 0 1-.23 1L8 9.27a16 16 0 0 0 6.73 6.73l1.78-1.63a1 1 0 0 1 1-.23c.88.27 1.8.47 2.74.59a1 1 0 0 1 .75 1V21Z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
};

const PRACTICE_HINTS: Record<string, string> = {
  "corporate law": "Formation, M&A, governance, and commercial agreements.",
  "corporate": "Formation, M&A, governance, and commercial agreements.",
  "real estate": "Acquisitions, leasing, zoning, and complex transactions.",
  "intellectual property": "Patents, trademarks, copyright, and licensing.",
  "ip": "Patents, trademarks, copyright, and licensing.",
  "litigation": "Civil disputes, commercial litigation, and trial advocacy.",
  "family law": "Divorce, custody, prenuptial agreements, and mediation.",
  "family": "Divorce, custody, prenuptial agreements, and mediation.",
  "tax": "Planning, controversy, and structuring across jurisdictions.",
  "tax law": "Planning, controversy, and structuring across jurisdictions.",
  "immigration": "Visas, residency, naturalization, and compliance.",
  "criminal defense": "White-collar, federal, and state criminal matters.",
  "criminal": "White-collar, federal, and state criminal matters.",
  "employment": "Workplace disputes, contracts, and compliance counsel.",
  "employment law": "Workplace disputes, contracts, and compliance counsel.",
  "estate planning": "Wills, trusts, succession, and wealth transfer.",
  "estate": "Wills, trusts, succession, and wealth transfer.",
  "personal injury": "Plaintiff representation in negligence and tort claims.",
  "bankruptcy": "Restructuring, insolvency, and creditor representation.",
  "securities": "Capital markets, compliance, and enforcement defense.",
  "blockchain": "Digital assets, token frameworks, and on-chain compliance.",
  "crypto": "Digital assets, token frameworks, and on-chain compliance.",
  "web3": "Digital assets, token frameworks, and on-chain compliance.",
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function practiceHint(area: string): string {
  const k = area.trim().toLowerCase();
  return PRACTICE_HINTS[k] || "Strategic counsel and trusted representation.";
}

function twitterUrl(handle: string | undefined): string {
  if (!handle) return "";
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://x.com/${h}` : "";
}

function linkedinUrl(handle: string | undefined): string {
  if (!handle) return "";
  return handle.startsWith("http") ? handle : `https://www.linkedin.com/in/${handle}`;
}

function initials(name: string): string {
  const parts = name.replace(/[^A-Za-z\s]/g, "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "ESQ";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function generateLawyerHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const rawName = profileData.displayName || ensName;
  const name = escapeHtml(rawName);
  const firm = escapeHtml(profileData.firm || "");
  const bio = escapeHtml(
    profileData.bio ||
      "Counselor at law focused on principled advocacy, careful drafting, and outcomes that hold up under scrutiny."
  );
  const areas: string[] = profileData.practiceAreas || [];
  const bar = escapeHtml(profileData.barNumber || "");
  const barState = escapeHtml(profileData.barState || "");
  const consultUrl = profileData.consultationUrl || "";
  const email = profileData.email || "";
  const phone = (profileData as Partial<ProfileData> & { phone?: string }).phone || "";
  const location = escapeHtml(profileData.location || "");
  const tw = twitterUrl(profileData.twitter);
  const li = linkedinUrl(profileData.linkedin);
  const profileImg = uploadedImages["profileImage"] || "";
  const monogram = initials(rawName);
  const year = new Date().getFullYear();

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: rawName,
    description: profileData.bio || `Attorney at ${profileData.firm || rawName}.`,
    url: `https://${ensName}.limo`,
    knowsAbout: areas,
    address: location ? { "@type": "PostalAddress", addressLocality: profileData.location } : undefined,
    sameAs: [tw, li].filter(Boolean),
    worksFor: profileData.firm ? { "@type": "LegalService", name: profileData.firm } : undefined,
  });

  const heroBarLine = (bar || barState)
    ? `Bar No. ${bar || "—"}${barState ? ` &middot; ${barState}` : ""}`
    : "Bar admitted attorney";

  const areasHTML = areas.length > 0 ? `
<section id="practice">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — Practice Areas</div>
        <h2 class="section-title">Counsel across<br><span class="ital">complex matters.</span></h2>
      </div>
      <p class="section-sub">${areas.length} core practice area${areas.length !== 1 ? "s" : ""} — every engagement met with precision and discretion.</p>
    </div>
    <div class="areas-grid">
      ${areas.map((a, i) => `
      <article class="area-card reveal">
        <div class="area-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="area-body">
          <h3 class="area-name">${escapeHtml(a)}</h3>
          <p class="area-hint">${escapeHtml(practiceHint(a))}</p>
        </div>
        <div class="area-icon">${SVG.document}</div>
      </article>`).join("")}
    </div>
  </div>
</section>` : "";

  const credentialsHTML = (bar || barState || firm) ? `
<section id="credentials">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Credentials &amp; Bar Admissions</div>
        <h2 class="section-title">A record built on<br><span class="ital">due diligence.</span></h2>
      </div>
      <p class="section-sub">Verifiable admissions and affiliations — the foundation for every representation.</p>
    </div>
    <div class="cred-card reveal">
      <div class="cred-row">
        <div class="cred-label">Bar Number</div>
        <div class="cred-value">${bar || "—"}</div>
      </div>
      <div class="cred-row">
        <div class="cred-label">Jurisdiction</div>
        <div class="cred-value">${barState || "—"}</div>
      </div>
      <div class="cred-row">
        <div class="cred-label">Year of Call</div>
        <div class="cred-value">—</div>
      </div>
      ${firm ? `<div class="cred-row">
        <div class="cred-label">Firm</div>
        <div class="cred-value">${firm}</div>
      </div>` : ""}
      ${location ? `<div class="cred-row">
        <div class="cred-label">Location</div>
        <div class="cred-value">${location}</div>
      </div>` : ""}
      <div class="cred-row">
        <div class="cred-label">Engagement</div>
        <div class="cred-value"><span class="dot-amber"></span>Accepting select matters</div>
      </div>
    </div>
  </div>
</section>` : "";

  const contactHTML = `
<section id="consult">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Consultation</div>
        <h2 class="section-title">Confidential review<br>of <span class="ital">your matter.</span></h2>
      </div>
      <p class="section-sub">Initial consultations are private, focused, and oriented toward the next concrete step.</p>
    </div>
    <div class="consult-grid">
      <div class="reveal">
        <p class="consult-copy">Whether you're navigating a transaction, a dispute, or planning ahead, the first conversation establishes scope, strategy, and the path forward. Each engagement is bounded by clear terms and protected by privilege.</p>
        <div class="consult-pillars">
          <div class="pillar"><div class="pillar-num">01</div><div class="pillar-body"><h4>Scope &amp; strategy</h4><p>Plain-language assessment of what's at stake.</p></div></div>
          <div class="pillar"><div class="pillar-num">02</div><div class="pillar-body"><h4>Engagement terms</h4><p>Defined deliverables, timeline, and fee structure.</p></div></div>
          <div class="pillar"><div class="pillar-num">03</div><div class="pillar-body"><h4>Privileged counsel</h4><p>Direct attorney access throughout the matter.</p></div></div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div class="contact-head">
          <div class="section-label" style="margin-bottom:6px;">// Direct line</div>
          <div class="contact-title">Schedule a consultation</div>
          <p class="contact-sub">Reach out via the channels below. Inquiries are reviewed personally.</p>
        </div>
        <div class="contact-list">
          ${consultUrl ? `<a href="${escapeHtml(consultUrl)}" class="plink primary" target="_blank" rel="noopener">${SVG.scales}<span>Book consultation</span>${SVG.arrow}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink">${SVG.mail}<span>${escapeHtml(email)}</span></a>` : ""}
          ${phone ? `<a href="tel:${escapeHtml(phone)}" class="plink">${SVG.phone}<span>${escapeHtml(phone)}</span></a>` : ""}
          ${li ? `<a href="${escapeHtml(li)}" class="plink" target="_blank" rel="noopener">${SVG.linkedin}<span>LinkedIn</span></a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener">${SVG.twitter}<span>${escapeHtml(profileData.twitter || "")}</span></a>` : ""}
          ${location ? `<div class="plink static">${SVG.pin}<span>${location}</span></div>` : ""}
        </div>
        <div class="contact-foot">Privileged &amp; confidential. No attorney-client relationship is formed by inquiry.</div>
      </div>
    </div>
  </div>
</section>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name}, Esq. — ${firm || "Attorney at Law"}</title>
<meta name="description" content="${name}, Esq. — ${firm ? escapeHtml(profileData.firm || "") + ". " : ""}${escapeHtml(profileData.bio || "Attorney at law.")}">
<meta property="og:title" content="${name}, Esq.">
<meta property="og:description" content="${firm || "Attorney at Law"}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0a0e1a;--bg-1:#0f1626;--bg-2:#141d31;--bg-3:#1a2540;--line:#1d2942;--line-2:#2a3958;--ink:#f3eede;--ink-2:#c0bfb1;--ink-3:#7d8094;--ink-4:#4f5468;--gold:#c9b26b;--gold-2:#e0c989;--gold-soft:rgba(201,178,107,.12);--navy:#0a1830;--amber:#f5b041;--grad:linear-gradient(135deg,#c9b26b 0%,#e0c989 100%);--grad-soft:linear-gradient(135deg,rgba(201,178,107,.10) 0%,rgba(224,201,137,.04) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,rgba(201,178,107,.10),transparent 60%),radial-gradient(ellipse 700px 500px at 88% 18%,rgba(201,178,107,.06),transparent 60%),radial-gradient(ellipse 900px 700px at 50% 110%,rgba(10,24,48,.6),transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(201,178,107,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,178,107,.025) 1px,transparent 1px);background-size:64px 64px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
a{color:inherit;text-decoration:none}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:rgba(10,14,26,.78);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:18px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.nav-brand .mono{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:1px solid var(--gold);color:var(--gold);font-family:'Instrument Serif',serif;font-size:.95rem;letter-spacing:0;border-radius:4px;background:rgba(201,178,107,.06)}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:6px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--gold) !important;color:var(--navy) !important;font-weight:600 !important;border:1px solid var(--gold)}
.nav-cta:hover{background:var(--gold-2) !important;color:var(--navy) !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:96px 0 88px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:64px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.76rem;font-weight:500;text-transform:uppercase;letter-spacing:.14em;color:var(--gold);padding:8px 14px;border:1px solid rgba(201,178,107,.3);border-radius:100px;background:rgba(201,178,107,.05);margin-bottom:32px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--gold);box-shadow:0 0 10px var(--gold)}
.hero h1{font-family:'Instrument Serif',serif;font-size:clamp(2.6rem,6vw,5rem);font-weight:400;letter-spacing:-.025em;line-height:1.02;margin-bottom:18px;color:var(--ink)}
.hero h1 .ital,.section-title .ital{font-style:italic;color:var(--gold);background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.hero-firm{font-family:'JetBrains Mono',monospace;font-size:.92rem;color:var(--gold);text-transform:uppercase;letter-spacing:.18em;margin-bottom:10px}
.hero-bar{font-size:.92rem;color:var(--ink-3);margin-bottom:28px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em}
.hero-bio{font-size:1.15rem;color:var(--ink-2);line-height:1.65;max-width:580px;margin-bottom:36px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 24px;border-radius:8px;font-weight:600;font-size:.94rem;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn svg{width:14px;height:14px}
.btn-primary{background:var(--gold);color:var(--navy);border-color:var(--gold)}
.btn-primary:hover{background:var(--gold-2);border-color:var(--gold-2);transform:translateY(-2px);box-shadow:0 12px 30px rgba(201,178,107,.25)}
.btn-ghost{background:rgba(255,255,255,.02);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(201,178,107,.06);border-color:var(--gold);color:var(--gold);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:20px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'Instrument Serif',serif;font-size:1.85rem;font-weight:400;color:var(--gold);letter-spacing:-.01em;line-height:1}
.stat-label{font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.14em;margin-top:8px;font-family:'JetBrains Mono',monospace}
.profile-frame{position:relative;width:300px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:4/5;border-radius:6px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.02)}
.profile-card .ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Instrument Serif',serif;font-size:5rem;color:var(--gold);background:linear-gradient(180deg,#1a2540,#0a1830)}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(10,14,26,.85) 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:.74rem;color:var(--ink);z-index:2;letter-spacing:.04em}
.profile-tag .role{color:var(--gold)}
.profile-glow{position:absolute;inset:-2px;border-radius:8px;background:var(--grad);z-index:-1;opacity:.18;filter:blur(24px)}
.profile-meta{margin-top:18px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.76rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3);padding:6px 0;border-bottom:1px dashed var(--line)}
.profile-meta-row:last-child{border-bottom:none}
.profile-meta-row b{color:var(--ink);font-weight:500}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:40px}.profile-frame{width:220px}}
section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.74rem;text-transform:uppercase;letter-spacing:.18em;color:var(--gold)}
.section-title{font-family:'Instrument Serif',serif;font-size:clamp(2rem,3.6vw,3rem);font-weight:400;letter-spacing:-.02em;line-height:1.08;margin-top:10px;color:var(--ink);text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1rem;max-width:480px;text-wrap:pretty;line-height:1.6}
.areas-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
@media(max-width:880px){.areas-grid{grid-template-columns:1fr}}
.area-card{position:relative;display:grid;grid-template-columns:auto 1fr auto;gap:22px;align-items:start;background:var(--bg-1);border:1px solid var(--line);border-radius:10px;padding:26px 28px;transition:all .25s ease;overflow:hidden}
.area-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.area-card:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 16px 40px rgba(0,0,0,.3)}
.area-card:hover::before{opacity:1}
.area-card>*{position:relative;z-index:1}
.area-num{font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--gold);font-weight:500;padding-top:4px;letter-spacing:.05em}
.area-body{flex:1;min-width:0}
.area-name{font-family:'Instrument Serif',serif;font-size:1.55rem;font-weight:400;letter-spacing:-.01em;line-height:1.15;margin-bottom:6px;color:var(--ink)}
.area-hint{color:var(--ink-2);font-size:.94rem;line-height:1.55;text-wrap:pretty}
.area-icon{width:34px;height:34px;display:flex;align-items:center;justify-content:center;color:var(--gold);opacity:.6;flex-shrink:0;padding-top:2px}
.area-icon svg{width:24px;height:24px}
.cred-card{background:linear-gradient(180deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:14px;padding:8px 36px;position:relative;overflow:hidden;max-width:780px}
.cred-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.7}
.cred-row{display:grid;grid-template-columns:200px 1fr;gap:24px;padding:22px 0;border-bottom:1px dashed var(--line);align-items:center}
.cred-row:last-child{border-bottom:none}
.cred-label{font-family:'JetBrains Mono',monospace;font-size:.74rem;text-transform:uppercase;letter-spacing:.16em;color:var(--ink-3)}
.cred-value{font-family:'Instrument Serif',serif;font-size:1.25rem;color:var(--ink);font-weight:400;letter-spacing:-.005em;display:flex;align-items:center;gap:10px}
.dot-amber{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--amber);box-shadow:0 0 10px var(--amber)}
@media(max-width:720px){.cred-row{grid-template-columns:1fr;gap:4px;padding:18px 0}}
.consult-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:60px;align-items:start}
@media(max-width:880px){.consult-grid{grid-template-columns:1fr;gap:40px}}
.consult-copy{font-size:1.08rem;color:var(--ink-2);line-height:1.7;max-width:500px;margin-bottom:32px;text-wrap:pretty}
.consult-pillars{display:grid;gap:14px}
.pillar{display:flex;gap:18px;padding:20px 22px;border:1px solid var(--line);border-radius:10px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--gold);transform:translateX(4px);background:rgba(201,178,107,.04)}
.pillar-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--gold);font-weight:500;min-width:32px;padding-top:2px;letter-spacing:.05em}
.pillar-body h4{font-family:'Instrument Serif',serif;font-size:1.15rem;font-weight:400;margin-bottom:4px;letter-spacing:-.005em;color:var(--ink)}
.pillar-body p{color:var(--ink-3);font-size:.9rem;line-height:1.5}
.contact-card{background:linear-gradient(160deg,var(--bg-1) 0%,var(--bg-2) 100%);border:1px solid var(--line);border-radius:14px;padding:34px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.contact-head{margin-bottom:24px}
.contact-title{font-family:'Instrument Serif',serif;font-size:1.6rem;font-weight:400;letter-spacing:-.01em;color:var(--ink);margin-bottom:6px}
.contact-sub{color:var(--ink-3);font-size:.92rem;line-height:1.5}
.contact-list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.plink{display:inline-flex;align-items:center;gap:10px;padding:12px 16px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);font-size:.92rem;font-weight:500;transition:all .18s ease;text-decoration:none}
.plink span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.plink svg{width:16px;height:16px;flex-shrink:0;color:var(--ink-3)}
.plink:hover{background:var(--bg-2);border-color:var(--gold);color:var(--gold)}
.plink:hover svg{color:var(--gold)}
.plink.primary{background:var(--gold);color:var(--navy);border-color:var(--gold);font-weight:600}
.plink.primary svg{color:var(--navy)}
.plink.primary:hover{background:var(--gold-2);border-color:var(--gold-2);color:var(--navy);transform:translateY(-1px)}
.plink.primary:hover svg{color:var(--navy)}
.plink.static{cursor:default}
.plink.static:hover{background:var(--bg-3);border-color:var(--line-2);color:var(--ink)}
.plink.static:hover svg{color:var(--ink-3)}
.contact-foot{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--ink-4);text-transform:uppercase;letter-spacing:.12em;line-height:1.6;padding-top:18px;border-top:1px dashed var(--line)}
footer{padding:64px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1;background:linear-gradient(180deg,transparent,rgba(10,24,48,.4))}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.7rem;text-transform:uppercase;letter-spacing:.16em;color:var(--gold);margin-bottom:16px}
.foot-col a,.foot-col span.foot-item{display:block;color:var(--ink-2);padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--gold)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.65;max-width:380px;text-wrap:pretty;font-family:'Instrument Serif',serif;font-style:italic}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:30px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);flex-wrap:wrap;gap:16px;letter-spacing:.04em}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px var(--gold)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
@media(max-width:480px){.container{padding:0 20px}.nav-inner{padding:14px 20px}.hero{padding:64px 0 56px}.section-head{margin-bottom:32px}section{padding:64px 0}.area-card{grid-template-columns:auto 1fr;padding:22px}.area-icon{display:none}.contact-card{padding:24px}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="mono">${escapeHtml(monogram)}</span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      ${areas.length > 0 ? '<a href="#practice">Practice</a>' : ""}
      ${(bar || barState || firm) ? '<a href="#credentials">Credentials</a>' : ""}
      <a href="#consult">Consultation</a>
      ${consultUrl ? `<a href="${escapeHtml(consultUrl)}" target="_blank" rel="noopener" class="nav-cta">Schedule consultation</a>` : `<a href="#consult" class="nav-cta">Schedule consultation</a>`}
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>Attorney at Law &middot; ${year}</span></div>
        <h1>${name},<br><span class="ital">Esq.</span></h1>
        ${firm ? `<div class="hero-firm">${firm}</div>` : ""}
        <div class="hero-bar">${heroBarLine}</div>
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          ${consultUrl ? `<a href="${escapeHtml(consultUrl)}" class="btn btn-primary" target="_blank" rel="noopener">${SVG.scales}<span>Schedule consultation</span>${SVG.arrowRight}</a>` : `<a href="#consult" class="btn btn-primary">${SVG.scales}<span>Schedule consultation</span>${SVG.arrowRight}</a>`}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="btn btn-ghost">${SVG.mail}<span>Email counsel</span></a>` : `<a href="#consult" class="btn btn-ghost">${SVG.document}<span>Practice areas</span></a>`}
        </div>
        <div class="hero-stats">
          <div class="stat"><div class="stat-num">${areas.length || "—"}</div><div class="stat-label">Practice areas</div></div>
          <div class="stat"><div class="stat-num">${barState || "Bar"}</div><div class="stat-label">Jurisdiction</div></div>
          <div class="stat"><div class="stat-num">Esq.</div><div class="stat-label">Bar admitted</div></div>
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div class="ph">${escapeHtml(monogram)}</div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">Counsel</span></div>
        </div>
        <div class="profile-meta">
          ${firm ? `<div class="profile-meta-row"><span>firm</span><b>${firm}</b></div>` : ""}
          ${barState ? `<div class="profile-meta-row"><span>bar</span><b>${barState}${bar ? ` &middot; ${bar}` : ""}</b></div>` : ""}
          ${location ? `<div class="profile-meta-row"><span>based</span><b>${location}</b></div>` : ""}
          <div class="profile-meta-row"><span>status</span><b style="color:var(--amber)">&#9679; accepting matters</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${areasHTML}
${credentialsHTML}
${contactHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:18px;"><span class="mono">${escapeHtml(monogram)}</span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${firm ? firm + ". " : ""}Counsel of record &mdash; principled advocacy and careful drafting.</p>
      </div>
      ${areas.length > 0 ? `<div class="foot-col"><h5>Practice</h5>${areas.slice(0, 6).map((a) => `<a href="#practice">${escapeHtml(a)}</a>`).join("")}</div>` : `<div class="foot-col"><h5>Sections</h5><a href="#consult">Consultation</a><a href="#credentials">Credentials</a></div>`}
      <div class="foot-col">
        <h5>Contact</h5>
        ${consultUrl ? `<a href="${escapeHtml(consultUrl)}" target="_blank" rel="noopener">Schedule consultation</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
        ${phone ? `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>` : ""}
        ${li ? `<a href="${escapeHtml(li)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">X / Twitter</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; ${year} ${name}, Esq. &mdash; All rights reserved.</span>
      <span class="built"><span class="dot"></span>Built with buildsite.eth &middot; Hosted on IPFS</span>
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

export function LawyerTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateLawyerHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Lawyer Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
