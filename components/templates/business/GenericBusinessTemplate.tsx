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
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
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

function linkedinUrl(handle: string | undefined): string {
  if (!handle) return "";
  return handle.startsWith("http") ? handle : `https://www.linkedin.com/in/${handle}`;
}

interface Theme {
  bg: string;
  bg1: string;
  bg2: string;
  bg3: string;
  line: string;
  line2: string;
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  accent: string;
  accent2: string;
  grad: string;
  gradSoft: string;
  display: string;
  serif: string;
  mono: string;
  fontsHref: string;
  eyebrow: string;
  heroLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  schemaType: string;
  defaultTagline: string;
  navIcon: string;
  showcaseLabel: string;
  approachLabel: string;
  trustLabel: string;
  approachTitle: string;
  approachLead: string;
  trustTitle: string;
  contactTitle: string;
  contactLead: string;
  contactCardLabel: string;
  contactCardHeading: string;
  approachItems: { title: string; body: string }[];
  metaRows: { label: string; value: string }[];
}

function getTheme(templateId: string, profileData: Partial<ProfileData>): Theme {
  const id = (templateId || "agency").toLowerCase();
  const location = profileData.location || "";
  const role = profileData.role || "";

  if (id === "freelancer") {
    return {
      bg: "#0c0e14",
      bg1: "#11131c",
      bg2: "#161922",
      bg3: "#1d212d",
      line: "#23273a",
      line2: "#33384e",
      ink: "#f6f1e8",
      ink2: "#c8c1b1",
      ink3: "#7e7866",
      ink4: "#544f43",
      accent: "#f59e0b",
      accent2: "#fb923c",
      grad: "linear-gradient(135deg,#f59e0b 0%,#fb923c 100%)",
      gradSoft: "linear-gradient(135deg,rgba(245,158,11,.12) 0%,rgba(251,146,60,.12) 100%)",
      display: "'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif",
      serif: "'Instrument Serif',serif",
      mono: "'JetBrains Mono',monospace",
      fontsHref: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      eyebrow: `Booking selectively · ${new Date().getFullYear()}`,
      heroLead: "Independent practice. Real outcomes.",
      ctaPrimary: "Start a project",
      ctaSecondary: "How I work",
      schemaType: "Person",
      defaultTagline: "Independent practitioner crafting work that ships.",
      navIcon: SVG.spark,
      showcaseLabel: "01 — Services",
      approachLabel: "02 — How I work",
      trustLabel: "03 — Recent work",
      approachTitle: "A simple way of <span class='ital'>working together.</span>",
      approachLead: "Small engagements, sharp scope. We talk, we agree on the shape, I ship.",
      trustTitle: "Selected projects, <span class='ital'>real outcomes.</span>",
      contactTitle: "Let's talk about <span class='ital'>your project.</span>",
      contactLead: "Discovery calls are free. If we're a fit, you'll have a proposal within 48 hours.",
      contactCardLabel: "// Hire",
      contactCardHeading: "Book a call.",
      approachItems: [
        { title: "Discovery", body: "30-minute call to understand the work, the constraints, and the deadline." },
        { title: "Proposal", body: "Fixed scope, fixed price, fixed timeline. No hourly billing surprises." },
        { title: "Build", body: "I ship in milestones. You see progress weekly, not at the end." },
        { title: "Handoff", body: "Clean code, clean docs, two weeks of post-launch support included." },
      ],
      metaRows: [
        ...(role ? [{ label: "role", value: role }] : []),
        ...(location ? [{ label: "based", value: location }] : []),
        { label: "status", value: "● booking" },
      ],
    };
  }

  if (id === "startup") {
    return {
      bg: "#06070b",
      bg1: "#0a0c12",
      bg2: "#0e1018",
      bg3: "#141824",
      line: "#1a1f2e",
      line2: "#272d40",
      ink: "#f4f6f8",
      ink2: "#a8b3c2",
      ink3: "#6a7585",
      ink4: "#444e5e",
      accent: "#10b981",
      accent2: "#06b6d4",
      grad: "linear-gradient(135deg,#10b981 0%,#06b6d4 100%)",
      gradSoft: "linear-gradient(135deg,rgba(16,185,129,.12) 0%,rgba(6,182,212,.12) 100%)",
      display: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
      serif: "'Instrument Serif',serif",
      mono: "'JetBrains Mono',monospace",
      fontsHref: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      eyebrow: `Hiring · Building · ${new Date().getFullYear()}`,
      heroLead: "What we're building.",
      ctaPrimary: "See the product",
      ctaSecondary: "Talk to us",
      schemaType: "Organization",
      defaultTagline: "Building the next generation of software, one user at a time.",
      navIcon: SVG.rocket,
      showcaseLabel: "01 — What we do",
      approachLabel: "02 — Why now",
      trustLabel: "03 — Backed by",
      approachTitle: "Why this, <span class='ital'>why now.</span>",
      approachLead: "The market is shifting. We're building for the version of the world that's already arriving.",
      trustTitle: "Backed by people <span class='ital'>who get it.</span>",
      contactTitle: "Want to work <span class='ital'>with us?</span>",
      contactLead: "We're hiring engineers, designers, and operators. Investors and partners welcome too.",
      contactCardLabel: "// Get in touch",
      contactCardHeading: "Reach the team.",
      approachItems: [
        { title: "The shift", body: "Customer expectations are rising faster than incumbents can adapt. There's an opening." },
        { title: "Our wedge", body: "We solve a sharp, painful problem — and use it as the doorway to a much larger surface." },
        { title: "The team", body: "Operators who've shipped before. We move fast and we ship the boring stuff that actually matters." },
        { title: "The next year", body: "Product, distribution, hiring. In that order. Everything else is noise." },
      ],
      metaRows: [
        ...(role ? [{ label: "stage", value: role }] : []),
        ...(profileData.raised ? [{ label: "raised", value: profileData.raised }] : []),
        ...(location ? [{ label: "hq", value: location }] : []),
        { label: "status", value: "● hiring" },
      ],
    };
  }

  // agency (default)
  return {
    bg: "#0a0a0f",
    bg1: "#101019",
    bg2: "#14141c",
    bg3: "#1c1c28",
    line: "#22222e",
    line2: "#2f2f3e",
    ink: "#f5f5f7",
    ink2: "#b5b5c4",
    ink3: "#74748a",
    ink4: "#4d4d62",
    accent: "#6366f1",
    accent2: "#ec4899",
    grad: "linear-gradient(135deg,#6366f1 0%,#ec4899 100%)",
    gradSoft: "linear-gradient(135deg,rgba(99,102,241,.14) 0%,rgba(236,72,153,.14) 100%)",
    display: "'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif",
    serif: "'Instrument Serif',serif",
    mono: "'JetBrains Mono',monospace",
    fontsHref: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
    eyebrow: `Studio · ${new Date().getFullYear()} · Selective engagements`,
    heroLead: "An independent studio.",
    ctaPrimary: "Start a project",
    ctaSecondary: "Our work",
    schemaType: "Organization",
    defaultTagline: "An independent studio building digital products that punch above their weight.",
    navIcon: SVG.layers,
    showcaseLabel: "01 — Capabilities",
    approachLabel: "02 — Process",
    trustLabel: "03 — Selected work",
    approachTitle: "How we move from <span class='ital'>idea to launch.</span>",
    approachLead: "A tight, deliberate process. Fewer meetings, more shipping. We protect the work.",
    trustTitle: "Selected work, <span class='ital'>quietly done well.</span>",
    contactTitle: "Got a project <span class='ital'>worth doing right?</span>",
    contactLead: "We take on a small number of engagements per quarter. The earlier you reach out, the better.",
    contactCardLabel: "// New business",
    contactCardHeading: "Start an engagement.",
    approachItems: [
      { title: "Define", body: "We pin down the real problem and the shape of a great answer — together, on a whiteboard." },
      { title: "Design", body: "Tight loops. Real fidelity early. Strong opinions, held loosely until the work argues back." },
      { title: "Build", body: "Engineering and design in the same room. We ship the version we'd ship for ourselves." },
      { title: "Launch", body: "Measured rollout, real feedback, fast iteration. The launch isn't the finish line." },
    ],
    metaRows: [
      ...(role ? [{ label: "kind", value: role }] : []),
      ...(location ? [{ label: "based", value: location }] : []),
      { label: "status", value: "● taking briefs" },
    ],
  };
}

export function generateGenericBusinessHTML(
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>,
  templateId: string
): string {
  const t = getTheme(templateId, profileData);
  const id = (templateId || "agency").toLowerCase();

  const name = escapeHtml(profileData.displayName || profileData.company || ensName);
  const tagline = escapeHtml(profileData.tagline || t.defaultTagline);
  const bio = escapeHtml(profileData.bio || tagline);
  const role = escapeHtml(profileData.role || (id === "agency" ? "Independent studio" : id === "startup" ? "Early-stage company" : "Independent practitioner"));
  const profileImg = uploadedImages["profileImage"] || uploadedImages["companyLogo"] || "";
  const services: string[] = (profileData.servicesOffered || []).filter(Boolean);
  const investors: string[] = (profileData.investors || []).filter(Boolean);
  const calUrl = profileData.calendarUrl || "";
  const email = profileData.email || "";
  const tw = twitterUrl(profileData.twitter);
  const li = linkedinUrl(profileData.linkedin);

  const heroIcon = id === "startup" ? SVG.rocket : id === "freelancer" ? SVG.spark : SVG.layers;

  // Hero stats — synthesize per theme
  const heroStats: { value: string; label: string }[] =
    id === "startup"
      ? [
          { value: profileData.raised ? escapeHtml(profileData.raised) : "—", label: "Raised" },
          { value: investors.length > 0 ? String(investors.length) : "—", label: "Investors" },
          { value: services.length > 0 ? String(services.length) : "—", label: "Pillars" },
        ]
      : id === "freelancer"
      ? [
          { value: services.length > 0 ? String(services.length) : "—", label: "Services" },
          { value: "48h", label: "Reply time" },
          { value: profileData.location ? escapeHtml(profileData.location) : "Remote", label: "Based" },
        ]
      : [
          { value: services.length > 0 ? String(services.length) : "—", label: "Capabilities" },
          { value: profileData.location ? escapeHtml(profileData.location) : "Remote", label: "Studio" },
          { value: String(new Date().getFullYear()), label: "Active" },
        ];

  // Capabilities / services
  const servicesHTML =
    services.length > 0
      ? `
<section id="services">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// ${escapeHtml(t.showcaseLabel)}</div>
        <h2 class="section-title">${
          id === "startup"
            ? "What we build,<br><span class='ital'>and what it does.</span>"
            : id === "freelancer"
            ? "What I do,<br><span class='ital'>and how I help.</span>"
            : "What we make,<br><span class='ital'>and how we make it.</span>"
        }</h2>
      </div>
      <p class="section-sub">${
        id === "startup"
          ? "The product, in plain words. Each pillar is a real surface — not a roadmap dream."
          : id === "freelancer"
          ? "A small set of services, sharply scoped. I'd rather do four things very well than ten things poorly."
          : "A focused set of capabilities. Each one stands on its own — together they compound."
      }</p>
    </div>
    <div class="services-grid">
      ${services
        .map(
          (s, i) => `
      <article class="svc-card reveal">
        <div class="svc-num">${String(i + 1).padStart(2, "0")}</div>
        <h3 class="svc-title">${escapeHtml(s)}</h3>
        <p class="svc-body">${
          id === "startup"
            ? "A core product surface — built end-to-end, owned by a small team, measured against real outcomes."
            : id === "freelancer"
            ? "Fixed scope. Fixed timeline. You get a senior practitioner from kickoff to handoff."
            : "Strategy, design, and engineering in one team — shipping a thing your customers will actually notice."
        }</p>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`
      : "";

  // Approach / process / why-now
  const approachHTML = `
<section id="approach">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// ${escapeHtml(t.approachLabel)}</div>
        <h2 class="section-title">${t.approachTitle}</h2>
      </div>
      <p class="section-sub">${escapeHtml(t.approachLead)}</p>
    </div>
    <div class="approach-grid">
      ${t.approachItems
        .map(
          (item, i) => `
      <div class="approach-step reveal">
        <div class="step-rail">
          <div class="step-num">${String(i + 1).padStart(2, "0")}</div>
          ${i < t.approachItems.length - 1 ? '<div class="step-line"></div>' : ""}
        </div>
        <div class="step-body">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.body)}</p>
        </div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`;

  // Trust block — investors (startup), recent work (freelancer/agency)
  const trustHTML =
    id === "startup" && investors.length > 0
      ? `
<section id="trust">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// ${escapeHtml(t.trustLabel)}</div>
        <h2 class="section-title">${t.trustTitle}</h2>
      </div>
      <p class="section-sub">Operators, angels, and funds who saw the shape early and made the bet.</p>
    </div>
    <div class="investors-grid reveal">
      ${investors
        .map(
          (inv) => `
      <div class="investor-tile">
        <div class="investor-name">${escapeHtml(inv)}</div>
      </div>`
        )
        .join("")}
    </div>
  </div>
</section>`
      : services.length > 0
      ? `
<section id="trust">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// ${escapeHtml(t.trustLabel)}</div>
        <h2 class="section-title">${t.trustTitle}</h2>
      </div>
      <p class="section-sub">${
        id === "freelancer"
          ? "A few recent engagements — the kind of work I love taking on next."
          : "A taste of recent engagements — names withheld where the work is still under wraps."
      }</p>
    </div>
    <div class="cases-grid">
      ${services
        .slice(0, 4)
        .map(
          (s, i) => `
      <article class="case-card reveal">
        <div class="case-meta">
          <span class="case-tag">Case ${String(i + 1).padStart(2, "0")}</span>
          <span class="case-year">${new Date().getFullYear() - (i % 2)}</span>
        </div>
        <h3 class="case-title">${escapeHtml(s)}</h3>
        <p class="case-body">${
          id === "freelancer"
            ? "Engaged for a focused build. Shipped on time, under scope creep, with a clean handoff and post-launch support."
            : "A multi-week engagement covering research, design, and engineering. Shipped quietly, performed loudly."
        }</p>
        <div class="case-cta">
          <span>Read case</span>
          ${SVG.arrow}
        </div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`
      : "";

  // Contact partner-grid
  const contactHTML = `
<section id="contact">
  <div class="container">
    <div class="section-head reveal">
      <div>
        <div class="section-label">// 04 — Get in touch</div>
        <h2 class="section-title">${t.contactTitle}</h2>
      </div>
      <p class="section-sub">${escapeHtml(t.contactLead)}</p>
    </div>
    <div class="partner-grid">
      <div class="reveal">
        <p style="font-size:1.05rem;color:var(--ink-2);max-width:480px;text-wrap:pretty;">
          ${
            id === "startup"
              ? "We respond to every thoughtful intro. If you're an engineer, designer, customer, or investor — we want to hear from you."
              : id === "freelancer"
              ? "Tell me about the project, the deadline, and the constraint that's keeping you up at night. I'll tell you honestly whether I'm the right person for it."
              : "Tell us about the work. The clearer the brief, the better the conversation. We reply to every serious enquiry within two business days."
          }
        </p>
        <div class="why-list">
          ${[
            id === "startup"
              ? { t: "We hire for taste", b: "Operators with a strong opinion and a clean track record." }
              : id === "freelancer"
              ? { t: "Senior from day one", b: "No handoffs to juniors. You get me, end to end." }
              : { t: "Senior team only", b: "No handoffs, no junior-to-senior switcheroo. You get the people on the pitch." },
            id === "startup"
              ? { t: "We talk to customers", b: "If you'd use this, we want a 30-minute call. Promise." }
              : id === "freelancer"
              ? { t: "Fixed scope, fixed price", b: "No surprise invoices. We agree on the shape before we begin." }
              : { t: "Tight scope, real outcomes", b: "We define what 'done' looks like upfront — and we ship to it." },
            id === "startup"
              ? { t: "We're investor-friendly", b: "Concise updates, clean cap table, no drama." }
              : id === "freelancer"
              ? { t: "Real availability", b: "I take on a small number of projects at a time. The slot is real." }
              : { t: "Quiet by default", b: "Confidential briefs welcomed. We don't post your work without permission." },
          ]
            .map(
              (item, i) => `
          <div class="why-item">
            <div class="why-check">${SVG.check}</div>
            <div>
              <h5>${escapeHtml(item.t)}</h5>
              <p>${escapeHtml(item.b)}</p>
            </div>
          </div>`
            )
            .join("")}
        </div>
      </div>
      <div class="contact-card reveal">
        <div style="margin-bottom:22px;">
          <div class="section-label" style="margin-bottom:6px;">${escapeHtml(t.contactCardLabel)}</div>
          <div style="font-size:1.25rem;font-weight:600;letter-spacing:-.01em;">${escapeHtml(t.contactCardHeading)}</div>
          <p style="color:var(--ink-3);font-size:.92rem;margin-top:4px;">Pick the channel you like best.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${calUrl ? `<a href="${escapeHtml(calUrl)}" class="plink primary" target="_blank" rel="noopener">${SVG.calendar} Book a call ${SVG.arrow}</a>` : ""}
          ${email ? `<a href="mailto:${escapeHtml(email)}" class="plink primary">${SVG.mail} ${escapeHtml(email)}</a>` : ""}
          ${tw ? `<a href="${escapeHtml(tw)}" class="plink" target="_blank" rel="noopener">${SVG.twitter} ${escapeHtml(profileData.twitter || "")}</a>` : ""}
          ${li ? `<a href="${escapeHtml(li)}" class="plink" target="_blank" rel="noopener">${SVG.linkedin} LinkedIn</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`;

  // JSON-LD
  const isLocalBusiness = id === "freelancer";
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": isLocalBusiness ? "Person" : "Organization",
    name: profileData.displayName || profileData.company || ensName,
    alternateName: ensName,
    description: profileData.bio || tagline,
    url: `https://${ensName}.limo`,
    ...(profileData.location ? { address: { "@type": "PostalAddress", addressLocality: profileData.location } } : {}),
    ...(email ? { email } : {}),
    ...(profileImg ? { logo: profileImg, image: profileImg } : {}),
    sameAs: [tw, li].filter(Boolean),
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — ${tagline}</title>
<meta name="description" content="${tagline}">
<meta property="og:title" content="${name}">
<meta property="og:description" content="${tagline}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://${ensName}.limo">
${profileImg ? `<meta property="og:image" content="${escapeHtml(profileImg)}">` : ""}
<script type="application/ld+json">${jsonLd}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${t.fontsHref}" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:${t.bg};--bg-1:${t.bg1};--bg-2:${t.bg2};--bg-3:${t.bg3};
  --line:${t.line};--line-2:${t.line2};
  --ink:${t.ink};--ink-2:${t.ink2};--ink-3:${t.ink3};--ink-4:${t.ink4};
  --accent:${t.accent};--accent-2:${t.accent2};
  --grad:${t.grad};--grad-soft:${t.gradSoft};
}
html{scroll-behavior:smooth}
body{font-family:${t.display};background:var(--bg);color:var(--ink);line-height:1.55;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02';overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:radial-gradient(ellipse 800px 600px at 15% -5%,${t.accent}26,transparent 60%),radial-gradient(ellipse 700px 500px at 85% 25%,${t.accent2}1f,transparent 60%);pointer-events:none;z-index:0}
body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;mask-image:radial-gradient(ellipse at center,black 30%,transparent 80%)}
main,header,footer,nav{position:relative;z-index:1}
.container{max-width:1240px;margin:0 auto;padding:0 32px}

.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(20px) saturate(140%);-webkit-backdrop-filter:blur(20px) saturate(140%);background:${t.bg}b3;border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;max-width:1240px;margin:0 auto}
.nav-brand{display:flex;align-items:center;gap:10px;font-family:${t.mono};font-size:.92rem;font-weight:500;letter-spacing:-.01em}
.nav-brand .badge{width:26px;height:26px;border-radius:7px;background:var(--grad);display:inline-flex;align-items:center;justify-content:center;color:#fff}
.nav-brand .badge svg{width:14px;height:14px}
.nav-links{display:flex;gap:4px;align-items:center}
.nav-links a{color:var(--ink-2);text-decoration:none;font-size:.9rem;font-weight:500;padding:8px 14px;border-radius:8px;transition:color .2s ease,background .2s ease}
.nav-links a:hover{color:var(--ink);background:var(--bg-2)}
.nav-cta{background:var(--ink) !important;color:var(--bg) !important;font-weight:600 !important}
@media(max-width:720px){.nav-links a:not(.nav-cta){display:none}}

.hero{padding:96px 0 80px;position:relative;border-bottom:1px solid var(--line);overflow:hidden}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto;gap:60px;align-items:center}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:${t.mono};font-size:.78rem;font-weight:500;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);padding:8px 14px;border:1px solid var(--line-2);border-radius:100px;background:rgba(255,255,255,.02);margin-bottom:28px}
.hero-eyebrow .live{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.4rem);font-weight:700;letter-spacing:-.035em;line-height:1.02;margin-bottom:24px;text-wrap:balance}
.hero h1 .grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero h1 .ital,.section-title .ital{font-family:${t.serif};font-style:italic;font-weight:400;letter-spacing:-.02em}
.section-title .ital{color:var(--ink-2)}
.hero-bio{font-size:1.18rem;color:var(--ink-2);line-height:1.6;max-width:620px;margin-bottom:36px;text-wrap:pretty}
.hero-bio b{color:var(--ink);font-weight:600}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:44px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:600;font-size:.95rem;text-decoration:none;border:1px solid transparent;transition:all .2s ease;cursor:pointer;font-family:inherit}
.btn-primary{background:var(--ink);color:var(--bg)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px ${t.accent}33}
.btn-ghost{background:rgba(255,255,255,.03);color:var(--ink);border-color:var(--line-2)}
.btn-ghost:hover{background:rgba(255,255,255,.06);border-color:var(--ink-3);transform:translateY(-2px)}
.hero-stats{display:flex;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:8px}
.stat{flex:1;padding:18px 0;border-right:1px solid var(--line)}
.stat:last-child{border-right:none}
.stat-num{font-family:${t.mono};font-size:1.45rem;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1}
.stat-label{font-size:.74rem;color:var(--ink-3);text-transform:uppercase;letter-spacing:.1em;margin-top:6px}

.profile-frame{position:relative;width:280px;flex-shrink:0}
.profile-card{position:relative;width:100%;aspect-ratio:1;border-radius:20px;overflow:hidden;border:1px solid var(--line-2);background:var(--bg-2)}
.profile-card img{width:100%;height:100%;object-fit:cover;filter:contrast(1.05) saturate(1.05)}
.profile-card .ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--grad);color:#fff}
.profile-card .ph svg{width:64px;height:64px}
.profile-card::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,${t.bg}d9 100%);pointer-events:none}
.profile-tag{position:absolute;bottom:14px;left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;font-family:${t.mono};font-size:.78rem;color:var(--ink);z-index:2}
.profile-tag .role{color:var(--ink-3);max-width:60%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.profile-glow{position:absolute;inset:-2px;border-radius:22px;background:var(--grad);z-index:-1;opacity:.4;filter:blur(20px)}
.profile-meta{margin-top:16px;display:flex;flex-direction:column;gap:8px;font-family:${t.mono};font-size:.78rem}
.profile-meta-row{display:flex;justify-content:space-between;color:var(--ink-3);gap:12px}
.profile-meta-row b{color:var(--ink);font-weight:500;text-align:right;max-width:60%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:880px){.hero-inner{grid-template-columns:1fr;gap:36px}.profile-frame{width:200px}}

section{padding:96px 0;border-bottom:1px solid var(--line)}
section:last-of-type{border-bottom:none}
.section-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:48px;gap:24px;flex-wrap:wrap}
.section-label{font-family:${t.mono};font-size:.78rem;text-transform:uppercase;letter-spacing:.15em;color:var(--ink-3)}
.section-title{font-size:clamp(1.8rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.02em;line-height:1.1;margin-top:8px;text-wrap:balance}
.section-sub{color:var(--ink-2);font-size:1.02rem;max-width:460px;text-wrap:pretty}

.services-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
@media(max-width:880px){.services-grid{grid-template-columns:1fr}}
.svc-card{position:relative;background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;transition:all .25s ease;overflow:hidden}
.svc-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.svc-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.svc-card:hover::before{opacity:1}
.svc-card>*{position:relative;z-index:1}
.svc-num{font-family:${t.mono};font-size:.78rem;color:var(--accent);letter-spacing:.1em;margin-bottom:14px}
.svc-title{font-size:1.4rem;font-weight:600;letter-spacing:-.015em;line-height:1.2;margin-bottom:10px}
.svc-body{color:var(--ink-2);font-size:.98rem;line-height:1.6;text-wrap:pretty}

.approach-grid{display:flex;flex-direction:column;gap:0;max-width:760px}
.approach-step{display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:flex-start}
.step-rail{display:flex;flex-direction:column;align-items:center;width:48px}
.step-num{font-family:${t.mono};font-size:.82rem;color:var(--accent);font-weight:600;width:48px;height:48px;border-radius:50%;border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;background:var(--bg-1);flex-shrink:0}
.step-line{width:1px;flex:1;background:var(--line);min-height:48px;margin-top:6px;margin-bottom:6px}
.step-body{padding-bottom:32px;padding-top:8px}
.step-body h4{font-size:1.2rem;font-weight:600;letter-spacing:-.01em;margin-bottom:6px}
.step-body p{color:var(--ink-2);font-size:1rem;line-height:1.6;text-wrap:pretty;max-width:500px}

.investors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
.investor-tile{padding:24px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease;text-align:center}
.investor-tile:hover{border-color:var(--line-2);background:var(--bg-2)}
.investor-name{font-size:1rem;font-weight:600;letter-spacing:-.01em;color:var(--ink)}

.cases-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
@media(max-width:880px){.cases-grid{grid-template-columns:1fr}}
.case-card{position:relative;background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:28px;transition:all .25s ease;overflow:hidden;display:flex;flex-direction:column;min-height:240px}
.case-card::before{content:'';position:absolute;inset:0;background:var(--grad-soft);opacity:0;transition:opacity .25s ease;pointer-events:none}
.case-card:hover{border-color:var(--line-2);transform:translateY(-3px)}
.case-card:hover::before{opacity:1}
.case-card>*{position:relative;z-index:1}
.case-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-family:${t.mono};font-size:.74rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink-3)}
.case-tag{color:var(--accent)}
.case-title{font-size:1.35rem;font-weight:600;letter-spacing:-.015em;line-height:1.2;margin-bottom:10px}
.case-body{color:var(--ink-2);font-size:.96rem;line-height:1.55;flex:1;text-wrap:pretty;margin-bottom:18px}
.case-cta{display:inline-flex;align-items:center;gap:6px;color:var(--accent);font-size:.88rem;font-weight:500}
.case-cta svg{width:14px;height:14px}

.partner-grid{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:start}
@media(max-width:880px){.partner-grid{grid-template-columns:1fr;gap:40px}}
.why-list{display:grid;gap:14px;margin-top:28px}
.why-item{display:flex;gap:14px;padding:18px 20px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1);transition:all .2s ease}
.why-item:hover{border-color:var(--line-2);transform:translateX(4px)}
.why-check{width:30px;height:30px;border-radius:50%;background:var(--grad);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.why-check svg{width:14px;height:14px}
.why-item h5{font-size:1rem;font-weight:600;margin-bottom:3px;letter-spacing:-.01em}
.why-item p{color:var(--ink-3);font-size:.9rem;line-height:1.5}
.contact-card{background:var(--bg-1);border:1px solid var(--line);border-radius:16px;padding:32px;position:relative;overflow:hidden}
.contact-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${t.accent}99,${t.accent2}99,transparent)}
.plink{display:inline-flex;align-items:center;gap:8px;padding:11px 16px;border-radius:8px;background:var(--bg-3);border:1px solid var(--line-2);color:var(--ink);text-decoration:none;font-size:.9rem;font-weight:500;transition:all .18s ease}
.plink:hover{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink svg{width:16px;height:16px;flex-shrink:0}
.plink.primary{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.plink.primary:hover{background:transparent;color:var(--ink)}

footer{padding:60px 0 50px;border-top:1px solid var(--line);position:relative;z-index:1}
.foot-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:56px;margin-bottom:48px}
@media(max-width:720px){.foot-grid{grid-template-columns:1fr;gap:36px}}
.foot-col h5{font-family:${t.mono};font-size:.72rem;text-transform:uppercase;letter-spacing:.12em;color:var(--ink-3);margin-bottom:14px}
.foot-col a{display:block;color:var(--ink-2);text-decoration:none;padding:5px 0;font-size:.92rem;transition:color .15s ease}
.foot-col a:hover{color:var(--ink)}
.foot-tag{font-size:1rem;color:var(--ink-2);line-height:1.6;max-width:360px;text-wrap:pretty}
.foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--line);font-family:${t.mono};font-size:.8rem;color:var(--ink-3);flex-wrap:wrap;gap:16px}
.foot-bottom .built{display:inline-flex;align-items:center;gap:8px}
.foot-bottom .built .dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent)}

.reveal{opacity:0;transform:translateY(20px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:none}
@media(max-width:480px){.container{padding:0 22px}.hero{padding:72px 0 60px}section{padding:72px 0}.section-head{margin-bottom:32px}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-brand"><span class="badge">${t.navIcon}</span><span>${escapeHtml(ensName)}</span></div>
    <div class="nav-links">
      ${services.length > 0 ? '<a href="#services">' + (id === "startup" ? "Product" : id === "freelancer" ? "Services" : "Capabilities") + "</a>" : ""}
      <a href="#approach">${id === "startup" ? "Why now" : id === "freelancer" ? "Process" : "Process"}</a>
      ${(id === "startup" && investors.length > 0) || services.length > 0 ? `<a href="#trust">${id === "startup" ? "Backers" : "Work"}</a>` : ""}
      <a href="#contact" class="nav-cta">${id === "startup" ? "Talk to us" : "Get in touch"}</a>
    </div>
  </div>
</nav>
<main>
<header class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow"><span class="live"></span><span>${escapeHtml(t.eyebrow)}</span></div>
        <h1>${escapeHtml(t.heroLead)}<br><span class="grad">${name}</span></h1>
        <p class="hero-bio">${bio}</p>
        <div class="hero-actions">
          ${services.length > 0 ? `<a href="#services" class="btn btn-primary">${escapeHtml(t.ctaSecondary)} ${SVG.arrowRight}</a>` : ""}
          <a href="#contact" class="btn btn-ghost">${escapeHtml(t.ctaPrimary)}</a>
        </div>
        <div class="hero-stats">
          ${heroStats.map((s) => `<div class="stat"><div class="stat-num">${s.value}</div><div class="stat-label">${escapeHtml(s.label)}</div></div>`).join("")}
        </div>
      </div>
      <div class="profile-frame">
        <div class="profile-glow"></div>
        <div class="profile-card">
          ${profileImg ? `<img src="${escapeHtml(profileImg)}" alt="${name}">` : `<div class="ph">${heroIcon}</div>`}
          <div class="profile-tag"><span>${escapeHtml(ensName)}</span><span class="role">${role}</span></div>
        </div>
        ${
          t.metaRows.length > 0
            ? `<div class="profile-meta">${t.metaRows
                .map((r) => `<div class="profile-meta-row"><span>${escapeHtml(r.label)}</span><b${r.value.startsWith("●") ? ` style="color:var(--accent)"` : ""}>${escapeHtml(r.value)}</b></div>`)
                .join("")}</div>`
            : ""
        }
      </div>
    </div>
  </div>
</header>
${servicesHTML}
${approachHTML}
${trustHTML}
${contactHTML}
</main>
<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-col">
        <div class="nav-brand" style="margin-bottom:16px;"><span class="badge">${t.navIcon}</span><span>${escapeHtml(ensName)}</span></div>
        <p class="foot-tag">${escapeHtml(profileData.bio || tagline)}</p>
      </div>
      ${
        services.length > 0
          ? `<div class="foot-col"><h5>${id === "startup" ? "Product" : id === "freelancer" ? "Services" : "Capabilities"}</h5>${services.slice(0, 6).map((s) => `<span style="display:block;color:var(--ink-2);padding:5px 0;font-size:.92rem;">${escapeHtml(s)}</span>`).join("")}</div>`
          : ""
      }
      <div class="foot-col">
        <h5>Elsewhere</h5>
        ${tw ? `<a href="${escapeHtml(tw)}" target="_blank" rel="noopener">X / Twitter</a>` : ""}
        ${li ? `<a href="${escapeHtml(li)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${calUrl ? `<a href="${escapeHtml(calUrl)}" target="_blank" rel="noopener">Book a call</a>` : ""}
        ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ""}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} ${escapeHtml(ensName)} — ${id === "startup" ? "Building in public, shipping in private." : id === "freelancer" ? "Independent practice." : "An independent studio."}</span>
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

export function GenericBusinessTemplate({ profileData, ensName, uploadedImages, templateId }: Props) {
  const html = generateGenericBusinessHTML(profileData, ensName, uploadedImages, templateId);
  return (
    <iframe
      srcDoc={html}
      className="w-full h-full border-0"
      title="Business Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
