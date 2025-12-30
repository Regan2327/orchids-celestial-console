"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import GlassPanel from "./GlassPanel";
import { Wind, Sparkles, Send, User } from "lucide-react";
import { generateGuardianMessage } from "@/lib/actions";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AngelOrb({ isGold }: { isGold: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={isGold ? "#FFD700" : "#E2E8F0"}
          speed={3}
          distort={0.4}
          radius={1}
          emissive={isGold ? "#FFD700" : "#94A3B8"}
          emissiveIntensity={isGold ? 0.8 : 0.2}
          metalness={1}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function GuardianInterface() {
  const [messages, setMessages] = useState<{ role: 'angel' | 'user', text: string }[]>([
    { role: 'angel', text: "Peace be with you. I am your Guardian. Speak your heart, and I shall listen with the patience of eternity." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isGold, setIsGold] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput("");
    setIsTyping(true);
    
    const response = await generateGuardianMessage(userMessage);
    
    // Typing effect simulation
    let currentText = "";
    setMessages(prev => [...prev, { role: 'angel', text: "" }]);
    
    const words = response.split(" ");
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = currentText;
        return newMessages;
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setIsTyping(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-2 h-[calc(100vh-14rem)]">
      {/* Left Side: Angel Statue/Orb */}
      <GlassPanel className="lg:col-span-2 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={isGold ? "#FFD700" : "#FFFFFF"} />
            <AngelOrb isGold={isGold} />
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center mt-auto pb-8">
          <button 
            onClick={() => setIsGold(!isGold)}
            className={cn(
              "px-8 py-3 rounded-full font-cinzel text-sm transition-all duration-700",
              isGold 
                ? "bg-sacred-gold text-slate-950 shadow-[0_0_30px_#FFD700]" 
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            )}
          >
            {isGold ? "Ethereal Presence" : "Manifest Grace"}
          </button>
          <p className="mt-4 text-white/40 font-rajdhani uppercase tracking-[0.3em] text-[10px]">
            Touch to transform the guardian
          </p>
        </div>
      </GlassPanel>

      {/* Right Side: Chat Interface */}
      <GlassPanel className="lg:col-span-3 flex flex-col gap-4 p-0 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wind className="text-sacred-gold w-5 h-5" />
            <h3 className="font-cinzel text-sacred-gold">Celestial Communion</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-rajdhani text-white/40 uppercase tracking-widest">Presence active</span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar font-rajdhani"
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border",
                msg.role === 'user' ? "bg-white/5 border-white/10" : "bg-sacred-gold/10 border-sacred-gold/20"
              )}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white/60" /> : <Sparkles className="w-5 h-5 text-sacred-gold" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-white/5 border border-white/10 text-white/80 rounded-tr-none" 
                  : "bg-sacred-gold/5 border border-sacred-gold/20 text-white rounded-tl-none font-serif italic"
              )}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-2 p-4 text-sacred-gold/40">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }}>•</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>•</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>•</motion.span>
            </div>
          )}
        </div>

        <div className="p-6 bg-white/5 border-t border-white/5">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Whisper to your guardian..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-full px-6 py-4 pr-16 text-sm font-rajdhani focus:outline-none focus:border-sacred-gold/50 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 w-12 rounded-full bg-sacred-gold text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
