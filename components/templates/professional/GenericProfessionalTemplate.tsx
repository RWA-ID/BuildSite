"use client";
import { ProfileData } from "@/lib/store";

interface Props { profileData: Partial<ProfileData>; ensName: string; uploadedImages: Record<string, string>; templateId: string; }

export function generateGenericProfessionalHTML(profileData: Partial<ProfileData>, ensName: string, uploadedImages: Record<string, string>, templateId: string): string {
  const name = profileData.displayName || ensName;
  const role = profileData.role || templateId;
  const firm = profileData.firm || "";
  const bio = profileData.bio || "";
  const skills: string[] = profileData.techStack || profileData.servicesOffered || [];
  const calUrl = profileData.calendarUrl || profileData.consultationUrl || "";
  const profileImg = uploadedImages["profileImage"] || "";
  const emoji: Record<string, string> = { engineer: "⚙️", consultant: "💡", architect: "🏛️" };
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${name} — ${role}</title><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0d0d0d;color:#f1f5f9;font-family:-apple-system,sans-serif;line-height:1.7}a{color:inherit;text-decoration:none}.container{max-width:800px;margin:0 auto;padding:80px 24px;text-align:center}.avatar{width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid #6366f1;margin-bottom:24px}.avatar-ph{width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:3rem;margin:0 auto 24px}h1{font-size:2.5rem;font-weight:800;margin-bottom:8px}.role{color:#818cf8;font-size:1.1rem;margin-bottom:4px}.firm{color:#64748b;font-size:.9rem;margin-bottom:20px}.bio{color:#94a3b8;max-width:520px;margin:0 auto 32px}.skills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px}.skill{padding:6px 16px;background:#1a1a2e;border:1px solid rgba(99,102,241,.3);color:#818cf8;border-radius:8px;font-size:.85rem}.btn{display:inline-block;padding:12px 28px;border-radius:10px;background:#6366f1;color:white;font-weight:700;transition:opacity .2s}.btn:hover{opacity:.85}footer{margin-top:80px;padding-top:24px;border-top:1px solid rgba(255,255,255,.06);text-align:center;color:#475569;font-size:.8rem}footer a{color:#818cf8}</style></head>
<body><div class="container">
${profileImg ? `<img src="${profileImg}" alt="${name}" class="avatar"/>` : `<div class="avatar-ph">${emoji[templateId] || "👤"}</div>`}
<h1>${name}</h1>
<p class="role">${role}</p>
${firm ? `<p class="firm">${firm}</p>` : ""}
${bio ? `<p class="bio">${bio}</p>` : ""}
${skills.length > 0 ? `<div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div>` : ""}
${calUrl ? `<a href="${calUrl}" target="_blank" class="btn">📅 Schedule a Call</a>` : ""}
${profileData.email ? `<a href="mailto:${profileData.email}" style="display:inline-block;margin-left:12px;padding:12px 28px;border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#94a3b8;font-weight:600">Email Me</a>` : ""}
</div>
<footer><p>${name} · ${ensName} · Built with <a href="https://buildsite.eth.limo">buildsite.eth</a></p></footer>
</body></html>`;
}

export function GenericProfessionalTemplate({ profileData, ensName, uploadedImages, templateId }: Props) {
  const html = generateGenericProfessionalHTML(profileData, ensName, uploadedImages, templateId);
  return <iframe srcDoc={html} className="w-full h-full border-0" title="Professional Preview" sandbox="allow-same-origin" />;
}
