/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  HelpCircle, 
  ArrowRight, 
  ArrowDown,
  Terminal, 
  CheckCircle2, 
  Users,
  Database,
  Cpu,
  Sparkles,
  LayoutTemplate,
  GitCommit,
  Stethoscope,
  Factory,
  Package,
  Store,
  Landmark,
  MonitorSmartphone,
  ChevronRight
} from "lucide-react";

interface LayerData {
  title: string;
  description: string;
  technologies: string[];
}

interface IndustrySystem {
  id: string;
  name: string;
  icon: any;
  description: string;
  layers: {
    people: LayerData;
    process: LayerData;
    applications: LayerData;
    data: LayerData;
    automation: LayerData;
    ai: LayerData;
  };
}

const LOCAL_INDUSTRY_SYSTEMS: IndustrySystem[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    description: "Connected patient journeys, secure FHIR data compliance, and predictive clinical operations.",
    layers: {
      people: { title: "Patients & Care Teams", description: "Seamless coordination between patients, nurses, and specialists.", technologies: ["Patient Portal", "Clinician Mobile App"] },
      process: { title: "Clinical Workflows", description: "Automated triage, appointment scheduling, and discharge routing.", technologies: ["Power Automate", "Healthcare Cloud"] },
      applications: { title: "EMR Integrations", description: "Unified interfaces wrapping legacy Electronic Medical Records.", technologies: ["Power Apps", "Dynamics 365 Health"] },
      data: { title: "FHIR Data Lake", description: "HIPAA-compliant, unified patient records and billing ledgers.", technologies: ["Dataverse", "Azure Health Data Services"] },
      automation: { title: "Claim Processing", description: "Real-time insurance validation and automated claim submissions.", technologies: ["Azure Logic Apps", "RPA Bots"] },
      ai: { title: "Predictive Diagnosis", description: "AI screening of medical imaging and predictive patient readmission scoring.", technologies: ["Azure Computer Vision", "Health Copilot"] }
    }
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    description: "Industry 4.0 integration, IoT sensor streams, and supply chain resiliency.",
    layers: {
      people: { title: "Floor Operators & Supply Managers", description: "Empowering frontline workers with mobile inventory scanning and safety alerts.", technologies: ["Rugged Tablets", "Teams Frontline"] },
      process: { title: "Just-In-Time Assembly", description: "Streamlining parts requisition and line changeovers.", technologies: ["Dynamics 365 SCM", "Power Automate"] },
      applications: { title: "Execution Systems", description: "Real-time production tracking and quality assurance control interfaces.", technologies: ["Power Apps Canvas", "Custom .NET Edge UI"] },
      data: { title: "Telemetry Lakehouse", description: "High-throughput ingestion of machine telemetry and production logs.", technologies: ["Azure IoT Hub", "Fabric OneLake"] },
      automation: { title: "Machine Intervention", description: "Automated line pausing when tolerance anomalies are detected.", technologies: ["Azure Event Grid", "Logic Apps"] },
      ai: { title: "Predictive Maintenance", description: "Forecasting equipment failure dates before they halt production.", technologies: ["Machine Learning Models", "Digital Twins"] }
    }
  },
  {
    id: "distribution",
    name: "Distribution",
    icon: Package,
    description: "Global logistics tracking, fleet optimization, and automated warehouse routing.",
    layers: {
      people: { title: "Fleet Drivers & Warehouse Staff", description: "Route optimization and hands-free inventory picking guidance.", technologies: ["Mobile Routing App", "Voice Pickers"] },
      process: { title: "Fulfillment Routing", description: "Dynamic order orchestration from dock to delivery.", technologies: ["Dynamics 365 Logistics", "Custom Routing Engine"] },
      applications: { title: "Fleet Command", description: "Centralized tracking map and order status portals.", technologies: ["Power Pages", "React Map Dashboard"] },
      data: { title: "Supply Ledger", description: "Transactional recording of custody chains and inventory states.", technologies: ["Dataverse", "SQL Server"] },
      automation: { title: "Automated Reordering", description: "Triggering vendor purchases instantly upon stock thresholds.", technologies: ["Power Automate API"] },
      ai: { title: "Demand Forecasting", description: "Predicting seasonal inventory needs using macro-economic models.", technologies: ["Azure Synapse Analytics", "AI Forecaster"] }
    }
  },
  {
    id: "retail",
    name: "Retail",
    icon: Store,
    description: "Omnichannel customer experiences, dynamic pricing, and unified commerce.",
    layers: {
      people: { title: "Shoppers & Store Associates", description: "Personalized loyalty experiences and mobile point-of-sale support.", technologies: ["Consumer Mobile App", "POS Tablets"] },
      process: { title: "Omnichannel Checkout", description: "Seamless transition from online cart to in-store pickup.", technologies: ["Dynamics 365 Commerce"] },
      applications: { title: "Customer 360", description: "Unified application presenting complete buyer history to associates.", technologies: ["Model-Driven Apps", "Customer Insights"] },
      data: { title: "Unified Profile Engine", description: "Aggregating online tracking, physical sales, and support tickets.", technologies: ["Azure Cosmos DB", "Dataverse"] },
      automation: { title: "Dynamic Pricing", description: "Real-time price adjustments based on competitor APIs and stock levels.", technologies: ["Azure Functions", "API Management"] },
      ai: { title: "Hyper-Personalization", description: "Tailored product recommendations and conversational shopping assistants.", technologies: ["Retail Copilot", "Personalizer AI"] }
    }
  },
  {
    id: "financial",
    name: "Financial Services",
    icon: Landmark,
    description: "Secure transaction processing, algorithmic fraud detection, and regulatory compliance.",
    layers: {
      people: { title: "Clients & Wealth Advisors", description: "Secure portfolio monitoring and digital onboarding." , technologies: ["Client Portal", "Advisor CRM Desktop"] },
      process: { title: "Loan Origination", description: "Automated KYC (Know Your Customer) and credit approval workflows.", technologies: ["Power Automate", "Dynamics 365 FinOps"] },
      applications: { title: "Wealth Dashboard", description: "Aggregated financial visualizations and fast trade executions.", technologies: ["React Secure SPA", "Power Apps Portals"] },
      data: { title: "Immutable Ledger", description: "High-encryption, zero-trust databases logging financial metadata.", technologies: ["Azure SQL Edge", "Purview Governance"] },
      automation: { title: "Regulatory Reporting", description: "Compiling daily liquidity and compliance forms without manual intervention.", technologies: ["Azure Data Factory", "Logic Apps"] },
      ai: { title: "Fraud Anomaly Engine", description: "Detecting micro-variations in spending patterns to block transactions instantly.", technologies: ["Azure Machine Learning", "Risk Copilot"] }
    }
  },
  {
    id: "technology",
    name: "Technology",
    icon: MonitorSmartphone,
    description: "SaaS platform scaling, agile engineering operations, and subscriber management.",
    layers: {
      people: { title: "Developers & SaaS Users", description: "Self-service provisioning and unified identity management.", technologies: ["Developer Portal", "Entra ID"] },
      process: { title: "Subscription Lifecycle", description: "Automated billing, usage throttling, and tier upgrading.", technologies: ["Azure API Mgmt", "Stripe Integration"] },
      applications: { title: "Product Interfaces", description: "The core digital products delivered to global end-users.", technologies: ["React Frontends", ".NET Core Microservices"] },
      data: { title: "Global Multi-Tenant Store", description: "Geographically distributed, partitioned databases for low-latency access.", technologies: ["Azure Cosmos DB", "Redis Cache"] },
      automation: { title: "CI/CD Infrastructure", description: "Automatic scaling, load balancing, and code deployment routines.", technologies: ["GitHub Actions", "Azure Kubernetes Service"] },
      ai: { title: "Generative Product Features", description: "Embedded large language models acting as features inside the SaaS offering.", technologies: ["Azure OpenAI Service", "Vector Search"] }
    }
  }
];

const LAYER_ORDER = [
  { id: "people", label: "People Layer", icon: Users },
  { id: "process", label: "Process Layer", icon: GitCommit },
  { id: "applications", label: "Application Layer", icon: LayoutTemplate },
  { id: "data", label: "Data Layer", icon: Database },
  { id: "automation", label: "Automation Layer", icon: Cpu },
  { id: "ai", label: "AI Layer", icon: Sparkles }
] as const;

export default function IndustrySystems() {
  const [activeIndustryId, setActiveIndustryId] = useState("healthcare");
  const [activeLayerId, setActiveLayerId] = useState("applications");

  const activeIndustry = LOCAL_INDUSTRY_SYSTEMS.find(i => i.id === activeIndustryId) || LOCAL_INDUSTRY_SYSTEMS[0];
  const activeLayerData = activeIndustry.layers[activeLayerId as keyof typeof activeIndustry.layers];

  return (
    <section className="space-y-12 py-12" id="industry-systems-section">
      
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-white/5 pb-8 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b] flex items-center space-x-2">
          <Building2 className="h-3.5 w-3.5" />
          <span>Industry Architectures</span>
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Contextual Industry Systems
        </h2>
        <p className="max-w-3xl font-sans text-base text-gray-400">
          Enterprise architecture cannot be generic. We adapt our Hemisystems frameworks to the specific 
          regulatory, throughput, and operational realities of your vertical. Explore the 6-layer operational stack.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start relative min-h-[600px]">
        
        {/* Left selector rails (3 columns) */}
        <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-32">
          <div className="px-2 font-mono text-[10px] text-gray-550 uppercase tracking-widest border-b border-white/5 pb-2">
            Sector Profiles
          </div>
          
          <div className="space-y-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            {LOCAL_INDUSTRY_SYSTEMS.map((ind) => {
              const isActive = ind.id === activeIndustryId;
              const Icon = ind.icon;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustryId(ind.id)}
                  className={`flex items-center space-x-3 rounded px-4 py-3 text-left transition-all shrink-0 min-w-[160px] lg:w-full border ${
                    isActive 
                      ? "bg-[#cfa86b]/10 text-[#cfa86b] border-[#cfa86b]/30 shadow-md shadow-[#cfa86b]/5 transform scale-[1.02]" 
                      : "bg-slate-950 text-gray-400 hover:bg-slate-900/50 hover:text-white border-white/5"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#cfa86b]" : "text-gray-500"}`} />
                  <span className="font-display text-xs uppercase font-bold tracking-wider">{ind.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Diagram & Details (9 columns) */}
        <div className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="rounded border border-white/5 bg-slate-900/30 p-8 space-y-8 min-h-[600px] flex flex-col"
            >
              
              <div className="border-b border-white/5 pb-6">
                <div className="flex items-center space-x-3 text-white mb-2">
                   <activeIndustry.icon className="h-6 w-6 text-[#cfa86b]" />
                   <h3 className="font-display text-3xl font-extrabold tracking-wider uppercase">
                     {activeIndustry.name} Core Systems
                   </h3>
                </div>
                <p className="font-sans text-sm text-gray-400 max-w-2xl leading-relaxed">
                  {activeIndustry.description}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 flex-1">
                
                {/* 6-Layer Diagram Interactive Map */}
                <div className="rounded border border-white/10 bg-slate-950/80 p-6 flex flex-col items-center justify-between space-y-2 relative overflow-hidden">
                   <div className="absolute inset-0 bg-grid-mesh opacity-10 pointer-events-none" />
                   
                   <div className="w-full text-center border-b border-white/5 pb-2 mb-2 relative z-10">
                     <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-[#cfa86b]">
                       Hemisystems 6-Layer Stack
                     </span>
                   </div>

                   <div className="flex flex-col space-y-2 w-full max-w-sm mx-auto relative z-10 py-4">
                     {LAYER_ORDER.map((layer, index) => {
                       const isSelected = activeLayerId === layer.id;
                       const LayerIcon = layer.icon;
                       return (
                         <React.Fragment key={layer.id}>
                           <button
                             onClick={() => setActiveLayerId(layer.id)}
                             className={`flex items-center justify-between w-full rounded border px-4 py-3 transition-all ${
                               isSelected
                                 ? "bg-[#cfa86b]/10 border-[#cfa86b]/50 text-white shadow-lg shadow-[#cfa86b]/10 scale-105"
                                 : "bg-slate-900 border-white/10 text-gray-400 hover:bg-slate-800 hover:border-white/20"
                             }`}
                           >
                             <div className="flex items-center space-x-3">
                               <LayerIcon className={`h-4 w-4 ${isSelected ? "text-[#cfa86b]" : "text-gray-500"}`} />
                               <span className="font-display text-[11px] font-bold uppercase tracking-widest">{layer.label}</span>
                             </div>
                             {isSelected && <ChevronRight className="h-4 w-4 text-[#cfa86b]" />}
                           </button>
                           
                           {/* Structural downward flow lines between layers */}
                           {index < LAYER_ORDER.length - 1 && (
                             <div className="flex justify-center w-full my-0.5">
                                <ArrowDown className="h-3 w-3 text-gray-700" />
                             </div>
                           )}
                         </React.Fragment>
                       );
                     })}
                   </div>
                </div>

                {/* Layer Specific Content Panel */}
                <div className="flex flex-col space-y-6">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeIndustry.id}-${activeLayerId}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="rounded border border-[#cfa86b]/20 bg-slate-950 p-8 flex-1 flex flex-col relative overflow-hidden"
                    >
                      {/* Ambient background glow for active layer */}
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                         {React.createElement(LAYER_ORDER.find(l => l.id === activeLayerId)?.icon || HelpCircle, { className: "w-32 h-32 text-[#cfa86b]" })}
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#cfa86b] mb-4">
                          {LAYER_ORDER.find(l => l.id === activeLayerId)?.label} Details
                        </span>
                        
                        <h4 className="font-display text-2xl font-bold text-white mb-4 leading-tight">
                          {activeLayerData?.title || "Component"}
                        </h4>
                        
                        <p className="font-sans text-sm text-gray-300 leading-relaxed mb-8 border-l-2 border-[#cfa86b]/40 pl-4">
                          {activeLayerData?.description || "Description not available."}
                        </p>

                        <div className="mt-auto pt-6 border-t border-white/10">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-500 block mb-3">
                            Primary Execution Technologies
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {activeLayerData?.technologies?.map((tech, idx) => (
                              <span key={idx} className="rounded bg-white/5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-300">
                                {tech}
                              </span>
                            )) || <span className="text-gray-500 text-xs">No specific specs mapped.</span>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                </div>
              </div>
              
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}

