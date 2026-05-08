"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; }

export function generateDoctorHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>): string {
  const name = profileData.displayName || ensName;
  const specialty = profileData.specialty || "";
  const hospital = profileData.hospital || "";
  const bio = profileData.bio || "";
  const creds: string[] = profileData.credentials || [];
  const langs: string[] = profileData.languages || [];
  const apptUrl = profileData.appointmentUrl || "";
  const profileImg = uploadedImages["profileImage"] || "";
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Dr. ${name} — ${specialty}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#f8fafc;color:#0f172a;font-family:-apple-system,sans-serif;line-height:1.6}a{color:inherit;text-decoration:none}header{background:#0f172a;color:white;padding:16px 24px}.header-inner{max-width:900px;margin:0 auto;display:flex;justify-content:space-between;align-items:center}.logo{font-weight:700;color:#38bdf8}.container{max-width:900px;margin:0 auto;padding:48px 24px}.hero{display:flex;gap:40px;align-items:flex-start;margin-bottom:48px;flex-wrap:wrap}.avatar{width:140px;height:140px;border-radius:50%;object-fit:cover;border:4px solid #38bdf8;flex-shrink:0}.avatar-ph{width:140px;height:140px;border-radius:50%;background:linear-gradient(135deg,#0ea5e9,#6366f1);display:flex;align-items:center;justify-content:center;font-size:3.5rem;flex-shrink:0}.hero-text{flex:1}h1{font-size:2rem;font-weight:800;margin-bottom:4px;color:#0f172a}.specialty{color:#0ea5e9;font-size:1.1rem;font-weight:600;margin-bottom:4px}.hospital{color:#64748b;font-size:.95rem;margin-bottom:16px}.bio{color:#475569;margin-bottom:20px;max-width:500px}.btn-appt{display:inline-block;padding:12px 28px;border-radius:10px;background:#0ea5e9;color:white;font-weight:700;transition:opacity .2s}.btn-appt:hover{opacity:.85}.creds{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}.cred{padding:4px 12px;background:#dbeafe;border-radius:6px;color:#1d4ed8;font-size:.8rem;font-weight:600}.section{padding:40px 0;border-top:1px solid #e2e8f0}.section-title{font-size:1.2rem;font-weight:700;margin-bottom:16px;color:#0f172a}.langs{display:flex;gap:8px;flex-wrap:wrap}.lang{padding:6px 14px;background:white;border:1px solid #e2e8f0;border-radius:8px;color:#475569;font-size:.85rem}footer{background:#0f172a;color:#475569;padding:24px;text-align:center;font-size:.8rem;margin-top:40px}footer a{color:#38bdf8}</style></head>
<body>
<header><div class="header-inner"><span class="logo">🏥 ${ensName}</span>${apptUrl ? `<a href="${apptUrl}" target="_blank" style="padding:8px 18px;background:#0ea5e9;color:white;border-radius:8px;font-size:.85rem;font-weight:600">Book Appointment</a>` : ""}</div></header>
<div class="container"><div class="hero">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">👨‍⚕️</div>`}
<div class="hero-text">
<h1>Dr. ${name}</h1>
${specialty ? `<p class="specialty">${specialty}</p>` : ""}
${hospital ? `<p class="hospital">🏥 ${hospital}</p>` : ""}
${creds.length > 0 ? `<div class="creds">${creds.map(c => `<span class="cred">${c}</span>`).join("")}</div>` : ""}
${bio ? `<p class="bio">${bio}</p>` : ""}
${apptUrl ? `<a href="${apptUrl}" target="_blank" class="btn-appt">📅 Book Appointment</a>` : ""}
</div></div>
${langs.length > 0 ? `<div class="section"><h2 class="section-title">Languages</h2><div class="langs">${langs.map(l => `<span class="lang">🗣 ${l}</span>`).join("")}</div></div>` : ""}
</div>
<footer><p>Dr. ${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function DoctorTemplate({ profileData, ensName, uploadedImages }: Props) {
  const html = generateDoctorHTML(profileData, ensName, uploadedImages);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Doctor Preview" sandbox="allow-same-origin" />;
}
