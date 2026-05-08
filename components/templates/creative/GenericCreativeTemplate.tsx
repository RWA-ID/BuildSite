"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; templateId: string; }

export function generateGenericCreativeHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>, templateId: string): string {
  const name = profileData.displayName || ensName;
  const tagline = profileData.tagline || templateId;
  const bio = profileData.bio || "";
  const location = profileData.location || "";
  const profileImg = uploadedImages["profileImage"] || "";
  const emojis: Record<string, string> = { artist: "🎨", musician: "🎵" };
  const colors: Record<string, string> = { artist: "#ec4899", musician: "#f59e0b" };
  const color = colors[templateId] || "#ec4899";
  const em = emojis[templateId] || "🎨";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.6;min-height:100vh}a{color:inherit;text-decoration:none}.container{max-width:700px;margin:0 auto;padding:100px 24px;text-align:center}.avatar{width:130px;height:130px;border-radius:50%;object-fit:cover;border:4px solid ${color};margin-bottom:24px}.avatar-ph{width:130px;height:130px;border-radius:50%;background:linear-gradient(135deg,${color},rgba(0,0,0,.5));display:flex;align-items:center;justify-content:center;font-size:3.5rem;margin:0 auto 24px;border:4px solid ${color}}h1{font-size:2.5rem;font-weight:900;margin-bottom:8px}.tagline{color:${color};font-size:1.1rem;font-weight:600;margin-bottom:8px}.location{color:#64748b;font-size:.9rem;margin-bottom:20px}.bio{color:#94a3b8;max-width:480px;margin:0 auto 32px;font-size:1rem}.socials{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}.social-link{padding:10px 20px;background:#111;border:1px solid rgba(255,255,255,.1);border-radius:8px;color:#94a3b8;font-size:.9rem;transition:border-color .2s}.social-link:hover{border-color:${color};color:${color}}footer{margin-top:80px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}footer a{color:${color}}</style></head>
<body><div class="container">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">${em}</div>`}
<h1>${name}</h1>
${tagline ? `<p class="tagline">${tagline}</p>` : ""}
${location ? `<p class="location">📍 ${location}</p>` : ""}
${bio ? `<p class="bio">${bio}</p>` : ""}
<div class="socials">
${profileData.instagram ? `<a href="${profileData.instagram}" target="_blank" class="social-link">Instagram</a>` : ""}
${profileData.twitter ? `<a href="${profileData.twitter}" target="_blank" class="social-link">Twitter</a>` : ""}
${profileData.youtube ? `<a href="${profileData.youtube}" target="_blank" class="social-link">YouTube</a>` : ""}
${profileData.email ? `<a href="mailto:${profileData.email}" class="social-link">Email</a>` : ""}
</div>
</div>
<footer><p>${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function GenericCreativeTemplate({ profileData, ensName, uploadedImages, templateId }: Props) {
  const html = generateGenericCreativeHTML(profileData, ensName, uploadedImages, templateId);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Creative Preview" sandbox="allow-same-origin" />;
}
