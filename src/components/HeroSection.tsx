import React from "react";
import { ArrowUpRight, Sparkles, Bot, Compass, ShieldCheck, MapPin } from "lucide-react";
import { playUiSound } from "../utils/audio";
import { PillarId } from "../types";
import { PILLARS_DATA } from "../data/pillars";

interface HeroSectionProps {
  onOpenBlueprintModal: () => void;
  onNavigateToEdie: () => void;
  onSelectPillar: (id: PillarId) => void;
  activePillarId: PillarId | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBlueprintModal,
  onNavigateToEdie,
  onSelectPillar,
  activePillarId,
}) => {
  return (
    <section id="hero-section" className="relative pt-8 pb-12 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Location & Authority Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-6 shadow-xl backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-300">GLOBAL IDEA ARCHITECTURE STUDIO</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-5xl mx-auto uppercase">
          COMIWAY: IDEA ARCHITECTURE{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            REIMAGINED.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-2xl font-light text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Premier Studio Blending Strategy, Custom AI, and Digital Experience.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              playUiSound("click");
              onOpenBlueprintModal();
            }}
            onMouseEnter={() => playUiSound("hover")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 text-slate-950 font-black text-sm tracking-wider uppercase shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            EXPLORE YOUR GROWTH PATHWAY
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playUiSound("click");
              onNavigateToEdie();
            }}
            onMouseEnter={() => playUiSound("hover")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 text-white font-bold text-sm tracking-wider uppercase backdrop-blur-md transition-all duration-200"
          >
            <Bot className="w-4 h-4 text-emerald-400" />
            TALK TO EDIE AI
          </button>
        </div>

        {/* Quick 5 Pillar Interactive Selector Buttons */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 max-w-4xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-center gap-2">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            THE 4 CENTRAL ARCHITECTURAL PILLARS
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PILLARS_DATA.map((p) => {
              const isActive = activePillarId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    playUiSound("select");
                    onSelectPillar(p.id);
                  }}
                  onMouseEnter={() => playUiSound("hover")}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2 border ${
                    isActive
                      ? "bg-slate-900 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20 scale-105"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span>{p.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
