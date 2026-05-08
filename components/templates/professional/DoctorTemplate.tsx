"use client";
import { ProfileData } from "@/lib/store";

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
}

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  arrowUp: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  stethoscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h2v6a4 4 0 0 0 8 0V3h2"/><path d="M9 18a5 5 0 0 0 10 0v-3"/><circle cx="19" cy="12" r="3"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>`,
  envelope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>`,
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function initials(s: string): string {
  const parts = s.replace(/[^A-Za-z0-9 ]/g, "").trim().split(/\s+/);
  if (parts.length === 0) return "•";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function generateDoctorHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  const displayName = profileData.displayName || ensName.replace(/\.eth$/, "");
  const name = escapeHtml(displayName);
  const specialty = escapeHtml(profileData.specialty || "Internal Medicine");
  const hospital = escapeHtml(profileData.hospital || "");
  const location = escapeHtml(profileData.location || "");
  const bio = escapeHtml(
    profileData.bio ||
      "Dedicated to evidence-based, patient-centered care. Building lasting relationships with patients through clear communication, thorough examination, and individualized treatment plans."
  );
  const credentials: string[] = profileData.credentials || [];
  const languages: string[] = profileData.languages || [];
  const apptUrl = profileData.appointmentUrl || "";
  const email = profileData.email || "";
  const phone = (profileData as Partial<ProfileData> & { phone?: string }).phone || "";
  const linkedin = profileData.linkedin
    ? profileData.linkedin.startsWith("http")
      ? profileData.linkedin
      : `https://www.linkedin.com/in/${profileData.linkedin}`
    : "";
  const profileImg = uploadedImages["profileImage"] || "";

  const pillars = [
    {
      icon: SVG.heart,
      title: "Patient-first care",
      body: "Every visit begins with listening. Treatment plans are built around your goals, history, and lifestyle — never one-size-fits-all.",
    },
    {
      icon: SVG.shield,
      title: "Evidence-based medicine",
      body: "Decisions grounded in current clinical guidelines and peer-reviewed research, paired with the judgment that comes from years of practice.",
    },
    {
      icon: SVG.stethoscope,
      title: "Continuity of care",
      body: "Long-term relationships, coordinated referrals, and timely follow-up — so nothing falls through the cracks between appointments.",
    },
  ];

  const credChips = credentials.length
    ? credentials
    : ["Board Certified", "MD", "Member, AMA"];

  const langPills = languages.length ? languages : ["English"];

  const credCount = credChips.length;
  const yearsLabel = "Years in practice";

  const heroStats = [
    { value: String(credCount).padStart(2, "0"), label: "Credentials" },
    { value: String(langPills.length).padStart(2, "0"), label: "Languages" },
    { value: "✓", label: "Accepting patients" },
  ];

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Physician",
    name: `Dr. ${displayName}`,
    alternateName: ensName,
    description: profileData.bio || `${specialty} physician`,
    medicalSpecialty: profileData.specialty || "Internal Medicine",
    affiliation: profileData.hospital || undefined,
    address: profileData.location || undefined,
    email: email || undefined,
    telephone: phone || undefined,
    url: `https://${ensName}.limo`,
    knowsLanguage: langPills,
  });

  const navCta = apptUrl
    ? `<a href="${escapeHtml(apptUrl)}" target="_blank" rel="noopener" class="nav-cta">Book appointment ${SVG.arrow}</a>`
    : email
    ? `<a href="mailto:${escapeHtml(email)}" class="nav-cta">Contact ${SVG.arrow}</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dr. ${name} — ${specialty}</title>
<meta name="description" content="Dr. ${name}, ${specialty}${hospital ? ` at ${hospital}` : ""}. ${escapeHtml(profileData.bio || "Accepting new patients.")}">
<meta property="og:title" content="Dr. ${name} — ${specialty}">
<meta property="og:description" content="${specialty}${hospital ? ` · ${hospital}` : ""}">
<meta property="og:type" content="profile">
${profileImg ? `<meta property="og:image" content="${escapeHtml(profileImg)}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#f7f9fc;--bg-1:#ffffff;--bg-2:#f1f5f9;--bg-3:#e6edf5;--line:#e2e8f0;--line-2:#cbd5e1;--ink:#0a1628;--ink-2:#334155;--ink-3:#64748b;--ink-4:#94a3b8;--teal:#0ea5a4;--teal-2:#14b8a6;--sky:#0284c7;--gold:#f59e0b;--grad:linear-gradient(135deg,#0ea5a4 0%,#14b8a6 100%);--grad-soft:linear-gradient(135deg,rgba(14,165,164,.08) 0%,rgba(20,184,166,.08) 100%)}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk','Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 700px 500px at 12% -5%,rgba(14,165,164,.10),transparent 60%),radial-gradient(ellipse 600px 400px at 90% 10%,rgba(2,132,199,.06),transparent 60%);pointer-events:none;z-index:0}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(160%);-webkit-backdrop-filter:blur(20px) saturate(160%);background:rgba(255,255,255,.78);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:.92rem;font-weight:500;letter-spacing:-.01em;color:var(--ink)}
.nav-brand .mono{width:32px;height:32px;border-radius:8px;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:.78rem;letter-spacing:.04em}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{display:inline-flex !important;align-items:center;gap:8px;background:var(--ink) !important;color:#fff !important;font-weight:600 !important;padding:10px 16px !important}
.nav-cta:hover{background:var(--teal) !important;color:#fff !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}
.hero{padding:88px 0 72px;border-bottom:1px solid var(--line);position:relative;overflow:hidden}
.hero-inner{display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center;position:relative;z-index:2}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:.75rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--teal);padding:7px 14px;border:1px solid rgba(14,165,164,.25);border-radius:100px;background:rgba(14,165,164,.06);margin-bottom:26px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.2rem);font-weight:600;letter-spacing:-.035em;line-height:1.04;margin-bottom:14px;color:var(--ink)}
.hero h1 .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-.02em;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero-meta{display:flex;align-items:center;gap:18px;color:var(--ink-3);font-size:.95rem;margin-bottom:22px;flex-wrap:wrap}
.hero-meta span{display:inline-flex;align-items:center;gap:6px}
.hero-meta svg{width:16px;height:16px;color:var(--teal)}
.hero-creds{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px}
.cred-chip{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:500;text-transform:uppercase;letter-spacing:.08em;padding:5px 10px;border-radius:6px;background:var(--bg-1);border:1px solid var(--line);color:var(--ink-2)}
.cred-chip svg{width:11px;height:11px;color:var(--teal)}
.hero-bio{font-size:1.12rem;color:var(--ink-2);line-height:1.65;max-width:600px;margin-bottom:32px;text-wrap:pretty}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:38px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--ink);color:#fff}
.btn-primary:hover{background:var(--teal);transform:translateY(-2px);box-shadow:0 14px 32px rgba(14,165,164,.25)}
.btn-ghost{background:var(--bg-1);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:var(--bg-2);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:'JetBrains Mono',monospace;font-size:1.45rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.72rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px}
.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:50%;overflow:hidden;border:6px solid #fff;box-shadow:0 30px 80px -20px rgba(14,165,164,.35),0 10px 30px -10px rgba(10,22,40,.15);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover}
.profile-card .ph{width:100%;height:100%;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Instrument Serif',serif;font-size:4rem;letter-spacing:.02em}
.profile-glow{position:absolute;inset:-12px;border-radius:50%;background:var(--grad);z-index:-1;opacity:.35;filter:blur(28px)}
.profile-meta{margin-top:18px;display:flex;flex-direction:column;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.78rem;background:var(--bg-1);border:1px solid var(--line);border-radius:12px;padding:14px 16px}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3);gap:12px}
.profile-meta-row b{color:var(--ink);font-weight:500;text-align:right;text-transform:none;letter-spacing:0}
.profile-meta-row span{text-transform:uppercase;letter-spacing:.08em}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:40px}.profile-frame{width:200px}}
section{padding:88px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:44px;gap:24px;flex-wrap:wrap}
.section-label{font-family:'JetBrains Mono',monospace;font-size:.75rem;text-transform:uppercase;letter-spacing:.15em;color:var(--teal)}
.section-title{font-size:clamp(1.75rem,3.2vw,2.5rem);font-weight:600;letter-spacing:-.02em;line-height:1.12;margin-top:8px;text-wrap:balance;color:var(--ink)}
.section-title .ital{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--ink-2)}
.section-sub{color:var(--ink-2);font-size:1rem;max-width:460px;text-wrap:pretty}
.pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:880px){.pillars-grid{grid-template-columns:1fr}}
.pillar-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:30px 28px;transition:all .25s ease;position:relative;overflow:hidden}
.pillar-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--grad);opacity:0;transition:opacity .25s ease}
.pillar-card:hover{border-color:var(--line-2);transform:translateY(-3px);box-shadow:0 20px 40px -20px rgba(10,22,40,.12)}
.pillar-card:hover::before{opacity:1}
.pillar-icon{width:42px;height:42px;border-radius:10px;background:var(--grad-soft);color:var(--teal);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
.pillar-icon svg{width:22px;height:22px}
.pillar-card h3{font-size:1.15rem;font-weight:600;letter-spacing:-.015em;margin-bottom:8px;color:var(--ink)}
.pillar-card p{color:var(--ink-2);font-size:.96rem;line-height:1.6;text-wrap:pretty}
.creds-block{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;align-items:start}
@media(max-width:880px){.creds-block{grid-template-columns:1fr}}
.cred-list{display:flex;flex-direction:column;gap:10px}
.cred-row{display:flex;align-items:center;gap:14px;padding:16px 20px;background:var(--bg-1);border:1px solid var(--line);border-radius:12px;transition:all .2s ease}
.cred-row:hover{border-color:var(--teal);transform:translateX(4px)}
.cred-row .badge{width:32px;height:32px;border-radius:50%;background:var(--grad-soft);color:var(--teal);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cred-row .badge svg{width:16px;height:16px}
.cred-row .text{font-size:.98rem;color:var(--ink);font-weight:500}
.lang-pills{display:flex;flex-wrap:wrap;gap:10px}
.lang-pill{display:inline-flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;background:var(--bg-1);border:1px solid var(--line);border-radius:100px;font-size:.92rem;color:var(--ink-2);transition:all .2s ease}
.lang-pill:hover{border-color:var(--teal);color:var(--ink)}
.lang-pill .mono{width:28px;height:28px;border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:600}
.book-grid{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:start}
@media(max-width:880px){.book-grid{grid-template-columns:1fr;gap:40px}}
.book-pillars{display:grid;gap:12px;margin-top:26px}
.book-pillar{display:flex;gap:16px;padding:16px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.book-pillar:hover{border-color:var(--line-2);transform:translateX(4px)}
.book-pillar-num{font-family:'JetBrains Mono',monospace;font-size:.82rem;color:var(--teal);font-weight:600;min-width:28px;padding-top:1px}
.book-pillar h4{font-size:1rem;font-weight:600;margin-bottom:3px;letter-spacing:-.01em}
.book-pillar p{color:var(--ink-3);font-size:.88rem;line-height:1.5}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:18px;padding:34px;position:relative;overflow:hidden;box-shadow:0 24px 50px -28px rgba(10,22,40,.18)}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--grad)}
.contact-card .label{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--teal);margin-bottom:6px}
.contact-card .title{font-size:1.4rem;font-weight:600;letter-spacing:-.015em;margin-bottom:6px}
.contact-card .desc{color:var(--ink-3);font-size:.92rem;margin-bottom:22px}
.contact-rows{display:flex;flex-direction:column;gap:10px}
.contact-row{display:flex;align-items:center;gap:14px;padding:13px 16px;border-radius:10px;background:var(--bg-2);border:1px solid var(--line);text-decoration:none;color:var(--ink);font-size:.94rem;font-weight:500;transition:all .18s ease}
.contact-row:hover{background:var(--ink);color:#fff;border-color:var(--ink)}
.contact-row svg{width:16px;height:16px;color:var(--teal);flex-shrink:0;transition:color .18s ease}
.contact-row:hover svg{color:#fff}
.contact-row.primary{background:var(--ink);color:#fff;border-color:var(--ink)}
.contact-row.primary svg{color:var(--teal-2)}
.contact-row.primary:hover{background:var(--teal);border-color:var(--teal)}
.contact-row.primary:hover svg{color:#fff}
.contact-row .text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
footer{padding:56px 0 44px;border-top:1px solid var(--line);background:var(--bg-1);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:48px;margin-bottom:40px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:32px}}
.foot-col h5{font-family:'JetBrains Mono',monospace;font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--teal)}
.foot-tag{font-size:.98rem;color:var(--ink-3);line-height:1.6;max-width:340px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid var(--line);font-family:'JetBrains Mono',monospace;font-size:.78rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--teal);box-shadow:0 0 8px var(--teal)}
.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
@media(max-width:480px){.container{padding:0 20px}.hero{padding:60px 0 52px}section{padding:64px 0}.hero-stats .stat-num{font-size:1.2rem}.hero-meta{font-size:.88rem;gap:12px}.contact-card{padding:24px}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="mono">${escapeHtml(initials(displayName))}</span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      <a href="#approach">Approach</a>
      ${credChips.length > 0 ? '<a href="#credentials">Credentials</a>' : ""}
      <a href="#book">Book</a>
      ${navCta}
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>Board Certified · Accepting new patients</span></div>
        <h1>Dr. ${name},<br><span class="ital">${specialty}</span></h1>
        <div class="hero-meta">
          ${hospital ? `<span>${SVG.stethoscope}${hospital}</span>` : ""}
          ${location ? `<span>${SVG.pin}${location}</span>` : ""}
        </div>
        ${credChips.length > 0 ? `<div class="hero-creds">${credChips.slice(0, 6).map((c) => `<span class="cred-chip">${SVG.check}${escapeHtml(c)}</span>`).join("")}</div>` : ""}
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          ${apptUrl ? `<a href="${escapeHtml(apptUrl)}" target="_blank" rel="noopener" class="btn btn-primary">${SVG.calendar} Book appointment ${SVG.arrow}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="btn btn-ghost">${SVG.envelope} Email</a>` : ""}
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="Dr. ${name}">` : `<div class="ph">${escapeHtml(initials(displayName))}</div>`}
        </div>
        <div class="profile-meta">
          <div class="profile-meta-row"><span>specialty</span><b>${specialty}</b></div>
          ${hospital ? `<div class="profile-meta-row"><span>practice</span><b>${hospital}</b></div>` : ""}
          <div class="profile-meta-row"><span>languages</span><b>${langPills.length}</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
<section id="approach">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 01 — How I practice</div>
        <h2 class="section-title">Care that's<br><span class="ital">thorough, personal, evidence-led.</span></h2>
      </div>
      <p class="section-sub">A clear, unhurried approach to every visit — from first consult through long-term follow-up.</p>
    </div>
    <div class="pillars-grid">
      ${pillars.map((p) => `
      <div class="pillar-card reveal">
        <div class="pillar-icon">${p.icon}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>
      </div>`).join("")}
    </div>
  </div>
</section>
${credChips.length > 0 ? `
<section id="credentials">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 02 — Credentials &amp; Training</div>
        <h2 class="section-title">Verified expertise,<br><span class="ital">grounded in years of practice.</span></h2>
      </div>
      <p class="section-sub">Board certifications, hospital affiliations, and the training behind the care.</p>
    </div>
    <div class="creds-block">
      <div class="reveal">
        <div class="cred-list">
          ${credChips.map((c) => `
          <div class="cred-row">
            <div class="badge">${SVG.shield}</div>
            <div class="text">${escapeHtml(c)}</div>
          </div>`).join("")}
        </div>
      </div>
      <div class="reveal">
        <div class="cred-list">
          ${hospital ? `
          <div class="cred-row">
            <div class="badge">${SVG.stethoscope}</div>
            <div class="text">${hospital}</div>
          </div>` : ""}
          ${location ? `
          <div class="cred-row">
            <div class="badge">${SVG.pin}</div>
            <div class="text">${location}</div>
          </div>` : ""}
          <div class="cred-row">
            <div class="badge">${SVG.check}</div>
            <div class="text">Currently accepting new patients</div>
          </div>
          ${linkedin ? `
          <a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener" class="cred-row" style="text-decoration:none">
            <div class="badge">${SVG.linkedin}</div>
            <div class="text">Professional profile on LinkedIn</div>
          </a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>` : ""}
${langPills.length > 0 ? `
<section id="languages">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 03 — Languages</div>
        <h2 class="section-title">Care delivered<br><span class="ital">in your language.</span></h2>
      </div>
      <p class="section-sub">Clear conversation is the start of good medicine.</p>
    </div>
    <div class="lang-pills reveal">
      ${langPills.map((l) => `<span class="lang-pill"><span class="mono">${escapeHtml(initials(l))}</span>${escapeHtml(l)}</span>`).join("")}
    </div>
  </div>
</section>` : ""}
<section id="book">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 04 — Book a Visit</div>
        <h2 class="section-title">Schedule a<br><span class="ital">consultation.</span></h2>
      </div>
      <p class="section-sub">New patients welcome. Most major insurance plans accepted — please confirm at the time of booking.</p>
    </div>
    <div class="book-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">Whether it's a routine check-up, a second opinion, or ongoing care, I'll make sure you leave with a clear plan and a real understanding of what's next.</p>
        <div class="book-pillars">
          <div class="book-pillar">
            <div class="book-pillar-num">01</div>
            <div><h4>Reach out</h4><p>Use the booking link, email, or phone — whichever is easiest for you.</p></div>
          </div>
          <div class="book-pillar">
            <div class="book-pillar-num">02</div>
            <div><h4>Initial consult</h4><p>We'll review your history, your concerns, and any prior records or imaging.</p></div>
          </div>
          <div class="book-pillar">
            <div class="book-pillar-num">03</div>
            <div><h4>Plan &amp; follow-up</h4><p>You leave with a written plan, next steps, and direct access for follow-up questions.</p></div>
          </div>
        </div>
      </div>
      <div class="contact-card reveal">
        <div class="label">// Contact</div>
        <div class="title">Get in touch</div>
        <p class="desc">Replies within one business day.</p>
        <div class="contact-rows">
          ${apptUrl ? `<a href="${escapeHtml(apptUrl)}" target="_blank" rel="noopener" class="contact-row primary">${SVG.calendar}<span class="text">Book appointment online</span>${SVG.arrowUp}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="contact-row">${SVG.envelope}<span class="text">${escapeHtml(email)}</span></a>` : ""}
          ${phone ? `<a href="tel:${escapeHtml(phone.replace(/[^+0-9]/g, ""))}" class="contact-row">${SVG.phone}<span class="text">${escapeHtml(phone)}</span></a>` : ""}
          ${hospital ? `<div class="contact-row" style="cursor:default">${SVG.stethoscope}<span class="text">${hospital}</span></div>` : ""}
          ${location ? `<div class="contact-row" style="cursor:default">${SVG.pin}<span class="text">${location}</span></div>` : ""}
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
        <div class="nav-brand" style="margin-bottom:14px;"><span class="mono">${escapeHtml(initials(displayName))}</span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">Dr. ${name}, ${specialty}${hospital ? ` · ${hospital}` : ""}. ${escapeHtml(profileData.bio || "Patient-centered care, grounded in evidence.")}</p>
      </div>
      <div class="foot-col">
        <h5>Practice</h5>
        <a href="#approach">Approach</a>
        ${credChips.length > 0 ? `<a href="#credentials">Credentials</a>` : ""}
        ${langPills.length > 0 ? `<a href="#languages">Languages</a>` : ""}
        <a href="#book">Book a visit</a>
      </div>
      <div class="foot-col">
        <h5>Contact</h5>
        ${apptUrl ? `<a href="${escapeHtml(apptUrl)}" target="_blank" rel="noopener">Book appointment</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
        ${phone ? `<a href="tel:${escapeHtml(phone.replace(/[^+0-9]/g, ""))}">${escapeHtml(phone)}</a>` : ""}
        ${linkedin ? `<a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} Dr. ${name} — ${escapeHtml(ensName)}</span>
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

export function DoctorTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateDoctorHTML(profileData, ensName, uploadedImages);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Doctor Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
