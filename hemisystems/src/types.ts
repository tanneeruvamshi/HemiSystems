/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SystemLayer {
  id: string;
  name: string;
  icon: string;
  description: string;
  bottlenecks: string[];
  failures: string[];
  fragmentation: string;
  dataIssues: string[];
  automationOps: string[];
  aiOps: string[];
}

export interface CapabilityLayer {
  id: string;
  name: string;
  description: string;
  technologies: { name: string; desc: string; category: string }[];
  accent: string;
}

export interface MethodStage {
  id: string;
  name: string;
  description: string;
  details: string;
  output: string;
  evolutionBefore: string;
  evolutionAfter: string;
  caseStudy: {
    title: string;
    metric: string;
    desc: string;
  };
}

export interface BlueprintQuestion {
  id: string;
  text: string;
  category: string;
  options: {
    value: string;
    label: string;
    weight: {
      arch: string;
      tech: string[];
      integration: string;
      automation: string;
      ai: string;
      roadmap: string[];
    };
  }[];
}

export interface BlueprintResult {
  architecture: string;
  technologies: string[];
  integration: string;
  automation: string;
  ai: string;
  roadmap: string[];
}

export interface LabConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  interactiveDemo: {
    type: "stats" | "log" | "visualizer" | "dashboard";
    data: any;
  };
}

export interface IndustrySystem {
  id: string;
  name: string;
  description: string;
  painPoints: string[];
  nodes: {
    id: string;
    label: string;
    type: "people" | "process" | "applications" | "data" | "automation" | "ai";
    details: string;
  }[];
  flows: {
    from: string;
    to: string;
    description: string;
  }[];
}

export interface ResearchArticle {
  id: string;
  title: string;
  excerpt: string;
  category: "Power Platform" | "Dynamics 365" | "AI" | "Enterprise Architecture" | "Azure" | "Data Platforms" | "Software Engineering";
  readTime: string;
  author: string;
  publishedAt: string;
  content: string;
  recommended: string[]; // related article IDs
  aiSummary: string;
}

export interface ReviewQuestion {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    score: number;
    tip: string;
  }[];
}

export interface ReviewResult {
  score: number;
  grade: string;
  opportunityAnalysis: string;
  roadmap: { phase: string; title: string; tasks: string[] }[];
  nextSteps: string[];
}
