/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Boxes, 
  Menu, 
  X, 
  Compass, 
  Sliders, 
  Cpu, 
  Beaker, 
  Layers, 
  GitCommit, 
  FileText, 
  UserCheck 
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestReview: () => void;
}

export default function Navigation({ activeTab, setActiveTab, onRequestReview }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "the-system", label: "The System", icon: Compass },
    { id: "capabilities", label: "Capabilities", icon: Layers },
    { id: "method", label: "The Method", icon: GitCommit },
    { id: "blueprint", label: "Blueprint Builder", icon: Sliders },
    { id: "ecosystem", label: "Tech Ecosystem", icon: Cpu },
    { id: "lab", label: "Himisystems Lab", icon: Beaker },
    { id: "industries", label: "Industry Systems", icon: Boxes },
    { id: "knowledge", label: "Knowledge Center", icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Brand styling - Elite/Architectural wordmark */}
          <div 
            className="flex cursor-pointer items-center space-x-2" 
            onClick={() => setActiveTab("the-system")}
            id="brand-logo"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-goldaccent to-goldaccent/40 p-[1px]">
              <div className="flex h-full w-full items-center justify-center rounded bg-slate-950">
                <span className="font-display text-sm font-semibold tracking-wider text-goldaccent">H</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-md font-bold tracking-widest text-white uppercase">
                Himisystems
              </span>
              <span className="font-mono text-[7px] tracking-widest text-[#cfa86b] uppercase">
                Business Systems Architecture
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1" id="desktop-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`relative flex items-center space-x-1.5 rounded px-3 py-1.5 font-sans text-xs font-medium tracking-wide transition-all ${
                    isActive 
                      ? "text-[#cfa86b] bg-white/5 border border-white/10" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Trigger */}
          <div className="hidden lg:flex">
            <button
              id="nav-review-trigger-desktop"
              onClick={onRequestReview}
              className={`flex items-center space-x-1.5 rounded border border-[#cfa86b]/40 bg-gradient-to-r from-[#cfa86b]/10 to-transparent px-4 py-2 font-display text-xs font-semibold tracking-wider text-[#cfa86b] uppercase transition-all hover:border-[#cfa86b] hover:from-[#cfa86b]/20`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>System Review</span>
            </button>
          </div>

          {/* Mobile Hamburguer trigger */}
          <div className="flex lg:hidden">
            <button
              id="hamburger-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="border-t border-white/5 bg-slate-950 pb-4 pt-2 lg:hidden" id="mobile-menu-drawer">
          <div className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-mobile-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center space-x-3 rounded px-4 py-3 font-sans text-sm font-medium tracking-wide transition-all ${
                    isActive 
                      ? "bg-[#cfa86b]/10 text-[#cfa86b] font-semibold border-l-2 border-[#cfa86b]" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 text-[#cfa86b]" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 border-t border-white/5 mt-4 px-2">
              <button
                id="nav-review-trigger-mobile"
                onClick={() => {
                  onRequestReview();
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-center space-x-2 rounded border border-[#cfa86b]/40 bg-[#cfa86b]/10 py-3 font-display text-xs font-semibold tracking-wider text-[#cfa86b] uppercase"
              >
                <UserCheck className="h-4 w-4" />
                <span>Request Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
