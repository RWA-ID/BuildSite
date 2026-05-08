import { ProfileData } from "@/lib/store";
import { generateENSGiantHTML } from "@/components/templates/builder/ENSGiantTemplate";
import { generateFounderHTML } from "@/components/templates/builder/FounderTemplate";
import { generateBuilderHTML } from "@/components/templates/builder/BuilderTemplate";
import { generateENSMaxiHTML } from "@/components/templates/builder/ENSMaxiTemplate";
import { generateDeFiHTML } from "@/components/templates/builder/DeFiTemplate";
import { generateDoctorHTML } from "@/components/templates/professional/DoctorTemplate";
import { generateLawyerHTML } from "@/components/templates/professional/LawyerTemplate";
import { generateGenericProfessionalHTML } from "@/components/templates/professional/GenericProfessionalTemplate";
import { generateContentCreatorHTML } from "@/components/templates/creative/ContentCreatorTemplate";
import { generateStreamerHTML } from "@/components/templates/creative/StreamerTemplate";
import { generateGenericCreativeHTML } from "@/components/templates/creative/GenericCreativeTemplate";
import { generateGenericBusinessHTML } from "@/components/templates/business/GenericBusinessTemplate";
import { generateDAOHTML } from "@/components/templates/community/DAOTemplate";

export function renderTemplateToHTML(
  templateId: string,
  profileData: Partial<ProfileData>,
  ensName: string,
  uploadedImages: Record<string, string>
): string {
  switch (templateId) {
    case "ensgiant":
      return generateENSGiantHTML(profileData, ensName, uploadedImages);
    case "founder":
      return generateFounderHTML(profileData, ensName, uploadedImages);
    case "builder":
      return generateBuilderHTML(profileData, ensName, uploadedImages);
    case "ens_maxi":
      return generateENSMaxiHTML(profileData, ensName, uploadedImages);
    case "defi":
      return generateDeFiHTML(profileData, ensName, uploadedImages);
    case "doctor":
      return generateDoctorHTML(profileData, ensName, uploadedImages);
    case "lawyer":
      return generateLawyerHTML(profileData, ensName, uploadedImages);
    case "engineer":
    case "consultant":
    case "architect":
      return generateGenericProfessionalHTML(profileData, ensName, uploadedImages, templateId);
    case "content_creator":
      return generateContentCreatorHTML(profileData, ensName, uploadedImages);
    case "streamer":
      return generateStreamerHTML(profileData, ensName, uploadedImages);
    case "artist":
    case "musician":
      return generateGenericCreativeHTML(profileData, ensName, uploadedImages, templateId);
    case "agency":
    case "freelancer":
    case "startup":
      return generateGenericBusinessHTML(profileData, ensName, uploadedImages, templateId);
    case "dao":
    case "collective":
    case "open_source":
      return generateDAOHTML(profileData, ensName, uploadedImages);
    default:
      return generateENSGiantHTML(profileData, ensName, uploadedImages);
  }
}
