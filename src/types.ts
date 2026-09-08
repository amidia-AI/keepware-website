export type Platform = 'macOS' | 'Windows' | 'Linux';

export interface SystemRequirements {
  os: string;
  ram: string;
  recommendedRam: string;
  processor: string;
  gpuAcceleration: string;
  storage: string;
  microphone: string;
  network: string;
}

export interface GuideStep {
  id: string;
  step: string;
  title: string;
  description: string;
  hint?: string;
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  solution: string;
  platform: 'All' | 'macOS' | 'Windows' | 'Linux';
  badge: 'Quick Fix' | 'Permissions' | 'Hardware' | 'Customization';
}

export interface UpdateRequestItem {
  id: string;
  title: string;
  description: string;
  category: 'Feature' | 'Language' | 'Integration' | 'Model';
  votes: number;
  status: 'In Progress' | 'Planned' | 'Under Review' | 'Shipped';
  tag: string;
}

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  priceUsd: number;
  platforms: Platform[];
  version: string;
  rating: number;
  reviewsCount: number;
  developer: string;
  accentColor: string;
  badge?: string;
  features: string[];
  usageGuide: GuideStep[];
  systemRequirements: SystemRequirements;
  problems: ProblemItem[];
  updatesIncluded: string;
  size: string;
  releasedYear: number;
}

export type PaymentGateway = 'card' | 'applepay' | 'paypal';

export interface ProjectRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  platformTarget: string;
  budgetRange: string;
  description: string;
  createdAt: string;
}

export interface AppSubmission {
  id: string;
  appName: string;
  developerName: string;
  email: string;
  url: string;
  description: string;
  createdAt: string;
  status: 'pending';
}

export interface Order {
  id: string;
  appId: string;
  appName: string;
  priceUsd: number;
  email: string;
  licenseKey: string;
  createdAt: string;
  source: 'checkout' | 'webhook';
}
