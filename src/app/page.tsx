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
import CelestialLogin from "@/components/CelestialLogin";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sanctuary");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pilgrimName, setPilgrimName] = useState("");

  useEffect(() => {
    setIsLoaded(true);
    const savedName = localStorage.getItem("pilgrim_name");
    if (savedName) {
      setPilgrimName(savedName);
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = (name: string) => {
    setPilgrimName(name);
    setIsAuthenticated(true);
    localStorage.setItem("pilgrim_name", name);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setPilgrimName("");
    localStorage.removeItem("pilgrim_name");
  };

  if (!isLoaded) return null;

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-sacred-gold/30">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <CelestialLogin key="login" onUnlock={handleUnlock} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative h-screen"
          >
            <CathedralCanvas />
            
            <div className="relative z-10 h-full">
              <DashboardShell activeTab={activeTab} setActiveTab={setActiveTab} onSignOut={handleSignOut} pilgrimName={pilgrimName}>
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
            </div>

            {/* Global Vignette/Atmosphere */}
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,11,30,0.4)_100%)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
