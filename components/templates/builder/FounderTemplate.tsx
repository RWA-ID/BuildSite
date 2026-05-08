"use client";
import { ProfileData } from "@/lib/store";

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
  const name = profileData.displayName || ensName;
  const company = profileData.company || "";
  const role = profileData.role || "Founder & CEO";
  const bio = profileData.bio || "";
  const raised = profileData.raised || "";
  const investors: string[] = profileData.investors || [];
  const calendarUrl = profileData.calendarUrl || "";
  const profileImg = uploadedImages["profileImage"] || "";
  const twitter = profileData.twitter || "";
  const linkedin = profileData.linkedin || "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name} — ${role}${company ? ` at ${company}` : ""}</title>
  <meta name="description" content="${bio.slice(0,160)}" />
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#0a0a0a;--surface:#111;--border:rgba(255,255,255,.08);--text:#f1f5f9;--muted:#94a3b8;--gold:#f59e0b}
    body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6}
    a{color:inherit;text-decoration:none}
    .container{max-width:900px;margin:0 auto;padding:0 24px}
    header{border-bottom:1px solid var(--border);padding:20px 0}
    .header-inner{display:flex;align-items:center;justify-content:space-between}
    .logo{font-weight:800;font-size:1.1rem;color:var(--gold)}
    .hero{padding:80px 0 60px;display:flex;gap:48px;align-items:center;flex-wrap:wrap}
    .avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;border:3px solid var(--gold);flex-shrink:0}
    .avatar-ph{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#ef4444);display:flex;align-items:center;justify-content:center;font-size:3rem;flex-shrink:0}
    .hero-body{flex:1;min-width:280px}
    h1{font-size:clamp(2rem,5vw,3rem);font-weight:900;line-height:1.1}
    .role{font-size:1.1rem;color:var(--gold);font-weight:600;margin:6px 0 16px}
    .bio{color:var(--muted);font-size:1rem;max-width:560px;margin-bottom:24px}
    .cta-row{display:flex;gap:12px;flex-wrap:wrap}
    .btn-gold{padding:12px 28px;border-radius:10px;background:var(--gold);color:#000;font-weight:700;transition:opacity .2s}
    .btn-gold:hover{opacity:.85}
    .btn-ghost{padding:12px 28px;border-radius:10px;border:1px solid var(--border);color:var(--text);font-weight:600}
    .section{padding:60px 0;border-top:1px solid var(--border)}
    .section-title{font-size:1.5rem;font-weight:700;margin-bottom:24px}
    .raised-banner{background:linear-gradient(135deg,rgba(245,158,11,.1),rgba(239,68,68,.1));border:1px solid rgba(245,158,11,.3);border-radius:16px;padding:32px;text-align:center}
    .raised-amt{font-size:3rem;font-weight:900;color:var(--gold)}
    .raised-label{color:var(--muted);margin-top:4px}
    .investors-grid{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}
    .investor{padding:8px 20px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:.9rem}
    footer{border-top:1px solid var(--border);padding:32px 0;text-align:center;color:var(--muted);font-size:.85rem}
  </style>
</head>
<body>
  <header><div class="container"><div class="header-inner">
    <span class="logo">${ensName}</span>
    <div style="display:flex;gap:12px">
      ${twitter ? `<a href="${twitter}" target="_blank" style="color:var(--muted);font-size:.9rem">Twitter</a>` : ""}
      ${linkedin ? `<a href="${linkedin}" target="_blank" style="color:var(--muted);font-size:.9rem">LinkedIn</a>` : ""}
    </div>
  </div></div></header>
  <div class="container">
    <div class="hero">
      ${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar" />` : `<div class="avatar-ph">👤</div>`}
      <div class="hero-body">
        <h1>${name}</h1>
        <p class="role">${role}${company ? ` · ${company}` : ""}</p>
        <p class="bio">${bio}</p>
        <div class="cta-row">
          ${calendarUrl ? `<a href="${calendarUrl}" target="_blank" class="btn-gold">📅 Book a Meeting</a>` : ""}
          ${profileData.email ? `<a href="mailto:${profileData.email}" class="btn-ghost">📧 Email</a>` : ""}
        </div>
      </div>
    </div>
    ${raised ? `<div class="section"><h2 class="section-title">Fundraising</h2>
    <div class="raised-banner">
      <div class="raised-amt">${raised}</div>
      <div class="raised-label">Total Raised</div>
      ${investors.length > 0 ? `<div class="investors-grid">${investors.map(i => `<div class="investor">${i}</div>`).join("")}</div>` : ""}
    </div></div>` : ""}
  </div>
  <footer><p>© ${new Date().getFullYear()} ${name} · ${ensName} · <a href="https://buildsite.eth.limo" style="color:var(--gold)">buildsite.eth</a></p></footer>
</body></html>`;
}

export function FounderTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateFounderHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Founder Preview" sandbox="allow-same-origin" />;
}
