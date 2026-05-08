export type { ProfileData, ProjectEntry, StatEntry, PublishStatus } from "@/lib/store";
export type { TemplateDef, TemplateField } from "@/lib/templates";

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface WizardStepProps {
  onNext: () => void;
  onBack: () => void;
}
