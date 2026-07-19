export interface BillingInvoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "failed" | "pending";
  pdfUrl?: string;
}

export interface UserProfile {
  profession: string;
  specialty: string;
  region: string;
  practiceMode: string;
  interests: string[];
  subscriptionTier?: "trial" | "solo" | "cabinet" | "clinique";
  subscriptionStatus?: "trialing" | "active" | "canceled";
  subscriptionEndDate?: string;
  billingHistory?: BillingInvoice[];
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
