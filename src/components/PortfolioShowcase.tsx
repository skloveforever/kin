import React, { useState } from "react";
import { PORTFOLIO_PROJECTS } from "../data/pillars";
import { PillarId } from "../types";
import { playUiSound } from "../utils/audio";
import { ChevronLeft, ChevronRight, ArrowUpRight, ShieldCheck, Sparkles, Cpu, Layers, Activity, Eye, Compass } from "lucide-react";

export const PortfolioShowcase: React.FC = () => {
  const [filter, setFilter] = useState<PillarId | "all">("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);

  const filteredProjects = filter === "all"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === filter);

  const handlePrev = () => {
    playUiSound("click");
    setActiveIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playUiSound("click");
    setActiveIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  const currentProject = filteredProjects[activeIndex] || PORTFOLIO_PROJECTS[0];

  return (
    <section id="portfolio-section" className="py-24 relative overflow-hidden bg-[#070b15]">
      {/* Background Volumetric Lighting & Innovation Lab Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950/90 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-lg shadow-cyan-500/5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>3D CASE STUDY ARCHITECTURE • REAL-TIME SPRINT RECORDS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase font-sans">
            OUR GLOBAL <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">STRATEGIC ACHIEVEMENTS</span>
          </h2>

          <p className="text-slate-300 font-light text-base sm:text-lg leading-relaxed">
            Four anonymized, high-impact case studies engineered by COMIWAY Idea Architecture Studio across strategy, AI, and digital experiences.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
            {["all", "blueprinting", "branding", "websites", "ai"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playUiSound("click");
                  setFilter(cat as any);
                  setActiveIndex(0);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Sleek Glass Panel with 3D Hologram Carousel */}
        <div className="relative rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl shadow-cyan-950/20">
          
          {/* Top Carousel Bar Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-slate-800/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-bold tracking-wider uppercase">ACTIVE SPRINT SHOWCASE</span>
              <span className="hidden md:inline text-slate-500">|</span>
              <a href="mailto:connect@comiway.com" className="hidden md:inline text-emerald-400 hover:underline">
                connect@comiway.com
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-cyan-400 font-bold">
                0{activeIndex + 1} <span className="text-slate-600">/</span> 0{filteredProjects.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-colors"
                  title="Previous Case Study"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-colors"
                  title="Next Case Study"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Horizontal Cards Grid/Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Featured Active Card (Large Visual Preview) */}
            <div className="lg:col-span-7 relative group">
              <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl shadow-cyan-500/10">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Neon Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    {currentProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300">
                    {currentProject.year}
                  </span>
                </div>

                {/* Floating Metrics Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>{currentProject.results}</span>
                  </div>
                  <button
                    onClick={() => {
                      playUiSound("select");
                      setSelectedProject(currentProject);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase font-mono transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT 3D CASE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Card Narrative & Case Overview */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <span>CLIENT: {currentProject.client}</span>
                  <span className="text-slate-600">•</span>
                  <span>{currentProject.year}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {currentProject.title}
                </h3>
              </div>

              {/* Context & Problem Snippet */}
              {currentProject.context && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="text-cyan-400 font-mono font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" /> CONTEXT:
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed">
                    {currentProject.context}
                  </p>
                </div>
              )}

              {currentProject.problem && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="text-rose-400 font-mono font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> PROBLEM STATEMENT:
                  </div>
                  <p className="text-slate-300 font-light leading-relaxed line-clamp-3">
                    {currentProject.problem}
                  </p>
                </div>
              )}

              {/* Solution & Impact Highlights */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs space-y-1.5">
                <div className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> STRATEGIC IMPACT:
                </div>
                <p className="text-emerald-300 font-semibold leading-relaxed">
                  {currentProject.impact || currentProject.results}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    playUiSound("select");
                    setSelectedProject(currentProject);
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>FULL CASE STUDY BREAKDOWN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Sub-Carousel Horizontal Card Selector Strip */}
          <div className="mt-10 pt-8 border-t border-slate-800/80">
            <div className="text-xs font-mono text-slate-400 mb-4 flex items-center justify-between">
              <span className="uppercase tracking-widest text-cyan-400 font-bold">SELECT ANY CASE STUDY:</span>
              <span>CAROUSEL POSITION: 0{activeIndex + 1} OF 0{filteredProjects.length}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={proj.id}
                    onClick={() => {
                      playUiSound("select");
                      setActiveIndex(idx);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between space-y-3 ${
                      isActive
                        ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10 -translate-y-1"
                        : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isActive ? "bg-cyan-500/20 text-cyan-300 font-bold" : "bg-slate-900 text-slate-400"
                      }`}>
                        CARD 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{proj.category}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {proj.title}
                    </h4>

                    <div className="text-[11px] font-mono text-emerald-400 font-semibold truncate pt-1 border-t border-slate-900">
                      {proj.results}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Lightbox for Full Project Inspection */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-2xl animate-in fade-in">
            <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{selectedProject.client}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-mono text-slate-400">{selectedProject.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Image Frame */}
              <div className="h-56 sm:h-72 rounded-2xl overflow-hidden relative border border-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>KEY METRICS: {selectedProject.results}</span>
                </div>
              </div>

              {/* Case Study Deep Breakdown Sections */}
              <div className="space-y-4">
                
                {/* 1. Context */}
                {selectedProject.context && (
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/20 space-y-2">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Compass className="w-4 h-4" /> 1. CONTEXT
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-light">
                      {selectedProject.context}
                    </p>
                  </div>
                )}

                {/* 2. Problem Statement */}
                {selectedProject.problem && (
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/20 space-y-2">
                    <div className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4" /> 2. PROBLEM STATEMENT
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-light">
                      {selectedProject.problem}
                    </p>
                  </div>
                )}

                {/* 3. Solution */}
                {selectedProject.solution && (
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-purple-500/20 space-y-2">
                    <div className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> 3. STRATEGIC SOLUTION
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed font-light">
                      {selectedProject.solution}
                    </p>
                  </div>
                )}

                {/* 4. Impact */}
                {selectedProject.impact && (
                  <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-2 bg-gradient-to-r from-emerald-950/20 to-slate-950">
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> 4. MEASURABLE IMPACT
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                      {selectedProject.impact}
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-slate-400">TAGS & ARCHITECTURAL CATEGORIES:</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div>
                  <span className="text-white font-bold">Request a Custom Sprint Showcase:</span>{" "}
                  <a href="mailto:connect@comiway.com" className="text-emerald-400 underline font-semibold hover:text-emerald-300">
                    connect@comiway.com
                  </a>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono shrink-0"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

