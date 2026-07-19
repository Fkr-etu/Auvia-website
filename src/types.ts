export interface UserProfile {
  profession: string;
  specialty: string;
  region: string;
  practiceMode: string;
  interests: string[];
}

export interface RegulatoryAlert {
  id: string;
  title: string;
  date: string;
  severity: "critical" | "warning" | "info";
  source: string;
  category: "Radioprotection" | "Stérilisation" | "DASRI" | "RGPD" | "Général";
  summary: string;
  detailedAnalysis: string;
  impacts: string[];
  actionPlan: string[];
  status: "pending" | "done";
}

export interface ActionItem {
  id: string;
  text: string;
  category: string;
  dueDate: string;
  completed: boolean;
  alertId?: string;
}

export interface BrandAssetDirection {
  id: string;
  title: string;
  description: string;
  concept: string;
  svgMarkup: string;
}
