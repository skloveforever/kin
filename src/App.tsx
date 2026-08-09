/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ThreeStage } from "./components/ThreeStage";
import { PillarExplorer } from "./components/PillarExplorer";
import { EdieAiSandbox } from "./components/EdieAiSandbox";
import { PortfolioShowcase } from "./components/PortfolioShowcase";
import { ContactFooter } from "./components/ContactFooter";
import { GrowthBlueprintGenerator } from "./components/GrowthBlueprintGenerator";
import { PillarId } from "./types";

export default function App() {
  const [selectedPillarId, setSelectedPillarId] = useState<PillarId>("branding");
  const [hoveredPillarId, setHoveredPillarId] = useState<PillarId | null>(null);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPillar = (id: PillarId) => {
    setSelectedPillarId(id);
    // Smooth scroll to Pillar Explorer if not already in view
    const explorer = document.getElementById("pillars-section");
    if (explorer) {
      const rect = explorer.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight * 1.5) {
        explorer.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Grid Accent Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Sticky Header */}
      <Header
        onNavigate={handleNavigate}
        onOpenBlueprintModal={() => setIsBlueprintModalOpen(true)}
      />

      <main className="relative z-10 space-y-12">
        {/* Hero Section */}
        <HeroSection
          onOpenBlueprintModal={() => setIsBlueprintModalOpen(true)}
          onNavigateToEdie={() => handleNavigate("edie-ai-section")}
          onSelectPillar={handleSelectPillar}
          activePillarId={selectedPillarId}
        />

        {/* Central Interactive 3D Stage Viewport */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ThreeStage
            selectedPillarId={selectedPillarId}
            onSelectPillar={handleSelectPillar}
            hoveredPillarId={hoveredPillarId}
            onHoverPillar={setHoveredPillarId}
          />
        </div>

        {/* Deep Pillar Explorer & Interactive Tools */}
        <PillarExplorer
          selectedPillarId={selectedPillarId}
          onSelectPillar={handleSelectPillar}
          onOpenBlueprintModal={() => setIsBlueprintModalOpen(true)}
        />

        {/* EDIE AI Empathic Intelligence Sandbox */}
        <EdieAiSandbox />

        {/* Portfolio Showcase */}
        <PortfolioShowcase />
      </main>

      {/* Footer & Contact */}
      <ContactFooter />

      {/* Growth Blueprint AI Generator Modal */}
      <GrowthBlueprintGenerator
        isOpen={isBlueprintModalOpen}
        onClose={() => setIsBlueprintModalOpen(false)}
      />
    </div>
  );
}
