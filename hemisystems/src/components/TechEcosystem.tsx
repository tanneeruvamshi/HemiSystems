/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layout, 
  Code, 
  Cloud, 
  Database, 
  Sparkles, 
  GitBranch,
  Target,
  LineChart,
  Briefcase,
  Layers,
  ChevronRight
} from "lucide-react";

interface TechItem {
  id: string;
  name: string;
  purpose: string;
  businessValue: string;
  useCases: string[];
}

interface TechCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  technologies: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "business-apps",
    name: "Business Applications",
    description: "Front-line operational portals, dashboards, and enterprise platforms.",
    icon: Layout,
    technologies: [
      {
        id: "power-apps",
        name: "Custom Web Apps",
        purpose: "Rapid app assembly of collaborative internal dashboards.",
        businessValue: "Reduces time-to-market for internal tools and eliminates shadow IT spread.",
        useCases: ["Field service data collection", "Internal approval dashboards", "Inventory scanning apps"]
      },
      {
        id: "dynamics-365",
        name: "Enterprise ERP",
        purpose: "Industry-standard business capabilities tuned automatically to operations.",
        businessValue: "Unifies CRM and ERP operations into a single cohesive, trackable platform.",
        useCases: ["Global sales tracking pipelines", "Omnichannel customer service routing", "Supply chain and ledger management"]
      },
      {
        id: "power-pages",
        name: "Next.js Portals",
        purpose: "Enterprise external portals connected directly to core databases.",
        businessValue: "Safely exposes core operations to customers without duplicating or syncing data.",
        useCases: ["Customer support portals", "Partner registration sites", "Citizen licensing gateways"]
      },
      {
        id: "model-driven",
        name: "Model Driven Apps",
        purpose: "Data-first applications structured directly around complex relational schemas.",
        businessValue: "Auto-generates robust UIs directly from Cloud Databases schemas, saving thousands of development hours.",
        useCases: ["Case management systems", "Complex HR onboarding", "Compliance tracking ledgers"]
      }
    ]
  },
  {
    id: "development",
    name: "Development",
    description: "Custom frameworks and tools for highly tailored engineering.",
    icon: Code,
    technologies: [
      {
        id: "react",
        name: "React",
        purpose: "Component-based library for building interactive user interfaces.",
        businessValue: "Ensures scalable, fast, and reusable frontend component libraries across the enterprise.",
        useCases: ["Single-page headless applications", "Custom dashboard frontends", "Interactive client data visualizations"]
      },
      {
        id: "typescript",
        name: "TypeScript",
        purpose: "Strongly typed superset of JavaScript.",
        businessValue: "Catches structural errors at compile-time, drastically reducing production bugs and runtime failures.",
        useCases: ["Enterprise web applications", "Shared standardized type libraries", "Large-scale node microservices"]
      },
      {
        id: "java",
        name: "Java",
        purpose: "High-performance enterprise class backend language.",
        businessValue: "Offers a mature ecosystem, strict object-orientation, and extreme computational throughput.",
        useCases: ["Legacy system modernization", "High-frequency transaction processors", "Enterprise state engines"]
      },
      {
        id: "spring-boot",
        name: "Spring Boot",
        purpose: "Framework to create stand-alone, production-grade Spring based Applications.",
        businessValue: "Accelerates enterprise Java development with autoconfiguration and embedded servers.",
        useCases: ["Microservice REST APIs", "Secure corporate backends", "Batch processing pipelines"]
      },
      {
        id: "dotnet",
        name: ".NET",
        purpose: "Compiled, secure server pipelines and legacy API adaptors.",
        businessValue: "Native, seamless integration with Cloud Platforms and the Microsoft enterprise ecosystem.",
        useCases: ["Legacy Windows server migrations", "High-performance API gateways", "Cross-platform cloud background services"]
      },
      {
        id: "nodejs",
        name: "Node.js",
        purpose: "Event-driven, asynchronous JavaScript runtime environment.",
        businessValue: "Enables fast, scalable network applications and unifies the full-stack language boundary.",
        useCases: ["Real-time websocket servers", "Serverless edge functions", "API middleware proxies"]
      }
    ]
  },
  {
    id: "cloud",
    name: "Cloud",
    description: "Scalable global infrastructure and integration middleware.",
    icon: Cloud,
    technologies: [
      {
        id: "azure",
        name: "AWS / GCP / Azure",
        purpose: "Global cloud computing platform and hybrid infrastructure.",
        businessValue: "Provides on-demand scalability, zero-trust security perimeters, and high global availability.",
        useCases: ["Cloud web hosting", "Virtual machine provisioning", "Active Directory integrated identity", "Global edge caching deployed on multi-cloud"]
      },
      {
        id: "azure-functions",
        name: "Cloud Functions / Lambda",
        purpose: "Serverless compute service that runs code on-demand.",
        businessValue: "Drives down operational costs by scaling to zero and billing only upon active execution.",
        useCases: ["Event-driven webhooks", "Scheduled nightly batch jobs", "IoT stream ingestion processors"]
      },
      {
        id: "logic-apps",
        name: "Logic Apps",
        purpose: "Cloud service that helps schedule, automate, and orchestrate tasks.",
        businessValue: "Visually links disparate enterprise systems together without writing custom brittle code.",
        useCases: ["B2B enterprise integration loops", "Automated alert email routing", "Cross-SaaS data synchronization"]
      },
      {
        id: "api-management",
        name: "API Management",
        purpose: "Turnkey solution for publishing APIs to external and internal consumers.",
        businessValue: "Secures, throttles, and tracks all API calls across the enterprise uniformly.",
        useCases: ["Developer portal provisioning", "Legacy API modernization wrappers", "Rate-limiting high traffic endpoints"]
      }
    ]
  },
  {
    id: "data",
    name: "Data",
    description: "Secure, scalable ledgers, data lakes, and transactional stores.",
    icon: Database,
    technologies: [
      {
        id: "dataverse",
        name: "Cloud Databases",
        purpose: "Cloud relational data foundation with built-in governance logic.",
        businessValue: "Centralizes logic and security policies so all connecting applications inherit the exact same rules.",
        useCases: ["Centralized master data management", "Enterprise ERP underlying storage", "Rapid Power App logic generation"]
      },
      {
        id: "sql-server",
        name: "SQL Server",
        purpose: "Relational database management system for precise query indexes.",
        businessValue: "Ensures strict ACID compliance and transactional safety for massive financial datasets.",
        useCases: ["High-throughput operational stores", "Financial general ledgers", "Legacy on-premise cloud migrations"]
      },
      {
        id: "fabric",
        name: "Fabric",
        purpose: "Enterprise SaaS analytics platform unifying all BI data tools.",
        businessValue: "Eliminates duplicate storage by utilizing a single OneLake for all Business Intelligence and AI.",
        useCases: ["Unified data engineering workloads", "Real-time Power BI reporting", "Consolidated lakehouse storage architecture"]
      },
      {
        id: "synapse",
        name: "Synapse",
        purpose: "Limitless analytics service connecting enterprise data warehousing.",
        businessValue: "Processes massive petabyte-scale queries concurrently without locking production databases.",
        useCases: ["Big data analytics", "Live data warehouse migrations", "Continuous data logging telemetry analysis"]
      }
    ]
  },
  {
    id: "ai",
    name: "AI",
    description: "Cognitive intelligence and machine learning acting inside pipelines.",
    icon: Sparkles,
    technologies: [
      {
        id: "azure-openai",
        name: "AI Foundation Models",
        purpose: "Isolated, secure instances of cutting-edge LLMs.",
        businessValue: "Keeps proprietary prompts and enterprise data strictly private while leveraging top-tier models.",
        useCases: ["Internal semantic search arrays", "Automated contract parsing", "Contextual code generation"]
      },
      {
        id: "copilot-studio",
        name: "Custom AI Agents",
        purpose: "End-to-end platform for building custom conversational agents.",
        businessValue: "Democratizes AI bot creation with clear graphical dialog flows and integrated system governance.",
        useCases: ["Employee HR assistance bots", "Customer-facing triage virtual agents", "Dynamics embedded co-pilots"]
      },
      {
        id: "machine-learning",
        name: "Machine Learning",
        purpose: "Platform to build, train, deploy, and manage custom predictive models.",
        businessValue: "Enables proprietary risk, forecasting, and classification unique to specific business metrics.",
        useCases: ["Predictive equipment maintenance", "Automated financial anomaly detection", "Customer churn probability scoring"]
      }
    ]
  },
  {
    id: "devops",
    name: "DevOps",
    description: "Deployment routines, automated testing, and active telemetry.",
    icon: GitBranch,
    technologies: [
      {
        id: "azure-devops",
        name: "Cloud Platforms DevOps",
        purpose: "Full suite of developer planning tools, CI/CD pipelines, and artifact repos.",
        businessValue: "Standardizes the delivery lifecycle ensuring compliant, traceable, and revertable releases.",
        useCases: ["Automated environment staging", "Agile sprint portfolio tracking", "Secure package artifact hosting"]
      },
      {
        id: "github",
        name: "GitHub",
        purpose: "Cloud-based hosting service for software development version control.",
        businessValue: "Fosters open collaboration, peer-review, and dependency tracking across distributed engineering teams.",
        useCases: ["Centralized continuous version control", "Code security vulnerability scanning", "Pull-request driven workflows"]
      },
      {
        id: "cicd",
        name: "CI/CD",
        purpose: "Continuous Integration and Continuous Deployment methodologies.",
        businessValue: "Replaces manual deployments with reliable, automated code promotion scripts.",
        useCases: ["Automated test suites on commit", "Zero-downtime blue/green deployments", "Infrastructure-as-Code automation"]
      },
      {
        id: "monitoring",
        name: "Monitoring",
        purpose: "Real-time telemetry, log aggregation, and system health alerts.",
        businessValue: "Prevents critical operational outages by identifying performance degradation before active failure.",
        useCases: ["Application Insights trace logging", "Automated downtime pager alerts", "User behavior pathway mapping"]
      }
    ]
  }
];

export default function TechEcosystem() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("business-apps");
  const [activeTechId, setActiveTechId] = useState<string>("power-apps");

  const activeCategory = TECH_CATEGORIES.find(c => c.id === activeCategoryId) || TECH_CATEGORIES[0];
  const activeTech = activeCategory.technologies.find(t => t.id === activeTechId) || activeCategory.technologies[0];

  return (
    <section className="space-y-12 py-12" id="technology-ecosystem-section">
      
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-white/5 pb-8 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b]">
          Architecture Map
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Technology Ecosystem
        </h2>
        <p className="max-w-2xl font-sans text-base text-gray-400">
          A living enterprise architecture model. Explore the layered stacks, runtimes, 
          and structural nodes we deploy to build contiguous, high-performance operations.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start relative min-h-[600px]">
        
        {/* Left Side: Interactive Category Panel (4 Columns) */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
          {TECH_CATEGORIES.map((category) => {
            const isActiveCategory = category.id === activeCategoryId;
            const CategoryIcon = category.icon;
            
            return (
              <div 
                key={category.id} 
                className={`rounded border transition-all duration-300 overflow-hidden ${
                  isActiveCategory 
                    ? "border-[#cfa86b]/40 bg-slate-900/60 shadow-lg shadow-[#cfa86b]/5" 
                    : "border-white/5 bg-slate-950 hover:bg-slate-900/40 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => {
                    setActiveCategoryId(category.id);
                    setActiveTechId(category.technologies[0].id);
                  }}
                  className="flex w-full items-center space-x-4 p-4 text-left"
                >
                  <div className={`p-2.5 rounded text-gray-300 transition-colors ${isActiveCategory ? "text-[#cfa86b] bg-[#cfa86b]/10" : "bg-white/5"}`}>
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-display text-base font-bold tracking-wide uppercase transition-colors ${isActiveCategory ? "text-white" : "text-gray-400"}`}>
                      {category.name}
                    </h3>
                  </div>
                  {isActiveCategory && (
                    <motion.div layoutId="active-cat-indicator" className="h-2 w-2 rounded-full bg-[#cfa86b]" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {isActiveCategory && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 bg-slate-950/50"
                    >
                      <div className="p-2 space-y-1">
                        {category.technologies.map(tech => (
                          <button
                            key={tech.id}
                            onClick={() => setActiveTechId(tech.id)}
                            className={`w-full text-left px-4 py-2.5 rounded font-mono text-[11px] uppercase tracking-wider transition-colors ${
                              tech.id === activeTechId 
                                ? "bg-[#cfa86b]/10 text-[#cfa86b] font-bold" 
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              <span>{tech.name}</span>
                              {tech.id === activeTechId && <ChevronRight className="h-3 w-3" />}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side: Technology Details Panel (8 Columns) */}
        <div className="lg:col-span-8 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTech.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full rounded border border-white/5 bg-slate-900/30 p-8 space-y-8 flex flex-col"
            >
              {/* Header */}
              <div className="space-y-4 border-b border-white/5 pb-8">
                <div className="flex items-center space-x-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#cfa86b] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    {activeCategory.name} Node
                  </span>
                </div>
                <h3 className="font-display text-4xl font-bold tracking-tight text-white uppercase">
                  {activeTech.name}
                </h3>
              </div>

              {/* Expansion Details */}
              <div className="grid gap-6 sm:grid-cols-2">
                
                {/* Purpose */}
                <div className="rounded border border-white/5 bg-slate-950 p-6 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="h-12 w-12 text-[#cfa86b]" />
                  </div>
                  <div className="flex items-center space-x-2 text-[#cfa86b]">
                    <Target className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                      Functional Purpose
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-gray-300 relative z-10">
                    {activeTech.purpose}
                  </p>
                </div>

                {/* Business Value */}
                <div className="rounded border border-white/5 bg-slate-950 p-6 space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <LineChart className="h-12 w-12 text-[#cfa86b]" />
                  </div>
                  <div className="flex items-center space-x-2 text-[#cfa86b]">
                    <LineChart className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                      Business Value Derived
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-gray-300 relative z-10">
                    {activeTech.businessValue}
                  </p>
                </div>

              </div>

              {/* Enterprise Use Cases */}
              <div className="flex-1 rounded border border-white/5 bg-slate-950 p-6 space-y-5">
                <div className="flex items-center space-x-2 text-white border-b border-white/5 pb-4">
                  <Briefcase className="h-4 w-4 text-[#cfa86b]" />
                  <span className="font-display text-sm uppercase font-bold tracking-widest">
                    Enterprise Use Cases
                  </span>
                </div>
                
                <div className="space-y-4">
                  {activeTech.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-start space-x-4 group">
                      <div className="pt-1">
                        <div className="flex h-5 w-5 items-center justify-center rounded border border-[#cfa86b]/20 bg-[#cfa86b]/5 group-hover:border-[#cfa86b]/50 group-hover:bg-[#cfa86b]/10 transition-colors text-[#cfa86b]">
                           <Layers className="h-3 w-3" />
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-0.5">Application {idx + 1}</span>
                        <p className="font-display text-[15px] font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {useCase}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-right">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-600">
                  Hemisystems Approved Stack // Standard Enterprise Baseline
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}

