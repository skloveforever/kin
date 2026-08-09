import React, { useState } from "react";
import { PillarId, PillarData } from "../types";
import { PILLARS_DATA } from "../data/pillars";
import { playUiSound } from "../utils/audio";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Award, Layers, ChevronRight, Activity } from "lucide-react";

interface PillarExplorerProps {
  selectedPillarId: PillarId;
  onSelectPillar: (id: PillarId) => void;
  onOpenBlueprintModal: () => void;
}

export const PillarExplorer: React.FC<PillarExplorerProps> = ({
  selectedPillarId,
  onSelectPillar,
  onOpenBlueprintModal,
}) => {
  const currentPillar = PILLARS_DATA.find((p) => p.id === selectedPillarId) || PILLARS_DATA[0];

  // Pillar 1 Interactive Brand Simulator State
  const [brandArchetype, setBrandArchetype] = useState("Monopoly Disruptor");
  const [genZScore, setGenZScore] = useState(92);

  // Pillar 2 Web Speed Inspector State
  const [frameSpeed, setFrameSpeed] = useState("58ms");

  // Pillar 3 AI CX Simulator State
  const [aiTestPrompt, setAiTestPrompt] = useState("How does EDIE AI qualify luxury real estate buyers?");
  const [aiTestResult, setAiTestResult] = useState<string | null>(null);

  const handleTestAi = () => {
    playUiSound("ai");
    setAiTestResult(
      "EDIE AI analyzes 14 intent signals in real time (response latency 240ms), categorizes net-worth tier, and routes warm leads directly to your executive calendar."
    );
  };

  return (
    <section id="pillars-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <Layers className="w-3.5 h-3.5" /> DEEP ARCHITECTURE INSPECTOR
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              {currentPillar.title}
            </h2>
            <p className="text-slate-400 font-mono text-sm mt-1">{currentPillar.subtitle}</p>
          </div>

          {/* Pillar Switcher Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-2 mt-4 md:mt-0 no-scrollbar">
            {PILLARS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  playUiSound("click");
                  onSelectPillar(p.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  selectedPillarId === p.id
                    ? "bg-slate-900 border border-emerald-400 text-emerald-300 font-bold"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {p.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Core Narrative & Tags */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-6">
              {/* Floating Tags requested in prompt */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                  Core Offering Capabilities:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentPillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border backdrop-blur-md transition-all hover:scale-105"
                      style={{
                        backgroundColor: `${currentPillar.color}15`,
                        borderColor: `${currentPillar.color}40`,
                        color: currentPillar.color,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pillar Description */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                {currentPillar.description}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                {currentPillar.metrics.map((m) => (
                  <div key={m.label} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div
                      className="text-xl sm:text-2xl font-black font-mono tracking-tight"
                      style={{ color: currentPillar.color }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Client Case Study Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: currentPillar.color }}
                />
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>PROVED ARCHITECTURAL IMPACT</span>
                  <span className="text-emerald-400">{currentPillar.caseStudy.industry}</span>
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  &ldquo;{currentPillar.caseStudy.quote}&rdquo;
                </div>
                <div className="text-xs font-mono text-slate-300 mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {currentPillar.caseStudy.impact}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Pillar Sandbox Tool */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: currentPillar.color }}
              />

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                {currentPillar.interactiveFeatureTitle}
              </div>

              <p className="text-xs text-slate-300 mb-6">{currentPillar.interactiveFeatureDesc}</p>

              {/* Customized Tool per Pillar */}
              {selectedPillarId === "branding" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-2">
                      Select Brand Identity Archetype:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Monopoly Disruptor", "Cultural Heritage", "Cyber Avant-Garde", "Empathic Gen Z"].map((arch) => (
                        <button
                          key={arch}
                          onClick={() => {
                            playUiSound("click");
                            setBrandArchetype(arch);
                            setGenZScore(Math.floor(88 + Math.random() * 11));
                          }}
                          className={`p-2.5 rounded-xl text-xs font-mono text-left border transition-all ${
                            brandArchetype === arch
                              ? "bg-emerald-500/20 border-emerald-400 text-white font-bold"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {arch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Gen Z Cultural Resonance:</span>
                      <span className="text-emerald-400 font-bold">{genZScore}% Index</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                        style={{ width: `${genZScore}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono pt-1">
                      White-space opportunity: High authority & global export.
                    </p>
                  </div>
                </div>
              )}

              {selectedPillarId === "websites" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">3D Glass Layer Rendering:</span>
                      <span className="text-blue-400 font-bold">60 FPS Smooth</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Time-To-Interactive (TTI):</span>
                      <span className="text-emerald-400 font-bold">{frameSpeed}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Glassmorphism Blur Shader:</span>
                      <span className="text-purple-400 font-bold">GPU Accelerated</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playUiSound("click");
                      setFrameSpeed(`${Math.floor(40 + Math.random() * 25)}ms`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors"
                  >
                    Re-benchmark Rendering Speed
                  </button>
                </div>
              )}

              {selectedPillarId === "ai" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Test EDIE Neural Query:
                    </label>
                    <input
                      type="text"
                      value={aiTestPrompt}
                      onChange={(e) => setAiTestPrompt(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <button
                    onClick={handleTestAi}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                  >
                    Simulate EDIE AI Response
                  </button>

                  {aiTestResult && (
                    <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-200 animate-in fade-in">
                      {aiTestResult}
                    </div>
                  )}
                </div>
              )}

              {selectedPillarId === "blueprinting" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      Monopoly Growth Pathway Checklist:
                    </div>
                    <ul className="text-xs font-mono text-slate-300 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Phase 1: Cultural Audit & Moat
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Phase 2: High-Velocity Digital Hub
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Phase 3: AI Concierge Deployment
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={onOpenBlueprintModal}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider uppercase font-mono transition-colors"
                  >
                    Build Full Custom Blueprint
                  </button>
                </div>
              )}

              {/* Pillar Action Trigger */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    playUiSound("click");
                    onOpenBlueprintModal();
                  }}
                  className="w-full flex items-center justify-between text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  <span>REQUEST SPRINT FOR {currentPillar.title.toUpperCase()}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
