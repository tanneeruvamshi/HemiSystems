/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BLUEPRINT_QUESTIONS } from "../data";
import { 
  Sliders, 
  MapPin, 
  Layers, 
  Cpu, 
  Sparkles, 
  Share2, 
  ArrowRight, 
  CheckCircle, 
  RotateCcw,
  Layout,
  Terminal,
  Server,
  Workflow
} from "lucide-react";

export default function BlueprintBuilder() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompiling, setIsCompiling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const activeQuestion = BLUEPRINT_QUESTIONS[currentIdx];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({
      ...answers,
      [activeQuestion.id]: optionIndex
    });

    if (currentIdx < BLUEPRINT_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Trigger short, sleek mock engineering compiling animation
      setIsCompiling(true);
      setTimeout(() => {
        setIsCompiling(false);
        setShowResult(true);
      }, 1500);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
    setIsCompiling(false);
  };

  // Compile recommendations based on selections
  const computeBlueprint = () => {
    const archs: string[] = [];
    const techs: string[] = [];
    const integrations: string[] = [];
    const automations: string[] = [];
    const ais: string[] = [];
    const roadmapTasks: string[] = [];

    BLUEPRINT_QUESTIONS.forEach((q) => {
      const selectedOptIdx = answers[q.id] ?? 0;
      const weight = q.options[selectedOptIdx]?.weight as any;
      if (weight) {
        if (weight.arch) archs.push(weight.arch);
        if (weight.tech) techs.push(...weight.tech);
        if (weight.integration) integrations.push(weight.integration);
        if (weight.automation) automations.push(weight.automation);
        if (weight.ai) ais.push(weight.ai);
        if (weight.roadmap) roadmapTasks.push(...weight.roadmap);
      }
    });

    // Deduplicate and select dominant items
    return {
      architecture: archs[0] || "Custom Serverless Integration Hybrid",
      technologies: Array.from(new Set(techs)),
      integration: integrations[0] || "Asynchronous Microservices APIs",
      automation: automations[0] || "Event-driven Flow Automations",
      ai: ais[0] || "Isolated Secure AI Foundation Models models",
      roadmap: Array.from(new Set(roadmapTasks))
    };
  };

  const blueprint = computeBlueprint();

  return (
    <section className="space-y-12" id="blueprint-builder-section">
      
      {/* Header */}
      <div className="space-y-4 border-b border-white/5 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b]">
          04 / Dynamic Systems Design
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Business System Blueprint Builder
        </h2>
        <p className="max-w-2xl font-sans text-sm text-gray-400">
          Design your corporate technology stack in real-time. Answer 4 critical structural questions to compile your recommended system layout, selected technologies, and development route.
        </p>
      </div>

      <div className="mx-auto max-w-4xl" id="blueprint-wizard-stage">
        
        {/* State 1: Questionnaire wizard */}
        {!isCompiling && !showResult && (
          <div className="rounded border border-white/5 bg-slate-950 p-8 space-y-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#cfa86b]">
                Question {currentIdx + 1} of {BLUEPRINT_QUESTIONS.length}
              </span>
              <div className="h-1.5 w-32 rounded-full bg-gray-800">
                <div 
                  className="h-full rounded-full bg-[#cfa86b] transition-all duration-300" 
                  style={{ width: `${((currentIdx + 1) / BLUEPRINT_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-lg font-bold text-white sm:text-xl md:text-2xl">
                {activeQuestion.text}
              </h3>

              <div className="grid gap-3">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={opt.value}
                    id={`bp-option-btn-${activeQuestion.id}-${opt.value}`}
                    onClick={() => handleSelectOption(idx)}
                    className="flex w-full items-center justify-between rounded border border-white/5 bg-slate-900/30 p-5 text-left transition-all hover:bg-[#cfa86b]/5 hover:border-[#cfa86b]/40 group"
                  >
                    <span className="font-sans text-xs font-semibold text-gray-300 group-hover:text-[#cfa86b] sm:text-sm">
                      {opt.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-650 transition-transform group-hover:translate-x-1.5 group-hover:text-[#cfa86b]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* State 2: Compiling Loading Overlay */}
        {isCompiling && (
          <div className="flex flex-col items-center justify-center rounded border border-white/5 bg-slate-950 py-20 px-8 text-center space-y-6" id="compiling-loader">
            <div className="relative h-12 w-12 animate-spin rounded-full border-t-2 border-r-2 border-[#cfa86b]" />
            <div className="space-y-2">
              <p className="font-mono text-xs text-[#cfa86b] uppercase tracking-widest animate-pulse">
                Assembling Blueprint recommendations...
              </p>
              <p className="max-w-xs font-sans text-xs text-gray-550">
                Evaluating technology dependencies, database parameters, and pipeline limits...
              </p>
            </div>
            {/* Embedded logs to look premium and technical */}
            <div className="w-full max-w-md rounded bg-slate-900 p-4 font-mono text-[9px] text-gray-500 text-left border border-white/5 space-y-1">
              <div>[SYSTEM] INITIALIZING LOGIC RUNTIME ENGINE...</div>
              <div className="text-[#cfa86b]">[COMPILE] EVALUATING PATH WEIGHTINGS</div>
              <div>[RESOLVE] MATCHING DATAVERSE COMPATABILITY SCHEMAS</div>
              <div className="text-emerald-500">[SUCCESS] SECURE AZURE API LAYERS DETECTED</div>
            </div>
          </div>
        )}

        {/* State 3: Visual Blueprint Render */}
        {!isCompiling && showResult && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
            id="blueprint-result-pane"
          >
            {/* Visual Blueprint Card Header */}
            <div className="relative overflow-hidden rounded border border-[#cfa86b]/30 bg-gradient-to-b from-[#cfa86b]/10 to-slate-950 p-8 space-y-6">
              
              <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-[#cfa86b] uppercase tracking-wider border-l border-b border-[#cfa86b]/20 bg-slate-950">
                REF: BSBD-2026-X
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#cfa86b]">
                  System Blueprint Match
                </span>
                <h3 className="font-display text-2xl font-bold tracking-wider text-white uppercase sm:text-3xl">
                  {blueprint.architecture}
                </h3>
              </div>

              {/* Dynamic Architecture Visual Diagram */}
              <div className="rounded border border-white/10 bg-slate-900/60 p-6 flex flex-col items-center justify-center space-y-4">
                 <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-gray-500 w-full text-left border-b border-white/5 pb-2 mb-2">
                   Interactive Block Architecture Diagram
                 </span>
                 <div className="w-full grid gap-4 lg:grid-cols-3 text-center">
                    {/* UI Layer */}
                    <div className="rounded border border-blue-500/20 bg-blue-500/5 p-4 flex flex-col items-center space-y-2 relative">
                        <Layout className="h-5 w-5 text-blue-400" />
                        <span className="font-mono text-[10px] uppercase font-bold text-gray-400">Experience Interface</span>
                        <span className="font-display text-sm font-semibold text-white">{blueprint.technologies[0] || "Custom App"}</span>
                        {/* Connecting Line to next block */}
                        <div className="hidden lg:block absolute top-1/2 -right-4 w-4 border-t border-dashed border-gray-600"></div>
                        <div className="lg:hidden w-full flex justify-center py-2"><ArrowRight className="h-4 w-4 ml-2 text-gray-600 rotate-90" /></div>
                    </div>

                    {/* Backend/Integration Layer */}
                    <div className="rounded border border-[#cfa86b]/20 bg-[#cfa86b]/5 p-4 flex flex-col items-center space-y-2 relative">
                        <Workflow className="h-5 w-5 text-[#cfa86b]" />
                        <span className="font-mono text-[10px] uppercase font-bold text-gray-400">Core Services & Integration</span>
                        <span className="font-display text-sm font-semibold text-white">{blueprint.integration}</span>
                        {/* Connecting Line to next block */}
                        <div className="hidden lg:block absolute top-1/2 -right-4 w-4 border-t border-dashed border-gray-600"></div>
                        <div className="lg:hidden w-full flex justify-center py-2"><ArrowRight className="h-4 w-4 ml-2 text-gray-600 rotate-90" /></div>
                    </div>

                    {/* Data/AI Layer */}
                    <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-4 flex flex-col items-center space-y-2">
                        <Server className="h-5 w-5 text-emerald-400" />
                        <span className="font-mono text-[10px] uppercase font-bold text-gray-400">Data, Automation & AI</span>
                        <span className="font-display text-sm font-semibold text-white text-balance">{blueprint.automation} & {blueprint.ai}</span>
                    </div>
                 </div>
              </div>

              {/* Schematic Blueprint Layout Layers */}
              <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-2">
                
                <div className="rounded bg-slate-900/50 p-4 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-1.5 text-emerald-400">
                    <Workflow className="h-3.5 w-3.5" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider">Suggested Automation Strategy</span>
                  </div>
                  <p className="font-display text-xs font-semibold text-white tracking-wide">{blueprint.automation}</p>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">System process loops and backend orchestration strategies to scale execution instantly.</p>
                </div>

                <div className="rounded bg-slate-900/50 p-4 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-1.5 text-violet-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider">Suggested AI Opportunities</span>
                  </div>
                  <p className="font-display text-xs font-semibold text-white tracking-wide">{blueprint.ai}</p>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">Integrated deployment methodologies for contextual reasoning engines inside operations.</p>
                </div>

                <div className="rounded bg-slate-900/50 p-4 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-1.5 text-blue-400">
                    <Layers className="h-3.5 w-3.5" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider">Suggested Integration Base</span>
                  </div>
                  <p className="font-display text-xs font-semibold text-white tracking-wide">{blueprint.integration}</p>
                  <p className="font-sans text-[11px] text-gray-400 leading-relaxed">Secure communication conduits across legacy boundaries and cloud environments.</p>
                </div>

                <div className="rounded bg-slate-900/50 p-4 border border-white/5 space-y-2">
                  <div className="flex items-center space-x-1.5 text-[#cfa86b]">
                    <Terminal className="h-3.5 w-3.5" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider">Technology Recommendations</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {blueprint.technologies.map((t, i) => (
                      <span key={i} className="rounded bg-[#cfa86b]/10 text-[#cfa86b] px-2 py-0.5 font-mono text-[9px] tracking-wide uppercase border border-[#cfa86b]/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Roadmap phased tasks */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#cfa86b]">
                  Phase Integrated Delivery Roadmap
                </span>
                
                <div className="grid gap-3 sm:grid-cols-3">
                  {blueprint.roadmap.map((task, idx) => (
                    <div 
                      key={idx}
                      className="rounded border border-white/5 bg-slate-950 p-5 space-y-2 relative hover:border-[#cfa86b]/30 transition-colors"
                    >
                      <div className="absolute top-3 right-3 font-mono text-xs text-gray-700 font-bold">
                        P{idx + 1}
                      </div>

                      <span className="font-mono text-[8px] uppercase tracking-wider text-[#cfa86b]">
                        Phase 0{idx + 1} Initiative
                      </span>
                      <p className="font-sans text-xs text-gray-200 leading-relaxed font-semibold">
                        {task}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
                <div className="flex items-center space-x-4">
                  <button
                    id="bp-reset-trigger"
                    onClick={handleReset}
                    className="flex items-center space-x-2 rounded border border-white/15 bg-white/5 px-4 py-2 font-display text-xs font-semibold tracking-wider text-white uppercase transition-all hover:bg-white/10"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Re-Configure</span>
                  </button>
                  <button
                    onClick={() => {
                        const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "Himisystems-Target-Blueprint.json";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                    className="flex items-center space-x-2 rounded bg-white text-black px-4 py-2 font-display text-xs font-bold tracking-wider uppercase transition-all hover:bg-gray-200"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Export Roadmap</span>
                  </button>
                </div>

                <p className="font-mono text-[10px] text-gray-400">
                  Powered by Himisystems Method Logical Engine
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </div>

    </section>
  );
}
