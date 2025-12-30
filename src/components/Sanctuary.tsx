"use client";

import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";
import { Music, Quote, Send, Sparkles } from "lucide-react";

export default function Sanctuary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {/* Widget A: Liturgical Status */}
      <GlassPanel className="col-span-full lg:col-span-2 min-h-[200px] flex flex-col justify-center border-l-4 border-l-sacred-gold">
        <div className="flex items-center gap-4 mb-2">
          <Sparkles className="text-sacred-gold w-5 h-5" />
          <span className="text-white/40 font-rajdhani uppercase tracking-[0.3em] text-xs">Liturgical State</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-cinzel text-white leading-tight">
          Season of <span className="text-sacred-gold gold-glow">Christmas</span>
        </h1>
        <p className="text-white/60 font-rajdhani mt-4 text-lg">
          A time of holy birth, infinite worth, and the return of light to the world.
        </p>
      </GlassPanel>

      {/* Widget B: Daily Verse */}
      <GlassPanel className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Quote className="text-sacred-gold w-5 h-5 rotate-180" />
          <span className="text-white/40 font-rajdhani uppercase tracking-widest text-xs">Sacred Scripture</span>
        </div>
        <div className="flex-1 flex flex-col justify-center italic text-lg text-white/90 font-serif leading-relaxed">
          "The light shines in the darkness, and the darkness has not overcome it."
          <span className="text-sacred-gold font-cinzel text-xs mt-4 not-italic">— John 1:5</span>
        </div>
      </GlassPanel>

      {/* Widget C: Quick Prayer */}
      <GlassPanel className="flex flex-col gap-4">
        <h3 className="text-sm font-cinzel text-sacred-gold">Cast a Care</h3>
        <div className="relative flex-1">
          <textarea 
            placeholder="Whisper your intention..."
            className="w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-rajdhani focus:outline-none focus:border-sacred-gold/50 transition-all resize-none placeholder:text-white/20"
          />
          <button className="absolute bottom-4 right-4 p-2 bg-sacred-gold/20 rounded-lg hover:bg-sacred-gold/40 transition-all text-sacred-gold">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </GlassPanel>

      {/* Widget D: Mini Music Player */}
      <GlassPanel className="lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Music className="text-sacred-gold w-5 h-5" />
            <h3 className="text-sm font-cinzel text-sacred-gold">Active Resonance</h3>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ height: [8, 20, 12, 24, 8] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                className="w-1 bg-sacred-gold/40 rounded-full"
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-sacred-gold/10 border border-sacred-gold/20 flex items-center justify-center">
            <Music className="text-sacred-gold w-8 h-8 opacity-50" />
          </div>
          <div className="flex-1">
            <h4 className="font-rajdhani font-bold text-white text-lg">O Holy Night</h4>
            <p className="text-white/40 text-sm font-rajdhani uppercase tracking-wider">Cathedral Choir • 432Hz</p>
          </div>
          <div className="flex gap-4">
             <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
               <span className="text-lg">«</span>
             </button>
             <button className="w-12 h-12 rounded-full bg-sacred-gold flex items-center justify-center text-slate-950 shadow-[0_0_15px_#FFD700] hover:scale-105 transition-transform">
               <span className="text-xl">▶</span>
             </button>
             <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
               <span className="text-lg">»</span>
             </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
