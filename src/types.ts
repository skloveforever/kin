export type PillarId = "branding" | "websites" | "ai" | "blueprinting";

export interface PillarData {
  id: PillarId;
  title: string;
  shortTitle: string;
  subtitle: string;
  iconName: string;
  color: string;
  accentGlow: string;
  tags: string[];
  description: string;
  metrics: { label: string; value: string }[];
  caseStudy: {
    client: string;
    industry: string;
    impact: string;
    quote: string;
  };
  interactiveFeatureTitle: string;
  interactiveFeatureDesc: string;
}

export interface EdieMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface BlueprintForm {
  brandName: string;
  industry: string;
  stage: string;
  primaryGoal: string;
  targetAudience: string;
  budgetRange: string;
}

export interface BlueprintPhase {
  phase: string;
  duration: string;
  keyDeliverables: string[];
}

export interface BlueprintResult {
  title: string;
  executiveSummary: string;
  pillars: BlueprintPhase[];
  projectedROI: string;
  recommendedPillars: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: PillarId;
  description: string;
  context?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  image: string;
  tags: string[];
  results: string;
  year: string;
  featured?: boolean;
}
