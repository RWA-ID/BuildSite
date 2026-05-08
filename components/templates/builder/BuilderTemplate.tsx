"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateBuilderHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const bio = profileData.bio || "";
  const gh = profileData.githubUsername || "";
  const tech: string[] = profileData.techStack || [];
  const profileImg = uploadedImages["profileImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} — Builder</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}.container{max-width:800px;margin:0 auto;padding:80px 24px}.avatar{width:96px;height:96px;border-radius:50%;object-fit:cover;border:3px solid #22d3ee;margin-bottom:24px}.avatar-ph{width:96px;height:96px;border-radius:50%;background:linear-gradient(135deg,#22d3ee,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:2.5rem;margin-bottom:24px}h1{font-size:2.5rem;font-weight:800;margin-bottom:8px}.ens{color:#22d3ee;font-size:.9rem;margin-bottom:16px}.bio{color:#94a3b8;font-size:1rem;max-width:560px;margin-bottom:32px}.tech-grid{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px}.tech-chip{padding:6px 14px;border-radius:8px;background:#111;border:1px solid rgba(34,211,238,.3);color:#22d3ee;font-size:.85rem;font-family:monospace}.cta{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;background:#22d3ee;color:#000;font-weight:700;transition:opacity .2s}.cta:hover{opacity:.85}.gh-link{margin-left:16px;padding:12px 24px;border-radius:10px;border:1px solid rgba(255,255,255,.1);color:#94a3b8;font-size:.9rem}footer{margin-top:80px;padding-top:32px;border-top:1px solid rgba(255,255,255,.08);text-align:center;color:#475569;font-size:.8rem}</style></head>
<body><div class="container">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">💻</div>`}
<h1>${name}</h1>
<p class="ens">${ensName}</p>
${bio ? `<p class="bio">${bio}</p>` : ""}
${tech.length > 0 ? `<div class="tech-grid">${tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}</div>` : ""}
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
${gh ? `<a href="https://github.com/${gh}" target="_blank" class="cta">⭐ GitHub</a>` : ""}
${profileData.twitter ? `<a href="${profileData.twitter}" target="_blank" class="gh-link">Twitter</a>` : ""}
</div>
</div>
<footer><p>Built with <a href="https://buildsite.eth.limo" style="color:#22d3ee">buildsite.eth</a> · ${ensName}</p></footer>
</body></html>`;
}

export function BuilderTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateBuilderHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Builder Preview" sandbox="allow-same-origin" />;
}
