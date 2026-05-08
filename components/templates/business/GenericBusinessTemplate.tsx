"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; templateId: string; }

export function generateGenericBusinessHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>, templateId: string): string {
  const name = profileData.displayName || ensName;
  const tagline = profileData.tagline || "";
  const role = profileData.role || "";
  const bio = profileData.bio || "";
  const services: string[] = profileData.servicesOffered || [];
  const calUrl = profileData.calendarUrl || "";
  const email = profileData.email || "";
  const profileImg = uploadedImages["profileImage"] || "";
  const emojis: Record<string, string> = { agency: "🏢", freelancer: "💼", startup: "🚀" };
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#050505;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.7}a{color:inherit;text-decoration:none}.container{max-width:900px;margin:0 auto;padding:80px 24px}.hero{display:flex;gap:40px;align-items:center;margin-bottom:60px;flex-wrap:wrap}.logo{width:96px;height:96px;border-radius:16px;object-fit:cover;background:#111;flex-shrink:0}.logo-ph{width:96px;height:96px;border-radius:16px;background:linear-gradient(135deg,#4f46e5,#818cf8);display:flex;align-items:center;justify-content:center;font-size:2.5rem;flex-shrink:0}.hero-text{flex:1}h1{font-size:2.5rem;font-weight:900;margin-bottom:6px}.role{color:#818cf8;font-size:1rem;font-weight:600;margin-bottom:12px}.bio{color:#94a3b8;max-width:520px;margin-bottom:24px}.ctarow{display:flex;gap:12px;flex-wrap:wrap}.btn{padding:12px 24px;border-radius:10px;background:#4f46e5;color:white;font-weight:700}.btn-o{padding:12px 24px;border-radius:10px;border:1px solid rgba(255,255,255,.1);color:#94a3b8;font-weight:600}.services{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:48px}.svc{padding:20px;background:#0d0d0d;border:1px solid rgba(79,70,229,.2);border-radius:12px;font-size:.95rem;text-align:center;color:#c7d2fe}footer{padding-top:32px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}footer a{color:#818cf8}</style></head>
<body><div class="container"><div class="hero">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="logo"/>` : `<div class="logo-ph">${emojis[templateId] || "💼"}</div>`}
<div class="hero-text">
<h1>${name}</h1>
${role ? `<p class="role">${role}</p>` : tagline ? `<p class="role">${tagline}</p>` : ""}
${bio ? `<p class="bio">${bio}</p>` : ""}
<div class="ctarow">
${calUrl ? `<a href="${calUrl}" target="_blank" class="btn">📅 Book a Call</a>` : ""}
${email ? `<a href="mailto:${email}" class="btn-o">📧 Email</a>` : ""}
</div>
</div></div>
${services.length > 0 ? `<h2 style="font-size:1.3rem;font-weight:700;margin-bottom:20px">Services</h2><div class="services">${services.map(s => `<div class="svc">${s}</div>`).join("")}</div>` : ""}
</div>
<footer><p>${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function GenericBusinessTemplate({ profileData, ensName, uploadedImages, templateId }: Props) {
  const html = generateGenericBusinessHTML(profileData, ensName, uploadedImages, templateId);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Business Preview" sandbox="allow-same-origin" />;
}
