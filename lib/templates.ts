export interface TemplateField {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "email" | "array" | "file" | "boolean";
  placeholder?: string;
  required?: boolean;
}

export interface TemplateDef {
  id: string;
  name: string;
  description: string;
  category: string;
  previewImage: string;
  fields: TemplateField[];
}

export const CATEGORIES = [
  { id: "builder", label: "Builder / Web3", icon: "⚡" },
  { id: "professional", label: "Professional", icon: "💼" },
  { id: "creative", label: "Creative", icon: "🎨" },
  { id: "business", label: "Business", icon: "🏢" },
  { id: "community", label: "Community", icon: "🌐" },
] as const;

export const TEMPLATES: TemplateDef[] = [
  // Builder / Web3
  {
    id: "ensgiant",
    name: "ENS Giant",
    description:
      "The ultimate Web3 builder profile — projects, stats, EFP social graph, and multi-chain presence.",
    category: "builder",
    previewImage: "/previews/ensgiant.png",
    fields: [
      { key: "displayName", label: "Display Name", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "projects", label: "Projects", type: "array" },
      { key: "stats", label: "Stats", type: "array" },
      { key: "chains", label: "Chains", type: "array" },
      { key: "focus", label: "Focus Areas", type: "array" },
      { key: "servicesOffered", label: "Services Offered", type: "array" },
      { key: "contactPurposes", label: "Open To", type: "array" },
      { key: "efpProfile", label: "EFP Profile URL", type: "url" },
    ],
  },
  {
    id: "founder",
    name: "Founder",
    description:
      "Credibility-first founder page with company info, fundraising highlights, and investor logos.",
    category: "builder",
    previewImage: "/previews/founder.png",
    fields: [
      { key: "displayName", label: "Display Name", type: "text", required: true },
      { key: "company", label: "Company", type: "text" },
      { key: "role", label: "Role / Title", type: "text" },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "raised", label: "Total Raised", type: "text" },
      { key: "investors", label: "Investors", type: "array" },
      { key: "calendarUrl", label: "Calendar URL", type: "url" },
    ],
  },
  {
    id: "builder",
    name: "Builder",
    description:
      "Open-source developer profile with GitHub stats, tech stack, and latest repos.",
    category: "builder",
    previewImage: "/previews/builder.png",
    fields: [
      { key: "displayName", label: "Display Name", type: "text", required: true },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "githubUsername", label: "GitHub Username", type: "text" },
      { key: "techStack", label: "Tech Stack", type: "array" },
    ],
  },
  {
    id: "ens_maxi",
    name: "ENS Maxi",
    description:
      "Showcase your ENS portfolio, subdomains, and on-chain identity in style.",
    category: "builder",
    previewImage: "/previews/ens_maxi.png",
    fields: [
      { key: "displayName", label: "Display Name", type: "text", required: true },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "chains", label: "Chains", type: "array" },
    ],
  },
  {
    id: "defi",
    name: "DeFi Native",
    description:
      "Protocol contributor page with TVL stats, audits, and on-chain activity.",
    category: "builder",
    previewImage: "/previews/defi.png",
    fields: [
      { key: "displayName", label: "Display Name", type: "text", required: true },
      { key: "bio", label: "Bio", type: "textarea" },
      { key: "stats", label: "Stats", type: "array" },
    ],
  },
  // Professional
  {
    id: "doctor",
    name: "Doctor",
    description:
      "Medical professional profile with specialty, credentials, and appointment booking.",
    category: "professional",
    previewImage: "/previews/doctor.png",
    fields: [
      { key: "displayName", label: "Full Name", type: "text", required: true },
      { key: "specialty", label: "Specialty", type: "text" },
      { key: "hospital", label: "Hospital / Clinic", type: "text" },
      { key: "credentials", label: "Credentials", type: "array" },
      { key: "languages", label: "Languages", type: "array" },
      { key: "appointmentUrl", label: "Appointment URL", type: "url" },
      { key: "bio", label: "About", type: "textarea" },
    ],
  },
  {
    id: "lawyer",
    name: "Lawyer",
    description:
      "Attorney profile with practice areas, bar admissions, and consultation booking.",
    category: "professional",
    previewImage: "/previews/lawyer.png",
    fields: [
      { key: "displayName", label: "Full Name", type: "text", required: true },
      { key: "firm", label: "Law Firm", type: "text" },
      { key: "practiceAreas", label: "Practice Areas", type: "array" },
      { key: "barNumber", label: "Bar Number", type: "text" },
      { key: "barState", label: "Bar State / Jurisdiction", type: "text" },
      { key: "consultationUrl", label: "Consultation URL", type: "url" },
      { key: "bio", label: "About", type: "textarea" },
    ],
  },
  {
    id: "engineer",
    name: "Engineer",
    description:
      "Engineering professional profile with skills, projects, and portfolio.",
    category: "professional",
    previewImage: "/previews/engineer.png",
    fields: [
      { key: "displayName", label: "Full Name", type: "text", required: true },
      { key: "role", label: "Engineering Discipline", type: "text" },
      { key: "techStack", label: "Skills / Tools", type: "array" },
      { key: "bio", label: "About", type: "textarea" },
    ],
  },
  {
    id: "consultant",
    name: "Consultant",
    description:
      "Business consultant page with services, case studies, and contact CTA.",
    category: "professional",
    previewImage: "/previews/consultant.png",
    fields: [
      { key: "displayName", label: "Full Name", type: "text", required: true },
      { key: "role", label: "Consulting Focus", type: "text" },
      { key: "servicesOffered", label: "Services", type: "array" },
      { key: "bio", label: "About", type: "textarea" },
      { key: "calendarUrl", label: "Book a Call URL", type: "url" },
    ],
  },
  {
    id: "architect",
    name: "Architect",
    description:
      "Portfolio-first architect profile with project gallery and design philosophy.",
    category: "professional",
    previewImage: "/previews/architect.png",
    fields: [
      { key: "displayName", label: "Full Name", type: "text", required: true },
      { key: "firm", label: "Firm / Studio", type: "text" },
      { key: "bio", label: "Design Philosophy", type: "textarea" },
      { key: "location", label: "Location", type: "text" },
    ],
  },
  // Creative
  {
    id: "content_creator",
    name: "Content Creator",
    description:
      "YouTube / newsletter creator profile with subscriber count and sponsor contact.",
    category: "creative",
    previewImage: "/previews/content_creator.png",
    fields: [
      { key: "displayName", label: "Creator Name", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "bio", label: "About", type: "textarea" },
      { key: "youtubeChannelId", label: "YouTube Channel ID", type: "text" },
      { key: "subscriberCount", label: "Subscriber Count", type: "text" },
      { key: "sponsorshipEmail", label: "Sponsorship Email", type: "email" },
      { key: "mediaKit", label: "Media Kit URL", type: "url" },
    ],
  },
  {
    id: "streamer",
    name: "Streamer",
    description:
      "Twitch/live streaming profile with schedule, game list, and donation link.",
    category: "creative",
    previewImage: "/previews/streamer.png",
    fields: [
      { key: "displayName", label: "Streamer Name", type: "text", required: true },
      { key: "twitchChannel", label: "Twitch Channel", type: "text" },
      { key: "streamSchedule", label: "Stream Schedule", type: "text" },
      { key: "games", label: "Games", type: "array" },
      { key: "donationUrl", label: "Donation URL", type: "url" },
      { key: "bio", label: "About", type: "textarea" },
    ],
  },
  {
    id: "artist",
    name: "Artist",
    description:
      "Visual artist portfolio with gallery, medium, and commission info.",
    category: "creative",
    previewImage: "/previews/artist.png",
    fields: [
      { key: "displayName", label: "Artist Name", type: "text", required: true },
      { key: "tagline", label: "Medium / Style", type: "text" },
      { key: "bio", label: "Artist Statement", type: "textarea" },
      { key: "location", label: "Location", type: "text" },
    ],
  },
  {
    id: "musician",
    name: "Musician",
    description:
      "Music artist profile with genre, releases, and streaming links.",
    category: "creative",
    previewImage: "/previews/musician.png",
    fields: [
      { key: "displayName", label: "Artist Name", type: "text", required: true },
      { key: "tagline", label: "Genre", type: "text" },
      { key: "bio", label: "Bio", type: "textarea" },
    ],
  },
  // Business
  {
    id: "agency",
    name: "Agency",
    description:
      "Creative or technical agency page with services, team, and client inquiry form.",
    category: "business",
    previewImage: "/previews/agency.png",
    fields: [
      { key: "displayName", label: "Agency Name", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "servicesOffered", label: "Services", type: "array" },
      { key: "bio", label: "About", type: "textarea" },
      { key: "email", label: "Contact Email", type: "email" },
    ],
  },
  {
    id: "freelancer",
    name: "Freelancer",
    description:
      "Freelance services page with skills, rates, and hire CTA.",
    category: "business",
    previewImage: "/previews/freelancer.png",
    fields: [
      { key: "displayName", label: "Your Name", type: "text", required: true },
      { key: "role", label: "Freelance Role", type: "text" },
      { key: "servicesOffered", label: "Services", type: "array" },
      { key: "bio", label: "About", type: "textarea" },
      { key: "calendarUrl", label: "Book a Call", type: "url" },
    ],
  },
  // Community
  {
    id: "dao",
    name: "DAO",
    description:
      "Decentralized organization page with governance links, treasury, and proposals.",
    category: "community",
    previewImage: "/previews/dao.png",
    fields: [
      { key: "daoName", label: "DAO Name", type: "text", required: true },
      { key: "tagline", label: "Mission", type: "text" },
      { key: "bio", label: "About", type: "textarea" },
      { key: "tokenSymbol", label: "Token Symbol", type: "text" },
      { key: "snapshotUrl", label: "Snapshot URL", type: "url" },
      { key: "treasuryAddress", label: "Treasury Address", type: "text" },
      { key: "governanceUrl", label: "Governance URL", type: "url" },
      { key: "discordUrl", label: "Discord URL", type: "url" },
      { key: "proposalCount", label: "Total Proposals", type: "text" },
    ],
  },
];

export function getTemplatesByCategory(category: string): TemplateDef[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function getTemplateById(id: string): TemplateDef | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
