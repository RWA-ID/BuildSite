"use client";
import { ProfileData, StatEntry } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateDeFiHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const bio = profileData.bio || "";
  const stats: StatEntry[] = profileData.stats || [];
  const profileImg = uploadedImages["profileImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} — DeFi Native</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}.container{max-width:900px;margin:0 auto;padding:80px 24px}.hero{display:flex;gap:40px;align-items:center;margin-bottom:60px;flex-wrap:wrap}.avatar{width:96px;height:96px;border-radius:12px;object-fit:cover;border:2px solid rgba(52,211,153,.4)}.avatar-ph{width:96px;height:96px;border-radius:12px;background:linear-gradient(135deg,#059669,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:2.5rem}.hero-text{flex:1}h1{font-size:2.5rem;font-weight:900;margin-bottom:8px}.ens{color:#34d399;font-size:.9rem;margin-bottom:12px}.bio{color:#94a3b8;max-width:520px}.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:60px}.stat{background:#111;border:1px solid rgba(52,211,153,.15);border-radius:12px;padding:24px;text-align:center}.stat-val{font-size:2rem;font-weight:900;color:#34d399;font-family:monospace}.stat-label{color:#64748b;font-size:.8rem;margin-top:4px;text-transform:uppercase;letter-spacing:.08em}footer{margin-top:60px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}</style></head>
<body><div class="container">
<div class="hero">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">📊</div>`}
<div class="hero-text"><h1>${name}</h1><p class="ens">⚡ ${ensName}</p>${bio ? `<p class="bio">${bio}</p>` : ""}</div>
</div>
${stats.length > 0 ? `<div class="stats">${stats.map(s => `<div class="stat"><div class="stat-val">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join("")}</div>` : ""}
${profileData.twitter ? `<a href="${profileData.twitter}" target="_blank" style="display:inline-block;padding:10px 20px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.3);border-radius:8px;color:#34d399">Twitter</a>` : ""}
</div>
<footer><p>Built with <a href="https://buildsite.eth.limo" style="color:#34d399">buildsite.eth</a></p></footer>
</body></html>`;
}

export function DeFiTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateDeFiHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="DeFi Preview" sandbox="allow-same-origin" />;
}
