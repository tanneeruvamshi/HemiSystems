/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Beaker, 
  Terminal, 
  Check, 
  Smartphone,
  CheckCircle,
  TrendingUp,
  Headset,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from "lucide-react";

interface LocalLabConcept {
  id: string;
  title: string;
  problem: string;
  businessOutcome: string;
  architecture: string;
  techStack: string[];
  previewType: "log" | "visualizer" | "dashboard" | "cards" | "stats";
  previewData?: any;
}

const LOCAL_LAB_CONCEPTS: LocalLabConcept[] = [
  {
    id: "ai_ops",
    title: "AI Operations Assistant",
    problem: "Level 1 support teams are overwhelmed by basic repetitive inquiries, and escalation rules rely on human routing.",
    businessOutcome: "Sub-second triage and resolution for basic inquiries. Drastic reduction in manual support ticketing and mean-time-to-resolution (MTTR).",
    architecture: "Event-driven Webhook → Validation Middleware → AI Foundation Models → System API mutation",
    techStack: ["Custom AI Agents", "AI Foundation Models", "Workflow Orchestration", "Microsoft Cloud Databases"],
    previewType: "log",
    previewData: [
      { time: "08:12:04", event: "Inbound Request Detected: Reset Server Instance", status: "Triggered" },
      { time: "08:12:05", event: "Analyzing permissions and identifying resource", status: "Pending" },
      { time: "08:12:07", event: "Verified user 'admin' authorization token", status: "Success" },
      { time: "08:12:08", event: "Invoked instance POST /reset to target infrastructure", status: "Executed" },
      { time: "08:12:11", event: "Instance successfully rebooted. Ticket closed.", status: "Complete" }
    ]
  },
  {
    id: "cx_portal",
    title: "Customer Self Service Portal",
    problem: "Customers lack direct access to order states, sending emails for simple tracking requests and bogging down support.",
    businessOutcome: "Empowers customers with instant on-demand information loops. Offloads up to 60% of routine B2B customer support inquiries.",
    architecture: "React headless frontend connected via API Management gateway to back-office ERP/CRM systems.",
    techStack: ["React", "TypeScript", "Vite", "Cloud Platforms API Management", "Enterprise ERP"],
    previewType: "visualizer"
  },
  {
    id: "approval_ctr",
    title: "Intelligent Approval Center",
    problem: "Approvals are scattered across email, Slack, and various SaaS tools resulting in orphaned tasks and delayed business momentum.",
    businessOutcome: "A centralized command queue ensuring compliance, standardizing audit trails, and enabling rapid one-click organizational clearance.",
    architecture: "Service Bus ingestion queue aggregates data into a central Cloud Databases state-machine, presented via a singular Power App.",
    techStack: ["Custom Web Apps Canvas", "Microsoft Cloud Databases", "Cloud Platforms Service Bus", "Workflow Orchestration"],
    previewType: "dashboard",
    previewData: {
      items: [
        { system: "SAP ERP", id: "REQ-2092", value: "$4,500 Procurement", status: "Awaiting Finance Approval" },
        { system: "Workday HR", id: "OFFER-032", value: "Senior Dev Hire", status: "Awaiting VP Sign-off" },
        { system: "Salesforce", id: "DISC-881", value: "30% Discount Auth", status: "Awaiting Sales Director" }
      ]
    }
  },
  {
    id: "sales_accel",
    title: "Sales Acceleration Platform",
    problem: "Sales reps spend 40% of their time on data entry instead of selling. CRMs are often glorified contact databases instead of active sellers.",
    businessOutcome: "Increases active selling time and conversion velocity by predicting next-best-actions and automating busywork.",
    architecture: "Enterprise ERP Sales core enhanced by AI Foundation Models to draft communications, parse meeting notes, and auto-update opportunity stages.",
    techStack: ["Enterprise ERP Sales", "Sales AI Foundation Models", "Workflow Orchestration", "Slack \& Teams Integration"],
    previewType: "cards"
  },
  {
    id: "service_workspace",
    title: "Service Management Workspace",
    problem: "Disjointed tooling between engineering arrays, IT tracking, and customer service leads to lost context during escalation.",
    businessOutcome: "Unifies the service ecosystem allowing level 1 and 3 agents to view identical contexts, radically improving SLA attainment.",
    architecture: "Integrated Omnichannel workspace with unified routing connecting Cloud Databases case-entities to field operations.",
    techStack: ["Enterprise ERP", "Omnichannel", "Power Virtual Agents", "Cloud Databases"],
    previewType: "cards"
  },
  {
    id: "exec_cmd",
    title: "Executive Analytics Command Center",
    problem: "Executives make high-stakes decisions based on fragmented reports that are 30 days old and heavily manipulated by middle-management.",
    businessOutcome: "Real-time, unfiltered ground truth. Predictive forecasting and macro-trends displayed vividly at boardroom scale.",
    architecture: "Direct ingestion layer replicating transactional data into Fabric OneLake, feeding live Power BI datasets.",
    techStack: ["Multi-Cloud Data Lakes", "Cloud Platforms Synapse Serverless", "Power BI Premium", "React Visualizations"],
    previewType: "stats"
  }
];

export default function HemisystemsLab() {
  const [activeConceptId, setActiveConceptId] = useState("ai_ops");
  
  // States for interactive simulations
  const [logs, setLogs] = useState<any[]>([]);
  const [logIdx, setLogIdx] = useState(0);
  const [approvalItems, setApprovalItems] = useState<any[]>([]);

  const currentConcept = LOCAL_LAB_CONCEPTS.find(c => c.id === activeConceptId) || LOCAL_LAB_CONCEPTS[0];

  // Initialize and run the simulation loops
  useEffect(() => {
    if (activeConceptId === "ai_ops") {
      setLogs([currentConcept.previewData[0]]);
      setLogIdx(1);
    } else if (activeConceptId === "approval_ctr") {
      setApprovalItems(currentConcept.previewData.items.map((i: any) => ({...i})));
    }
  }, [activeConceptId, currentConcept]);

  // AI Ops auto-logger append simulation
  useEffect(() => {
    if (activeConceptId !== "ai_ops") return;
    const interval = setInterval(() => {
      if (logIdx < currentConcept.previewData.length) {
        setLogs(prev => [...prev, currentConcept.previewData[logIdx]]);
        setLogIdx(prev => prev + 1);
      } else {
        // Loop back and refresh simulation
        setTimeout(() => {
          setLogs([currentConcept.previewData[0]]);
          setLogIdx(1);
        }, 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeConceptId, logIdx, currentConcept]);

  // Handle local approval triggers for Approval Center
  const handleApproveItem = (id: string) => {
    setApprovalItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: "APPROVED: Synced", isApproved: true } 
          : item
      )
    );
  };

  return (
    <section className="space-y-12 py-12" id="hemisystems-lab-section">
      
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-white/5 pb-8 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b] flex items-center space-x-2">
          <Beaker className="h-3.5 w-3.5" />
          <span>Research & Innovation Incubator</span>
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Hemisystems Lab
        </h2>
        <p className="max-w-2xl font-sans text-base text-gray-400">
          This is where we showcase advanced systems concepts over client implementations. 
          The Lab demonstrates how leading-edge tools behave when structured properly as part of an integrated enterprise architecture.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start relative min-h-[600px]">
        
        {/* Left List Menu (4 Columns) */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-32">
          <div className="flex items-center space-x-2 text-gray-400 border-b border-white/5 pb-2 mb-4">
            <Layers className="h-4 w-4" />
            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
              Innovation Concepts
            </span>
          </div>
          
          <div className="space-y-3">
            {LOCAL_LAB_CONCEPTS.map((concept) => {
              const isActive = concept.id === activeConceptId;
              return (
                <button
                  key={concept.id}
                  onClick={() => setActiveConceptId(concept.id)}
                  className={`flex w-full items-center justify-between rounded border p-4 text-left transition-all ${
                    isActive 
                      ? "border-[#cfa86b]/50 bg-slate-900 shadow-md transform scale-[1.02]" 
                      : "border-white/5 bg-slate-950 hover:bg-slate-900/30 hover:border-white/10"
                  }`}
                >
                  <span className={`font-display text-[13px] font-bold tracking-wider uppercase transition-colors ${isActive ? "text-white" : "text-gray-400"}`}>
                    {concept.title}
                  </span>
                  {isActive && (
                    <motion.div layoutId="active-lab-dot" className="h-1.5 w-1.5 rounded-full bg-[#cfa86b]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Model Engine (8 Columns) */}
        <div className="lg:col-span-8 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentConcept.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded border border-white/5 bg-slate-900/30 p-8 flex flex-col space-y-8"
            >
              {/* Concept Title & CTA Area */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/5">
                <div>
                  <h3 className="font-display text-3xl font-extrabold text-white tracking-wider uppercase">
                    {currentConcept.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {currentConcept.techStack.map((tech) => (
                      <span key={tech} className="rounded bg-[#cfa86b]/10 text-[#cfa86b] px-2 py-0.5 font-mono text-[9px] uppercase border border-[#cfa86b]/20 tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="flex items-center space-x-2 rounded bg-white text-slate-950 hover:bg-gray-200 px-6 py-2.5 font-display text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap">
                  <span>Request Solution</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Functional Details */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-rose-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest">The Problem</span>
                  </div>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed min-h-[60px]">
                    {currentConcept.problem}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Business Outcome</span>
                  </div>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed min-h-[60px]">
                    {currentConcept.businessOutcome}
                  </p>
                </div>
              </div>

              {/* Architecture Strategy Details */}
              <div className="rounded border border-white/5 bg-slate-950 p-6 space-y-4 flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <Shield className="h-16 w-16 text-[#cfa86b]" />
                  </div>
                  <div className="flex items-center space-x-2 text-[#cfa86b]">
                    <Layers className="h-4 w-4" />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Suggested Architecture</span>
                  </div>
                  <p className="font-sans text-[13px] font-semibold tracking-wide text-gray-200 leading-relaxed relative z-10 w-11/12">
                    {currentConcept.architecture}
                  </p>
              </div>

              {/* Interactive Preview Panel */}
              <div className="border border-white/5 rounded overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between bg-black px-4 py-3 text-xs font-mono border-b border-white/5">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-[#cfa86b]" />
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Interface Validation Previews</span>
                  </div>
                  <div className="flex space-x-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </div>
                </div>

                <div className="p-6 bg-slate-950 font-mono flex flex-col justify-center min-h-[260px] relative">
                  
                  {/* Glowing background grid */}
                  <div className="absolute inset-0 bg-grid-mesh opacity-20 pointer-events-none" />

                  {/* 1. Log Preview */}
                  {currentConcept.previewType === "log" && (
                    <div className="space-y-3 text-[11px] leading-relaxed relative z-10">
                      {logs.map((log, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center items-start lg:space-x-3 gap-2">
                          <span className="text-[#cfa86b] sm:inline border border-[#cfa86b]/20 px-2 rounded-sm bg-[#cfa86b]/5 shrink-0">[{log.time}]</span>
                          <span className="text-gray-400">{log.event}...</span>
                          <span className={`sm:ml-auto font-bold rounded px-2 py-0.5 text-[9px] uppercase tracking-wider tabular-nums ${
                            log.status === "Success" || log.status === "Complete" || log.status === "Executed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                              : log.status === "Assigned"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                                : "bg-amber-500/10 text-amber-500 border border-amber-500/25"
                          }`}>
                            {log.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 2. Visualizer Preview */}
                  {currentConcept.previewType === "visualizer" && (
                    <div className="flex flex-col items-center justify-center space-y-6 relative z-10 w-full">
                      <div className="relative">
                        <Smartphone className="h-14 w-14 text-cyan-400 relative z-10" />
                        <div className="absolute inset-0 h-14 w-14 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-xs text-white font-display uppercase tracking-widest font-bold">Federated External Entrypoint</p>
                        <p className="max-w-sm text-[10px] text-gray-500 font-sans mx-auto">
                          Secure API connection actively mediating outside payloads directly into normalized ERP ledger components seamlessly.
                        </p>
                      </div>
                      <div className="flex items-center space-x-6 border border-white/5 bg-slate-900 px-6 py-3 rounded-lg text-[10px]">
                        <span className="flex items-center space-x-2 text-emerald-400">
                          <CheckCircle className="h-3 w-3" />
                          <span className="font-bold">SYSTEM ONLINE</span>
                        </span>
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-gray-400">LATENCY: <span className="text-white">12MS</span></span>
                      </div>
                    </div>
                  )}

                  {/* 3. Dashboard Preview */}
                  {currentConcept.previewType === "dashboard" && (
                    <div className="space-y-4 relative z-10 w-full max-w-2xl mx-auto">
                      <div className="grid grid-cols-12 gap-4 text-gray-500 text-[10px] font-bold border-b border-white/5 pb-2 uppercase tracking-wider">
                        <div className="col-span-3">System Key</div>
                        <div className="col-span-5">Approval Value Context</div>
                        <div className="col-span-4 text-right">Clearance Gate</div>
                      </div>
                      <div className="space-y-3 text-[11px]">
                        {approvalItems.map((item: any) => (
                          <div key={item.id} className="grid grid-cols-12 gap-4 items-center border-b border-white/5 pb-3">
                            <div className="col-span-3 text-gray-300 font-display flex flex-col">
                              <span>{item.system}</span>
                              <span className="text-gray-600 text-[9px] font-mono mt-0.5">{item.id}</span>
                            </div>
                            <div className="col-span-5 flex flex-col">
                              <span className="text-white font-semibold">{item.value}</span>
                              <span className="text-[9px] text-amber-500 font-mono mt-1">{item.status}</span>
                            </div>
                            <div className="col-span-4 text-right">
                              {item.isApproved ? (
                                <span className="inline-flex items-center space-x-1.5 text-emerald-400 font-bold text-[10px] uppercase bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
                                  <Check className="h-3.5 w-3.5" />
                                  <span>COMMITTED</span>
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleApproveItem(item.id)}
                                  className="rounded bg-[#cfa86b] text-black px-4 py-1.5 text-[9px] font-bold uppercase transition-all hover:bg-[#cfa86b]/80"
                                >
                                  AUTHORIZE
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Cards Preview (Sales/Service) */}
                  {currentConcept.previewType === "cards" && (
                    <div className="grid grid-cols-2 gap-4 relative z-10 w-full max-w-xl mx-auto">
                      <div className="rounded border border-indigo-500/20 bg-indigo-500/5 p-4 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]">
                         <Briefcase className="h-6 w-6 text-indigo-400" />
                         <span className="text-[10px] uppercase text-gray-400 tracking-wider">Unified Account Posture</span>
                         <div className="w-12 h-1 bg-indigo-500/30 rounded-full" />
                      </div>
                      <div className="rounded border border-rose-500/20 bg-rose-500/5 p-4 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]">
                         <Headset className="h-6 w-6 text-rose-400" />
                         <span className="text-[10px] uppercase text-gray-400 tracking-wider">Omnichannel Engagement</span>
                         <div className="w-12 h-1 bg-rose-500/30 rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* 5. Stats Preview */}
                  {currentConcept.previewType === "stats" && (
                    <div className="space-y-6 relative z-10 w-full">
                       <div className="flex items-center justify-between border-b border-white/5 pb-3">
                         <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Fabric Datahub Stream</span>
                         <span className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded text-[9px] font-bold">
                           <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                           <span>SYNCHRONIZED</span>
                         </span>
                       </div>
                       <div className="grid grid-cols-3 gap-4">
                         <div className="border border-white/5 bg-slate-900/60 p-4 rounded text-center">
                           <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Compute Load</span>
                           <span className="text-xl text-white font-display font-bold">14.2<span className="text-[10px] text-gray-500 ml-1 block mt-1">TB / SEC</span></span>
                         </div>
                         <div className="border border-white/5 bg-slate-900/60 p-4 rounded text-center">
                           <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1">Latency Delta</span>
                           <span className="text-xl text-white font-display font-bold">12<span className="text-[10px] text-emerald-500 ml-1 block mt-1">MILLISECONDS</span></span>
                         </div>
                         <div className="border border-white/5 bg-slate-900/60 p-4 rounded text-center items-center justify-center flex flex-col">
                           <Sparkles className="h-6 w-6 text-[#cfa86b] mb-1" />
                           <span className="text-[9px] text-gray-500 uppercase tracking-widest block mt-1">AI READY</span>
                         </div>
                       </div>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}

