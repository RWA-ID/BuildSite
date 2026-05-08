"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateLawyerHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const firm = profileData.firm || "";
  const bio = profileData.bio || "";
  const areas: string[] = profileData.practiceAreas || [];
  const bar = profileData.barNumber || "";
  const barState = profileData.barState || "";
  const consultUrl = profileData.consultationUrl || "";
  const profileImg = uploadedImages["profileImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name}, Esq.</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0c0c14;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.7}a{color:inherit;text-decoration:none}header{padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;justify-content:center}.nav{max-width:900px;width:100%;display:flex;justify-content:space-between;align-items:center}.logo{font-weight:700;color:#c9b26b;font-size:1.1rem}.container{max-width:900px;margin:0 auto;padding:60px 24px}.hero{display:flex;gap:48px;align-items:center;margin-bottom:60px;flex-wrap:wrap}.avatar{width:130px;height:130px;border-radius:12px;object-fit:cover;border:3px solid rgba(201,178,107,.4);flex-shrink:0}.avatar-ph{width:130px;height:130px;border-radius:12px;background:linear-gradient(135deg,#1e1b12,#4a3f20);display:flex;align-items:center;justify-content:center;font-size:3rem;flex-shrink:0}.hero-text{flex:1}h1{font-size:2.2rem;font-weight:800;margin-bottom:6px}.firm{color:#c9b26b;font-size:1rem;margin-bottom:4px}.bar{color:#64748b;font-size:.85rem;margin-bottom:16px}.bio{color:#94a3b8;max-width:480px;margin-bottom:24px}.btn-consult{padding:12px 28px;border-radius:10px;background:#c9b26b;color:#0c0c14;font-weight:700;transition:opacity .2s;display:inline-block}.btn-consult:hover{opacity:.85}.areas-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-bottom:40px}.area{padding:14px 18px;background:#161620;border:1px solid rgba(201,178,107,.15);border-radius:10px;font-size:.9rem;color:#c9b26b;text-align:center}footer{border-top:1px solid rgba(255,255,255,.06);padding:24px;text-align:center;color:#475569;font-size:.8rem}footer a{color:#c9b26b}</style></head>
<body>
<header><div class="nav"><span class="logo">⚖️ ${ensName}</span>${consultUrl ? `<a href="${consultUrl}" target="_blank" style="padding:8px 18px;background:#c9b26b;color:#0c0c14;border-radius:8px;font-size:.85rem;font-weight:700">Free Consultation</a>` : ""}</div></header>
<div class="container"><div class="hero">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">⚖️</div>`}
<div class="hero-text">
<h1>${name}, Esq.</h1>
${firm ? `<p class="firm">${firm}</p>` : ""}
${(bar || barState) ? `<p class="bar">Bar No. ${bar}${barState ? ` · ${barState}` : ""}</p>` : ""}
${bio ? `<p class="bio">${bio}</p>` : ""}
${consultUrl ? `<a href="${consultUrl}" target="_blank" class="btn-consult">📞 Schedule Consultation</a>` : ""}
</div></div>
${areas.length > 0 ? `<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px;color:#f1f5f9">Practice Areas</h2><div class="areas-grid">${areas.map(a => `<div class="area">${a}</div>`).join("")}</div>` : ""}
</div>
<footer><p>${name}, Esq. · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function LawyerTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateLawyerHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Lawyer Preview" sandbox="allow-same-origin" />;
}
