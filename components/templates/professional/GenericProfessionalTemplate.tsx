"use client";
import { ProfileData } from "@/lib/store";

interface Props {
  profileData: Partial<ProfileData>;
  ensName: string;
  uploadedImages: Record<string, string>;
  templateId: string;
}

const SVG = {
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="18"/><line x1="15" y1="22" x2="15" y2="18"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="9" y2="14"/><line x1="15" y1="14" x2="15" y2="14"/></svg>`,
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function twitterUrl(handle: string | undefined): string {
  if (!handle) return "";
  const h = handle.replace(/^@/, "").trim();
  return h ? `https://x.com/${h}` : "";
}

function linkedinUrl(v: string | undefined): string {
  if (!v) return "";
  return v.startsWith("http") ? v : `https://www.linkedin.com/in/${v}`;
}

interface Theme {
  id: "engineer" | "consultant" | "architect";
  label: string;
  jobTitle: string;
  bg: string;
  bgSoft: string;
  panel: string;
  panel2: string;
  line: string;
  line2: string;
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  accent: string;
  accent2: string;
  accentSoft: string;
  bodyFont: string;
  monoFont: string;
  serifFont: string;
  fontHref: string;
  eyebrowMode: "mono" | "serif" | "tracked";
  italFamily: "serif" | "mono" | "sansItalic";
  sectionNames: { id: string; label: string; eyebrow: string; title: string; sub: string }[];
}

function themeFor(templateId: string): Theme {
  if (templateId === "consultant") {
    return {
      id: "consultant",
      label: "Strategy & Advisory",
      jobTitle: "Consultant",
      bg: "#0b1426",
      bgSoft: "#0e1a30",
      panel: "#11203a",
      panel2: "#172a48",
      line: "#1e3155",
      line2: "#2a4170",
      ink: "#f5efe1",
      ink2: "#c9c4b6",
      ink3: "#8993a8",
      ink4: "#5a6478",
      accent: "#d4a857",
      accent2: "#f0c075",
      accentSoft: "rgba(212,168,87,.12)",
      bodyFont: "'Inter','Space Grotesk',-apple-system,sans-serif",
      monoFont: "'JetBrains Mono',monospace",
      serifFont: "'Instrument Serif',serif",
      fontHref:
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      eyebrowMode: "tracked",
      italFamily: "serif",
      sectionNames: [
        { id: "practice", label: "Practice", eyebrow: "// 01 — Practice Areas", title: "Where I create", sub: "Each engagement is a partnership shaped around the decisions that matter most." },
        { id: "engagements", label: "Case Studies", eyebrow: "// 02 — Selected Engagements", title: "A track record of", sub: "Outcomes from boardrooms, growth-stage transitions, and operational turnarounds." },
        { id: "model", label: "Model", eyebrow: "// 03 — Engagement Model", title: "How we'll", sub: "Predictable structure, measurable outcomes, and direct access throughout." },
      ],
    };
  }
  if (templateId === "architect") {
    return {
      id: "architect",
      label: "Architecture & Design",
      jobTitle: "Architect",
      bg: "#0d0d0e",
      bgSoft: "#111111",
      panel: "#161616",
      panel2: "#1c1c1c",
      line: "#222222",
      line2: "#2e2e2e",
      ink: "#f4f1ec",
      ink2: "#c2bdb3",
      ink3: "#86807a",
      ink4: "#55504c",
      accent: "#e8d5b7",
      accent2: "#d4b896",
      accentSoft: "rgba(232,213,183,.10)",
      bodyFont: "'Inter','Space Grotesk',-apple-system,sans-serif",
      monoFont: "'JetBrains Mono',monospace",
      serifFont: "'Instrument Serif',serif",
      fontHref:
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      eyebrowMode: "serif",
      italFamily: "serif",
      sectionNames: [
        { id: "philosophy", label: "Philosophy", eyebrow: "— I.", title: "A philosophy of", sub: "Buildings as instruments — measured, considered, made for the people who occupy them." },
        { id: "works", label: "Works", eyebrow: "— II.", title: "Selected", sub: "A small number of projects each year, taken on for their clarity of intent." },
        { id: "studio", label: "Studio", eyebrow: "— III.", title: "The", sub: "Where the work is made." },
      ],
    };
  }
  return {
    id: "engineer",
    label: "Senior Engineer",
    jobTitle: "Software Engineer",
    bg: "#0a0d12",
    bgSoft: "#0d1117",
    panel: "#11151c",
    panel2: "#161b25",
    line: "#1d2330",
    line2: "#28303f",
    ink: "#e6edf3",
    ink2: "#9aa6b8",
    ink3: "#6b7689",
    ink4: "#454e5e",
    accent: "#22d3ee",
    accent2: "#0ea5e9",
    accentSoft: "rgba(34,211,238,.10)",
    bodyFont: "'Inter','Space Grotesk',-apple-system,sans-serif",
    monoFont: "'JetBrains Mono',monospace",
    serifFont: "'Instrument Serif',serif",
    fontHref:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
    eyebrowMode: "mono",
    italFamily: "serif",
    sectionNames: [
      { id: "stack", label: "Stack", eyebrow: "// 01 — Stack", title: "Tools of the", sub: "What I reach for, day to day, when shipping production systems." },
      { id: "work", label: "Work", eyebrow: "// 02 — Selected Work", title: "Systems I've", sub: "A short list of things I've shipped or maintained that I'm proud of." },
      { id: "principles", label: "Principles", eyebrow: "// 03 — Principles", title: "How I", sub: "The non-negotiables I bring to every codebase I touch." },
    ],
  };
}

export function generateGenericProfessionalHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>,
  templateId: string
): string {
  const t = themeFor(templateId);
  const name = escapeHtml(profileData.displayName || ensName);
  const role = escapeHtml(profileData.role || t.label);
  const firm = escapeHtml(profileData.firm || "");
  const tagline = escapeHtml(profileData.tagline || "");
  const bio = escapeHtml(
    profileData.bio ||
      (t.id === "engineer"
        ? "Software engineer focused on resilient backends, clean APIs, and production systems that don't wake people up at 3am."
        : t.id === "consultant"
        ? "Independent advisor working with founders and operators on the decisions that bend a company's trajectory."
        : "An architect interested in light, proportion, and the small details that make buildings feel inevitable.")
  );
  const location = escapeHtml(profileData.location || "");
  const profileImg = uploadedImages["profileImage"] || "";

  const techStack: string[] = profileData.techStack || [];
  const services: string[] = profileData.servicesOffered || [];
  const calUrl = profileData.calendarUrl || profileData.consultationUrl || "";
  const email = profileData.email || "";
  const tw = twitterUrl(profileData.twitter);
  const li = linkedinUrl(profileData.linkedin);
  const gh = profileData.githubUsername ? `https://github.com/${profileData.githubUsername}` : "";

  const primaryItems: string[] =
    t.id === "engineer"
      ? techStack.length > 0
        ? techStack
        : ["TypeScript", "Go", "PostgreSQL", "Kubernetes", "AWS", "Redis"]
      : t.id === "consultant"
      ? services.length > 0
        ? services
        : ["Strategy & GTM", "Operating model", "Fundraise prep", "Org design", "Pricing"]
      : services.length > 0
      ? services
      : ["Residential", "Adaptive reuse", "Public space", "Master planning"];

  const principles: { num: string; title: string; body: string }[] =
    t.id === "engineer"
      ? [
          { num: "01", title: "Boring tech, sharp execution", body: "I default to proven tools. Novelty for its own sake is how teams accumulate operational debt." },
          { num: "02", title: "Observability before optimization", body: "If you can't see it, you can't fix it. Tracing, metrics, and logs come before clever code." },
          { num: "03", title: "Small, reversible changes", body: "Ship small. Roll back fast. Every commit is an experiment with a kill switch." },
          { num: "04", title: "Write the runbook first", body: "If a system is too complex to operate, it's too complex to run. The on-call experience is a feature." },
        ]
      : t.id === "consultant"
      ? [
          { num: "01", title: "Discovery", body: "Two weeks of listening, reading, and shadowing — before a single recommendation is made." },
          { num: "02", title: "Diagnosis", body: "A written, defensible point of view. Specific. Quantified. Built to withstand the boardroom." },
          { num: "03", title: "Build & coach", body: "Side-by-side execution with your team. The goal is capability, not dependency." },
          { num: "04", title: "Handoff", body: "Documented decisions, operating rhythms in place, and a team that doesn't need me anymore." },
        ]
      : [
          { num: "I.", title: "The site speaks first", body: "Every project begins with hours on the ground. The site dictates more than the brief ever will." },
          { num: "II.", title: "Light as material", body: "Light is treated as structural — measured, modeled, and tested across every season." },
          { num: "III.", title: "Restraint", body: "A discipline of subtraction. The detail that survives the fifth round of editing is the one that stays." },
          { num: "IV.", title: "Stewardship", body: "Buildings outlive their architects. We design for a hundred years of weather, use, and care." },
        ];

  const works: { num: string; title: string; tag: string; body: string }[] =
    t.id === "engineer"
      ? [
          { num: "01", title: "Real-time inference platform", tag: "Backend · Infra", body: "Designed and shipped a low-latency inference layer serving 40M requests/day at p99 < 80ms." },
          { num: "02", title: "Payments reliability rebuild", tag: "Distributed", body: "Led the migration from a synchronous monolith to an event-driven core. Outage minutes dropped 92%." },
          { num: "03", title: "Internal developer platform", tag: "Platform", body: "Built the deployment pipeline and template system used by every product team in the company." },
        ]
      : t.id === "consultant"
      ? [
          { num: "01", title: "Series B GTM repositioning", tag: "Vertical SaaS", body: "Rewrote the wedge, retrained the GO team, and tripled qualified pipeline within two quarters." },
          { num: "02", title: "Operating model redesign", tag: "Marketplace · 200 FTE", body: "Restructured the org around a new product–ops–support pod model. Cycle time fell 60%." },
          { num: "03", title: "Pricing and packaging refresh", tag: "Enterprise software", body: "Three-tier rebuild plus value metric realignment. Net revenue retention moved from 102% to 119%." },
        ]
      : [
          { num: "I.", title: "House on the Headland", tag: "Coastal · 2024", body: "A private residence carved into the cliff. The brief was silence; the answer was a single, long line of glass." },
          { num: "II.", title: "Civic Library", tag: "Public · 2023", body: "Adaptive reuse of a 19th-century warehouse. Cross-laminated timber and three new courtyards." },
          { num: "III.", title: "Studio Pavilion", tag: "Cultural · 2022", body: "A working studio for a sculptor. Concrete, brass, and a roof oculus tracking the equinox." },
        ];

  const profilePlaceholder = t.id === "architect"
    ? `<div style="width:100%;height:100%;background:linear-gradient(135deg,${t.panel} 0%,${t.panel2} 100%);"></div>`
    : `<div style="width:100%;height:100%;background:linear-gradient(135deg,${t.accent} 0%,${t.accent2} 100%);opacity:.85;"></div>`;

  const heroH1 = (() => {
    if (tagline) return tagline;
    if (t.id === "engineer") return `Engineering <span class="ital">that doesn't break</span><br>under load.`;
    if (t.id === "consultant") return `Counsel for the<br><span class="ital">decisions that matter.</span>`;
    return `An architecture of<br><span class="ital">restraint &amp; light.</span>`;
  })();

  const heroEyebrow = (() => {
    const yr = new Date().getFullYear();
    if (t.id === "engineer") return `<span class="live"></span><span>Available · ${yr}</span>`;
    if (t.id === "consultant") return `<span>Accepting two engagements · ${yr}</span>`;
    return `<span>Studio · Est. practice · ${yr}</span>`;
  })();

  const heroPills = [
    role ? `<span class="hpill">${role}</span>` : "",
    firm ? `<span class="hpill">${firm}</span>` : "",
    location ? `<span class="hpill">${SVG.pin} ${location}</span>` : "",
  ].filter(Boolean).join("");

  const stackHTML = primaryItems.length > 0 ? `
<section id="${t.sectionNames[0].id}">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">${t.sectionNames[0].eyebrow}</div>
        <h2 class="section-title">${t.sectionNames[0].title} <span class="ital">${t.id === "engineer" ? "trade." : t.id === "consultant" ? "value." : "practice."}</span></h2>
      </div>
      <p class="section-sub">${t.sectionNames[0].sub}</p>
    </div>
    <div class="stack-grid reveal">
      ${primaryItems.map((s) => `<div class="stack-cell">
        <div class="stack-dot"></div>
        <span>${escapeHtml(s)}</span>
      </div>`).join("")}
    </div>
  </div>
</section>` : "";

  const worksHTML = `
<section id="${t.sectionNames[1].id}">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">${t.sectionNames[1].eyebrow}</div>
        <h2 class="section-title">${t.sectionNames[1].title} <span class="ital">${t.id === "engineer" ? "shipped." : t.id === "consultant" ? "outcomes." : "works."}</span></h2>
      </div>
      <p class="section-sub">${t.sectionNames[1].sub}</p>
    </div>
    <div class="works-list">
      ${works.map((w) => `
      <article class="work reveal">
        <div class="work-num">${w.num}</div>
        <div class="work-body">
          <div class="work-tag">${escapeHtml(w.tag)}</div>
          <h3 class="work-title">${escapeHtml(w.title)}</h3>
          <p class="work-desc">${escapeHtml(w.body)}</p>
        </div>
      </article>`).join("")}
    </div>
  </div>
</section>`;

  const principlesHTML = `
<section id="${t.sectionNames[2].id}">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">${t.sectionNames[2].eyebrow}</div>
        <h2 class="section-title">${t.sectionNames[2].title} <span class="ital">${t.id === "engineer" ? "work." : t.id === "consultant" ? "engage." : "studio."}</span></h2>
      </div>
      <p class="section-sub">${t.sectionNames[2].sub}</p>
    </div>
    <div class="principles">
      ${principles.map((p) => `
      <div class="pillar reveal">
        <div class="pillar-num">${p.num}</div>
        <div class="pillar-body">
          <h4>${escapeHtml(p.title)}</h4>
          <p>${escapeHtml(p.body)}</p>
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>`;

  const partnerHTML = `
<section id="hire">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">${t.eyebrowMode === "serif" ? "— IV." : "// 04 — Get in touch"}</div>
        <h2 class="section-title">${t.id === "consultant" ? "An introduction" : t.id === "architect" ? "Begin a" : "Have a brief"}<br><span class="ital">${t.id === "consultant" ? "is the start." : t.id === "architect" ? "conversation." : "to discuss?"}</span></h2>
      </div>
      <p class="section-sub">${
        t.id === "engineer"
          ? "I take on a small number of contracts each quarter. Reach out and we'll find time."
          : t.id === "consultant"
          ? "Engagements typically begin with a 30-minute introductory call before any commitment."
          : "Each project begins with a conversation about site, brief, and aspiration."
      }</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">
          ${
            t.id === "engineer"
              ? "From greenfield builds to rescuing systems mid-incident, I work with teams that care about doing it well."
              : t.id === "consultant"
              ? "From founder-led companies to public-company operators, the work is bespoke and the relationship is direct."
              : "From private residences to public commissions, the studio takes on three to five projects per year."
          }
        </p>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">${t.eyebrowMode === "serif" ? "— Contact" : "// Contact"}</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">${t.id === "consultant" ? "Begin a conversation." : t.id === "architect" ? "Reach the studio." : "Let's talk."}</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">${t.id === "engineer" ? "Pick whichever channel is fastest." : t.id === "consultant" ? "Replies within one business day." : "Inquiries welcome year-round."}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${calUrl ? `<a href="${escapeHtml(calUrl)}" class="plink primary" target="_blank" rel="noopener">${SVG.cal} ${t.id === "consultant" ? "Schedule an intro call" : t.id === "architect" ? "Book a studio visit" : "Schedule a call"} ${SVG.arrow}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener">${SVG.twitter} ${escapeHtml(profileData.twitter || "")}</a>` : ""}
          ${li ? `<a href="${escapeHtml(li)}" class="plink" target="_blank" rel="noopener">${SVG.linkedin} LinkedIn</a>` : ""}
          ${gh ? `<a href="${escapeHtml(gh)}" class="plink" target="_blank" rel="noopener">${SVG.github} GitHub</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`;

  const heroStats = (() => {
    if (t.id === "engineer")
      return [
        { value: `${techStack.length || "10"}+`, label: "Years shipping" },
        { value: "p99", label: "Latency obsessed" },
        { value: "24/7", label: "On-call experience" },
      ];
    if (t.id === "consultant")
      return [
        { value: "12+", label: "Engagements" },
        { value: "9", label: "Industries" },
        { value: "100%", label: "Referral rate" },
      ];
    return [
      { value: "16", label: "Years of practice" },
      { value: "24", label: "Built works" },
      { value: "7", label: "Awards" },
    ];
  })();

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.displayName || ensName,
    alternateName: ensName,
    jobTitle: profileData.role || t.jobTitle,
    description: profileData.bio || profileData.tagline || "",
    url: `https://${ensName}.limo`,
    worksFor: profileData.firm ? { "@type": "Organization", name: profileData.firm } : undefined,
    sameAs: [tw, li, gh].filter(Boolean),
  });

  const titleStr = `${profileData.displayName || ensName} — ${profileData.role || t.label}`;
  const descStr = profileData.bio || profileData.tagline || t.label;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(titleStr)}</title>
<meta name="description" content="${escapeHtml(descStr)}">
<meta property="og:title" content="${escapeHtml(titleStr)}">
<meta property="og:description" content="${escapeHtml(descStr)}">
<meta property="og:type" content="profile">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${profileImg}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${t.fontHref}" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:${t.bg};--bg-1:${t.bgSoft};--bg-2:${t.panel};--bg-3:${t.panel2};
  --line:${t.line};--line-2:${t.line2};
  --ink:${t.ink};--ink-2:${t.ink2};--ink-3:${t.ink3};--ink-4:${t.ink4};
  --accent:${t.accent};--accent-2:${t.accent2};--accent-soft:${t.accentSoft};
  --grad:linear-gradient(135deg,${t.accent} 0%,${t.accent2} 100%);
  --grad-soft:linear-gradient(135deg,${t.accentSoft} 0%,rgba(0,0,0,0) 100%);
}
html{scroll-behavior:smooth}
body{font-family:${t.bodyFont};background:var(--bg);color:var(--ink);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
${t.id === "architect" ? `body{font-weight:300}` : ""}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 12% -5%,${t.accentSoft},transparent 60%),radial-gradient(ellipse 700px 500px at 88% 28%,${t.accentSoft},transparent 60%);pointer-events:none;z-index:0}
${t.id !== "architect" ? `body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}` : ""}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}
@media(max-width:600px){.container{padding:0 22px}}

.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:${t.id === "architect" ? "rgba(13,13,14,.72)" : t.id === "consultant" ? "rgba(11,20,38,.72)" : "rgba(10,13,18,.72)"};border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:12px;font-family:${t.eyebrowMode === "serif" ? t.serifFont : t.monoFont};font-size:${t.eyebrowMode === "serif" ? "1.05rem" : ".92rem"};font-weight:500;letter-spacing:${t.eyebrowMode === "serif" ? ".01em" : "-.01em"};color:var(--ink)}
.nav-brand .dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px var(--accent);animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.85)}}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--accent) !important;color:${t.id === "architect" ? "#0d0d0e" : t.id === "consultant" ? "#0b1426" : "#0a0d12"} !important;font-weight:600 !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}

.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
${t.id === "architect" ? `.hero{padding:120px 0 100px}` : ""}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:${t.eyebrowMode === "serif" ? t.serifFont : t.monoFont};font-style:${t.eyebrowMode === "serif" ? "italic" : "normal"};font-size:${t.eyebrowMode === "serif" ? ".95rem" : ".78rem"};font-weight:500;text-transform:${t.eyebrowMode === "serif" ? "none" : "uppercase"};letter-spacing:${t.eyebrowMode === "serif" ? ".01em" : ".12em"};color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}
.hero h1{font-size:clamp(2.4rem,5.5vw,${t.id === "architect" ? "5rem" : "4.4rem"});font-weight:${t.id === "architect" ? "400" : "600"};letter-spacing:${t.id === "architect" ? "-.025em" : "-.035em"};line-height:1.04;margin-bottom:24px;${t.id === "architect" ? `font-family:${t.serifFont};` : ""}}
.hero h1 .ital,.section-title .ital{font-family:${t.serifFont};font-style:italic;font-weight:400;letter-spacing:-.02em;color:var(--ink)}
${t.id === "consultant" ? `.section-title .ital,.hero h1 .ital{color:var(--accent)}` : ""}
${t.id === "architect" ? `.hero h1 .ital{color:var(--accent)}` : ""}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.65;max-width:620px;margin-bottom:28px;text-wrap:pretty}
.hero-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px}
.hpill{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;background:var(--bg-2);border:1px solid var(--line);font-family:${t.id === "architect" ? t.serifFont : t.monoFont};font-style:${t.id === "architect" ? "italic" : "normal"};font-size:.82rem;color:var(--ink-2)}
.hpill svg{width:13px;height:13px}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--accent);color:${t.id === "architect" ? "#0d0d0e" : t.id === "consultant" ? "#0b1426" : "#0a0d12"}}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px ${t.accentSoft}}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:${t.id === "architect" ? t.serifFont : t.monoFont};font-size:${t.id === "architect" ? "2rem" : "1.6rem"};font-weight:${t.id === "architect" ? "400" : "600"};font-style:${t.id === "architect" ? "italic" : "normal"};color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.75rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px;font-family:${t.monoFont}}

.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:${t.id === "architect" ? "4px" : "20px"};overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,${t.id === "architect" ? "rgba(13,13,14,.85)" : t.id === "consultant" ? "rgba(11,20,38,.85)" : "rgba(10,13,18,.85)"} 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:${t.monoFont};font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3)}
.profile-glow{position:absolute;inset:-2px;border-radius:${t.id === "architect" ? "6px" : "22px"};background:var(--grad);z-index:-1;opacity:.35;filter:blur(22px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:${t.monoFont};font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3)}
.profile-meta-row b{color:var(--ink);font-weight:500}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}

section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:${t.eyebrowMode === "serif" ? t.serifFont : t.monoFont};font-style:${t.eyebrowMode === "serif" ? "italic" : "normal"};font-size:${t.eyebrowMode === "serif" ? "1rem" : ".78rem"};text-transform:${t.eyebrowMode === "serif" ? "none" : "uppercase"};letter-spacing:${t.eyebrowMode === "serif" ? ".01em" : ".15em"};color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,${t.id === "architect" ? "3rem" : "2.6rem"});font-weight:${t.id === "architect" ? "400" : "600"};letter-spacing:-.02em;line-height:1.12;margin-top:8px;text-wrap:balance;${t.id === "architect" ? `font-family:${t.serifFont};` : ""}}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}

.stack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--bg-1)}
@media(max-width:880px){.stack-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.stack-grid{grid-template-columns:1fr}}
.stack-cell{display:flex;align-items:center;gap:14px;padding:22px 24px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);font-family:${t.id === "architect" ? t.serifFont : t.monoFont};font-style:${t.id === "architect" ? "italic" : "normal"};font-size:${t.id === "architect" ? "1.1rem" : ".95rem"};color:var(--ink);transition:background .2s ease}
.stack-cell:hover{background:var(--bg-2)}
.stack-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px var(--accent);flex-shrink:0}

.works-list{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--line)}
.work{display:grid;grid-template-columns:120px 1fr;gap:36px;padding:36px 0;border-bottom:1px solid var(--line);align-items:start;transition:padding .2s ease}
.work:hover{padding-left:8px}
.work-num{font-family:${t.id === "architect" ? t.serifFont : t.monoFont};font-style:${t.id === "architect" ? "italic" : "normal"};font-size:${t.id === "architect" ? "2rem" : "1.4rem"};font-weight:${t.id === "architect" ? "400" : "500"};color:var(--accent);letter-spacing:-.02em;padding-top:4px}
.work-tag{font-family:${t.monoFont};font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:8px}
.work-title{font-size:${t.id === "architect" ? "1.7rem" : "1.4rem"};font-weight:${t.id === "architect" ? "400" : "600"};letter-spacing:-.02em;margin-bottom:10px;${t.id === "architect" ? `font-family:${t.serifFont};` : ""}}
.work-desc{color:var(--ink-2);font-size:1rem;line-height:1.65;max-width:600px;text-wrap:pretty}
@media(max-width:720px){.work{grid-template-columns:1fr;gap:14px;padding:30px 0}.work-num{font-size:1.2rem}}

.principles{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
@media(max-width:720px){.principles{grid-template-columns:1fr}}
.pillar{display:flex;gap:16px;padding:24px 22px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.pillar:hover{border-color:var(--line-2);transform:translateY(-2px);background:var(--bg-2)}
.pillar-num{font-family:${t.id === "architect" ? t.serifFont : t.monoFont};font-style:${t.id === "architect" ? "italic" : "normal"};font-size:${t.id === "architect" ? "1.4rem" : ".9rem"};color:var(--accent);font-weight:${t.id === "architect" ? "400" : "500"};min-width:36px;padding-top:1px}
.pillar-body h4{font-size:1.05rem;font-weight:600;margin-bottom:8px;letter-spacing:-.01em;color:var(--ink)}
.pillar-body p{color:var(--ink-2);font-size:.94rem;line-height:1.6}

.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--accent) 50%,transparent)}
.plink{display:inline-flex;align-items:center;gap:10px;padding:11px 16px;border-radius:9px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.92rem;font-weight:500;transition:all .18s ease}
.plink svg{width:15px;height:15px;flex-shrink:0;color:var(--ink-3)}
.plink:hover{background:var(--bg-2);border-color:var(--accent);color:var(--ink)}
.plink:hover svg{color:var(--accent)}
.plink.primary{background:var(--accent);color:${t.id === "architect" ? "#0d0d0e" : t.id === "consultant" ? "#0b1426" : "#0a0d12"};border-color:var(--accent)}
.plink.primary svg{color:${t.id === "architect" ? "#0d0d0e" : t.id === "consultant" ? "#0b1426" : "#0a0d12"}}
.plink.primary:hover{background:transparent;color:var(--ink);border-color:var(--accent)}
.plink.primary:hover svg{color:var(--accent)}

footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:${t.monoFont};font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty;${t.id === "architect" ? `font-family:${t.serifFont};font-style:italic;` : ""}}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:${t.monoFont};font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}

.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      <a href="#${t.sectionNames[0].id}">${t.sectionNames[0].label}</a>
      <a href="#${t.sectionNames[1].id}">${t.sectionNames[1].label}</a>
      <a href="#${t.sectionNames[2].id}">${t.sectionNames[2].label}</a>
      <a href="#hire" class="nav-cta">${t.id === "consultant" ? "Engage" : t.id === "architect" ? "Inquire" : "Get in touch"}</a>
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow">${heroEyebrow}</div>
        <h1>${heroH1}</h1>
        <p class="hero-bio"><b style="color:var(--ink);font-weight:600;">${name}</b>${firm ? `, ${firm}` : ""} — ${bio}</p>
        ${heroPills ? `<div class="hero-pills">${heroPills}</div>` : ""}
        <div class="hero-actions">
          ${calUrl ? `<a href="${escapeHtml(calUrl)}" class="btn btn-primary" target="_blank" rel="noopener">${SVG.cal} ${t.id === "consultant" ? "Schedule an intro" : t.id === "architect" ? "Book a studio visit" : "Schedule a call"} ${SVG.arrowRight}</a>` : ""}
          <a href="#${t.sectionNames[1].id}" class="btn btn-ghost">${t.id === "engineer" ? "View selected work" : t.id === "consultant" ? "Read the work" : "Selected works"}</a>
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${escapeHtml(s.value)}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : profilePlaceholder}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">${role}</span></div>
        </div>
        <div class="profile-meta">
          ${firm ? `<div class="profile-meta-row"><span>${t.id === "architect" ? "studio" : t.id === "consultant" ? "firm" : "team"}</span><b>${firm}</b></div>` : ""}
          ${location ? `<div class="profile-meta-row"><span>based</span><b>${location}</b></div>` : ""}
          <div class="profile-meta-row"><span>status</span><b style="color:var(--accent)">● accepting work</b></div>
        </div>
      </div>
    </div>
  </div>
</header>
${stackHTML}
${worksHTML}
${principlesHTML}
${partnerHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="dot"></span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || profileData.tagline || t.label)}</p>
      </div>
      <div class="foot-col">
        <h5>${t.id === "engineer" ? "Practice" : t.id === "consultant" ? "Work" : "Studio"}</h5>
        <a href="#${t.sectionNames[0].id}">${t.sectionNames[0].label}</a>
        <a href="#${t.sectionNames[1].id}">${t.sectionNames[1].label}</a>
        <a href="#${t.sectionNames[2].id}">${t.sectionNames[2].label}</a>
        <a href="#hire">${t.id === "consultant" ? "Engage" : t.id === "architect" ? "Inquire" : "Get in touch"}</a>
      </div>
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">X / Twitter</a>` : ""}
        ${li ? `<a href="${escapeHtml(li)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${gh ? `<a href="${escapeHtml(gh)}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(ensName)} — ${t.id === "architect" ? "All works reserved." : "All rights reserved."}</span>
      <span class="built"><span class="dot"></span>Built with buildsite.eth · Hosted on IPFS</span>
    </div>
  </div>
</footer>
<script>
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
</body>
</html>`;
}

export function GenericProfessionalTemplate({ profileData, ensName, uploadedImages, templateId }: Props) {
  const html = generateGenericProfessionalHTML(profileData, ensName, uploadedImages, templateId);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Professional Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
