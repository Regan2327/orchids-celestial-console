"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Play, Volume2, Save, Sparkles, Music, Star, Wind } from "lucide-react";
import GlassPanel from "./GlassPanel";
import { cn } from "@/lib/utils";

export default function ResonanceChamber() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [visualData, setVisualData] = useState<{ pitch: number; volume: number; key: number; color: string }[]>([]);
  const [audioData, setAudioData] = useState<number[]>(new Array(20).fill(5));
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  // Simulation of recording data
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        const pitch = Math.random() * 100;
        const volume = Math.random() * 80 + 20;
        const colors = ["#FFD700", "#87CEEB", "#FFFFFF"]; // Gold, Blue, White
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        setVisualData(prev => [...prev.slice(-150), { pitch, volume, key: Date.now(), color }]);
        setAudioData(new Array(20).fill(0).map(() => Math.random() * 100));
      }, 80);
    } else {
      setAudioData(new Array(20).fill(5));
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSave = () => {
    setIsSaving(true);
    // Simulation of "Crystal Press"
    setTimeout(() => {
      setIsSaving(false);
      setVisualData([]);
    }, 2500);
  };

  const moods = ["Gothic Cathedral", "Disney Princess", "Jazz Club", "Ocean Mist"];

  return (
    <div className="flex flex-col gap-6 p-2 h-[calc(100vh-14rem)] relative overflow-hidden">
      {/* 3D Starfield Background */}
      <div className="absolute inset-0 -z-10 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,transparent_70%)] opacity-50" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{ 
              duration: 3 + Math.random() * 5, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <GlassPanel className="flex-1 flex flex-col items-center justify-between p-12 relative overflow-hidden bg-slate-950/40 border-sacred-gold/5 backdrop-blur-3xl">
        
        {/* The Golden Rose Window (Hub) */}
        <motion.div 
          animate={{ 
            rotate: isRecording || isPlaying ? 360 : 1,
            scale: isRecording ? 1.1 : 1,
            opacity: isRecording ? 0.2 : 0.05
          }}
          transition={{ 
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        >
          <div className="w-full h-full rounded-full border-[1px] border-sacred-gold/40 flex items-center justify-center">
             <div className="w-5/6 h-5/6 rounded-full border-[1px] border-sacred-gold/30" />
             <div className="w-4/6 h-4/6 rounded-full border-[1px] border-sacred-gold/20" />
             {[0, 30, 60, 90, 120, 150].map(deg => (
               <div key={deg} className="absolute w-[1px] h-full bg-sacred-gold/10" style={{ transform: `rotate(${deg}deg)` }} />
             ))}
          </div>
        </motion.div>

        {/* Strings of Light Visualizer (Harp) */}
        <div className="absolute inset-x-0 top-[20%] bottom-[20%] flex justify-between px-32 pointer-events-none opacity-40">
          {audioData.map((val, i) => (
            <motion.div
              key={i}
              animate={{ 
                scaleX: isRecording || isPlaying ? [1, 1.5, 1] : 1,
                opacity: isRecording || isPlaying ? 0.8 : 0.2,
                boxShadow: isRecording || isPlaying ? `0 0 ${val/2}px rgba(255,215,0,0.5)` : "none"
              }}
              transition={{ repeat: Infinity, duration: 0.1 + (i * 0.01) }}
              className="w-[1px] h-full bg-gradient-to-b from-transparent via-sacred-gold to-transparent"
            />
          ))}
        </div>

        {/* Starlight Spectrogram (Recording Canvas) */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <AnimatePresence>
            {isRecording && (
              <div className="absolute inset-0 flex items-center justify-center">
                {visualData.map((star, i) => (
                  <motion.div
                    key={star.key}
                    initial={{ opacity: 0, scale: 0, x: 400 }}
                    animate={{ 
                      opacity: star.volume / 100, 
                      scale: star.volume / 80,
                      x: -((visualData.length - i) * 6) + 300,
                      y: (star.pitch - 50) * 4
                    }}
                    exit={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
                    className="absolute w-2 h-2 rounded-full blur-[1px]"
                    style={{ 
                      backgroundColor: star.color,
                      boxShadow: `0 0 15px ${star.color}`
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {!isRecording && !isSaving && visualData.length === 0 && (
            <div className="text-center space-y-8 max-w-md">
              <motion.div 
                animate={{ 
                  boxShadow: ["0 0 20px rgba(255,215,0,0.1)", "0 0 60px rgba(255,215,0,0.3)", "0 0 20px rgba(255,215,0,0.1)"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 rounded-full border border-sacred-gold/20 mx-auto flex items-center justify-center bg-sacred-gold/5"
              >
                <Mic className="w-12 h-12 text-sacred-gold/60" />
              </motion.div>
              <div>
                <h3 className="font-cinzel text-sacred-gold tracking-[0.4em] text-lg mb-2">Resonance Chamber</h3>
                <p className="font-rajdhani text-white/40 tracking-[0.2em] text-[10px] uppercase">A Sanctuary for Sound</p>
              </div>
            </div>
          )}

          {/* Crystal Press Animation */}
          <AnimatePresence>
            {isSaving && (
              <motion.div
                initial={{ scale: 3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex flex-col items-center gap-12"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-12 border-2 border-dashed border-sacred-gold/20 rounded-full"
                  />
                  <div className="w-40 h-56 bg-gradient-to-br from-white/10 to-sacred-gold/20 backdrop-blur-3xl border border-sacred-gold/40 rounded-xl relative overflow-hidden shadow-[0_0_80px_rgba(255,215,0,0.3)] flex items-center justify-center">
                    <motion.div 
                      animate={{ y: ["120%", "-20%"] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-x-0 h-1/2 bg-sacred-gold/30 blur-2xl"
                    />
                    <Sparkles className="w-16 h-16 text-sacred-gold" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-cinzel text-sacred-gold tracking-[0.6em] text-sm animate-pulse uppercase">Compressing Starlight</p>
                  <p className="font-rajdhani text-white/20 text-[10px] uppercase tracking-widest mt-2">Saving to Treasury...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mood Selection & Controls */}
        <div className="relative z-20 w-full flex flex-col items-center gap-8">
          <div className="flex gap-4">
            {moods.map(mood => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={cn(
                  "px-4 py-2 rounded-full border text-[10px] font-cinzel tracking-widest uppercase transition-all",
                  selectedMood === mood 
                    ? "bg-sacred-gold/20 border-sacred-gold text-sacred-gold" 
                    : "border-white/10 text-white/40 hover:border-white/30"
                )}
              >
                {mood}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-16">
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 relative group",
                  isRecording 
                    ? "bg-red-500/20 border border-red-500 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]" 
                    : "bg-sacred-gold text-slate-950 shadow-[0_0_30px_#FFD700] hover:scale-110"
                )}
              >
                <AnimatePresence>
                  {isRecording && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 bg-red-500 rounded-full"
                    />
                  )}
                </AnimatePresence>
                {isRecording ? <Square className="w-10 h-10 fill-current z-10" /> : <Mic className="w-10 h-10 z-10" />}
              </button>
              <span className="font-rajdhani text-[11px] uppercase tracking-[0.4em] text-white/40">
                {isRecording ? "Capturing Spirit" : "Record Voice"}
              </span>
            </div>
  
            <div className="flex flex-col items-center gap-4">
              <button
                disabled={isRecording || visualData.length === 0}
                onClick={handleSave}
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-sacred-gold hover:border-sacred-gold/40 transition-all disabled:opacity-10 group"
              >
                <Save size={24} className="group-hover:scale-110 transition-transform" />
              </button>
              <span className="font-rajdhani text-[9px] uppercase tracking-[0.3em] text-white/20">Crystal Press</span>
            </div>
  
            <div className="flex flex-col items-center gap-4">
              <button
                disabled={isRecording || visualData.length === 0}
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-sacred-gold hover:border-sacred-gold/40 transition-all disabled:opacity-10 group"
              >
                {isPlaying ? <Square size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              <span className="font-rajdhani text-[9px] uppercase tracking-[0.3em] text-white/20">Relive Session</span>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* The Treasury Artifacts (Crystal Shards) */}
      <div className="h-44 flex gap-6">
        {[1, 2, 3, 4].map(i => (
          <GlassPanel key={i} className="flex-1 group hover:border-sacred-gold/40 transition-all cursor-pointer bg-slate-900/40 border-sacred-gold/5 flex flex-col items-center justify-center gap-3 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-sacred-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="w-14 h-20 bg-white/5 rounded border border-white/10 flex items-center justify-center group-hover:bg-sacred-gold/20 group-hover:border-sacred-gold/40 shadow-xl"
            >
              <Music size={20} className="text-white/20 group-hover:text-sacred-gold" />
            </motion.div>
            <div className="text-center">
              <span className="font-rajdhani text-[9px] uppercase tracking-[0.2em] text-white/30 block">Artifact #{i}</span>
              <span className="font-cinzel text-[8px] text-sacred-gold/40 block mt-1">2:45 • Orchestral</span>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
