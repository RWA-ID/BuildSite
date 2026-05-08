"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateContentCreatorHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const tagline = profileData.tagline || "Content Creator";
  const bio = profileData.bio || "";
  const subscribers = profileData.subscriberCount || "";
  const ytId = profileData.youtubeChannelId || "";
  const sponsorEmail = profileData.sponsorshipEmail || profileData.email || "";
  const mediaKit = profileData.mediaKit || "";
  const profileImg = uploadedImages["profileImage"] || "";
  const bannerImg = uploadedImages["bannerImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0a0a;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}${bannerImg ? `.banner{width:100%;height:200px;object-fit:cover}` : `.banner{width:100%;height:200px;background:linear-gradient(135deg,#ff0000,#7c3aed)}`}.container{max-width:800px;margin:0 auto;padding:0 24px}.profile-row{display:flex;gap:20px;align-items:flex-end;margin-top:-50px;margin-bottom:24px;padding:0 8px}.avatar{width:100px;height:100px;border-radius:50%;object-fit:cover;border:4px solid #0a0a0a;background:#111}.avatar-ph{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#ff0000,#f59e0b);display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:4px solid #0a0a0a}.profile-text{padding-bottom:8px}h1{font-size:1.8rem;font-weight:800}p.tagline{color:#ff0000;font-size:.95rem;font-weight:600;margin-top:2px}.bio{color:#94a3b8;margin:16px 0 24px;max-width:520px}.stats-row{display:flex;gap:16px;margin-bottom:32px;flex-wrap:wrap}.stat-box{background:#111;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px 20px;text-align:center}.stat-val{font-size:1.5rem;font-weight:800;color:#ff0000}.stat-lbl{font-size:.75rem;color:#64748b;text-transform:uppercase;letter-spacing:.08em;margin-top:2px}.btn-yt{display:inline-block;padding:12px 28px;border-radius:10px;background:#ff0000;color:white;font-weight:700;transition:opacity .2s}.btn-yt:hover{opacity:.85}.btn-ghost{display:inline-block;padding:12px 28px;border-radius:10px;border:1px solid rgba(255,255,255,.12);color:#94a3b8;font-weight:600;margin-left:12px}footer{margin-top:60px;padding:24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}footer a{color:#ff0000}</style></head>
<body>
${bannerImg ? `<img src="${bannerImg}" alt="Banner" class="banner"/>` : `<div class="banner"></div>`}
<div class="container"><div class="profile-row">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">🎥</div>`}
<div class="profile-text"><h1>${name}</h1><p class="tagline">${tagline}</p></div>
</div>
${bio ? `<p class="bio">${bio}</p>` : ""}
${subscribers ? `<div class="stats-row"><div class="stat-box"><div class="stat-val">${subscribers}</div><div class="stat-lbl">Subscribers</div></div></div>` : ""}
<div style="margin-bottom:32px">
${ytId ? `<a href="https://youtube.com/channel/${ytId}" target="_blank" class="btn-yt">▶ YouTube Channel</a>` : ""}
${mediaKit ? `<a href="${mediaKit}" target="_blank" class="btn-ghost">📄 Media Kit</a>` : ""}
</div>
${sponsorEmail ? `<div style="background:#111;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:24px;max-width:480px"><h3 style="font-size:1.1rem;font-weight:700;margin-bottom:8px">Sponsorships & Collabs</h3><p style="color:#94a3b8;font-size:.9rem;margin-bottom:12px">Interested in working together?</p><a href="mailto:${sponsorEmail}" style="color:#ff0000;font-weight:600">📧 ${sponsorEmail}</a></div>` : ""}
</div>
<footer><p>${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function ContentCreatorTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateContentCreatorHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Content Creator Preview" sandbox="allow-same-origin" />;
}
