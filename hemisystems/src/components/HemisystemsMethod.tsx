/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { METHOD_STAGES } from "../data";
import { 
  Eye, 
  Search, 
  Compass, 
  Hammer, 
  Link2, 
  ArrowUpRight, 
  TrendingUp,
  Award
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  observe: <Eye className="h-5 w-5" />,
  diagnose: <Search className="h-5 w-5" />,
  design: <Compass className="h-5 w-5" />,
  build: <Hammer className="h-5 w-5" />,
  connect: <Link2 className="h-5 w-5" />,
  scale: <TrendingUp className="h-5 w-5" />
};

export default function HemisystemsMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeStageId, setActiveStageId] = useState<string>("observe");

  useEffect(() => {
    const handleScroll = () => {
      const stageElements = document.querySelectorAll('.method-stage-section');
      let currentId = "observe";
      let minDistance = Infinity;

      stageElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // check distance to center of screen
        const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        if (distance < minDistance) {
          minDistance = distance;
          currentId = el.getAttribute('data-stage-id') || "observe";
        }
      });

      setActiveStageId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="space-y-16 py-12" id="hemisystems-method-section">
      
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-white/5 pb-8 max-w-4xl">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#cfa86b]">
          Framework
        </span>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          The Hemisystems Method
        </h2>
        <p className="max-w-2xl font-sans text-base text-gray-400">
          Most technology consultants rush immediately to writing code or purchasing SaaS licenses. 
          We follow a strict, proprietary engineering cycle to systematically design and scale operations.
        </p>
      </div>

      <div ref={containerRef} className="relative grid lg:grid-cols-12 gap-12 items-start opacity-100 min-h-screen">
        
        {/* Sticky Timeline Nav for Desktop */}
        <div className="hidden lg:block lg:col-span-4 sticky top-32 space-y-8">
          <div className="p-6 rounded border border-white/5 bg-slate-950/50 backdrop-blur">
            <h3 className="font-display font-semibold tracking-wide text-white mb-6 uppercase text-sm">
              Methodology Flow
            </h3>
            <div className="relative space-y-6">
              {/* Progress Line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-800/50" />
              <motion.div 
                className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#cfa86b] to-[#cfa86b]/20 origin-top"
                style={{ scaleY }}
              />

              {METHOD_STAGES.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                return (
                  <div key={stage.id} className="relative flex items-center space-x-4 pl-12 z-10 opacity-100 transition-opacity">
                    {/* Circle Indicator */}
                    <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 bg-slate-950 ${
                      isActive ? 'border-[#cfa86b] text-[#cfa86b] shadow-[0_0_15px_rgba(207,168,107,0.3)]' : 'border-slate-800 text-slate-600'
                    }`}>
                      {iconMap[stage.id]}
                    </div>
                    
                    <div className={`transition-all duration-500 ${isActive ? 'translate-x-2' : ''}`}>
                      <span className="block font-mono text-[10px] text-gray-500 mb-0.5 uppercase tracking-wider">Phase 0{idx + 1}</span>
                      <span className={`font-display font-bold uppercase tracking-wide text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {stage.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Stage Content */}
        <div className="lg:col-span-8 space-y-32 pb-32">
          {METHOD_STAGES.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                transition={{ duration: 0.5 }}
                key={stage.id}
                data-stage-id={stage.id}
                className={`method-stage-section space-y-8 scroll-mt-32 transition-all duration-700 ${isActive ? 'grayscale-0 opacity-100' : 'grayscale-[50%] opacity-40'}`}
              >
                
                {/* Stage Header Mobile */}
                <div className="lg:hidden flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border border-[#cfa86b] bg-[#cfa86b]/10 text-[#cfa86b] flex items-center justify-center">
                    {iconMap[stage.id]}
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-[#cfa86b] mb-0.5 uppercase tracking-wider">Phase 0{idx + 1}</span>
                    <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                      {stage.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="inline-flex items-center px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wide">
                    {stage.description}
                  </div>
                  
                  <div className="p-8 rounded border border-white/5 bg-slate-900/40 relative overflow-hidden backdrop-blur-sm">
                    {/* Architectural glow effect */}
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-slate-800/50 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 space-y-6">
                      <p className="font-sans text-base leading-relaxed text-gray-300">
                        {stage.details}
                      </p>

                      <div className="rounded border border-white/10 bg-slate-950/80 p-5 space-y-2 mt-6">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">
                          Produced Output
                        </span>
                        <p className="font-display text-sm font-semibold tracking-wide text-white flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500 inline" />
                          {stage.output}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evolution grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded border border-red-500/10 bg-red-950/10 p-6 space-y-3">
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-red-400">
                      Before Hemisystems
                    </span>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed">
                      {stage.evolutionBefore}
                    </p>
                  </div>

                  <div className="rounded border border-emerald-500/15 bg-emerald-950/10 p-6 space-y-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-emerald-400 relative z-10">
                      Post Realignment
                    </span>
                    <p className="font-sans text-sm text-gray-300 leading-relaxed relative z-10">
                      {stage.evolutionAfter}
                    </p>
                  </div>
                </div>

                {/* Case Study */}
                <div className="flex flex-col sm:flex-row justify-between rounded border border-[#cfa86b]/10 bg-gradient-to-br from-[#cfa86b]/10 via-[#cfa86b]/5 to-transparent p-6 gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-2 text-[#cfa86b]">
                      <Award className="h-4 w-4" />
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                        Case Study
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-white tracking-wide">
                      {stage.caseStudy.title}
                    </h4>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed max-w-lg">
                      {stage.caseStudy.desc}
                    </p>
                  </div>

                  <div className="sm:border-l border-[#cfa86b]/10 sm:pl-6 pt-4 sm:pt-0 sm:min-w-[160px] flex flex-col justify-center">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#cfa86b]/80 mb-2">
                      Result
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {stage.caseStudy.metric}
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-[#cfa86b]" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Internal icon for checklist
function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

