import { create } from "zustand";

export interface ProjectEntry {
  name: string;
  description: string;
  tags: string[];
  badge: string;
  url: string;
  twitterUrl: string;
  githubUrl: string;
  imageFile: File | null;
}

export interface StatEntry {
  label: string;
  value: string;
}

export interface ProfileData {
  // Universal
  displayName: string;
  tagline: string;
  bio: string;
  profileImage: File | null;
  bannerImage: File | null;
  email: string;
  location: string;
  website: string;
  // Social
  twitter: string;
  github: string;
  linkedin: string;
  telegram: string;
  discord: string;
  youtube: string;
  twitch: string;
  instagram: string;
  farcaster: string;
  lens: string;
  efpProfile: string;
  // ENS Giant specific
  projects: ProjectEntry[];
  stats: StatEntry[];
  servicesOffered: string[];
  contactPurposes: string[];
  chains: string[];
  focus: string[];
  // Founder specific
  company: string;
  role: string;
  companyLogo: File | null;
  raised: string;
  investors: string[];
  calendarUrl: string;
  // Builder specific
  githubUsername: string;
  techStack: string[];
  // Doctor specific
  specialty: string;
  hospital: string;
  credentials: string[];
  appointmentUrl: string;
  languages: string[];
  // Lawyer specific
  firm: string;
  practiceAreas: string[];
  barNumber: string;
  barState: string;
  consultationUrl: string;
  lawSchool: string;
  yearOfCall: string;
  // DAO specific
  daoName: string;
  snapshotUrl: string;
  treasuryAddress: string;
  tokenSymbol: string;
  discordUrl: string;
  governanceUrl: string;
  proposalCount: string;
  // Content Creator specific
  youtubeChannelId: string;
  subscriberCount: string;
  sponsorshipEmail: string;
  mediaKit: string;
  // ENS Maxi specific
  subdomains: string[];
  donateAddress: string;
  openseaUrl: string;
  grailsUrl: string;
  featuredNames: string[];
  // Sponsorship — array of { name } with logo URLs stored in uploadedImages["sponsorLogo${index}"]
  sponsors: { name: string }[];
  // Streamer specific
  twitchChannel: string;
  isLive: boolean;
  streamSchedule: string;
  games: string[];
  donationUrl: string;
}

export type PublishStatus =
  | "idle"
  | "paying"
  | "uploading"
  | "setting_contenthash"
  | "done"
  | "error";

interface BuilderState {
  step: number;
  ensName: string;
  ensMode: "register" | "existing";
  category: string;
  templateId: string;
  profileData: Partial<ProfileData>;
  uploadedImages: Record<string, string>;
  generatedHtml: string;
  ipfsCid: string;
  publishStatus: PublishStatus;
  publishError: string | null;

  setStep: (s: number) => void;
  setEnsName: (name: string) => void;
  setEnsMode: (mode: "register" | "existing") => void;
  setCategory: (cat: string) => void;
  setTemplate: (id: string) => void;
  setProfileData: (data: Partial<ProfileData>) => void;
  setUploadedImage: (key: string, url: string) => void;
  setGeneratedHtml: (html: string) => void;
  setIpfsCid: (cid: string) => void;
  setPublishStatus: (status: PublishStatus) => void;
  setPublishError: (err: string | null) => void;
  reset: () => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
  step: 1,
  ensName: "",
  ensMode: "existing",
  category: "",
  templateId: "",
  profileData: {},
  uploadedImages: {},
  generatedHtml: "",
  ipfsCid: "",
  publishStatus: "idle",
  publishError: null,

  setStep: (s) => set({ step: s }),
  setEnsName: (ensName) => set({ ensName }),
  setEnsMode: (ensMode) => set({ ensMode }),
  setCategory: (category) => set({ category, templateId: "" }),
  setTemplate: (templateId) => set({ templateId }),
  setProfileData: (data) =>
    set((s) => ({ profileData: { ...s.profileData, ...data } })),
  setUploadedImage: (key, url) =>
    set((s) => ({ uploadedImages: { ...s.uploadedImages, [key]: url } })),
  setGeneratedHtml: (generatedHtml) => set({ generatedHtml }),
  setIpfsCid: (ipfsCid) => set({ ipfsCid }),
  setPublishStatus: (publishStatus) => set({ publishStatus }),
  setPublishError: (publishError) => set({ publishError }),
  reset: () =>
    set({
      step: 1,
      ensName: "",
      ensMode: "existing",
      category: "",
      templateId: "",
      profileData: {},
      uploadedImages: {},
      generatedHtml: "",
      ipfsCid: "",
      publishStatus: "idle",
      publishError: null,
    }),
}));
