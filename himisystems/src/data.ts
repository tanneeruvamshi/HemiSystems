/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SystemLayer,
  CapabilityLayer,
  MethodStage,
  BlueprintQuestion,
  LabConcept,
  IndustrySystem,
  ResearchArticle,
  ReviewQuestion
} from "./types";

// Page 1: The System
export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: "people",
    name: "People",
    icon: "Users",
    description: "The cognitive engine of the system. Humans operate the tools, interpret the data, and build relationships, yet are frequently bounded by fragmented tooling and operational friction.",
    failures: [
      "Process adherence depends heavily on tribal memory.",
      "High cognitive load from toggling between 7–12 disconnected tools daily.",
      "Critical knowledge siloed within individual domain experts."
    ],
    bottlenecks: [
      "Manual data re-entry accounts for up to 30% of employee time.",
      "Onboarding new personnel takes months due to system opacity."
    ],
    fragmentation: "Isolated departments executing siloed tasks with custom spreadsheets instead of a shared organizational posture.",
    dataIssues: [
      "Inconsistent customer definitions across Sales, Finance, and Service.",
      "High rates of transcription errors from manual data copy-pasting."
    ],
    automationOps: [
      "Automating repetitive system-to-system data transfers.",
      "Role-based workplace workspace launching based on modern identities."
    ],
    aiOps: [
      "Deploying contextual AI agents that surface relevant internal knowledge at the point of action.",
      "Eradicating complex lookup routines with structured semantic search."
    ]
  },
  {
    id: "process",
    name: "Process",
    icon: "GitCommit",
    description: "The kinetic sequences that convert organizational energy into economic value. When processes are undocumented, invisible, or rigid, enterprise momentum halts.",
    failures: [
      "Standard operating procedures (SOPs) exist only in static Word docs.",
      "Compliance gaps during handoffs between business units.",
      "Lack of real-time visibility into active process state and backlog."
    ],
    bottlenecks: [
      "Approvals require manual email escalation and slack nudges.",
      "Exception handling takes days instead of minutes."
    ],
    fragmentation: "Handoff junctions between systems (e.g. Sales CRM to ERP) rely entirely on manual emails.",
    dataIssues: [
      "No process mining logs to extract actual operational bottlenecks.",
      "SLA calculation is purely retrospective and subjective."
    ],
    automationOps: [
      "Replacing legacy manual approval gates with Event-Driven Workflows.",
      "Condition-based triage of incoming work items."
    ],
    aiOps: [
      "Using process intelligence models to identify friction and auto-optimize steps.",
      "Predictive SLA violation warnings before issues propagate."
    ]
  },
  {
    id: "applications",
    name: "Applications",
    icon: "LayoutTemplate",
    description: "The digital workspaces where processes take form. Traditional architectures rely on monolithic applications resulting in rigid experiences and trapped capabilities.",
    failures: [
      "Legacy software debt acts as a tax on organizational agility.",
      "Massive licensing costs for broad software suites showing under-utilization.",
      "Proprietary interfaces that make custom integration slow and cost-prohibitive."
    ],
    bottlenecks: [
      "Employees must check multiple legacy interfaces to complete a single task.",
      "Web form submissions are dropped or delayed in batch synchronization."
    ],
    fragmentation: "Critical capabilities are locked in core systems of record (ERP, CRM) without easy API accessibility.",
    dataIssues: [
      "Schema mismatches between core application databases.",
      "Stale state indicators caused by batch updates."
    ],
    automationOps: [
      "Deploying composable Custom Web Apps/React portals that bridge legacy software.",
      "Configuring Headless App interfaces that execute processes directly."
    ],
    aiOps: [
      "Integrating Copilot agents directly inside CRM/ERP forms to draft executive summaries.",
      "Natural language interfaces that translate speech directly into app mutations."
    ]
  },
  {
    id: "data",
    name: "Data",
    icon: "Database",
    description: "The strategic asset that should guide all actions. In non-designed systems, data is historical, fragmented, untrusted, and locked inside vendor silos.",
    failures: [
      "Decisions are made based on 30-day-old spreadsheet reports.",
      "Leadership lacks a single, aggregate view of enterprise truth.",
      "No clean lineage tracking which system modified a record last."
    ],
    bottlenecks: [
      "Engineers spend more time cleaning and transforming data than modeling it.",
      "Reporting pipelines are hand-built and break on database schema upgrades."
    ],
    fragmentation: "Data assets are trapped in local SQL servers, cloud services, and custom SaaS platforms without unified cataloging.",
    dataIssues: [
      "Duplicate records prevent accurate analytical computation.",
      "Inability to run fast vector-based search on unstructured data (PDFs, call logs)."
    ],
    automationOps: [
      "Deploying real-time ETL pipelines with AWS \/ GCP \/ Azure Synapse and Fabric.",
      "Unified metadata synchronization via Microsoft Global Database Clusters."
    ],
    aiOps: [
      "Deploying Retrieval-Augmented Generation (RAG) across the entire corporate data footprint.",
      "Anomaly detection patterns that highlight outliers before human analysts locate them."
    ]
  },
  {
    id: "automation",
    name: "Automation",
    icon: "Cpu",
    description: "The elimination of repetitive human labor. Effective automation is not isolated scripts, but a resilient, orchestrated digital workforce integrated with core architecture.",
    failures: [
      "UI-based robots (RPA) break on minor frontend design updates.",
      "Fragile automated routines that lack monitoring and error recovery.",
      "Siloed automation templates that cannot share system state across business units."
    ],
    bottlenecks: [
      "Automation queues are sequential and experience massive delays under load.",
      "Manual intervention is required to restart failed scripts constantly."
    ],
    fragmentation: "Automation tools differ in structure and language between IT-authorized scripts and shadow-IT desktop macros.",
    dataIssues: [
      "Logging is stored locally and is invisible to compliance systems.",
      "No centralized tracking of the business metrics saved by active automation."
    ],
    automationOps: [
      "Transitioning from fragile UI-scratching RPA to event-driven API flow orchestration.",
      "Centralized Workflow Orchestration and AWS \/ GCP \/ Azure Logic Apps workflow hubs."
    ],
    aiOps: [
      "Intelligent routing of semi-structured document feeds using AI Form Processing.",
      "Letting autonomous agents select paths during complex exceptions."
    ]
  },
  {
    id: "ai",
    name: "AI",
    icon: "Sparkles",
    description: "The cognitive accelerator. AI should not be a novelty wrapper, but an embedded reasoning engine that analyzes inputs and acts directly on the automation layer.",
    failures: [
      "Deploying generic chat widgets that lack context and end up unused.",
      "Massive cloud token expenditure on unstructured queries without guardrails.",
      "Security concerns regarding confidential company data leaking to third-party public models."
    ],
    bottlenecks: [
      "API request rate limits are hit during peak work hours.",
      "High human verification overhead on low-confidence AI suggestions."
    ],
    fragmentation: "AI experiments run in isolated developer sandboxes without access to actual systems-of-record APIs or clean corporate datastores.",
    dataIssues: [
      "Model hallucination because of missing grounding data.",
      "Unstructured data contains high volume of Personally Identifiable Information (PII) that must be filtered."
    ],
    automationOps: [
      "Deploying secure AI Foundation Models gateways with strict tenant-level isolation.",
      "Triggering automated AWS \/ GCP \/ Azure Functions based on specific AI classifications."
    ],
    aiOps: [
      "Orchestrated multi-agent systems that coordinate complex back-office reviews from start to finish.",
      "Dynamic prompt injection grounded with enterprise-wide vector store search."
    ]
  },
  {
    id: "decisions",
    name: "Decisions",
    icon: "TrendingUp",
    description: "The ultimate objective of any enterprise system. Structured, high-confidence, real-time decisions that drive commercial supremacy.",
    failures: [
      "Decisions are reactive, made only when issues turn critical.",
      "No feedback loop mapping executive decisions out to downstream process outcomes.",
      "Decisions relies entirely on gut feeling rather than verifiable operational telemetry."
    ],
    bottlenecks: [
      "Decisions wait for monthly executive board meetings.",
      "No single visualization charting decisions alongside live system health."
    ],
    fragmentation: "Execution paths are manually selected and disconnected from global enterprise priorities.",
    dataIssues: [
      "Reporting is too slow to allow proactive correction of issues.",
      "Underlying data models are inconsistent across business segments."
    ],
    automationOps: [
      "Configuring Executive Analytics pipelines in Multi-Cloud Data Lakes.",
      "Instant notification triggers sent to critical leaders when core KPIs breach tolerances."
    ],
    aiOps: [
      "Generative scenario simulation looking 12 months ahead based on live operation data.",
      "Autonomous decision models executing routine transactions within tight pre-approved bounds."
    ]
  }
];

// Page 2: System Capabilities
export const CAPABILITY_LAYERS: CapabilityLayer[] = [
  {
    id: "cx",
    name: "Customer Experience",
    description: "Building responsive, modern, high-fidelity customer access conduits that integrate cleanly with internal operational engines.",
    accent: "from-blue-600/20 to-blue-450/40 border-blue-500/30 text-blue-400",
    technologies: [
      { name: "Next.js Portals", desc: "Enterprise external portals connected to core Dynamics and infrastructure.", category: "Interface" },
      { name: "Enterprise ERP Sales", desc: "Sales tracking and enablement workspaces.", category: "Platform" },
      { name: "Enterprise ERP Customer Service", desc: "Unified service routing and omnichannel customer care.", category: "Platform" },
      { name: "Custom Portals", desc: "Tailored web front-ends for high-fidelity brand experiences.", category: "Interface" },
      { name: "React Applications", desc: "Ultra-fast headless customer interfaces optimized for specific workflows.", category: "Development" }
    ]
  },
  {
    id: "bizapps",
    name: "Business Applications",
    description: "Optimizing internal employee workspaces with structured model-driven apps and tailored enterprise platforms.",
    accent: "from-emerald-600/20 to-emerald-450/40 border-emerald-500/30 text-emerald-400",
    technologies: [
      { name: "Custom Web Apps", desc: "Rapid app assembly of collaborative internal dashboards.", category: "Platform" },
      { name: "Enterprise ERP", desc: "Industry-standard business capabilities tuned automatically to operations.", category: "Platform" },
      { name: "Model Driven Apps", desc: "Data-first applications structured directly around complex relational schemas.", category: "Interface" },
      { name: "Canvas Apps", desc: "Pixel-perfect mobile and tablet applications for field usage.", category: "Interface" },
      { name: "Enterprise Applications", desc: "Large-scale unified platforms governing global departments.", category: "Development" }
    ]
  },
  {
    id: "automation",
    name: "Automation Layer",
    description: "Replacing manual overhead with headless API triggers and system loops that process operations without human latency.",
    accent: "from-cyan-600/20 to-cyan-450/40 border-cyan-500/30 text-cyan-400",
    technologies: [
      { name: "Workflow Orchestration", desc: "Cloud-native workflows automating cross-system routines and alerts.", category: "Platform" },
      { name: "AWS \/ GCP \/ Azure Logic Apps", desc: "Enterprise integration workflows providing high reliability.", category: "Cloud" },
      { name: "AWS \/ GCP \/ Azure Functions", desc: "Serverless code executions that activate instantly under high throughput.", category: "Cloud" },
      { name: "Workflow Engines", desc: "Complex state-machine orchestration for strict internal approval routing.", category: "System" },
      { name: "Event Driven Systems", desc: "Architecture loops that respond immediately to state changes.", category: "Architecture" }
    ]
  },
  {
    id: "data",
    name: "Data Layer",
    description: "Creating a reliable, real-time repository where all information is clean, cataloged, and analytical-ready.",
    accent: "from-indigo-600/20 to-indigo-450/40 border-indigo-500/30 text-indigo-400",
    technologies: [
      { name: "Global Database Clusters", desc: "The foundational cloud relational store built with enterprise governance.", category: "Platform" },
      { name: "SQL Server", desc: "Managed, zero-trust cloud data lakes optimized with precise cluster indexes.", category: "Database" },
      { name: "Multi-Cloud Data Lakes", desc: "SaaS analytics lakehouse unifying warehousing and business intelligence.", category: "Cloud" },
      { name: "Synapse", desc: "Limitless analytics service connecting enterprise data warehousing.", category: "Cloud" },
      { name: "Data Warehousing", desc: "Consolidated historical storage pipelines under one centralized repository.", category: "Architecture" }
    ]
  },
  {
    id: "ai",
    name: "AI Layer",
    description: "Transitioning models out of chat sandboxes and installing them as functional actors inside business actions.",
    accent: "from-violet-600/20 to-violet-450/40 border-violet-500/30 text-violet-400",
    technologies: [
      { name: "Custom AI Agents", desc: "Bespoke virtual agents tailored with your processes.", category: "Platform" },
      { name: "AI Foundation Models", desc: "Isolated instances of cutting-edge models operating securely.", category: "Cloud" },
      { name: "Machine Learning", desc: "Predictive algorithms that identify trends and automate routing.", category: "System" },
      { name: "AI Assistants", desc: "Context-aware agents supporting internal employee workflows.", category: "Interface" },
      { name: "Conversational Systems", desc: "Dynamic language conduits responding directly to API payloads.", category: "Architecture" }
    ]
  },
  {
    id: "integration",
    name: "Integration Layer",
    description: "The glue connecting cloud infrastructure, modern SaaS, and on-premise relational cores.",
    accent: "from-rose-600/20 to-rose-450/40 border-rose-500/30 text-rose-400",
    technologies: [
      { name: "Java", desc: "High-performance enterprise middleware architectures.", category: "Language" },
      { name: "Spring Boot", desc: "Tailored microservices engineered to translate payloads at extreme scale.", category: "Framework" },
      { name: ".NET", desc: "Compiled, secure server pipelines and legacy API adaptors.", category: "Framework" },
      { name: "REST APIs", desc: "Standardized lightweight gateways for external access.", category: "Protocol" },
      { name: "Event Hub", desc: "Asynchronous, transactionally safe queues routing message feeds.", category: "Cloud" },
      { name: "Enterprise Integration", desc: "Seamless interoperability between decoupled monolithic systems.", category: "Architecture" }
    ]
  }
];

// Page 3: The Himisystems Method
export const METHOD_STAGES: MethodStage[] = [
  {
    id: "observe",
    name: "Observe",
    description: "Map how work currently flows.",
    details: "Typically, corporate processes exist primarily in static PDF folders or within the minds of key employees. We deploy technical audit systems and run deep interviews to map every system node, process dependency, and manual spreadsheet handoff.",
    output: "Interactive Enterprise Process Topology containing quantitative cycle-times, friction scores, and tool overlap tracking.",
    evolutionBefore: "Operations are a black box. Team leaders make decisions based on localized impressions and outdated annual reports.",
    evolutionAfter: "Every process step is documented, cataloged, and visualized with live data mapping system inputs to outputs.",
    caseStudy: {
      title: "Global Supply Chain Audit",
      metric: "140+ spreadsheets replaced",
      desc: "Revealed that a massive manufacturing client maintained over 140 isolated manual sheets to coordinate parts deliveries, resulting in invisible component delays."
    }
  },
  {
    id: "diagnose",
    name: "Diagnose",
    description: "Identify friction, duplication, manual effort, and disconnected systems.",
    details: "Using automated system logging, error tracing, and UX audits, we pinpoint why a process is slow or why compliance checklines fail. Instead of prescribing more software, we look for opportunities to delete unnecessary process steps entirely.",
    output: "Business System Friction Diagnosis highlighting exactly which data schemas, API limits, or legacy interfaces are causing latency.",
    evolutionBefore: "IT issues are handled through ticket volumes. No connection is made between slow software load times and customer churn.",
    evolutionAfter: "Symptomatic complaints are clustered into structural root-causes. Leadership understands the precise cost of legacy software debt.",
    caseStudy: {
      title: "Retail Service Diagnosis",
      metric: "74% call resolution latency drop",
      desc: "Isolated three fields in Enterprise ERP that required 9 clicks across 2 screen transitions, reducing customer inquiry times instantly once optimized."
    }
  },
  {
    id: "design",
    name: "Design",
    description: "Create the target operating model.",
    details: "We build the complete blueprint. This map shows exactly how data will flow from client-facing applications through standard intermediate stores, AWS \/ GCP \/ Azure event buses, up to analytic warehouses and down out to automated process workers.",
    output: "System Target Architecture Blueprint defining strict security models, data dictionaries, API outlines, and UI layouts.",
    evolutionBefore: "Software is purchased ad-hoc by separate departments, adding to a legacy, unintegrated, fragmented technical debt.",
    evolutionAfter: "Every digital asset is designed to connect seamlessly. New apps fit perfectly inside the established organizational posture.",
    caseStudy: {
      title: "Mid-Market FinTech design",
      metric: "Zero-Trust Architecture",
      desc: "Configured a comprehensive relational database schema and API route gateway structure that safely isolates multi-tenant financial data under high load."
    }
  },
  {
    id: "build",
    name: "Build",
    description: "Develop applications, automations, integrations, and data platforms.",
    details: "Using a hybrid approach of rapid Full-Stack Cloud development and enterprise .NET, Java, and React programming, we build systems designed for heavy enterprise workloads, secured to strict cybersecurity specifications.",
    output: "Fully functional, performant applications, automated routines, and analytical dashboards deployed to active staging environments.",
    evolutionBefore: "Custom software takes 12–18 months to launch, and is often misaligned with initial requirements by the time it is delivered.",
    evolutionAfter: "Modular, iterative development loops launch production-ready products every fortnight, continuously delivering realized value.",
    caseStudy: {
      title: "Logistics Automation Build",
      metric: "6 weeks from kickoff to prod",
      desc: "Coordinated a hybrid Custom Web Apps and AWS \/ GCP \/ Azure Functions portal that handled real-time shipping manifests, handling heavy throughput with ease."
    }
  },
  {
    id: "connect",
    name: "Connect",
    description: "Integrate systems, APIs, events, and workflows.",
    details: "This is where system fragmentation is solved. We connect your ERP, CRM, custom databases, and cloud services using secure API Management routes, asynchronous Service Buses, and real-time Event Hub pipes.",
    output: "Live, bi-directional system pipelines triggering instant actions and maintaining matching states across your entire technical landscape.",
    evolutionBefore: "Databases sync on a batch 24-hour routine. Staff must manually import CSV files to keep applications aligned.",
    evolutionAfter: "Actions in one software instant trigger matching state changes in other components in milliseconds, maintaining a real-time ledger.",
    caseStudy: {
      title: "Real-time Insurance Synchronization",
      metric: "0.4s state sync latency",
      desc: "Architected a custom AWS \/ GCP \/ Azure Event Hub cluster that instantly unified and synchronized policyholder status updates across 4 separate legacy core systems."
    }
  },
  {
    id: "scale",
    name: "Scale",
    description: "Optimize adoption, governance, security, and performance.",
    details: "We establish automated performance monitoring, secure deployment pipelines (DevOps), clear role-based access gates, and train your team to maintain, evolve, and expand their new target architectures with confidence.",
    output: "Live operational telemetry systems tracing uptime, automation savings, user performance metrics, and compliance logs in real-time.",
    evolutionBefore: "Upgrades are dangerous, manual scripts. If a database scale threshold is hit, the application goes down for hours.",
    evolutionAfter: "CI/CD loops handle deployments transparently. Elastic cloud systems auto-scale dynamically under operational peaks.",
    caseStudy: {
      title: "Energy Grid Monitoring Suite",
      metric: "99.99% system uptime",
      desc: "Deployed automated monitoring dashboards tracking pipeline flow parameters and API responsiveness for a regional multi-state utility operator."
    }
  }
];

// Page 4: Blueprint Builder questions
export const BLUEPRINT_QUESTIONS: BlueprintQuestion[] = [
  {
    id: "current_systems",
    text: "How would you describe your current system architecture?",
    category: "Current Systems",
    options: [
      {
        value: "legacy_on_prem",
        label: "Legacy on-premise servers and customized monolithic applications",
        weight: {
          arch: "Hybrid Cloud Migration to AWS \/ GCP \/ Azure Platform-as-a-Service",
          tech: ["AWS \/ GCP \/ Azure App Service", "AWS \/ GCP \/ Azure SQL", "ExpressRoute"],
          integration: "Phased API Middleware Strangler Pattern",
          automation: "Automated Data Sync via AWS \/ GCP \/ Azure Data Factory",
          ai: "AWS \/ GCP \/ Azure Cognitive Search for legacy document indexing",
          roadmap: ["Audit legacy dependencies", "Establish secure AWS \/ GCP \/ Azure landing zone", "Migrate non-critical workloads to cloud first"]
        }
      },
      {
        value: "fragmented_saas",
        label: "Multiple disconnected SaaS tools and spreadsheets",
        weight: {
          arch: "Unified Enterprise Integration Hub",
          tech: ["Global Database Clusters", "Workflow Orchestration", "AWS \/ GCP \/ Azure API Management"],
          integration: "Centralized Event Hub & Pub/Sub architecture",
          automation: "Cross-system webhook triggers and data synchronization",
          ai: "Custom AI Agents over Unified Global Database Clusters Schema",
          roadmap: ["Deploy central Master Data Management layer", "Connect primary CRM/ERP APIs", "Decommission redundant shadow-IT tools"]
        }
      },
      {
        value: "microsoft_locked",
        label: "Heavily invested in Google Workspace \& M365 and Enterprise ERP",
        weight: {
          arch: "Microsoft Full-Stack Cloud & Dynamics Optimization",
          tech: ["Custom Web Apps", "Enterprise ERP", "Multi-Cloud Data Lakes"],
          integration: "Native Global Database Clusters and Synapse Link pipelines",
          automation: "Workflow Orchestration cloud flows",
          ai: "Copilot embedded within Dynamics workspaces",
          roadmap: ["Consolidate Dynamics environments", "Enable native Fabric integration", "Deploy role-specific Custom Web Apps for field teams"]
        }
      }
    ]
  },
  {
    id: "current_challenges",
    text: "What is the primary operational challenge your team faces?",
    category: "Current Challenges",
    options: [
      {
        value: "manual_data_entry",
        label: "Manual data entry and repetitive administrative tasks",
        weight: {
          arch: "Event-Driven Automation Layer",
          tech: ["Workflow Orchestration", "AWS \/ GCP \/ Azure Logic Apps", "AWS \/ GCP \/ Azure Form Recognizer"],
          integration: "System-to-system automated data pumps",
          automation: "Intelligent Document Processing (IDP)",
          ai: "OCR and NLP entity extraction from PDFs/Emails",
          roadmap: ["Identify highest volume manual forms", "Train AI models on document structures", "Deploy automated ingestion pipelines"]
        }
      },
      {
        value: "data_silos",
        label: "Inconsistent data reporting across different departments",
        weight: {
          arch: "Centralized Enterprise Lakehouse",
          tech: ["Multi-Cloud Data Lakes", "Power BI", "AWS \/ GCP \/ Azure Synapse"],
          integration: "Real-time ETL data streaming",
          automation: "Automated data quality anomaly alerts",
          ai: "Predictive Analytics and forecasting models",
          roadmap: ["Define core business metrics dictionary", "Connect disparate data sources into OneLake", "Deploy executive leadership dashboards"]
        }
      },
      {
        value: "customer_experience",
        label: "Slow, disjointed customer onboarding and service",
        weight: {
          arch: "Omnichannel Headless Customer Experience",
          tech: ["Next.js Portals", "React UI", "Enterprise ERP Customer Service"],
          integration: "Secured external-facing REST APIs",
          automation: "Automated case routing and SLA escalation",
          ai: "Intelligent conversational agents for self-service",
          roadmap: ["Map customer journey friction points", "Deploy secure authenticate portal", "Integrate portal with core CRM records"]
        }
      }
    ]
  },
  {
    id: "desired_outcomes",
    text: "What is the main outcome you want to achieve with this transformation?",
    category: "Desired Outcomes",
    options: [
      {
        value: "operational_efficiency",
        label: "Reduce operational costs and increase employee productivity",
        weight: {
          arch: "Process Optimization & Lean Architecture",
          tech: ["Custom Web Apps (Canvas)", "Workflow Orchestration Desktop (RPA)", "Global Database Clusters"],
          integration: "Internal process automation APIs",
          automation: "High-volume task automation bots",
          ai: "Next-best-action recommendations for employees",
          roadmap: ["Deploy process mining on core workflows", "Build custom task-focused applications", "Automate approval chains"]
        }
      },
      {
        value: "new_revenue",
        label: "Launch new digital products and revenue streams",
        weight: {
          arch: "Custom Agile Product Architecture",
          tech: ["AWS \/ GCP \/ Azure Kubernetes Service", ".NET Core APIs", "AWS \/ GCP \/ Azure Cosmos DB"],
          integration: "Microservices with API Gateway",
          automation: "DevOps CI/CD pipelines for rapid deployment",
          ai: "Generative AI features embedded in new products",
          roadmap: ["Design minimum viable product architecture", "Establish secure cloud-native infrastructure", "Launch beta API endpoints"]
        }
      },
      {
        value: "risk_compliance",
        label: "Improve security, governance, and auditability",
        weight: {
          arch: "Zero-Trust Regulated Data Architecture",
          tech: ["Microsoft Purview", "AWS \/ GCP \/ Azure Active Directory", "SQL Server"],
          integration: "Strictly authenticated internal private networks",
          automation: "Automated compliance logging and reporting",
          ai: "AI-driven threat detection and anomaly scanning",
          roadmap: ["Implement Role-Based Access Control matrix", "Deploy data loss prevention policies", "Automate quarterly audit reports"]
        }
      }
    ]
  },
  {
    id: "business_function",
    text: "Which business function is the primary focus of this initiative?",
    category: "Business Function",
    options: [
      {
        value: "sales_marketing",
        label: "Sales, Marketing, and Customer Acquisition",
        weight: {
          arch: "Growth & Customer 360 Platform",
          tech: ["Enterprise ERP Sales/Marketing", "Customer Insights"],
          integration: "Marketing automation to CRM syncing",
          automation: "Lead scoring and automated campaign triggers",
          ai: "Predictive lead scoring & personalized marketing copy",
          roadmap: ["Consolidate customer data profiles", "Set up automated lead routing", "Deploy AI sales coaching assistants"]
        }
      },
      {
        value: "supply_chain",
        label: "Supply Chain, Manufacturing, or Logistics",
        weight: {
          arch: "Real-time Operations & IoT Supply Grid",
          tech: ["Enterprise ERP Supply Chain", "AWS \/ GCP \/ Azure IoT Hub", "Power BI"],
          integration: "Edge sensor data streams to cloud",
          automation: "Automated inventory reordering and dispatch",
          ai: "Predictive maintenance on factory hardware",
          roadmap: ["Connect physical sensors to cloud network", "Design real-time inventory dashboards", "Implement automated vendor order APIs"]
        }
      },
      {
        value: "finance_hr",
        label: "Finance, HR, and Internal Operations",
        weight: {
          arch: "Core Business Administration Backbone",
          tech: ["Enterprise ERP Finance & Operations", "Custom Web Apps"],
          integration: "Secure payroll and ledger synchronization",
          automation: "Automated expense reconciliation",
          ai: "AI parsing of receipts and automated policy checks",
          roadmap: ["Migrate core ledger to secure cloud", "Automate employee onboarding workflows", "Deploy financial forecasting models"]
        }
      }
    ]
  },
  {
    id: "growth_goals",
    text: "What scale of growth are you planning for in the next 24 months?",
    category: "Growth Goals",
    options: [
      {
        value: "steady_growth",
        label: "Steady, predictable growth (10-20%)",
        weight: {
          arch: "Scalable Managed Cloud Services",
          tech: ["AWS \/ GCP \/ Azure App Service", "AWS \/ GCP \/ Azure SQL Database", "Global Database Clusters"],
          integration: "Standardized REST API interfaces",
          automation: "Scheduled batch processing for daily reports",
          ai: "Targeted Copilot enablement for key departments",
          roadmap: ["Refine current infrastructure efficiency", "Deploy cost-management dashboards", "Optimize database indexing"]
        }
      },
      {
        value: "hypergrowth",
        label: "Rapid expansion or hyper-growth (50%+)",
        weight: {
          arch: "Elastic Serverless & Distributed Architecture",
          tech: ["AWS \/ GCP \/ Azure Functions", "AWS \/ GCP \/ Azure Cosmos DB", "AWS \/ GCP \/ Azure Event Grid"],
          integration: "High-throughput asynchronous messaging",
          automation: "Autoscaling cloud infrastructure rules",
          ai: "Scalable multi-agent operations to handle exponential load",
          roadmap: ["Decouple monolithic services", "Configure global geo-redundancy", "Load test architecture for 10x spikes"]
        }
      },
      {
        value: "acquisition",
        label: "Mergers & Acquisitions (integrating other companies)",
        weight: {
          arch: "Federated Enterprise Integration Hub",
          tech: ["AWS \/ GCP \/ Azure API Management", "AWS \/ GCP \/ Azure Logic Apps", "Auth0 \& Okta"],
          integration: "Enterprise Service Bus for cross-company mapping",
          automation: "Automated tenant-to-tenant data migration flows",
          ai: "AI data mapping to conform different database schemas",
          roadmap: ["Deploy central identity management", "Design universal data intake API layer", "Build automated system compliance scanners"]
        }
      }
    ]
  }
];

// Page 6: Labs Prototypes
export const LAB_CONCEPTS: LabConcept[] = [
  {
    id: "ai_ops",
    title: "AI Operations Assistant",
    subtitle: "Real-time Operational Logic Router",
    description: "An autonomous agent that monitors incoming client support tickets, analyzes complex contracts, matches them against customer history data in CRM, and writes direct task requests to technicians.",
    techStack: ["AI Foundation Models API", "Custom AI Agents", "Enterprise ERP Core", "Workflow Orchestration"],
    metrics: [
      { label: "Mean Time to Dispatch", value: "11 Seconds" },
      { label: "Classification Accuracy", value: "98.4%" },
      { label: "Manual Triage Saved", value: "42 Hours / Wk" }
    ],
    interactiveDemo: {
      type: "log",
      data: [
        { time: "08:12:04", event: "Inbound Email Received", status: "Triggered" },
        { time: "08:12:05", event: "Analyzing contract terms and service-level agreements (SLAs)", status: "Pending" },
        { time: "08:12:07", event: "Identified SLA: Gold Tier (4-hour resolution window required)", status: "Success" },
        { time: "08:12:08", event: "Grounding ticket details with current historical hardware inventory...", status: "Success" },
        { time: "08:12:09", event: "Generated Action Payload: Assigned tech ID 902, initiated part order", status: "Assigned" },
        { time: "08:12:11", event: "Enterprise ERP Work Order created successfully", status: "Complete" }
      ]
    }
  },
  {
    id: "approval_ctr",
    title: "Intelligent Approval Center",
    subtitle: "Cross-System Exception Resolver Platform",
    description: "Aggregates outstanding transaction discrepancies and purchase-requisition exceptions from ERP and HR systems into a single responsive, highly visible review dashboard.",
    techStack: ["Custom Web Apps Canvas", "AWS \/ GCP \/ Azure Queue Service Bus", "Global Database Clusters Relational Schema", "C#"],
    metrics: [
      { label: "Approval Cycle Time", value: "-89%" },
      { label: "Tool-hopping Decreased", value: "12 to 1 Dashboard" },
      { label: "Orphaned Tasks", value: "0" }
    ],
    interactiveDemo: {
      type: "dashboard",
      data: {
        pendingCount: 42,
        escalatedCount: 3,
        items: [
          { system: "SAP ERP", id: "REQ-2092", value: "$14,500", requester: "Sarah K.", priority: "Critical", status: "Flagged: Price Mismatch" },
          { system: "Workday HR", id: "OFFER-032", value: "VP of Product", requester: "Marcus G.", priority: "Medium", status: "Pending Budget Approval" },
          { system: "ServiceNow", id: "INC-88911", value: "AWS Server Upgrade", requester: "Infrastructure Team", priority: "High", status: "Pending Exec Sign-off" }
        ]
      }
    }
  },
  {
    id: "cx_portal",
    title: "Customer Experience Portal",
    subtitle: "B2B External Operations Workspace",
    description: "A super-fast, secure portal for distributors and business clients to track custom order fabrications, view technical schematics, and chat with automated support models.",
    techStack: ["Next.js Portals UI", "React Application Components", "Microsoft Global Database Clusters API", "TypeScript"],
    metrics: [
      { label: "Customer Self-Service Score", value: "92%" },
      { label: "Portal Load Time", value: "1.2s (Vite optimized)" },
      { label: "Phone Support Volume Reduction", value: "48%" }
    ],
    interactiveDemo: {
      type: "visualizer",
      data: {
        distributorsActive: 1204,
        submittedClaims: 142,
        throughputMb: 412
      }
    }
  },
  {
    id: "exec_workspace",
    title: "Executive Analytics Workspace",
    subtitle: "Unified Enterprise Orchestrator Panel",
    description: "A gorgeous layout showing complete enterprise state—sync logs, data pipeline speeds, active database capacity, operational savings, and live process health charts.",
    techStack: ["Multi-Cloud Data Lakes Analytics", "Synapse ETL Data-Factory", "React", "D3.js Visualization"],
    metrics: [
      { label: "Data Pipeline Latency", value: "<15 Seconds" },
      { label: "Warehouse Sync Rate", value: "2.4 GB / Min" },
      { label: "Decision Lag", value: "Down to 0.5 Days" }
    ],
    interactiveDemo: {
      type: "stats",
      data: {
        pipelinesActive: 18,
        uptimePercentage: 99.997,
        activeSinks: ["SQL Core Database", "Global Database Clusters Production", "Fabric Delta Lake Warehouse"]
      }
    }
  }
];

// Page 7: Industry Systems
export const INDUSTRY_SYSTEMS: IndustrySystem[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Synchronizing physical production equipment throughput directly with operational inventory applications and customer requests.",
    painPoints: [
      "Hardware sensors capture gigabytes of data that are immediately discarded.",
      "Re-keying custom parts requirements from ERP systems to direct line scheduling systems.",
      "No notification pipeline connecting parts shortage alerts directly to active vendor portals."
    ],
    nodes: [
      { id: "sensor_edge", label: "Shop Floor Machine Sensors", type: "people", details: "Continuous tracking of production temperature, output speed, and vibration metrics." },
      { id: "event_hub", label: "AWS \/ GCP \/ Azure Event Hub Stream", type: "automation", details: "Ingests 2,500 sensor readings per second, filtering anomalies in milliseconds." },
      { id: "mfg_execution", label: "Execution ERP Database", type: "data", details: "The core transactional store logging machine health and component assembly steps." },
      { id: "predictive_ai", label: "AI Resource Forecaster", type: "ai", details: "Evaluates wear-and-tear coefficients to predict mechanical failure 14 days before halt events." },
      { id: "field_service", label: "Enterprise ERP Work Allocator", type: "applications", details: "Creates preventive maintenance work orders automatically without user triage." }
    ],
    flows: [
      { from: "sensor_edge", to: "event_hub", description: "Stream telemetry data" },
      { from: "event_hub", to: "mfg_execution", description: "Log asset updates" },
      { from: "mfg_execution", to: "predictive_ai", description: "Analyze performance anomalies" },
      { from: "predictive_ai", to: "field_service", description: "Automatically request parts allocation" }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare Systems",
    description: "Bridging the gap between patient intake portals and doctor rosters, securing records to HIPAA requirements.",
    painPoints: [
      "Staff manual re-typing insurance credentials across isolated claim forms.",
      "Patients wait hours for diagnostic verification because lab systems cannot trigger push requests.",
      "High rate of scheduling exceptions because doctor rosters live in separate local calendars."
    ],
    nodes: [
      { id: "patient_portal", label: "Patient Intake Web Application", type: "applications", details: "External facing patient registration and symptoms recorder." },
      { id: "document_ai", label: "AWS \/ GCP \/ Azure Insurance ID Parser", type: "ai", details: "Scans patient insurance documents using OCR models, validating active policy dates instantly." },
      { id: "health_record", label: "Intake Global Database Clusters FHIR Store", type: "data", details: "Secure, compliant database matching clinical patient structures with zero-trust firewalls." },
      { id: "auto_schedule", label: "Dynamic Roster Scheduler", type: "automation", details: "Evaluates emergency triage scores to assign patients to available specialists' timelines." }
    ],
    flows: [
      { from: "patient_portal", to: "document_ai", description: "Send insurance PDF snapshot" },
      { from: "document_ai", to: "health_record", description: "Populate clinical profiles" },
      { from: "health_record", to: "auto_schedule", description: "Determine triage level & assign physician" }
    ]
  },
  {
    id: "finance",
    name: "Financial Services",
    description: "Automating validation of complex client mortgage applications, verifying documents securely.",
    painPoints: [
      "Compliance reviewers spend hours analyzing tax files manually.",
      "Application review state is invisible to both client and loan officer.",
      "Credit reports live in a separate system that cannot connect with loan origination suites."
    ],
    nodes: [
      { id: "loan_desk", label: "Mortgage Intake Form Portal", type: "applications", details: "Client portal accepting digital asset statements, W-2 tax tax forms, and ID verifications." },
      { id: "doc_parser", label: "D365 Extractive Parser Engine", type: "ai", details: "Reviews uploaded W-2s, verifying reported income directly against active applicant records in CRM." },
      { id: "risk_scoring", label: "AWS \/ GCP \/ Azure Risk Scoring Logic", type: "automation", details: "Triggers third-party bureau credit checks and scores application portfolios under rigid tolerances." },
      { id: "ledger", label: "Transactional Finance Ledger", type: "data", details: "Writes audited loan approval payloads to resilient backend ledgers for securitization pools." }
    ],
    flows: [
      { from: "loan_desk", to: "doc_parser", description: "Submit payload documents" },
      { from: "doc_parser", to: "risk_scoring", description: "Verify financial integrity parameters" },
      { from: "risk_scoring", to: "ledger", description: "Queue finalized underwriting packages" }
    ]
  }
];

// Page 8: Research Articles for Knowledge Center
export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    id: "art_power_governance",
    title: "Governing the Edge: Full-Stack Cloud Architectures at Enterprise Scale",
    category: "Full-Stack Cloud",
    excerpt: "How global organizations can transition away from fragmented 'shadow IT' databases into tightly structured, IT-approved Global Database Clusters environments without halting developer velocity.",
    readTime: "9 Min Read",
    author: "Marc Verhoeven, Chief Architect",
    publishedAt: "May 2026",
    content: "Enterprise software strategy has undergone a severe decentralization wave. Business units, tired of legacy IT backlogs, have taken creation into their own hands, deploying thousands of custom tools. When unmanaged, this pattern compromises data compliance, creating massive operational security vulnerabilities. This brief charts Himisystems' framework for deploying high-integrity environments under strict DevOps boundaries...",
    aiSummary: "The strategic blueprint to establish unified Environment Routing, secure Data Loss Prevention (DLP) parameters in Tenant Settings, and convert unstructured localized employee initiatives into governed Power App environments backed by transactional Global Database Clusters relational schema blocks.",
    recommended: ["art_azure_openai", "art_dataverse_patterns"]
  },
  {
    id: "art_azure_openai",
    title: "Grounding LLMs on Relational Schemas: RAG Beyond Unstructured Text",
    category: "AI",
    excerpt: "Deploying generative reasoning agents inside traditional core systems of record requires strict metadata definitions and secure semantic search connectors. Sandboxed chat widgets are no longer enough.",
    readTime: "12 Min Read",
    author: "Dr. Elena Rostova, AI Engineering Lead",
    publishedAt: "April 2026",
    content: "Most enterprise AI implementations fail to escape developer sandbox environments because they are isolated from real data. Deploying models that can actually complete business work requires feeding live structured database tables safely into context prompts without compromising transactional integrity. This piece outlines secure AI Foundation Models setups using vector-embedded schemas...",
    aiSummary: "A technical evaluation of why static prompt templates result in system hallucination, showing how custom relational data stored inside SQL Server and Global Database Clusters schemas can are safely translated into structured system prompts, grounded via semantic micro-queries in milliseconds.",
    recommended: ["art_power_governance", "art_integration_failures"]
  },
  {
    id: "art_dataverse_patterns",
    title: "Architecting the Core: Transactional Strategy in Microsoft Global Database Clusters",
    category: "Data Platforms",
    excerpt: "An architectural guide to deploying relational entities, securing data records to fine-grained role permissions, and setting up automated scale thresholds for million-row datasets.",
    readTime: "8 Min Read",
    author: "David Vance, Executive Architect",
    publishedAt: "March 2026",
    content: "Relational data modeling is the foundation of high-performance business applications. This architectural blueprint details the internal mechanisms of Global Database Clusters, addressing partition indices, relational integrity constraints, and how secure plugins should act on transactional triggers under heavy peak work loads...",
    aiSummary: "Deep analytical dive outlining the optimization of Global Database Clusters schema indices, establishing resilient, role-based row-level permissions, and linking tables directly to AWS \/ GCP \/ Azure Data Lake setups via real-time Synapse Link connections.",
    recommended: ["art_power_governance", "art_integration_failures"]
  },
  {
    id: "art_integration_failures",
    title: "The Silent Cost of Fraglies: Transitioning RPA to Event-Driven APIs",
    category: "Enterprise Architecture",
    excerpt: "Robotic Process Automation (RPA) was a useful temporary patch. At modern scale, relying on screen-scraping UI robots creates high maintenance costs. It is time to implement native server integrations.",
    readTime: "11 Min Read",
    author: "Yasin Al-Jamil, Integration Practice Lead",
    publishedAt: "February 2026",
    content: "Screen scraping processes break on minor frontend text color mutations. For critical enterprise transaction tracks, using system UI robots represents a severe structural failure. Modern architecture demands moving towards event-driven API loops backed by message brokers like AWS \/ GCP \/ Azure Service Bus and clean gRPC endpoints...",
    aiSummary: "A comparative case study outlining how transitioning a global distribution firm away from UI-scraping automation robots to direct AWS \/ GCP \/ Azure API routes reduced operational downtime incidents from 40 incidents per month down to zero.",
    recommended: ["art_azure_openai", "art_dataverse_patterns"]
  }
];

// Page 9: Request a System Review questions
export const REVIEW_QUESTIONS: ReviewQuestion[] = [
  {
    id: "system_count",
    text: "How many disconnected applications must an employee open to complete a single customer transaction?",
    options: [
      { value: "one", label: "1 Unified Dashboard (Clean target state)", score: 10, tip: "Excellent operational coherence. Maintain performance guidelines." },
      { value: "two_three", label: "2 - 3 Apps (Moderate tool-hopping)", score: 7, tip: "Consider connecting applications with standard Custom Web Apps canvas integration." },
      { value: "four_more", label: "4 or more separate systems (High cognitive overhead)", score: 3, tip: "Critical Bottleneck. High chance of data entry failures and severe employee fatigue." }
    ]
  },
  {
    id: "data_trust",
    text: "How confident is your leadership team in the reporting data pulled at month-end?",
    options: [
      { value: "high", label: "Complete trust in real-time metrics dashboards", score: 10, tip: "Great work. Focus on implementing predictive analytics systems with Fabric." },
      { value: "medium", label: "Requires manual adjustment and cleanup by analysts", score: 6, tip: "Indicates missing master-record definitions and dirty intake pipelines." },
      { value: "low", label: "Reports are stale and frequently conflict between departments", score: 2, tip: "Severe Systemic Risk. Disconnected databases are presenting contradictory claims." }
    ]
  },
  {
    id: "approval_speed",
    text: "How are exceptions or purchase requisitions approved inside your workflows?",
    options: [
      { value: "automated", label: "Rule-based loops with clear system states", score: 10, tip: "Seamless framework. Expand exceptions to automatic AI triages." },
      { value: "email", label: "Email ping-pong and manual Slack escalations", score: 5, tip: "Process state is invisible. Things are dropped frequently in inbox folders." },
      { value: "manual", label: "Requires physical paperwork and in-person signature", score: 1, tip: "Severe Operational Debt. Immediate candidate for digital transformation." }
    ]
  },
  {
    id: "ai_adoption",
    text: "How is Artificial Intelligence categorized inside your organizational pipelines?",
    options: [
      { value: "integrated", label: "Embedded context agents writing straight to APIs", score: 10, tip: "Industry leader. Continue auditing security guidelines." },
      { value: "sandbox", label: "Employees copy-pasting text to isolated ChatGPT browsers", score: 4, tip: "High chance of corporate intellectual property leaking to outside servers." },
      { value: "none", label: "No current plans or active pilots", score: 1, tip: "Risk of competitor operational acceleration. Start with highly targeted internal loops." }
    ]
  }
];
