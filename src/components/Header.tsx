import React, { useState } from "react";
import { Sparkles, Menu, X, ArrowUpRight, Compass, Cpu, GitCommit, Users, Layout } from "lucide-react";
import { playUiSound } from "../utils/audio";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenBlueprintModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenBlueprintModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "SERVICES", sectionId: "pillars-section" },
    { label: "AI SOLUTIONS", sectionId: "edie-ai-section" },
    { label: "BLUEPRINTING", sectionId: "blueprint-section" },
    { label: "PORTFOLIO", sectionId: "portfolio-section" },
    { label: "CONTACT", sectionId: "contact-section" },
  ];

  const handleNavClick = (sectionId: string) => {
    playUiSound("click");
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Minimalist COMIWAY Text Brand */}
        <div
          onClick={() => handleNavClick("hero-section")}
          className="cursor-pointer group flex items-center gap-3"
        >
          <div>
            <div className="text-xl font-black tracking-widest text-white flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
              COMIWAY
            </div>
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              Idea Architecture Studio
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links with subtle hover luminescence */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.sectionId)}
              onMouseEnter={() => playUiSound("hover")}
              className="relative py-1 text-xs font-mono font-semibold tracking-widest text-slate-300 hover:text-white transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 transform origin-left shadow-sm shadow-emerald-400" />
              <span className="absolute -inset-1 rounded-lg bg-emerald-500/0 group-hover:bg-emerald-500/10 blur-sm transition-all -z-10" />
            </button>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Primary CTA Button */}
          <button
            onClick={() => {
              playUiSound("click");
              onOpenBlueprintModal();
            }}
            onMouseEnter={() => playUiSound("hover")}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              GROWTH PATHWAY <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center gap-3">
          <button
            onClick={() => {
              playUiSound("click");
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.sectionId)}
                className="w-full text-left px-4 py-3 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 text-sm font-mono text-slate-200 hover:text-emerald-400 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              playUiSound("click");
              onOpenBlueprintModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20 text-center block"
          >
            EXPLORE YOUR GROWTH PATHWAY
          </button>
        </div>
      )}
    </header>
  );
};
