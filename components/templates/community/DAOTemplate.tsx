"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateDAOHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.daoName || profileData.displayName || ensName;
  const tagline = profileData.tagline || "";
  const bio = profileData.bio || "";
  const token = profileData.tokenSymbol || "";
  const snapshotUrl = profileData.snapshotUrl || "";
  const treasury = profileData.treasuryAddress || "";
  const govUrl = profileData.governanceUrl || "";
  const discordUrl = profileData.discordUrl || "";
  const proposals = profileData.proposalCount || "";
  const bannerImg = uploadedImages["bannerImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#030711;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}${bannerImg ? `.banner{width:100%;height:220px;object-fit:cover}` : `.banner{width:100%;height:220px;background:linear-gradient(135deg,#1e3a5f,#0f2030)}`}.container{max-width:900px;margin:0 auto;padding:60px 24px}h1{font-size:clamp(2rem,5vw,3rem);font-weight:900;margin-bottom:8px}.tagline{color:#38bdf8;font-size:1.1rem;font-weight:600;margin-bottom:16px}.bio{color:#94a3b8;max-width:560px;margin-bottom:32px}.stats{display:flex;gap:24px;flex-wrap:wrap;margin-bottom:40px}.stat{text-align:center}.stat-val{font-size:2rem;font-weight:800;color:#38bdf8;font-family:monospace}.stat-lbl{font-size:.75rem;color:#64748b;text-transform:uppercase;letter-spacing:.1em}.btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px}.btn-primary{padding:12px 24px;border-radius:10px;background:#0ea5e9;color:white;font-weight:700}.btn-ghost{padding:12px 24px;border-radius:10px;border:1px solid rgba(56,189,248,.2);color:#38bdf8;font-weight:600}.section{margin-bottom:40px}.section-title{font-size:1.1rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}.treasury-addr{font-family:monospace;font-size:.85rem;color:#38bdf8;word-break:break-all;background:#0a1628;padding:12px 16px;border-radius:8px;border:1px solid rgba(56,189,248,.15)}footer{border-top:1px solid rgba(255,255,255,.06);padding:24px;text-align:center;color:#475569;font-size:.8rem}footer a{color:#38bdf8}</style></head>
<body>
${bannerImg ? `<img src="${bannerImg}" alt="${name}" class="banner"/>` : `<div class="banner"></div>`}
<div class="container">
<h1>${name}${token ? ` · $${token}` : ""}</h1>
${tagline ? `<p class="tagline">${tagline}</p>` : ""}
${bio ? `<p class="bio">${bio}</p>` : ""}
${proposals ? `<div class="stats"><div class="stat"><div class="stat-val">${proposals}</div><div class="stat-lbl">Proposals</div></div></div>` : ""}
<div class="btns">
${snapshotUrl ? `<a href="${snapshotUrl}" target="_blank" class="btn-primary">🗳 Vote on Snapshot</a>` : ""}
${govUrl ? `<a href="${govUrl}" target="_blank" class="btn-ghost">📋 Governance</a>` : ""}
${discordUrl ? `<a href="${discordUrl}" target="_blank" class="btn-ghost">💬 Discord</a>` : ""}
</div>
${treasury ? `<div class="section"><div class="section-title">Treasury</div><div class="treasury-addr">${treasury}</div></div>` : ""}
</div>
<footer><p>${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function DAOTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateDAOHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="DAO Preview" sandbox="allow-same-origin" />;
}
