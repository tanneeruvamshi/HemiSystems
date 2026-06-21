/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  UserCheck, 
  CheckCircle, 
  Sliders, 
  MapPin, 
  FlameKindling, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  Send,
  Loader,
  Activity
} from "lucide-react";

interface ReviewQuestion {
  id: string;
  text: string;
  options: {
    value: string;
    score: number;
    label: string;
    tip: string;
  }[];
}

const LOCAL_QUESTIONS: ReviewQuestion[] = [
  {
    id: "friction",
    text: "What process creates the most friction?",
    options: [
      { value: "data_entry", score: 5, label: "Manual data entry and copying between tools", tip: "Automate edge entries using standardized ingress APIs." },
      { value: "approvals", score: 8, label: "Scattered approvals and lost email chains", tip: "Centralize approvals in a zero-trust State Machine." },
      { value: "reporting", score: 6, label: "Generating reports from siloed legacy databases", tip: "Implement an Cloud Platforms Fabric or Cloud Databases lakehouse." },
      { value: "scaling", score: 10, label: "System crashes during peak demand spikes", tip: "Decouple architecture and introduce Event-Driven scaling." }
    ]
  },
  {
    id: "systems",
    text: "What systems are involved?",
    options: [
      { value: "legacy_erp", score: 10, label: "Legacy on-premise ERPs (SAP, Oracle)", tip: "Consider selective strangler-pattern API gateways to legacy ERPs." },
      { value: "cloud_crm", score: 8, label: "Cloud CRM platforms (Salesforce, HubSpot)", tip: "Extend your CRM's object definition into unified operational apps." },
      { value: "custom_apps", score: 6, label: "Internal custom-built niche applications", tip: "Refactor unmanaged internal apps using Full-Stack Cloud." },
      { value: "spreadsheets", score: 5, label: "Offline Excel files and unstructured SharePoint lists", tip: "Move offline tabular data into a governed cloud database." }
    ]
  },
  {
    id: "data",
    text: "What data is required?",
    options: [
      { value: "client_data", score: 8, label: "Sensitive structured client data (PII/Financial)", tip: "Apply Zero-Trust API policies when accessing PII." },
      { value: "telemetry", score: 10, label: "High-volume machine telemetry or IoT logs", tip: "Implement high-throughput stream ingestion (e.g. Cloud Platforms Event Hubs)." },
      { value: "documents", score: 6, label: "Unstructured PDFs, emails, and images", tip: "Apply AI Cognitive extraction models to parse unstructured files." },
      { value: "financial", score: 8, label: "Complex financial transaction ledgers", tip: "Establish immutable event sourcing patterns for financial integrity." }
    ]
  },
  {
    id: "outcome",
    text: "What outcome matters most?",
    options: [
      { value: "cost", score: 6, label: "Immediate reduction in operational overhead", tip: "Target robotic process automation (RPA) for high-frequency low-value tasks." },
      { value: "speed", score: 10, label: "Sub-second, real-time pipeline velocity", tip: "Upgrade monolithic databases to distributed event-streaming processing." },
      { value: "accuracy", score: 8, label: "100% elimination of human data errors", tip: "Lock down interface validation boundaries and remove manual overrides." },
      { value: "ai_readiness", score: 10, label: "Structuring the enterprise for Generative AI adoption", tip: "Map all siloed data into a unified, semantically tagged knowledge graph." }
    ]
  },
  {
    id: "timeline",
    text: "What timeline exists?",
    options: [
      { value: "immediate", score: 10, label: "Critical - Systems failing now (0-30 days)", tip: "Deploy tactical API gateways to stabilize immediate bleeding." },
      { value: "short", score: 8, label: "High Priority - End of next quarter (1-3 months)", tip: "Adopt agile sprint iterations targeting the highest-friction nodes first." },
      { value: "medium", score: 6, label: "Strategic - Within the fiscal year (6-12 months)", tip: "Execute a thorough Blueprint architecture definition phase." },
      { value: "exploratory", score: 4, label: "Exploratory - Planning for next year", tip: "Start upskilling internal teams on unified ecosystem strategies." }
    ]
  },
  {
    id: "technology",
    text: "What technologies are currently used?",
    options: [
      { value: "microsoft", score: 8, label: "M365, AWS, Salesforce", tip: "You are primed to activate deep Full-Stack Cloud integrations." },
      { value: "aws", score: 8, label: "AWS, Custom Nodes, Databricks", tip: "Connect AWS SageMaker AI elements universally as an augmentation layer." },
      { value: "google", score: 8, label: "Google Cloud, Workspace, BigQuery", tip: "Utilize cross-cloud API wrappers for centralized coordination." },
      { value: "mixed", score: 10, label: "Severely mixed, fragmented, or unknown", tip: "Perform a mandatory enterprise architecture reconciliation audit." }
    ]
  }
];

export default function SystemReview() {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [selections, setSelections] = useState<Record<string, { score: number; label: string; tip: string }>>({});
  const [showStatus, setShowStatus] = useState<"intro" | "quiz" | "summary" | "submitting" | "completed">("intro");
  
  const [corpName, setCorpName] = useState("");
  const [corpMail, setCorpMail] = useState("");

  const activeQuestion = currentIdx >= 0 && currentIdx < LOCAL_QUESTIONS.length ? LOCAL_QUESTIONS[currentIdx] : null;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (corpName.trim() && corpMail.trim()) {
      setCurrentIdx(0);
      setShowStatus("quiz");
    }
  };

  const handleSelectOption = (score: number, label: string, tip: string) => {
    if (!activeQuestion) return;
    
    setSelections(prev => ({
      ...prev,
      [activeQuestion.id]: { score, label, tip }
    }));

    if (currentIdx < LOCAL_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowStatus("summary");
    }
  };

  const submitReview = () => {
    setShowStatus("submitting");
    setTimeout(() => {
      setShowStatus("completed");
    }, 2000);
  };

  const handleReset = () => {
    setSelections({});
    setCurrentIdx(-1);
    setShowStatus("intro");
    setCorpName("");
    setCorpMail("");
  };

  const computeAuditDetails = () => {
    let totalScore = 0;
    const answeredKeys = Object.keys(selections);
    const tips: string[] = [];
    
    Object.values(selections).forEach((val: any) => {
      totalScore += val.score;
      if (val.tip) tips.push(val.tip);
    });

    const maxCurrentScore = Math.max(10, answeredKeys.length * 10);
    const maxTotalScore = LOCAL_QUESTIONS.length * 10;
    
    const livePercentage = answeredKeys.length > 0 ? Math.round((totalScore / maxCurrentScore) * 100) : 0;
    const finalPercentage = Math.round((totalScore / maxTotalScore) * 100);

    let grade = "Unified High-Confidence";
    let analysis = "Standard secure integrations detected. Ready for cognitive AI workloads.";
    
    if (finalPercentage < 50) {
      grade = "Critical Operational Debt";
      analysis = "Severe Systemic Fragmentation. High friction across disjointed legacy environments.";
    } else if (finalPercentage < 75) {
      grade = "Functional / Fragmented";
      analysis = "Core modules are online, but lack modern event-driven API bridging.";
    }

    return {
      livePercentage,
      finalPercentage,
      grade,
      analysis,
      recommendations: tips
    };
  };

  const audit = computeAuditDetails();

  return (
    <section className="space-y-12 py-12" id="system-review-section">
      
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-white/5 pb-8 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b] flex items-center space-x-2">
          <Activity className="h-3.5 w-3.5" />
          <span>Operational Auditing Engine</span>
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Request a System Review
        </h2>
        <p className="max-w-2xl font-sans text-base text-gray-400">
          Replace traditional static contact forms with an interactive operational audit. Provide execution context to generate an immediate readiness score and targeted strategic recommendations.
        </p>
      </div>

      <div className="mx-auto" id="review-workspace-stage">
        
        {/* State 0: Intro Context Inputs */}
        {showStatus === "intro" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto rounded border border-white/10 bg-slate-900/50 p-8 space-y-8">
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">Initialize Audit Parameters</h3>
              <p className="text-sm font-sans text-gray-400">Define the corporate entity requesting analysis.</p>
            </div>
            
            <form onSubmit={handleStart} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-2">Corporate Entity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Manufacturing"
                    value={corpName}
                    onChange={(e) => setCorpName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-[#cfa86b]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-2">Secure Executive Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. operations@acme.com"
                    value={corpMail}
                    onChange={(e) => setCorpMail(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-4 py-3 font-sans text-sm text-white focus:outline-none focus:border-[#cfa86b]/60 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-white text-slate-950 px-6 py-3 font-display text-xs font-bold tracking-wider uppercase transition-all hover:bg-gray-200 flex items-center justify-center space-x-2"
              >
                <span>Commence Audit Pipeline</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}

        {/* State 1: Active questionnaire review */}
        {showStatus === "quiz" && activeQuestion && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 rounded border border-white/5 bg-slate-950 p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900">
                <motion.div 
                  className="h-1 bg-[#cfa86b]" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentIdx / LOCAL_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                  Checkpoint {currentIdx + 1} of {LOCAL_QUESTIONS.length}
                </span>
                <span className="font-mono text-[10px] text-[#cfa86b] uppercase tracking-widest animate-pulse">
                  Data Stream Active
                </span>
              </div>

              <div className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-white leading-snug">
                  {activeQuestion.text}
                </h3>

                <div className="grid gap-3 pt-4">
                  {activeQuestion.options.map((opt, i) => (
                    <motion.button
                      key={opt.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleSelectOption(opt.score, opt.label, opt.tip)}
                      className="flex w-full items-center justify-between rounded border border-white/10 bg-slate-900/40 p-4 text-left transition-all hover:bg-[#cfa86b]/5 hover:border-[#cfa86b]/40 group"
                    >
                      <span className="font-sans text-sm font-semibold text-gray-300 group-hover:text-[#cfa86b] transition-colors">
                        {opt.label}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-600 transition-transform group-hover:translate-x-1.5 group-hover:text-[#cfa86b]" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Readiness Score Lateral Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded border border-white/5 bg-slate-900/30 p-6 flex flex-col items-center justify-center text-center space-y-6 lg:sticky lg:top-32 min-h-[300px]">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Activity className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Live Operational Score</span>
                </div>
                
                <div className="relative h-40 w-40 flex flex-col items-center justify-center rounded-full border border-white/5 bg-slate-950 p-2 shadow-inner">
                  <div className="absolute inset-2 rounded-full border border-[#cfa86b]/20" />
                  <motion.span 
                    key={audit.livePercentage}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display text-5xl font-extrabold tracking-tight text-white"
                  >
                    {audit.livePercentage}%
                  </motion.span>
                  <span className="font-mono text-[8px] text-gray-500 uppercase mt-1">Computed Status</span>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 max-w-[200px] leading-relaxed">
                  Scoring recalibrates passively. Awaiting total trajectory completion.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Visual assessment summary before submission */}
        {showStatus === "summary" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="rounded-lg border border-white/10 bg-slate-950 p-8 space-y-8 shadow-2xl relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute -top-40 -right-40 h-96 w-96 bg-[#cfa86b]/5 rounded-full blur-3xl pointer-events-none" />
               
               <div className="flex items-center justify-between border-b border-white/5 pb-6">
                 <div>
                   <h3 className="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
                     Preliminary Audit Summary
                   </h3>
                   <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                     Generated for: {corpName}
                   </span>
                 </div>
                 <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-full border border-[#cfa86b]/30 bg-[#cfa86b]/10">
                   <span className="font-display text-xl font-bold text-[#cfa86b]">{audit.finalPercentage}%</span>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-[#cfa86b] block">Categorical Assessment</span>
                   <h4 className="font-display text-xl font-bold text-white">{audit.grade}</h4>
                   <p className="font-sans text-sm text-gray-400 leading-relaxed border-l border-white/10 pl-4">
                     {audit.analysis}
                   </p>
                 </div>
                 <div className="space-y-4">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-[#cfa86b] block">Initial Strategy Vectors</span>
                   <ul className="space-y-3">
                     {audit.recommendations.slice(0, 3).map((rec, idx) => (
                       <li key={idx} className="flex items-start space-x-2 text-xs font-sans text-gray-300">
                         <ArrowRight className="h-3 w-3 text-cyan-400 mt-1 shrink-0" />
                         <span className="leading-relaxed">{rec}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>

               <div className="border-t border-white/10 pt-8 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                 <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500 max-w-sm leading-relaxed">
                   Submit these findings strictly to Hemisystems enterprise architecture group for comprehensive roadmap drafting.
                 </p>
                 <button
                   onClick={submitReview}
                   className="flex items-center justify-center space-x-3 rounded bg-[#cfa86b] px-6 py-3.5 font-display text-xs font-bold tracking-wider uppercase text-black transition-all hover:bg-[#cfa86b]/80 shadow-lg shadow-[#cfa86b]/20"
                 >
                   <Send className="h-4 w-4" />
                   <span>Request a System Review from Hemisystems</span>
                 </button>
               </div>
            </div>
          </motion.div>
        )}

        {/* State 3: Submitting Load */}
        {showStatus === "submitting" && (
          <div className="flex flex-col items-center justify-center rounded border border-[#cfa86b]/20 bg-slate-950 py-24 px-8 text-center space-y-6">
            <Loader className="h-12 w-12 animate-spin text-[#cfa86b]" />
            <div className="space-y-2">
              <p className="font-display text-xl font-bold text-white tracking-wide">
                Transmitting Telemetry...
              </p>
              <p className="font-mono text-[10px] text-gray-550 uppercase tracking-widest">
                Establishing secure link to enterprise consulting desk.
              </p>
            </div>
          </div>
        )}

        {/* State 4: Completed Confirmation */}
        {showStatus === "completed" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center rounded border border-emerald-500/20 bg-slate-950 py-20 px-8 text-center space-y-8 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-emerald-500/5" />
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <div className="rounded-full bg-emerald-500/10 p-4 border border-emerald-500/20">
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">Transmission Secured</h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  Your assessment vectors have been securely forwarded. A Hemisystems principal architect will contact {corpMail} within 24 operational hours.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="mt-4 rounded border border-white/10 bg-slate-900 px-6 py-2.5 font-display text-xs font-bold tracking-wider text-gray-300 uppercase transition-all hover:bg-white/5 hover:text-white"
              >
                Return to Initial System State
              </button>
            </div>
          </motion.div>
        )}
      </div>

    </section>
  );
}
