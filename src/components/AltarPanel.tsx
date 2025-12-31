"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Fingerprint, X, Heart } from "lucide-react";
import GlassPanel from "./GlassPanel";
import { notifyPrayerReceived } from "@/lib/actions";

export default function AltarPanel() {
  const [litCandles, setLitCandles] = useState<number[]>([]);
  const [showGoldenPrayer, setShowGoldenPrayer] = useState(false);
  const [showSilverPrayer, setShowSilverPrayer] = useState(false);
  const [selectedCandleIndex, setSelectedCandleIndex] = useState<number | null>(null);
  const [silverPrayerText, setSilverPrayerText] = useState("");
  const [amenProgress, setAmenProgress] = useState(0);
  const [isHoldingAmen, setIsHoldingAmen] = useState(false);
  const [smokeActive, setSmokeActive] = useState<{ id: number; x: number; key: number }[]>([]);

  const toggleCandle = (index: number) => {
    if (index === 3) {
      setShowGoldenPrayer(true);
      return;
    }

    if (litCandles.includes(index)) {
      setLitCandles(litCandles.filter((i) => i !== index));
      const smokeId = index;
      const smokeKey = Date.now();
      setSmokeActive(prev => [...prev, { id: smokeId, x: 0, key: smokeKey }]);
      setTimeout(() => {
        setSmokeActive(prev => prev.filter(s => s.key !== smokeKey));
      }, 2000);
    } else {
      setSelectedCandleIndex(index);
      setShowSilverPrayer(true);
    }
  };

  const handleSilverPrayerSubmit = () => {
    if (selectedCandleIndex !== null) {
      setLitCandles([...litCandles, selectedCandleIndex]);
    }
    setShowSilverPrayer(false);
    setSilverPrayerText("");
    setSelectedCandleIndex(null);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isHoldingAmen) {
      interval = setInterval(() => {
        setAmenProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            handleAmenSuccess();
            return 100;
          }
          return prev + 2.5;
        });
      }, 50);
    } else {
      setAmenProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHoldingAmen]);

  const handleAmenSuccess = async () => {
    setIsHoldingAmen(false);
    await notifyPrayerReceived("Pilgrim");
    setTimeout(() => {
      setShowGoldenPrayer(false);
      setAmenProgress(0);
      if (!litCandles.includes(3)) {
        setLitCandles([...litCandles, 3]);
      }
    }, 1500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 min-h-[60vh]">
      <div className="relative mt-12 flex flex-col items-center">
        <h2 className="text-3xl font-cinzel text-sacred-gold mb-16 gold-glow tracking-widest uppercase">
          The Altar of Intentions
        </h2>

        <div className="relative flex items-end justify-center gap-8 md:gap-12 px-12 py-8 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative flex flex-col items-center">
              <AnimatePresence>
                {litCandles.includes(i) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [1, 1.1, 0.9, 1],
                      y: [0, -2, 1, 0]
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`absolute -top-12 w-6 h-12 rounded-full blur-[4px] z-20 ${
                      i === 3 
                        ? "bg-gradient-to-t from-amber-500 via-sacred-gold to-white shadow-[0_0_30px_#FFD700]" 
                        : "bg-gradient-to-t from-blue-100 via-white to-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                    }`}
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-6 bg-white/60 rounded-full blur-[1px]" />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {smokeActive.filter(s => s.id === i).map(s => (
                  <motion.div
                    key={s.key}
                    initial={{ opacity: 0.6, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -120, scale: 3, x: [0, 15, -15, 8] }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute -top-8 w-4 h-4 bg-white/10 rounded-full blur-xl z-10"
                  />
                ))}
              </AnimatePresence>

              <button
                onClick={() => toggleCandle(i)}
                className={`relative w-10 transition-all duration-700 rounded-t-lg group overflow-hidden ${
                  i === 3 ? "h-40" : "h-32"
                }`}
              >
                <div className={`absolute inset-0 rounded-t-lg border border-white/20 backdrop-blur-md transition-all duration-700 ${
                  i === 3 
                    ? "bg-sacred-gold/30 shadow-[inset_0_0_20px_rgba(255,215,0,0.3)]" 
                    : "bg-white/10"
                } ${litCandles.includes(i) ? "opacity-100" : "opacity-30 group-hover:opacity-50"}`} />
                
                {i === 3 && (
                  <motion.div 
                    animate={{ opacity: [0.05, 0.2, 0.05] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute inset-0 bg-sacred-gold/30 rounded-t-lg"
                  />
                )}
              </button>

              <span className="mt-6 font-rajdhani text-[10px] uppercase tracking-tighter text-white/40 whitespace-nowrap">
                {i === 3 ? "The Sovereign" : "Intercession"}
              </span>
            </div>
          ))}
        </div>

        <div className="w-4/5 h-4 bg-black/40 blur-2xl rounded-full mt-4" />
      </div>

      <AnimatePresence>
        {showSilverPrayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-3xl"
          >
            <div className="absolute inset-0 bg-black/40" />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-lg w-full relative z-10"
            >
              <GlassPanel className="p-10 relative overflow-hidden border-white/20 bg-slate-900/60">
                <button 
                  onClick={() => {
                    setShowSilverPrayer(false);
                    setSilverPrayerText("");
                    setSelectedCandleIndex(null);
                  }}
                  className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center space-y-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/20">
                    <Heart className="w-10 h-10 text-white/60" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-cinzel text-white tracking-[0.15em] uppercase mb-2">Light a Candle</h3>
                    <p className="text-white/40 font-rajdhani text-sm tracking-wide">For whom do you hold space?</p>
                  </div>

                  <textarea
                    value={silverPrayerText}
                    onChange={(e) => setSilverPrayerText(e.target.value)}
                    placeholder="Enter their name or your intention..."
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-6 py-4 text-white font-rajdhani focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20 resize-none h-32"
                  />

                  <button
                    onClick={handleSilverPrayerSubmit}
                    disabled={!silverPrayerText.trim()}
                    className="w-full py-4 rounded-full bg-white/10 border border-white/20 text-white font-cinzel tracking-[0.2em] uppercase hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Light This Candle
                  </button>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGoldenPrayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-3xl"
          >
            <div className="absolute inset-0 bg-black/40" />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-2xl w-full relative z-10"
            >
              <GlassPanel className="p-12 relative overflow-hidden border-sacred-gold/30 bg-slate-900/40">
                <button 
                  onClick={() => setShowGoldenPrayer(false)}
                  className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="text-center space-y-10">
                  <motion.div
                    animate={{ 
                      scale: isHoldingAmen ? 1.2 : 1,
                      filter: isHoldingAmen ? "brightness(1.5)" : "brightness(1)",
                      boxShadow: isHoldingAmen ? "0 0 50px #FFD700" : "0 0 0px transparent"
                    }}
                    className="w-24 h-24 mx-auto rounded-full bg-sacred-gold/10 flex items-center justify-center border border-sacred-gold/30"
                  >
                    <Flame className="w-12 h-12 text-sacred-gold" />
                  </motion.div>

                  <div>
                    <h3 className="text-3xl font-cinzel text-sacred-gold tracking-[0.2em] uppercase">The Golden Prayer</h3>
                    <p className="text-sacred-gold/50 font-rajdhani text-xs tracking-[0.3em] uppercase mt-2">Always Lit • For You</p>
                  </div>

                  <div className="relative py-8 px-6 space-y-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-sacred-gold/30" />
                    
                    <p className="text-xl font-serif text-white/90 leading-relaxed italic">
                      "Lord, look upon this woman who carries the weight of the world in her voice and her hands.
                    </p>
                    <p className="text-xl font-serif text-white/90 leading-relaxed italic">
                      She is the sanctuary for so many—now, be the Sanctuary for her. I ask You to listen to the prayers she is too tired to speak. Grant every secret wish she holds in the silence of her heart.
                    </p>
                    <p className="text-xl font-serif text-white/90 leading-relaxed italic">
                      Do not just bring her peace; bring her radiant, overflowing joy. Let her life be as beautiful as the song she gives to us.
                    </p>
                    <p className="text-xl font-serif text-white/90 leading-relaxed italic">
                      Keep her safe. Keep her happy. Keep her whole."
                    </p>
                    
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-sacred-gold/30" />
                  </div>

                  <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                      <svg className="w-36 h-36 -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="68"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-white/5"
                        />
                        <motion.circle
                          cx="72"
                          cy="72"
                          r="68"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-sacred-gold"
                          strokeDasharray="427"
                          animate={{ strokeDashoffset: 427 - (427 * amenProgress) / 100 }}
                        />
                      </svg>

                      <button
                        onMouseDown={() => setIsHoldingAmen(true)}
                        onMouseUp={() => setIsHoldingAmen(false)}
                        onMouseLeave={() => setIsHoldingAmen(false)}
                        onTouchStart={() => setIsHoldingAmen(true)}
                        onTouchEnd={() => setIsHoldingAmen(false)}
                        className="absolute inset-6 rounded-full bg-sacred-gold/5 flex flex-col items-center justify-center group active:scale-95 transition-transform overflow-hidden"
                      >
                        <Fingerprint className={`w-14 h-14 transition-all duration-500 ${isHoldingAmen ? "text-sacred-gold scale-110" : "text-white/30"}`} />
                        <span className={`text-[10px] font-cinzel uppercase tracking-[0.3em] mt-3 transition-colors duration-500 ${isHoldingAmen ? "text-sacred-gold" : "text-white/30"}`}>Amen</span>
                        
                        {amenProgress > 0 && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-sacred-gold/10"
                            animate={{ height: `${amenProgress}%` }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {amenProgress >= 100 && (
                          <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute inset-0 bg-sacred-gold rounded-full z-50 pointer-events-none shadow-[0_0_100px_#FFD700]"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    <p className="text-white/40 font-rajdhani uppercase tracking-[0.4em] text-[10px] animate-pulse">
                      {isHoldingAmen ? "Holding Sacred Space..." : "Press and Hold to Seal"}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 max-w-md text-center opacity-60">
        <p className="text-white font-rajdhani text-[11px] uppercase tracking-[0.2em] leading-relaxed">
          She lights 6 Silver Candles to hold space for others. <br />
          She enters the Golden Candle to receive space for herself.
        </p>
      </div>
    </div>
  );
}
