/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CAPABILITY_LAYERS } from "../data";
import { 
  ChevronDown, 
  Server, 
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Database,
  Terminal,
  BrainCircuit,
  ArrowDown
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  cx: <Layout className="h-5 w-5" />,
  bizapps: <Workflow className="h-5 w-5" />,
  automation: <Terminal className="h-5 w-5" />,
  data: <Database className="h-5 w-5" />,
  ai: <BrainCircuit className="h-5 w-5" />,
  integration: <Server className="h-5 w-5" />
};

import { Layout } from "lucide-react";

export default function SystemCapabilities() {
  const [expandedLayerId, setExpandedLayerId] = useState<string>("cx");

  return (
    <section className="space-y-12" id="system-capabilities-section">
      
      {/* Page Header */}
      <div className="space-y-4 border-b border-white/5 pb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b]">
          02 / Architecture Hierarchy
        </span>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          System Capabilities
        </h2>
        <p className="max-w-2xl font-sans text-sm text-gray-400">
          We organize technological capabilities as decoupled layers of a balanced enterprise system. 
          Every layer operates on standard secure structures, connected dynamically.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12" id="capabilities-rack-layout">
        
        {/* Left Side: Interconnected Stack Diagram (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="font-mono text-[10px] text-gray-500 uppercase">
              Integrated Technology Stack
            </span>
            <span className="flex items-center space-x-1.5 font-mono text-[10px] text-green-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Full-Stack Synergy</span>
            </span>
          </div>

          <div className="relative flex flex-col items-center justify-center space-y-3 py-6 px-4 border border-white/5 rounded bg-slate-900/10">
            {/* Absolute Line connecting all layers */}
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-500/20 via-cyan-500/20 to-rose-500/20 -translate-x-1/2 pointer-events-none" />

            {CAPABILITY_LAYERS.map((layer, idx) => {
              const isExpanded = layer.id === expandedLayerId;
              
              return (
                <div key={layer.id} className="relative z-10 w-full">
                  <button
                    onClick={() => setExpandedLayerId(layer.id)}
                    className={`flex w-full items-center justify-between p-4 rounded border transition-all duration-300 ${
                      isExpanded 
                        ? `border-[#cfa86b]/60 bg-slate-900 shadow-xl shadow-[#cfa86b]/10 scale-105` 
                        : "border-white/10 bg-slate-950 hover:border-white/20 hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded bg-white/5 text-gray-300 transition-colors ${isExpanded ? "text-[#cfa86b] bg-[#cfa86b]/10" : ""}`}>
                         {iconMap[layer.id]}
                      </div>
                      
                      <div className="flex flex-col text-left">
                        <span className="font-display text-sm font-bold tracking-wide text-white uppercase">
                          {layer.name}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500 mt-1">
                          Layer 0{idx + 1}
                        </span>
                      </div>
                    </div>
                    
                    {isExpanded && (
                       <span className="h-2 w-2 rounded-full bg-[#cfa86b] animate-pulse" />
                    )}
                  </button>

                  {idx < CAPABILITY_LAYERS.length - 1 && (
                    <div className="h-6 flex items-center justify-center pointer-events-none">
                      <ArrowDown className="h-4 w-4 text-gray-600 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Layer Capabilities (6 Columns) */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            {CAPABILITY_LAYERS.map((layer) => {
              if (layer.id !== expandedLayerId) return null;
              
              return (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded border border-white/5 bg-slate-950 p-8 space-y-8"
                >
                  <div className="space-y-3 border-b border-white/5 pb-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded bg-[#cfa86b]/10 text-[#cfa86b]">
                        {iconMap[layer.id]}
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight uppercase text-white">
                        {layer.name}
                      </h3>
                    </div>
                    <p className="font-sans text-sm leading-relaxed text-gray-400">
                      {layer.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#cfa86b]">
                      Core Capabilities
                    </span>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {layer.technologies.map((tech) => (
                        <div 
                          key={tech.name} 
                          className="rounded border border-white/5 bg-slate-900/40 p-4 hover:border-white/10 transition-colors flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-start justify-between">
                              <span className="font-display text-[13px] font-bold text-white tracking-wide">
                                {tech.name}
                              </span>
                            </div>
                            <p className="font-sans text-[11px] leading-relaxed text-gray-450">
                              {tech.desc}
                            </p>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-white/5">
                            <span className="font-mono text-[8.5px] uppercase tracking-wider text-gray-500">
                              Function: {tech.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
