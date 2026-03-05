export interface BrandFormData {
  brandName: string;
  industry: string;
  campaignObjective: string;
  brandPersonality: string;
  products: string;
  targetAudience: string;
  websiteLink: string;
  tonePreference: 'balanced' | 'playful' | 'bold' | 'minimal';
}

export interface BrandVoiceSummary {
  tone: string;
  targetAudience: string;
  contentThemes: string;
  communicationStyle: string;
  bullets: string[];
}

export interface Tweet {
  id: number;
  text: string;
  style: 'conversational' | 'promotional' | 'witty' | 'informative';
  characterCount: number;
}

export interface GenerationResult {
  brandVoiceSummary: BrandVoiceSummary;
  tweets: Tweet[];
}

export type CampaignObjective = 
  | 'engagement' 
  | 'promotion' 
  | 'brand-awareness' 
  | 'product-launch' 
  | 'community-growth';

export const campaignObjectives: { value: CampaignObjective; label: string }[] = [
  { value: 'engagement', label: 'Engagement' },
  { value: 'promotion', label: 'Promotion' },
  { value: 'brand-awareness', label: 'Brand Awareness' },
  { value: 'product-launch', label: 'Product Launch' },
  { value: 'community-growth', label: 'Community Growth' },
];
