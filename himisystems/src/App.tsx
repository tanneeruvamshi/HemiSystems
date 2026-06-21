/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./components/Navigation";
import TheSystem from "./components/TheSystem";
import SystemCapabilities from "./components/SystemCapabilities";
import HimisystemsMethod from "./components/HimisystemsMethod";
import BlueprintBuilder from "./components/BlueprintBuilder";
import TechEcosystem from "./components/TechEcosystem";
import HimisystemsLab from "./components/HimisystemsLab";
import IndustrySystems from "./components/IndustrySystems";
import KnowledgeCenter from "./components/KnowledgeCenter";
import SystemReview from "./components/SystemReview";
import { Compass, Info, ShieldAlert, CheckCircle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("the-system");

  // Render active section based on tab selection state
  const renderTabContent = () => {
    switch (activeTab) {
      case "the-system":
        return <TheSystem />;
      case "capabilities":
        return <SystemCapabilities />;
      case "method":
        return <HimisystemsMethod />;
      case "blueprint":
        return <BlueprintBuilder />;
      case "ecosystem":
        return <TechEcosystem />;
      case "lab":
        return <HimisystemsLab />;
      case "industries":
        return <IndustrySystems />;
      case "knowledge":
        return <KnowledgeCenter />;
      case "review":
        return <SystemReview />;
      default:
        return <TheSystem />;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between" id="applet-viewport">
      
      {/* Absolute visual assets - Glowing Ambient radial lights & background grid meshes */}
      <div className="absolute inset-x-0 -top-40 min-h-[500px] pointer-events-none glow-gradient opacity-80" />
      <div className="absolute bottom-0 inset-x-0 min-h-[500px] pointer-events-none glow-cyan opacity-40" />
      <div className="absolute inset-0 bg-grid-mesh opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Header bar and drawer */}
        <Navigation 
          activeTab={activeTab === "review" ? "review" : activeTab} 
          setActiveTab={setActiveTab} 
          onRequestReview={() => setActiveTab("review")} 
        />

        {/* Dynamic content routing workspace */}
        <main className="flex-grow mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`tab-container-${activeTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="outline-none"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>

        </main>

        {/* Premium Corporate Footer */}
        <footer className="border-t border-white/5 bg-slate-950 py-12" id="corporate-footer">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
                <span className="font-display text-sm font-bold tracking-widest text-[#cfa86b] uppercase">
                  HIMISYSTEMS
                </span>
                <span className="font-sans text-xs text-gray-550 leading-relaxed max-w-sm">
                  Designing, engineering, and connecting high-performance operating models for the digital enterprise.
                </span>
              </div>

              <div className="flex items-center space-x-6 text-xs font-mono text-gray-550">
                <span>© 2026 HIMISYSTEMS Co. All Rights Reserved.</span>
                <span className="hidden sm:inline">|</span>
                <span className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  <span>ISO-27001 Certified Systemic Standards</span>
                </span>
              </div>

            </div>
          </div>
        </footer>

      </div>

    </div>
  );
}
