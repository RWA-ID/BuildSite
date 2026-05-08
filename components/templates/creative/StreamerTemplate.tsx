"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateStreamerHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const twitch = profileData.twitchChannel || "";
  const schedule = profileData.streamSchedule || "";
  const games: string[] = profileData.games || [];
  const donateUrl = profileData.donationUrl || "";
  const bio = profileData.bio || "";
  const profileImg = uploadedImages["profileImage"] || "";
  const isLive = profileData.isLive || false;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} — Streamer</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0e0e10;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}.container{max-width:800px;margin:0 auto;padding:80px 24px}.hero{text-align:center;margin-bottom:48px}.avatar{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid #9147ff;margin-bottom:16px}.avatar-ph{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#9147ff,#bf94ff);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto 16px}h1{font-size:2.5rem;font-weight:800;margin-bottom:8px}.live-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:#e91916;border-radius:999px;font-size:.8rem;font-weight:700;letter-spacing:.05em;margin-bottom:12px}.live-dot{width:8px;height:8px;border-radius:50%;background:white}.ens{color:#bf94ff;font-size:.9rem;margin-bottom:16px}.bio{color:#94a3b8;max-width:480px;margin:0 auto 24px}.buttons{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:48px}.btn-twitch{padding:12px 24px;border-radius:10px;background:#9147ff;color:white;font-weight:700}.btn-donate{padding:12px 24px;border-radius:10px;background:rgba(145,71,255,.15);border:1px solid rgba(145,71,255,.4);color:#bf94ff;font-weight:600}.info-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}.info-card{background:#1a1a1e;border:1px solid rgba(145,71,255,.15);border-radius:12px;padding:20px}.info-card h3{font-size:.8rem;text-transform:uppercase;letter-spacing:.1em;color:#64748b;margin-bottom:8px}.games{display:flex;flex-wrap:wrap;gap:8px}.game{padding:4px 10px;background:#26262c;border-radius:6px;font-size:.85rem;color:#bf94ff}footer{margin-top:60px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}footer a{color:#9147ff}</style></head>
<body><div class="container"><div class="hero">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">🎮</div>`}
${isLive ? `<div class="live-badge"><div class="live-dot"></div>LIVE NOW</div><br/>` : ""}
<h1>${name}</h1>
<p class="ens">${ensName}</p>
${bio ? `<p class="bio">${bio}</p>` : ""}
<div class="buttons">
${twitch ? `<a href="https://twitch.tv/${twitch}" target="_blank" class="btn-twitch">🟣 Watch on Twitch</a>` : ""}
${donateUrl ? `<a href="${donateUrl}" target="_blank" class="btn-donate">💜 Donate / Sub</a>` : ""}
</div>
</div>
<div class="info-grid">
${schedule ? `<div class="info-card"><h3>Stream Schedule</h3><p style="color:#f1f5f9;font-size:.95rem">${schedule}</p></div>` : ""}
${games.length > 0 ? `<div class="info-card"><h3>Games</h3><div class="games">${games.map(g => `<span class="game">${g}</span>`).join("")}</div></div>` : ""}
</div>
</div>
<footer><p>${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function StreamerTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateStreamerHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Streamer Preview" sandbox="allow-same-origin" />;
}
