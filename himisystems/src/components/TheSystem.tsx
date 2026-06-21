/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SYSTEM_LAYERS } from "../data";
import { 
  Users, 
  GitCommit, 
  LayoutTemplate, 
  Database, 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  AlertOctagon, 
  Settings, 
  GitBranch, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  Compass
} from "lucide-react";

// Map string icon name to Lucide components
const iconMap: any = {
  Users: Users,
  GitCommit: GitCommit,
  LayoutTemplate: LayoutTemplate,
  Database: Database,
  Cpu: Cpu,
  Sparkles: Sparkles,
  TrendingUp: TrendingUp
};

export default function TheSystem() {
  const [selectedLayerId, setSelectedLayerId] = useState("people");

  const currentLayer = SYSTEM_LAYERS.find(l => l.id === selectedLayerId) || SYSTEM_LAYERS[0];

  return (
    <section className="space-y-12" id="the-system-section">
      
      {/* Editorial Headline Statement */}
      <div className="relative overflow-hidden rounded bg-radial from-white/[0.01] to-transparent py-14 px-4 text-center">
        <div className="absolute inset-0 bg-grid-mesh opacity-20" />
        
        <div className="relative mx-auto max-w-4xl space-y-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b]">
            01 / Primary Posture
          </span>
          
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Every business is a system. <br />
            <span className="text-gray-500">Most systems are not designed.</span> <br />
            <span className="bg-gradient-to-r from-white via-[#cfa86b] to-white bg-clip-text text-transparent">
              Himisystems designs them.
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl font-sans text-sm leading-relaxed text-gray-400 sm:text-base">
            We build intelligent business systems using Microsoft Business Applications, Full-Stack Cloud, Enterprise ERP, Cloud Platforms, AI, Enterprise Development, Data Platforms, and Cloud Architecture.
          </p>
        </div>
      </div>

      {/* Interactive Flow Diagram of the System Topology */}
      <div className="space-y-4" id="system-path-orchestrator">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <span className="font-mono text-2xl tracking-widest text-white font-bold uppercase">
            System Flow Path
          </span>
          <span className="font-mono text-[10px] text-gray-500 uppercase">
            Hover any node to audit systemic layers
          </span>
        </div>

        {/* The horizontal circuit nodes list */}
        <div className="relative overflow-x-auto pb-4">
          <div className="flex min-w-[900px] items-center justify-between px-4 py-6">
            
            {/* Background connection pipeline wire */}
            <div className="absolute left-10 right-10 top-[4.2rem] h-[1px] bg-gradient-to-r from-gray-800 via-[#cfa86b]/40 to-gray-800" />

            {SYSTEM_LAYERS.map((layer, idx) => {
              const Icon = iconMap[layer.icon] || Compass;
              const isSelected = layer.id === selectedLayerId;
              
              return (
                <div key={layer.id} className="relative z-10 flex flex-col items-center">
                  
                  {/* Step counter */}
                  <span className={`mb-2 font-mono text-[9px] tracking-widest uppercase transition-all ${
                    isSelected ? "text-[#cfa86b] font-semibold" : "text-gray-600"
                  }`}>
                    Layer 0{idx + 1}
                  </span>

                  {/* Node Button */}
                  <button
                    id={`system-node-btn-${layer.id}`}
                    onClick={() => setSelectedLayerId(layer.id)}
                    onMouseEnter={() => setSelectedLayerId(layer.id)}
                    className={`flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-300 ${
                      isSelected
                        ? "border-[#cfa86b] bg-slate-900 shadow-lg shadow-[#cfa86b]/10 scale-110"
                        : "border-gray-800 bg-slate-950 hover:border-gray-700 hover:scale-105"
                    }`}
                  >
                    <Icon className={`h-6 w-6 transition-all ${
                      isSelected ? "text-[#cfa86b]" : "text-gray-400"
                    }`} />
                  </button>

                  {/* Node Name */}
                  <span className={`mt-3 font-display text-xs tracking-wider transition-all uppercase ${
                    isSelected ? "text-white font-semibold" : "text-gray-500"
                  }`}>
                    {layer.name}
                  </span>

                  {/* Active bottom beam indicator */}
                  {isSelected && (
                    <motion.div 
                      layoutId="node-beam"
                      className="absolute -bottom-1 h-1 w-8 rounded-full bg-[#cfa86b]" 
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Detail Matrix Section for the Selected Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLayerId}
          id={`system-layer-details-${selectedLayerId}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 md:grid-cols-12"
        >
          {/* Left Summary Block (5 Cols) */}
          <div className="md:col-span-5 rounded border border-white/5 bg-slate-900/40 p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="rounded bg-[#cfa86b]/10 p-2 text-[#cfa86b]">
                {React.createElement(iconMap[currentLayer.icon] || Compass, { className: "h-5 w-5" })}
              </div>
              <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase">
                {currentLayer.name} Layer
              </h3>
            </div>

            <p className="font-sans text-sm leading-relaxed text-gray-300">
              {currentLayer.description}
            </p>

            <div className="border-t border-white/5 pt-4 space-y-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
                  Fragmentation Stance:
                </span>
                <p className="mt-1 font-sans text-xs italic text-[#cfa86b]">
                  &ldquo;{currentLayer.fragmentation}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Metrics & Opportunities Block (7 Cols) */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Failures & Bottlenecks Card */}
            <div className="rounded border border-[#f87171]/15 bg-gradient-to-r from-red-950/10 to-transparent p-6 space-y-4">
              <div className="flex items-center space-x-2 text-[#f87171]">
                <AlertOctagon className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                  Friction & Degradation Vectors
                </span>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <span className="font-display text-xs font-semibold uppercase text-gray-200">
                    Common Operational Failures
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 font-sans text-xs text-gray-400">
                    {currentLayer.failures.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-display text-xs font-semibold uppercase text-gray-200">
                    Symptomatic Bottlenecks
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 font-sans text-xs text-gray-400">
                    {currentLayer.bottlenecks.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Architecture Realignment Opportunities Card */}
            <div className="rounded border border-[#cfa86b]/15 bg-gradient-to-r from-[#cfa86b]/5 to-transparent p-6 space-y-4">
              <div className="flex items-center space-x-2 text-[#cfa86b]">
                <Lightbulb className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                  Realignment Opportunities
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <span className="font-display text-xs font-semibold uppercase text-gray-200">
                    Structured Automation Target
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 font-sans text-xs text-gray-400">
                    {currentLayer.automationOps.map((op, i) => <li key={i}>{op}</li>)}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-display text-xs font-semibold uppercase text-gray-200">
                    Cognitive AI Edge Insertion
                  </span>
                  <ul className="list-disc pl-4 space-y-1.5 font-sans text-xs text-gray-400">
                    {currentLayer.aiOps.map((op, i) => <li key={i}>{op}</li>)}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
