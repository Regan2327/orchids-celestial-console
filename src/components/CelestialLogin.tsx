"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

interface CelestialLoginProps {
  onUnlock: (name: string) => void;
}

export default function CelestialLogin({ onUnlock }: CelestialLoginProps) {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [isTopFocused, setIsTopFocused] = useState(false);
  const [isBottomFocused, setIsBottomFocused] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showFiatLux, setShowFiatLux] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const isReady = name.length > 0 && secret.toLowerCase() === "angel" && name.toLowerCase() === "sharon";

  const handleUnlock = () => {
    if (isReady) {
      setIsUnlocking(true);
      setTimeout(() => setShowFiatLux(true), 500);
      setTimeout(() => setShowWelcome(true), 2000);
      setTimeout(() => {
        onUnlock(name);
      }, 5500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center overflow-hidden font-cinzel select-none">
      {/* 1. The Atmosphere (The Void) */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.2)_0%,transparent_70%)]"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Holy Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sacred-gold rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, "-20px", "20px"],
              opacity: [0.1, 0.4, 0.1],
              transition: {
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {!showFiatLux && (
          <motion.div 
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="relative flex flex-col items-center gap-12 z-20"
          >
            {/* 2. The Living Rose Window */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              {/* Outer Rotating Ring (Sacred Geometry) */}
              <motion.div
                className="absolute inset-0 border-2 border-dashed border-slate-800 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 border border-dashed border-slate-800/50 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />

              {/* The Rose Window SVG */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <defs>
                  <radialGradient id="blueGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Dark Iron Framework */}
                <g fill="none" stroke="#1e293b" strokeWidth="1.5">
                  <circle cx="100" cy="100" r="90" />
                  {[...Array(12)].map((_, i) => (
                    <line 
                      key={i}
                      x1="100" y1="100" 
                      x2={100 + 90 * Math.cos((i * 30 * Math.PI) / 180)}
                      y2={100 + 90 * Math.sin((i * 30 * Math.PI) / 180)}
                    />
                  ))}
                  <circle cx="100" cy="100" r="40" />
                </g>

                {/* Upper Arc (Restoring Truth) */}
                <motion.path
                  d="M 10 100 A 90 90 0 0 1 190 100 L 100 100 Z"
                  fill="url(#blueGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTopFocused || name ? 0.6 : 0 }}
                  transition={{ duration: 1 }}
                />

                {/* Lower Arc (Restoring Love) */}
                <motion.path
                  d="M 10 100 A 90 90 0 0 0 190 100 L 100 100 Z"
                  fill="url(#goldGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isBottomFocused || secret ? 0.6 : 0 }}
                  transition={{ duration: 1 }}
                />

                {/* The Center Seal */}
                <motion.circle
                  cx="100" cy="100" r="25"
                  className="cursor-pointer"
                  fill={isReady ? "#FFD700" : "#0f172a"}
                  stroke="#FFD700"
                  strokeWidth="2"
                  animate={isReady ? { 
                    scale: [1, 1.1, 1],
                    boxShadow: ["0 0 0px #FFD700", "0 0 20px #FFD700", "0 0 0px #FFD700"]
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  onClick={handleUnlock}
                />
              </svg>

              {/* Sparkles on focus */}
              {(isTopFocused || isBottomFocused) && (
                <motion.div
                  className="absolute pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                   <Sparkles className="text-sacred-gold w-6 h-6 animate-pulse" />
                </motion.div>
              )}
            </div>

            {/* 3. The Sacred Tablets (Input Fields) */}
            <div className="flex flex-col gap-8 w-80">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="PILGRIM NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  onFocus={() => setIsTopFocused(true)}
                  onBlur={() => setIsTopFocused(false)}
                  className={`w-full bg-transparent border-b border-slate-800 py-3 text-center outline-none transition-all duration-700 placeholder:text-slate-700 tracking-[0.2em] ${isTopFocused ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "text-slate-400"}`}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-400"
                  initial={{ width: 0 }}
                  animate={{ width: isTopFocused ? "100%" : 0 }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <div className="relative group">
                <input
                  type="password"
                  placeholder="SECRET WORD"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  onFocus={() => setIsBottomFocused(true)}
                  onBlur={() => setIsBottomFocused(false)}
                  className={`w-full bg-transparent border-b border-slate-800 py-3 text-center outline-none transition-all duration-700 placeholder:text-slate-700 tracking-[0.2em] ${isBottomFocused ? "text-rose-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "text-slate-400"}`}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-rose-600 to-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: isBottomFocused ? "100%" : 0 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Narrative Footer (The Whispers) */}
            <div className="h-8 flex items-center justify-center text-center px-4">
              <AnimatePresence mode="wait">
                {isTopFocused && !isBottomFocused && (
                  <motion.p
                    key="whisper1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-blue-400/80 italic text-sm tracking-widest"
                  >
                    "Your presence brings color to the greyest days."
                  </motion.p>
                )}
                {isBottomFocused && (
                  <motion.p
                    key="whisper2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-rose-200/80 italic text-sm tracking-widest"
                  >
                    "Your voice brings light to the darkest rooms."
                  </motion.p>
                )}
                {isReady && !isTopFocused && !isBottomFocused && (
                  <motion.p
                    key="whisper3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sacred-gold italic text-sm tracking-widest"
                  >
                    "The Sanctuary is ready. Press the Seal."
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. The "Fiat Lux" Transition */}
      <AnimatePresence>
        {showFiatLux && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-black"
          >
            {/* The Overload Orb */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 100, opacity: [1, 1, 0] }}
              transition={{ duration: 2, ease: "easeIn" }}
              className="absolute w-10 h-10 rounded-full bg-white shadow-[0_0_100px_50px_rgba(255,255,255,1)] mix-blend-screen"
            />
            
            {/* The Cinematic Reveal */}
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 1.5 }}
                  className="text-center"
                >
                  <motion.h2 
                    initial={{ letterSpacing: "1em", opacity: 0 }}
                    animate={{ letterSpacing: "0.4em", opacity: 1 }}
                    className="text-sacred-gold text-4xl mb-4 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
                  >
                    WELCOME HOME, {name}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1 }}
                    className="text-white text-sm italic tracking-[0.2em]"
                  >
                    "The world asks for your strength. This place asks for nothing."
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
