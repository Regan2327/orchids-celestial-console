"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GlassPanel from "./GlassPanel";
import { Lock, Sparkles, Key } from "lucide-react";

interface AuthenticationProps {
  onAuthenticated: () => void;
}

export default function Authentication({ onAuthenticated }: AuthenticationProps) {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    // Basic gatekeeper logic
    if (name.toLowerCase() === "sister grace" && secret.toLowerCase() === "sanctuary") {
      onAuthenticated();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlassPanel className="w-full max-w-md p-12 text-center space-y-8 sacred-border border-sacred-gold/40">
          <div className="space-y-2">
            <div className="w-20 h-20 rounded-full bg-sacred-gold/10 border border-sacred-gold/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="text-sacred-gold w-8 h-8" />
            </div>
            <h1 className="text-3xl font-cinzel text-white tracking-[0.2em]">The Gatekeeper</h1>
            <p className="text-white/40 font-rajdhani uppercase tracking-widest text-[10px]">Identify yourself, Pilgrim</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Pilgrim Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-serif italic text-white placeholder:text-white/20 focus:outline-none focus:border-sacred-gold/50 transition-all"
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-sacred-gold/40 transition-colors" />
            </div>

            <div className="relative group">
              <input
                type="password"
                placeholder="Secret Word"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-serif italic text-white placeholder:text-white/20 focus:outline-none focus:border-sacred-gold/50 transition-all"
              />
              <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-focus-within:text-sacred-gold/40 transition-colors" />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-red-400 text-xs font-rajdhani uppercase tracking-widest"
            >
              Access Denied. The silence remains.
            </motion.p>
          )}

          <button
            onClick={handleLogin}
            className="w-full relative py-5 group overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 bg-sacred-gold transition-transform duration-500 group-hover:scale-105" />
            <span className="relative font-cinzel font-bold text-slate-950 tracking-[0.3em] flex items-center justify-center gap-3">
              Press Wax Seal
            </span>
            <div className="absolute inset-0 border-2 border-white/20 rounded-xl" />
          </button>

          <p className="text-[10px] font-rajdhani text-white/20 uppercase tracking-[0.4em]">
            Hint: Sister Grace / Sanctuary
          </p>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
