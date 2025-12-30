"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GlassPanel from "./GlassPanel";
import { Flame, Info } from "lucide-react";
import { generateBlessing } from "@/lib/actions";
import { toast } from "sonner";

export default function AltarPanel() {
  const [litCandles, setLitCandles] = useState<number[]>([3]); // Candle 4 (index 3) is always lit
  const [selectedCandle, setSelectedCandle] = useState<number | null>(null);
  const [prayer, setPrayer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCandleClick = (index: number) => {
    if (index === 3) {
      // Gold candle logic
      setSelectedCandle(3);
      return;
    }
    
    if (!litCandles.includes(index)) {
      setSelectedCandle(index);
    }
  };

  const igniteCandle = async () => {
    if (!prayer.trim() || selectedCandle === null) return;
    
    setIsSubmitting(true);
    const blessing = await generateBlessing(prayer);
    
    setLitCandles([...litCandles, selectedCandle]);
    toast("A Blessing Received", {
      description: blessing,
      icon: <Flame className="text-sacred-gold w-4 h-4" />,
      className: "glass-panel sacred-border text-white",
    });
    
    setIsSubmitting(false);
    setSelectedCandle(null);
    setPrayer("");
  };

  return (
    <div className="flex flex-col gap-6 p-2">
      <GlassPanel className="flex flex-col items-center py-12">
        <h2 className="text-2xl font-cinzel text-sacred-gold mb-12 gold-glow uppercase tracking-widest">The Altar of Intentions</h2>
        
        <div className="flex justify-center items-end gap-4 md:gap-8 h-48 w-full">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col items-center group">
              <button
                onClick={() => handleCandleClick(i)}
                className="relative flex flex-col items-center focus:outline-none"
              >
                <AnimatePresence>
                  {litCandles.includes(i) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-8 w-4 h-8 bg-gradient-to-t from-orange-500 via-sacred-gold to-white rounded-full blur-[2px] animate-pulse"
                      style={{
                        boxShadow: i === 3 ? "0 0 20px #FFD700" : "0 0 15px rgba(255, 165, 0, 0.5)"
                      }}
                    >
                       <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/40 rounded-full blur-[1px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Candle Body */}
                <div 
                  className={cn(
                    "w-6 rounded-t-sm transition-all duration-500",
                    i === 3 ? "h-32 bg-sacred-gold shadow-[0_0_15px_rgba(255,215,0,0.3)]" : "h-24 bg-white/80",
                    litCandles.includes(i) ? "opacity-100" : "opacity-40 group-hover:opacity-60"
                  )}
                />
                <div className={cn("w-8 h-2 rounded-full -mt-1", i === 3 ? "bg-sacred-gold/40" : "bg-black/20")} />
              </button>
              <span className="mt-4 font-rajdhani text-[10px] uppercase tracking-tighter text-white/40">
                {i === 3 ? "Eternal" : `Votive ${i + 1}`}
              </span>
            </div>
          ))}
        </div>
      </GlassPanel>

      <AnimatePresence>
        {selectedCandle !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <GlassPanel className="w-full max-w-lg p-8 relative">
              <button 
                onClick={() => setSelectedCandle(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                ✕
              </button>
              
              {selectedCandle === 3 ? (
                <div className="text-center space-y-6">
                  <Flame className="w-12 h-12 text-sacred-gold mx-auto gold-glow" />
                  <h3 className="text-2xl font-cinzel text-sacred-gold">The Golden Prayer</h3>
                  <blockquote className="text-xl italic font-serif text-white/90 leading-relaxed py-8 border-y border-sacred-gold/20">
                    "Lord, look upon this woman who carries so much... Guard her peace tonight."
                  </blockquote>
                  <p className="text-white/40 font-rajdhani uppercase tracking-widest text-xs">Always Lit • For You</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-sacred-gold/10 flex items-center justify-center">
                      <Flame className="text-sacred-gold w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-cinzel text-white">Light a Votive</h3>
                      <p className="text-white/40 text-sm font-rajdhani">Offer your intention to the silence</p>
                    </div>
                  </div>
                  
                  <textarea
                    value={prayer}
                    onChange={(e) => setPrayer(e.target.value)}
                    placeholder="What does your heart wish to say?"
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white font-rajdhani focus:outline-none focus:border-sacred-gold/50 transition-all resize-none"
                  />
                  
                  <button
                    onClick={igniteCandle}
                    disabled={isSubmitting || !prayer.trim()}
                    className="w-full py-4 bg-sacred-gold text-slate-950 font-cinzel font-bold rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? "Ascending..." : "Ignite Prayer"}
                  </button>
                </div>
              )}
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper function that was used but not defined in previous snippet
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
