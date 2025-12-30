"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import GlassPanel from "./GlassPanel";
import { Activity, Mic, Square, Play, Volume2, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AcousticSanctuary() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(40).fill(10));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSimulation = () => {
    setIsRecording(true);
    intervalRef.current = setInterval(() => {
      setAudioData(prev => prev.map(() => Math.random() * 80 + 20));
    }, 100);
  };

  const stopSimulation = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAudioData(new Array(40).fill(10));
  };

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div className="flex flex-col gap-6 p-2 h-full">
      <GlassPanel className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 mb-12">
          <Activity className="text-sacred-gold w-6 h-6 animate-pulse" />
          <h2 className="text-2xl font-cinzel text-sacred-gold uppercase tracking-[0.2em]">The Resonance Chamber</h2>
        </div>

        {/* Visualizer */}
        <div className="flex items-end gap-[2px] h-64 w-full max-w-2xl px-8 border-b border-sacred-gold/20 pb-4">
          {audioData.map((val, i) => (
            <motion.div
              key={i}
              animate={{ height: `${val}%` }}
              className="flex-1 rounded-t-full bg-gradient-to-t from-sacred-gold via-sacred-gold/40 to-transparent"
              style={{ boxShadow: isRecording ? "0 0 15px rgba(255, 215, 0, 0.3)" : "none" }}
            />
          ))}
        </div>

        <div className="mt-12 flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
             <button 
              onClick={isRecording ? stopSimulation : startSimulation}
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500",
                isRecording 
                  ? "bg-red-500/20 border-2 border-red-500 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
                  : "bg-sacred-gold text-slate-950 shadow-[0_0_20px_#FFD700] hover:scale-110"
              )}
            >
              {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
            </button>
            <span className="font-rajdhani text-[10px] uppercase tracking-widest text-white/40">
              {isRecording ? "Capturing Echo" : "Begin Recording"}
            </span>
          </div>

          <div className="w-[1px] h-12 bg-white/10" />

          <div className="flex flex-col items-center gap-2">
            <button className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <Play className="w-6 h-6 fill-current" />
            </button>
            <span className="font-rajdhani text-[10px] uppercase tracking-widest text-white/20">
              Playback Echo
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
           <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <Volume2 className="text-sacred-gold w-4 h-4" />
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-sacred-gold" />
              </div>
           </div>
           <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
              <span className="text-sacred-gold text-xs font-cinzel tracking-tighter">REVERB</span>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[60%] h-full bg-sacred-gold" />
              </div>
           </div>
        </div>
      </GlassPanel>

      <GlassPanel className="h-32 flex items-center justify-between px-12">
        <div className="flex items-center gap-4">
          <Waves className="text-sacred-gold w-6 h-6" />
          <div>
            <h4 className="font-rajdhani font-bold text-white">Convolution Filter</h4>
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Cathedral_IR_44100.wav</p>
          </div>
        </div>
        <div className="flex gap-4">
          {["Dry", "Wet", "Echo", "Sacred"].map(mode => (
            <button key={mode} className="px-4 py-2 rounded-lg border border-white/5 text-[10px] uppercase tracking-widest font-rajdhani hover:bg-sacred-gold/10 hover:text-sacred-gold transition-all">
              {mode}
            </button>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
