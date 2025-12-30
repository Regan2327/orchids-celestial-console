"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Church, 
  Flame, 
  Gift, 
  Wind, 
  Activity, 
  Scroll, 
  Menu, 
  X,
  Compass,
  Bell,
  User
} from "lucide-react";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "sanctuary", icon: Church, label: "Sanctuary" },
  { id: "intentions", icon: Flame, label: "Intentions" },
  { id: "treasury", icon: Gift, label: "Treasury" },
  { id: "guardian", icon: Wind, label: "Guardian" },
  { id: "resonance", icon: Activity, label: "Resonance" },
  { id: "epistle", icon: Scroll, label: "The Epistle" },
];

interface DashboardShellProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardShell({ children, activeTab, setActiveTab }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden text-white font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="glass-panel sacred-border h-[calc(100vh-2rem)] m-4 rounded-3xl flex flex-col items-center py-8 gap-12 relative z-50 transition-all duration-500"
      >
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full bg-sacred-gold flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            <Compass className="text-slate-950 w-6 h-6" />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-cinzel text-sacred-gold font-bold text-lg whitespace-nowrap"
              >
                Celestial
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 w-full px-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative",
                activeTab === item.id 
                  ? "bg-sacred-gold/10 border border-sacred-gold/30 text-sacred-gold" 
                  : "hover:bg-white/5 text-white/60 hover:text-white"
              )}
            >
              <item.icon className={cn("w-6 h-6", activeTab === item.id ? "gold-glow" : "")} />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-rajdhani font-semibold tracking-wider whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-8 bg-sacred-gold rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 rounded-full hover:bg-white/5 text-white/40 hover:text-sacred-gold transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden py-4 pr-4">
        {/* Header */}
        <header className="glass-panel sacred-border h-20 rounded-3xl mb-4 flex items-center justify-between px-8 relative z-40">
          <div className="flex flex-col">
            <span className="text-white/40 text-xs font-rajdhani uppercase tracking-widest">Sky Compass</span>
            <h2 className="text-xl font-cinzel text-sacred-gold">{menuItems.find(m => m.id === activeTab)?.label}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 glass-panel border-white/5 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-sacred-gold animate-pulse shadow-[0_0_8px_#FFD700]" />
              <span className="font-rajdhani text-sm text-white/80">Season: Christmas</span>
            </div>
            
            <button className="relative p-2 text-white/60 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-sacred-gold rounded-full border border-slate-900" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Sister Grace</p>
                <p className="text-[10px] text-white/40 uppercase tracking-tighter">Pilgrim Singer</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sacred-gold/20 to-sacred-gold/40 border border-sacred-gold/20 flex items-center justify-center">
                <User className="w-5 h-5 text-sacred-gold" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Stage */}
        <main className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {children}
        </main>
      </div>
    </div>
  );
}
