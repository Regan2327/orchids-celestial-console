"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CathedralCanvas from "@/components/CathedralCanvas";
import DashboardShell from "@/components/DashboardShell";
import Sanctuary from "@/components/Sanctuary";
import AltarPanel from "@/components/AltarPanel";
import TreasuryGrid from "@/components/TreasuryGrid";
import GuardianInterface from "@/components/GuardianInterface";
import ResonanceChamber from "@/components/ResonanceChamber";
import EpistleView from "@/components/EpistleView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sanctuary");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-sacred-gold/30">
      <CathedralCanvas />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeTab === "sanctuary" && <Sanctuary />}
                  {activeTab === "intentions" && <AltarPanel />}
                  {activeTab === "treasury" && <TreasuryGrid />}
                  {activeTab === "guardian" && <GuardianInterface />}
                  {activeTab === "resonance" && <ResonanceChamber />}
                  {activeTab === "epistle" && <EpistleView />}
                </motion.div>
              </AnimatePresence>
            </DashboardShell>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Vignette/Atmosphere */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,11,30,0.4)_100%)]" />
    </div>
  );
}
