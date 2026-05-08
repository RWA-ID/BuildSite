"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateENSMaxiHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const bio = profileData.bio || "";
  const chains: string[] = profileData.chains || [];
  const profileImg = uploadedImages["profileImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} — ENS Maxi</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.6;min-height:100vh}a{color:inherit;text-decoration:none}.container{max-width:700px;margin:0 auto;padding:80px 24px;text-align:center}.avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid #8b5cf6;margin-bottom:24px}.avatar-ph{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#ec4899);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto 24px}h1{font-size:2.5rem;font-weight:900;margin-bottom:8px}.ens-badge{display:inline-block;padding:4px 16px;border-radius:999px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.4);color:#a78bfa;font-size:.9rem;margin-bottom:20px}.bio{color:#94a3b8;max-width:480px;margin:0 auto 32px}.chains-title{font-size:.85rem;color:#64748b;text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}.chains{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:40px}.chain{padding:6px 16px;border-radius:999px;background:#111;border:1px solid rgba(139,92,246,.3);color:#a78bfa;font-size:.85rem}.socials{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}footer{margin-top:80px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}</style></head>
<body><div class="container">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">🔷</div>`}
<h1>${name}</h1>
<span class="ens-badge">🔷 ${ensName}</span>
${bio ? `<p class="bio">${bio}</p>` : ""}
${chains.length > 0 ? `<p class="chains-title">Active on</p><div class="chains">${chains.map(c => `<span class="chain">${c}</span>`).join("")}</div>` : ""}
<div class="socials">
${profileData.twitter ? `<a href="${profileData.twitter}" target="_blank" style="padding:10px 20px;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#94a3b8;font-size:.85rem">Twitter</a>` : ""}
${profileData.farcaster ? `<a href="${profileData.farcaster}" target="_blank" style="padding:10px 20px;background:#111;border:1px solid rgba(139,92,246,.3);border-radius:8px;color:#a78bfa;font-size:.85rem">Farcaster</a>` : ""}
${profileData.github ? `<a href="${profileData.github}" target="_blank" style="padding:10px 20px;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#94a3b8;font-size:.85rem">GitHub</a>` : ""}
</div>
</div>
<footer><p>Powered by <a href="https://buildsite.eth.limo" style="color:#a78bfa">buildsite.eth</a></p></footer>
</body></html>`;
}

export function ENSMaxiTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateENSMaxiHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="ENS Maxi Preview" sandbox="allow-same-origin" />;
}
