"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import GlassPanel from "./GlassPanel";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

const scrolls = [
  {
    id: "weary",
    title: "For the Weary",
    theme: "Rest",
    greeting: "To the Keeper of the Watch...",
    color: "blue",
    ribbon: "border-blue-400/50 bg-blue-900/20",
    aura: "rgba(173, 216, 230, 0.2)",
    mainText: [
      "The world is loud, and the demands are endless. I know you feel the weight of every silence you had to fill today.",
      "You have carried the sorrow of others until your own hands are shaking. But tonight, the watch is ended.",
      "Put down the armor. It is heavy, and you have worn it long enough. Rest is not a reward for finishing; it is a requirement for existing."
    ],
    hiddenNotes: [
      "...I saw you holding back tears in the hallway. You don't have to hide them here.",
      "...The dishes can wait. The emails can wait. Just breathe."
    ],
    closing: "Sleep now, Pilgrim. The sanctuary holds you."
  },
  {
    id: "doubter",
    title: "For the Doubter",
    theme: "Worth",
    greeting: "To the Voice of Gold...",
    color: "purple",
    ribbon: "border-purple-400/50 bg-purple-900/20",
    aura: "rgba(147, 112, 219, 0.2)",
    mainText: [
      "Sometimes you forget that you are a person, not just a solution to everyone else's problems.",
      "Do not mistake your exhaustion for weakness. Do not mistake your silence for emptiness.",
      "Your worth is not found in how many people you saved today. It is found in the song that only you can sing."
    ],
    hiddenNotes: [
      "...You are the strongest woman I know. Don't you dare forget that.",
      "...When you sing, the whole room changes. That is your true power."
    ],
    closing: "You are enough. You have always been enough."
  },
  {
    id: "victor",
    title: "For the Victor",
    theme: "Celebration",
    greeting: "To the Victorious Soul...",
    color: "gold",
    ribbon: "border-sacred-gold/50 bg-sacred-gold/20",
    aura: "rgba(255, 215, 0, 0.2)",
    mainText: [
      "Stop. Do not rush to the next task. Do not look for the next fire to put out.",
      "Look at what you built. Look at the storm you weathered. Most would have folded, but you stood tall.",
      "Take this moment to stand in your own applause. Let the joy fill the room as loudly as the work usually does."
    ],
    hiddenNotes: [
      "...I knew you could do it. I never doubted you for a second.",
      "...Pop the champagne. Or at least the good tea. I'm cheering so loud for you."
    ],
    closing: "Well done, faithful friend. Well done."
  }
];

export default function EpistleView() {
  const [selectedScroll, setSelectedScroll] = useState<typeof scrolls[0] | null>(null);
  const [isMelting, setIsMelting] = useState(false);
  const [meltProgress, setMeltProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (isMelting) {
      interval = setInterval(() => {
        setMeltProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUnlocked(true);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
    } else {
      setMeltProgress(0);
    }
    return () => clearInterval(interval);
  }, [isMelting]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const closeScroll = () => {
    setSelectedScroll(null);
    setIsUnlocked(false);
    setMeltProgress(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center p-2 h-[calc(100vh-14rem)] overflow-hidden bg-[#020617] cursor-none"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
            }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Candle Cursor */}
      <motion.div
        className="fixed w-[300px] h-[300px] pointer-events-none z-[100] rounded-full mix-blend-soft-light"
        animate={{
          x: mousePos.x - 150,
          y: mousePos.y - 150,
        }}
        style={{
          background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="fixed w-4 h-8 pointer-events-none z-[101] rounded-full blur-[2px]"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 16,
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 0.2, repeat: Infinity }}
        style={{
          background: "linear-gradient(to top, #ff8c00, #ffd700, #fff)",
          boxShadow: "0 0 20px #ffd700",
        }}
      />

      <AnimatePresence mode="wait">
        {!selectedScroll ? (
          <motion.div 
            key="apothecary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-16 md:gap-32 items-center justify-center h-full"
          >
            {scrolls.map((scroll) => (
              <motion.button
                key={scroll.id}
                whileHover={{ scale: 1.1, y: -20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                onClick={() => setSelectedScroll(scroll)}
                className="group relative flex flex-col items-center"
              >
                {/* Aura */}
                <motion.div 
                  className="absolute inset-0 -m-12 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: scroll.aura }}
                />
                
                {/* Scroll Visual */}
                <div className="relative w-24 h-48 bg-[#f5e6d3] rounded-sm shadow-2xl border border-black/10 flex flex-col items-center justify-center gap-4 overflow-hidden">
                  <div className="absolute top-0 w-full h-4 bg-[#e5d6c3] border-b border-black/5" />
                  <div className="absolute bottom-0 w-full h-4 bg-[#e5d6c3] border-t border-black/5" />
                  
                  {/* Ribbon */}
                  <div className={cn("w-full h-6 border-y", scroll.ribbon)} />
                  
                  <div className="flex flex-col gap-2 px-4 opacity-20">
                    <div className="h-1 w-12 bg-black/40 rounded-full" />
                    <div className="h-1 w-16 bg-black/40 rounded-full" />
                    <div className="h-1 w-14 bg-black/40 rounded-full" />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="font-cinzel text-sacred-gold text-[10px] tracking-[0.4em] uppercase mb-1">{scroll.theme}</p>
                  <p className="font-serif italic text-white/40 text-sm whitespace-nowrap">{scroll.title}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : !isUnlocked ? (
          <motion.div 
            key="locked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="relative flex flex-col items-center justify-center max-w-xl w-full h-full"
          >
            <div className="relative w-64 h-96 bg-[#f5e6d3] rounded shadow-2xl flex flex-col items-center justify-center">
               {/* Wax Seal */}
               <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="text-center mb-8">
                    <p className="font-cinzel text-slate-800 text-[10px] tracking-[0.4em] uppercase mb-2">Sealed for you</p>
                    <p className="font-serif italic text-slate-600 text-lg">{selectedScroll.title}</p>
                  </div>

                  <div className="relative">
                    <motion.div
                      animate={{ scale: isMelting ? 1.1 : 1 }}
                      className="relative w-24 h-24 rounded-full bg-red-900 shadow-xl flex items-center justify-center cursor-pointer overflow-hidden border-2 border-red-950/20"
                      onMouseDown={() => setIsMelting(true)}
                      onMouseUp={() => setIsMelting(false)}
                      onMouseLeave={() => setIsMelting(false)}
                    >
                      <span className="font-serif text-sacred-gold/80 text-4xl">𝄐</span>
                      
                      {/* Melting Animation */}
                      {isMelting && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-orange-500/40 to-transparent mix-blend-overlay"
                        />
                      )}
                      {meltProgress > 0 && (
                        <motion.div 
                          className="absolute inset-0 bg-red-800/80 backdrop-blur-[2px]"
                          style={{ clipPath: `inset(${100 - meltProgress}% 0 0 0)` }}
                        />
                      )}
                    </motion.div>
                    
                    {isMelting && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                        className="absolute -inset-4 border-2 border-orange-500/20 rounded-full blur-md"
                      />
                    )}
                  </div>

                  <p className="font-rajdhani text-slate-400 text-[10px] uppercase tracking-widest mt-4">
                    {isMelting ? "The wax is yielding..." : "Hold seal to melt"}
                  </p>
               </div>
            </div>
            
            <button 
              onClick={closeScroll}
              className="mt-12 text-white/20 hover:text-white/60 font-cinzel text-[10px] tracking-widest uppercase transition-all"
            >
              Return to Apothecary
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="reading"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="relative w-full h-full flex items-center justify-center p-8"
          >
            <div className="max-w-3xl w-full h-full bg-[#fdfaf5] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-lg p-12 md:p-24 overflow-y-auto custom-scrollbar relative">
              <button 
                onClick={closeScroll}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-16">
                <div className="text-center">
                  <p className="font-cinzel text-slate-400 text-[10px] tracking-[0.5em] uppercase mb-4">A Sacred Epistle</p>
                  <h2 className="font-serif text-3xl text-slate-900">{selectedScroll.greeting}</h2>
                </div>

                <div className="space-y-12 relative">
                  {selectedScroll.mainText.map((paragraph, idx) => (
                    <div key={idx} className="group relative">
                      <p className="font-serif text-xl md:text-2xl text-slate-800/30 leading-relaxed transition-opacity duration-1000">
                        {paragraph}
                      </p>
                      
                      {/* Hidden Notes revealed by candle cursor (simulated by checking distance in actual app, here using group hover for simplicity or masking) */}
                      {selectedScroll.hiddenNotes[idx] && (
                        <div className="mt-4 overflow-hidden h-0 group-hover:h-auto transition-all duration-700">
                          <p className="font-serif italic text-sacred-gold text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-500">
                            {selectedScroll.hiddenNotes[idx]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Candle Cursor Spotlight Mask (CSS implementation) */}
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{
                      background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, white 0%, transparent 100%)`
                    }}
                  />
                  {/* This CSS mask would actually reveal the text. For simplicity in React: */}
                  <div 
                    className="absolute inset-0 pointer-events-none text-slate-800 font-serif text-xl md:text-2xl leading-relaxed"
                    style={{
                      clipPath: `circle(150px at ${mousePos.x - (containerRef.current?.offsetLeft || 0)}px ${mousePos.y - (containerRef.current?.offsetTop || 0)}px)`,
                    }}
                  >
                    {selectedScroll.mainText.map((paragraph, idx) => (
                      <p key={idx} className="mb-12 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-16 border-t border-slate-200 text-center">
                  <p className="font-serif italic text-slate-500 text-xl">{selectedScroll.closing}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
