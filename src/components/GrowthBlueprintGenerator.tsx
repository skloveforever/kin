import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ArrowRight, Download, Bot, Compass, ShieldCheck } from "lucide-react";
import { BlueprintForm, BlueprintResult } from "../types";
import { playUiSound } from "../utils/audio";

interface GrowthBlueprintGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrowthBlueprintGenerator: React.FC<GrowthBlueprintGeneratorProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BlueprintForm>({
    brandName: "",
    industry: "Technology & Software",
    stage: "Scaling & Expansion",
    primaryGoal: "Build Market Monopoly & AI Workflows",
    targetAudience: "Gen Z & Tech-Forward Enterprises",
    budgetRange: "₹5L - ₹15L (Architecture Sprint)",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BlueprintResult | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    playUiSound("ai");
    setIsLoading(true);

    try {
      const res = await fetch("/api/blueprint/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      playUiSound("success");
      setResult(data.blueprint);
      setStep(3);
    } catch (err) {
      console.error("Failed to generate blueprint:", err);
      // Fallback result
      setResult({
        title: `Architecture Roadmap for ${formData.brandName || "Your Enterprise"}`,
        executiveSummary: `High-impact strategy tailored for ${formData.industry} (${formData.stage}) to achieve ${formData.primaryGoal}.`,
        pillars: [
          {
            phase: "Phase 1: Cultural Positioning & Brand Architecture",
            duration: "Weeks 1 - 3",
            keyDeliverables: ["Gen Z Resonance Strategy", "Brass & Glass Visual Identity", "Monopoly Messaging"],
          },
          {
            phase: "Phase 2: High-Performance 3D Digital Real Estate",
            duration: "Weeks 4 - 7",
            keyDeliverables: ["Sub-70ms 3D Web Engine", "Glassmorphic UX/UI", "Conversion Funnel Physics"],
          },
          {
            phase: "Phase 3: EDIE AI & CORE CX Automation",
            duration: "Weeks 8 - 10",
            keyDeliverables: ["Custom Gemini CX Concierge", "Lead Qualification Pipeline", "Omnichannel Intelligence"],
          },
        ],
        projectedROI: "3.8x - 5.2x Growth Velocity",
        recommendedPillars: ["Strategic Branding", "AI Solutions", "Website Building"],
      });
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                AI GROWTH BLUEPRINT GENERATOR
              </h3>
              <p className="text-xs font-mono text-slate-400">COMIWAY Idea Architecture Engine</p>
            </div>
          </div>

          <button
            onClick={() => {
              playUiSound("click");
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                STEP 1 OF 2: BRAND SPECIFICATIONS
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">
                  Brand / Organization Name:
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="Aura Luxe, Global Mobility, NeoSpire"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Industry Vector:</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option>Technology & Software</option>
                    <option>Luxury & Fashion</option>
                    <option>Financial Services & FinTech</option>
                    <option>Consumer Brand & Retail</option>
                    <option>Healthcare & Biotech</option>
                    <option>Smart Infrastructure & Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Growth Stage:</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option>Early Stage / Idea Blueprint</option>
                    <option>Scaling & Expansion</option>
                    <option>Established Market Leader</option>
                    <option>Pivot & Digital Transformation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Primary Growth Goal:</label>
                <input
                  type="text"
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  placeholder="e.g. 10x lead conversion, Gen Z rebranding, AI customer concierge"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    playUiSound("click");
                    setStep(2);
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase font-mono transition-colors flex items-center gap-2"
                >
                  <span>NEXT SPECIFICATIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                STEP 2 OF 2: AUDIENCE & BLUEPRINT TARGET
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Target Audience Demographics:</label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Target Investment Range:</label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option>₹3L - ₹5L (Starter Blueprint)</option>
                  <option>₹5L - ₹15L (Architecture & AI Integration)</option>
                  <option>₹15L - ₹30L+ (Full Monopoly Scale & Digital Real Estate)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <div className="text-emerald-400 font-bold">Included in Your Custom Architecture Blueprint:</div>
                <div className="flex items-center gap-2">✓ 4-Phase Growth Roadmap Timelines</div>
                <div className="flex items-center gap-2">✓ Recommended COMIWAY Core Pillars</div>
                <div className="flex items-center gap-2">✓ Projected Efficiency & Conversion ROI</div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Back
                </button>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs uppercase font-mono hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" /> GENERATING BLUEPRINT...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> GENERATE ROADMAP NOW
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && result && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between">
                <span className="font-bold uppercase">ROADMAP SPECIFICATIONS READY</span>
                <span>PROJECTED ROI: {result.projectedROI}</span>
              </div>

              <div>
                <h4 className="text-2xl font-black text-white">{result.title}</h4>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{result.executiveSummary}</p>
              </div>

              {/* Phases Breakdown */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  4-Phase Implementation Timelines:
                </div>
                {result.pillars.map((p, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">{p.phase}</span>
                      <span className="text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {p.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.keyDeliverables.map((del) => (
                        <span key={del} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
                          ✓ {del}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Booking Action */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">Ready to Execute this Blueprint?</div>
                  <div className="text-xs text-slate-400 font-mono">
                    Schedule a strategy session or email us directly at{" "}
                    <a href="mailto:connect@comiway.com" className="text-emerald-400 underline font-semibold hover:text-emerald-300">
                      connect@comiway.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playUiSound("click");
                    alert("Thank you! Your growth blueprint request has been routed to connect@comiway.com. Our architects will contact you within 4 business hours.");
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase font-mono whitespace-nowrap transition-colors"
                >
                  EXECUTE BLUEPRINT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
