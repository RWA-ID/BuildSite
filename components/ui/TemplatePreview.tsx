"use client";
import { useMemo } from "react";
import { renderTemplateToHTML } from "@/lib/templateRenderer";
import { ProfileData } from "@/lib/store";

const SAMPLE_DATA: Record<string, Partial<ProfileData>> = {
  ensgiant: {
    displayName: "Hector Morel",
    tagline: "Building identity primitives for the onchain world.",
    bio: "Builder shipping ENS-native infrastructure. Six live products, four years onchain, infinite ENS conviction.",
    chains: ["Ethereum", "Base", "Linea"],
    focus: ["Identity", "ENS", "Agents"],
    stats: [
      { label: "Live products", value: "6" },
      { label: "Years onchain", value: "4+" },
      { label: "Conviction", value: "∞" },
    ],
    projects: [
      { name: "RWA ID", description: "Real-world asset identity registry", tags: ["ENS", "Solidity"], badge: "Live", url: "", twitterUrl: "", githubUrl: "", imageFile: null },
      { name: "x402id", description: "AI agent identity hub", tags: ["ENS", "Agents"], badge: "New", url: "", twitterUrl: "", githubUrl: "", imageFile: null },
    ],
    servicesOffered: ["ENS architecture", "Agent identity", "IPFS deployment", "Smart contract audit"],
    twitter: "@ensgianteth",
  },
  founder: {
    displayName: "Sarah Chen",
    role: "Co-Founder & CEO",
    company: "Atlas Labs",
    bio: "Building the future of decentralized infrastructure.",
    raised: "$12M Series A",
    investors: ["Paradigm", "a16z crypto", "Variant"],
  },
  builder: {
    displayName: "alex.eth",
    bio: "Open-source contributor. Solidity, Rust, TypeScript.",
    githubUsername: "alex",
    techStack: ["Solidity", "TypeScript", "Rust", "Go"],
  },
  ens_maxi: {
    displayName: "ensmaxi.eth",
    bio: "ENS power user. 50+ subdomains, 200+ records.",
    chains: ["Ethereum", "Base"],
  },
  defi: {
    displayName: "defi.eth",
    bio: "Protocol contributor and on-chain analyst.",
    stats: [
      { label: "TVL", value: "$2.1B" },
      { label: "Protocols", value: "12" },
    ],
  },
  doctor: {
    displayName: "Dr. Maria Rodriguez",
    specialty: "Cardiology",
    hospital: "Mount Sinai Hospital",
    credentials: ["MD", "FACC", "Board Certified"],
    languages: ["English", "Spanish"],
    bio: "Board-certified cardiologist with 15+ years of experience.",
  },
  lawyer: {
    displayName: "James Smith, Esq.",
    firm: "Smith & Partners LLP",
    practiceAreas: ["Securities", "M&A", "IP Litigation"],
    barNumber: "NY12345",
    barState: "New York",
    bio: "Corporate attorney specializing in tech and crypto law.",
  },
  engineer: {
    displayName: "Engineer Name",
    role: "Principal Software Engineer",
    techStack: ["Go", "Rust", "TypeScript", "Kubernetes"],
    bio: "Distributed systems engineer.",
  },
  consultant: {
    displayName: "Consultant Name",
    role: "Strategy Consultant",
    servicesOffered: ["Growth strategy", "GTM", "Product-market fit"],
    bio: "Helping startups scale.",
  },
  architect: {
    displayName: "Architect Name",
    firm: "Atelier Studio",
    location: "New York · Tokyo",
    bio: "Modern minimalist architecture.",
  },
  content_creator: {
    displayName: "Creator Name",
    tagline: "Tech & finance content",
    subscriberCount: "1.2M",
    bio: "Daily insights on crypto and AI.",
  },
  streamer: {
    displayName: "StreamerHandle",
    twitchChannel: "streamerhandle",
    streamSchedule: "Mon–Fri 8PM EST",
    games: ["Valorant", "League of Legends"],
    bio: "Live every weekday.",
  },
  artist: {
    displayName: "Artist Name",
    tagline: "Mixed media · Digital",
    bio: "Visual artist exploring identity and technology.",
    location: "Mexico City",
  },
  musician: {
    displayName: "Artist Name",
    tagline: "Electronic · Synthwave",
    bio: "New EP out now.",
  },
  agency: {
    displayName: "Studio Slash",
    tagline: "Brand · Web · 3D",
    servicesOffered: ["Brand identity", "Web design", "3D visualization"],
    bio: "Independent creative studio.",
  },
  freelancer: {
    displayName: "Freelancer Name",
    role: "Product Designer",
    servicesOffered: ["Product design", "Design systems", "Prototyping"],
    bio: "Available for new projects.",
  },
  dao: {
    daoName: "BuilderDAO",
    tagline: "Funding the next generation of public goods",
    tokenSymbol: "BUILD",
    proposalCount: "47",
    bio: "A community of builders supporting open-source infrastructure.",
  },
};

export function TemplatePreview({ templateId, className = "" }: { templateId: string; className?: string }) {
  const html = useMemo(() => {
    const data = SAMPLE_DATA[templateId] || SAMPLE_DATA.ensgiant;
    const ensName = `${templateId === "ensgiant" ? "ensgiant" : templateId.replace(/_/g, "")}.eth`;
    try {
      return renderTemplateToHTML(templateId, data, ensName, {});
    } catch {
      return "<html><body style='background:#0a0a0a'></body></html>";
    }
  }, [templateId]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0a0a0a] ${className}`}>
      <div
        className="absolute inset-0 origin-top-left pointer-events-none"
        style={{
          width: "1280px",
          height: "1600px",
          transform: "scale(0.18)",
          transformOrigin: "top left",
        }}
      >
        <iframe
          srcDoc={html}
          title={`${templateId} preview`}
          className="w-full h-full border-0"
          sandbox=""
          loading="lazy"
          scrolling="no"
        />
      </div>
    </div>
  );
}
