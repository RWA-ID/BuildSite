"use client";
import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBuilderStore, ProfileData } from "@/lib/store";
import { getTemplateById } from "@/lib/templates";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { compressImage } from "@/lib/imageUtils";

const profileSchema = z.object({
  displayName: z.string().min(1, "Name is required"),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  twitter: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  telegram: z.string().optional(),
  discord: z.string().optional(),
  youtube: z.string().optional(),
  twitch: z.string().optional(),
  instagram: z.string().optional(),
  farcaster: z.string().optional(),
  lens: z.string().optional(),
  efpProfile: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  raised: z.string().optional(),
  calendarUrl: z.string().optional(),
  githubUsername: z.string().optional(),
  specialty: z.string().optional(),
  hospital: z.string().optional(),
  appointmentUrl: z.string().optional(),
  firm: z.string().optional(),
  barNumber: z.string().optional(),
  barState: z.string().optional(),
  consultationUrl: z.string().optional(),
  daoName: z.string().optional(),
  snapshotUrl: z.string().optional(),
  treasuryAddress: z.string().optional(),
  tokenSymbol: z.string().optional(),
  discordUrl: z.string().optional(),
  governanceUrl: z.string().optional(),
  proposalCount: z.string().optional(),
  youtubeChannelId: z.string().optional(),
  subscriberCount: z.string().optional(),
  sponsorshipEmail: z.string().optional(),
  mediaKit: z.string().optional(),
  twitchChannel: z.string().optional(),
  streamSchedule: z.string().optional(),
  donationUrl: z.string().optional(),
  // Array fields as comma-separated strings for simplicity
  techStackStr: z.string().optional(),
  chainsStr: z.string().optional(),
  focusStr: z.string().optional(),
  servicesStr: z.string().optional(),
  contactPurposesStr: z.string().optional(),
  investorsStr: z.string().optional(),
  credentialsStr: z.string().optional(),
  languagesStr: z.string().optional(),
  practiceAreasStr: z.string().optional(),
  gamesStr: z.string().optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    githubUrl: z.string().optional(),
    twitterUrl: z.string().optional(),
    badge: z.string().optional(),
    tags: z.string().optional(),
  })).optional(),
  stats: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});

type FormValues = z.infer<typeof profileSchema>;

const SOCIAL_TEMPLATE_IDS = ["ensgiant", "founder", "builder", "ens_maxi", "defi", "content_creator", "streamer", "artist", "musician", "dao"];

function parseCSV(s?: string): string[] {
  return s ? s.split(",").map(x => x.trim()).filter(Boolean) : [];
}

export function Step4_Profile({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { templateId, profileData, setProfileData, setUploadedImage, uploadedImages } = useBuilderStore();
  const template = getTemplateById(templateId);

  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: profileData.displayName || "",
      tagline: profileData.tagline || "",
      bio: profileData.bio || "",
      email: profileData.email || "",
      location: profileData.location || "",
      website: profileData.website || "",
      twitter: profileData.twitter || "",
      github: profileData.github || "",
      linkedin: profileData.linkedin || "",
      telegram: profileData.telegram || "",
      discord: profileData.discord || "",
      youtube: profileData.youtube || "",
      instagram: profileData.instagram || "",
      farcaster: profileData.farcaster || "",
      efpProfile: profileData.efpProfile || "",
      company: profileData.company || "",
      role: profileData.role || "",
      raised: profileData.raised || "",
      calendarUrl: profileData.calendarUrl || "",
      githubUsername: profileData.githubUsername || "",
      specialty: profileData.specialty || "",
      hospital: profileData.hospital || "",
      appointmentUrl: profileData.appointmentUrl || "",
      firm: profileData.firm || "",
      barNumber: profileData.barNumber || "",
      barState: profileData.barState || "",
      consultationUrl: profileData.consultationUrl || "",
      daoName: profileData.daoName || "",
      snapshotUrl: profileData.snapshotUrl || "",
      treasuryAddress: profileData.treasuryAddress || "",
      tokenSymbol: profileData.tokenSymbol || "",
      discordUrl: profileData.discordUrl || "",
      governanceUrl: profileData.governanceUrl || "",
      proposalCount: profileData.proposalCount || "",
      youtubeChannelId: profileData.youtubeChannelId || "",
      subscriberCount: profileData.subscriberCount || "",
      sponsorshipEmail: profileData.sponsorshipEmail || "",
      mediaKit: profileData.mediaKit || "",
      twitchChannel: profileData.twitchChannel || "",
      streamSchedule: profileData.streamSchedule || "",
      donationUrl: profileData.donationUrl || "",
      techStackStr: (profileData.techStack || []).join(", "),
      chainsStr: (profileData.chains || []).join(", "),
      focusStr: (profileData.focus || []).join(", "),
      servicesStr: (profileData.servicesOffered || []).join(", "),
      contactPurposesStr: (profileData.contactPurposes || []).join(", "),
      investorsStr: (profileData.investors || []).join(", "),
      credentialsStr: (profileData.credentials || []).join(", "),
      languagesStr: (profileData.languages || []).join(", "),
      practiceAreasStr: (profileData.practiceAreas || []).join(", "),
      gamesStr: (profileData.games || []).join(", "),
      projects: (profileData.projects || []).map(p => ({
        name: p.name, description: p.description, url: p.url, githubUrl: p.githubUrl,
        twitterUrl: p.twitterUrl, badge: p.badge, tags: p.tags.join(", "),
      })),
      stats: profileData.stats || [],
    },
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({ control, name: "projects" });
  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "stats" });

  function onSubmit(values: FormValues) {
    setProfileData({
      displayName: values.displayName,
      tagline: values.tagline,
      bio: values.bio,
      email: values.email,
      location: values.location,
      website: values.website,
      twitter: values.twitter,
      github: values.github,
      linkedin: values.linkedin,
      telegram: values.telegram,
      discord: values.discord,
      youtube: values.youtube,
      twitch: values.twitch,
      instagram: values.instagram,
      farcaster: values.farcaster,
      lens: values.lens,
      efpProfile: values.efpProfile,
      company: values.company,
      role: values.role,
      raised: values.raised,
      calendarUrl: values.calendarUrl,
      githubUsername: values.githubUsername,
      specialty: values.specialty,
      hospital: values.hospital,
      appointmentUrl: values.appointmentUrl,
      firm: values.firm,
      barNumber: values.barNumber,
      barState: values.barState,
      consultationUrl: values.consultationUrl,
      daoName: values.daoName,
      snapshotUrl: values.snapshotUrl,
      treasuryAddress: values.treasuryAddress,
      tokenSymbol: values.tokenSymbol,
      discordUrl: values.discordUrl,
      governanceUrl: values.governanceUrl,
      proposalCount: values.proposalCount,
      youtubeChannelId: values.youtubeChannelId,
      subscriberCount: values.subscriberCount,
      sponsorshipEmail: values.sponsorshipEmail,
      mediaKit: values.mediaKit,
      twitchChannel: values.twitchChannel,
      streamSchedule: values.streamSchedule,
      donationUrl: values.donationUrl,
      techStack: parseCSV(values.techStackStr),
      chains: parseCSV(values.chainsStr),
      focus: parseCSV(values.focusStr),
      servicesOffered: parseCSV(values.servicesStr),
      contactPurposes: parseCSV(values.contactPurposesStr),
      investors: parseCSV(values.investorsStr),
      credentials: parseCSV(values.credentialsStr),
      languages: parseCSV(values.languagesStr),
      practiceAreas: parseCSV(values.practiceAreasStr),
      games: parseCSV(values.gamesStr),
      projects: (values.projects || []).map(p => ({
        name: p.name, description: p.description,
        url: p.url || "", githubUrl: p.githubUrl || "",
        twitterUrl: p.twitterUrl || "", badge: p.badge || "",
        tags: parseCSV(p.tags), imageFile: null,
      })),
      stats: values.stats || [],
    });
    onNext();
  }

  async function handleImageUpload(key: string, file: File, preview: string) {
    setUploadedImage(key, preview);
    try {
      const compressed = await compressImage(file, key === "profileImage");
      setUploadedImage(key, preview);
    } catch { }
  }

  const isENSGiant = templateId === "ensgiant";
  const isFounder = templateId === "founder";
  const isBuilder = templateId === "builder";
  const isDoctor = templateId === "doctor";
  const isLawyer = templateId === "lawyer";
  const isDAO = templateId === "dao";
  const isContentCreator = templateId === "content_creator";
  const isStreamer = templateId === "streamer";
  const showSocials = SOCIAL_TEMPLATE_IDS.includes(templateId);

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 text-sm";
  const labelClass = "block text-sm text-gray-400 mb-1.5";
  const sectionClass = "space-y-4 pb-6 border-b border-white/10";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Fill In Your Profile</h2>
      <p className="text-gray-400 mb-8">This data will be embedded directly in your website's HTML.</p>

      {/* Images */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-white">Images</h3>
        <ImageUploader
          label="Profile Photo"
          value={uploadedImages["profileImage"]}
          onChange={(file, preview) => handleImageUpload("profileImage", file, preview)}
        />
        <ImageUploader
          label="Banner Image"
          value={uploadedImages["bannerImage"]}
          onChange={(file, preview) => handleImageUpload("bannerImage", file, preview)}
          aspect="banner"
        />
      </div>

      {/* Universal fields */}
      <div className={`${sectionClass} pt-6`}>
        <h3 className="font-semibold text-white">Basic Info</h3>
        <div>
          <label className={labelClass}>Display Name *</label>
          <input {...register("displayName")} className={inputClass} placeholder="Vitalik Buterin" />
          {errors.displayName && <p className="text-red-400 text-xs mt-1">{errors.displayName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Tagline</label>
          <input {...register("tagline")} className={inputClass} placeholder="Ethereum co-creator, researcher" />
        </div>
        <div>
          <label className={labelClass}>Bio</label>
          <textarea {...register("bio")} rows={4} className={inputClass} placeholder="Tell your story…" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input {...register("email")} type="email" className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input {...register("location")} className={inputClass} placeholder="Ethereum Mainnet" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Website</label>
          <input {...register("website")} className={inputClass} placeholder="https://yoursite.com" />
        </div>
      </div>

      {/* Social links */}
      {showSocials && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Social Links</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "twitter", label: "Twitter / X URL" },
              { key: "github", label: "GitHub URL" },
              { key: "farcaster", label: "Farcaster URL" },
              { key: "linkedin", label: "LinkedIn URL" },
              { key: "telegram", label: "Telegram URL" },
              { key: "discord", label: "Discord URL" },
              { key: "youtube", label: "YouTube URL" },
              { key: "instagram", label: "Instagram URL" },
              { key: "efpProfile", label: "EFP Profile URL" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <input {...register(key as keyof FormValues)} className={inputClass} placeholder="https://…" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ENS Giant specific */}
      {isENSGiant && (
        <>
          <div className={`${sectionClass} pt-6`}>
            <h3 className="font-semibold text-white">Focus & Identity</h3>
            <div>
              <label className={labelClass}>Chains (comma-separated)</label>
              <input {...register("chainsStr")} className={inputClass} placeholder="Ethereum, Base, Optimism" />
            </div>
            <div>
              <label className={labelClass}>Focus Areas (comma-separated)</label>
              <input {...register("focusStr")} className={inputClass} placeholder="DeFi, NFTs, ENS, Layer 2" />
            </div>
            <div>
              <label className={labelClass}>Services Offered (comma-separated)</label>
              <input {...register("servicesStr")} className={inputClass} placeholder="Smart Contract Audits, Consulting" />
            </div>
            <div>
              <label className={labelClass}>Open To (comma-separated)</label>
              <input {...register("contactPurposesStr")} className={inputClass} placeholder="Collaboration, Speaking, Advising" />
            </div>
          </div>
          {/* Stats */}
          <div className={`${sectionClass} pt-6`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">Stats</h3>
              <button type="button" onClick={() => appendStat({ label: "", value: "" })} className="text-xs text-blue-400 hover:text-blue-300">+ Add Stat</button>
            </div>
            {statFields.map((field, i) => (
              <div key={field.id} className="flex gap-3 items-center">
                <input {...register(`stats.${i}.value`)} className={`${inputClass} w-28`} placeholder="1,234" />
                <input {...register(`stats.${i}.label`)} className={inputClass} placeholder="Transactions" />
                <button type="button" onClick={() => removeStat(i)} className="text-gray-600 hover:text-red-400 text-sm">✕</button>
              </div>
            ))}
          </div>
          {/* Projects */}
          <div className={`${sectionClass} pt-6`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white">Projects</h3>
              <button type="button" onClick={() => appendProject({ name: "", description: "", url: "", githubUrl: "", twitterUrl: "", badge: "", tags: "" })} className="text-xs text-blue-400 hover:text-blue-300">+ Add Project</button>
            </div>
            {projectFields.map((field, i) => (
              <div key={field.id} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-white">Project {i + 1}</span>
                  <button type="button" onClick={() => removeProject(i)} className="text-gray-600 hover:text-red-400 text-xs">Remove</button>
                </div>
                <input {...register(`projects.${i}.name`)} className={inputClass} placeholder="Project name" />
                <textarea {...register(`projects.${i}.description`)} rows={2} className={inputClass} placeholder="Short description…" />
                <div className="grid grid-cols-2 gap-3">
                  <input {...register(`projects.${i}.url`)} className={inputClass} placeholder="https://…" />
                  <input {...register(`projects.${i}.githubUrl`)} className={inputClass} placeholder="GitHub URL" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input {...register(`projects.${i}.badge`)} className={inputClass} placeholder="Badge (e.g. Live)" />
                  <input {...register(`projects.${i}.tags`)} className={inputClass} placeholder="Tags (comma-separated)" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Founder specific */}
      {isFounder && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Founder Info</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Company</label><input {...register("company")} className={inputClass} placeholder="Acme Corp" /></div>
            <div><label className={labelClass}>Role</label><input {...register("role")} className={inputClass} placeholder="CEO & Co-founder" /></div>
          </div>
          <div><label className={labelClass}>Total Raised</label><input {...register("raised")} className={inputClass} placeholder="$12M Series A" /></div>
          <div><label className={labelClass}>Investors (comma-separated)</label><input {...register("investorsStr")} className={inputClass} placeholder="a16z, Paradigm, Coinbase Ventures" /></div>
          <div><label className={labelClass}>Calendar / Meeting URL</label><input {...register("calendarUrl")} className={inputClass} placeholder="https://cal.com/…" /></div>
        </div>
      )}

      {/* Builder specific */}
      {isBuilder && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Developer Info</h3>
          <div><label className={labelClass}>GitHub Username</label><input {...register("githubUsername")} className={inputClass} placeholder="vitalikbuterin" /></div>
          <div><label className={labelClass}>Tech Stack (comma-separated)</label><input {...register("techStackStr")} className={inputClass} placeholder="Solidity, TypeScript, Rust, Go" /></div>
        </div>
      )}

      {/* Doctor specific */}
      {isDoctor && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Medical Info</h3>
          <div><label className={labelClass}>Specialty</label><input {...register("specialty")} className={inputClass} placeholder="Cardiology" /></div>
          <div><label className={labelClass}>Hospital / Clinic</label><input {...register("hospital")} className={inputClass} placeholder="Mayo Clinic" /></div>
          <div><label className={labelClass}>Credentials (comma-separated)</label><input {...register("credentialsStr")} className={inputClass} placeholder="MD, FACC, FESC" /></div>
          <div><label className={labelClass}>Languages (comma-separated)</label><input {...register("languagesStr")} className={inputClass} placeholder="English, Spanish, Arabic" /></div>
          <div><label className={labelClass}>Appointment URL</label><input {...register("appointmentUrl")} className={inputClass} placeholder="https://…" /></div>
        </div>
      )}

      {/* Lawyer specific */}
      {isLawyer && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Legal Info</h3>
          <div><label className={labelClass}>Law Firm</label><input {...register("firm")} className={inputClass} placeholder="Smith & Partners LLP" /></div>
          <div><label className={labelClass}>Practice Areas (comma-separated)</label><input {...register("practiceAreasStr")} className={inputClass} placeholder="Crypto Law, IP, Corporate" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Bar Number</label><input {...register("barNumber")} className={inputClass} placeholder="123456" /></div>
            <div><label className={labelClass}>Bar State/Jurisdiction</label><input {...register("barState")} className={inputClass} placeholder="California" /></div>
          </div>
          <div><label className={labelClass}>Consultation URL</label><input {...register("consultationUrl")} className={inputClass} placeholder="https://…" /></div>
        </div>
      )}

      {/* DAO specific */}
      {isDAO && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">DAO Info</h3>
          <div><label className={labelClass}>DAO Name</label><input {...register("daoName")} className={inputClass} placeholder="BuilderDAO" /></div>
          <div><label className={labelClass}>Token Symbol</label><input {...register("tokenSymbol")} className={inputClass} placeholder="BUILD" /></div>
          <div><label className={labelClass}>Snapshot URL</label><input {...register("snapshotUrl")} className={inputClass} placeholder="https://snapshot.org/#/…" /></div>
          <div><label className={labelClass}>Treasury Address</label><input {...register("treasuryAddress")} className={inputClass} placeholder="0x…" /></div>
          <div><label className={labelClass}>Governance URL</label><input {...register("governanceUrl")} className={inputClass} placeholder="https://…" /></div>
          <div><label className={labelClass}>Discord URL</label><input {...register("discordUrl")} className={inputClass} placeholder="https://discord.gg/…" /></div>
          <div><label className={labelClass}>Total Proposals</label><input {...register("proposalCount")} className={inputClass} placeholder="42" /></div>
        </div>
      )}

      {/* Content creator specific */}
      {isContentCreator && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Creator Info</h3>
          <div><label className={labelClass}>YouTube Channel ID</label><input {...register("youtubeChannelId")} className={inputClass} placeholder="UCxxxxxx" /></div>
          <div><label className={labelClass}>Subscriber Count</label><input {...register("subscriberCount")} className={inputClass} placeholder="250K" /></div>
          <div><label className={labelClass}>Sponsorship Email</label><input {...register("sponsorshipEmail")} className={inputClass} placeholder="sponsor@yourname.com" /></div>
          <div><label className={labelClass}>Media Kit URL</label><input {...register("mediaKit")} className={inputClass} placeholder="https://…" /></div>
        </div>
      )}

      {/* Streamer specific */}
      {isStreamer && (
        <div className={`${sectionClass} pt-6`}>
          <h3 className="font-semibold text-white">Stream Info</h3>
          <div><label className={labelClass}>Twitch Channel</label><input {...register("twitchChannel")} className={inputClass} placeholder="shroud" /></div>
          <div><label className={labelClass}>Stream Schedule</label><input {...register("streamSchedule")} className={inputClass} placeholder="Mon-Fri 8pm EST" /></div>
          <div><label className={labelClass}>Games (comma-separated)</label><input {...register("gamesStr")} className={inputClass} placeholder="Valorant, CS2, Minecraft" /></div>
          <div><label className={labelClass}>Donation URL</label><input {...register("donationUrl")} className={inputClass} placeholder="https://streamlabs.com/…" /></div>
        </div>
      )}

      <div className="flex gap-4 pt-6">
        <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors">← Back</button>
        <button type="submit" className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors">Preview My Site →</button>
      </div>
    </form>
  );
}
