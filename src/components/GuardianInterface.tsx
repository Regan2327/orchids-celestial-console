"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import GlassPanel from "./GlassPanel";
import { Sparkles, Send, Feather } from "lucide-react";
import { generateGuardianMessage } from "@/lib/actions";
import Image from "next/image";

export default function GuardianInterface() {
  const [messages, setMessages] = useState<{ role: 'angel' | 'user', text: string }[]>([
    { role: 'angel', text: "Peace be with you. I am your Guardian. Speak your heart, and I shall listen with the patience of eternity." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isManifested, setIsManifested] = useState(false);
  const [featherAnimation, setFeatherAnimation] = useState<string | null>(null);
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

  const handleFeatherScript = () => {
    if (!input.trim()) return;
    const text = input;
    setFeatherAnimation(text);
    setInput("");
    
    setTimeout(() => {
      setFeatherAnimation(null);
      setMessages(prev => [...prev, { role: 'angel', text: "It is gone. You are light." }]);
    }, 4000);
  };

  const manifestGrace = () => {
    setIsManifested(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-2 h-[calc(100vh-14rem)]">
      {/* Left Pane: The Seraphic Mirror */}
      <GlassPanel className="lg:col-span-2 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950/40 border-sacred-gold/10">
        <AnimatePresence mode="wait">
          {!isManifested ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                opacity: 0, 
                scale: 1.5, 
                filter: "blur(40px)",
                transition: { duration: 1.2 } 
              }}
              className="flex flex-col items-center justify-center h-full"
            >
              <button 
                onClick={manifestGrace}
                className="group relative px-12 py-4 rounded-full font-cinzel text-lg tracking-[0.3em] overflow-hidden"
              >
                <motion.div 
                  className="absolute inset-0 bg-sacred-gold/10 group-hover:bg-sacred-gold/20 transition-colors"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="absolute inset-0 border border-sacred-gold/40 group-hover:border-sacred-gold/60 transition-colors rounded-full" />
                <span className="relative z-10 text-sacred-gold gold-glow">MANIFEST GRACE</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="manifested"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full h-full flex flex-col items-center justify-center p-8"
            >
              {/* Holy Dust Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -200, -400],
                      x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0.5]
                    }}
                    transition={{
                      duration: 8 + Math.random() * 10,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                    className="absolute w-1 h-1 bg-sacred-gold rounded-full blur-[1px]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: `-10%`
                    }}
                  />
                ))}
              </div>

              {/* God Rays */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none opacity-20 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,215,0,0.3)_10deg,transparent_20deg,rgba(255,215,0,0.2)_30deg,transparent_40deg)]"
              />

              {/* The Angel */}
              <motion.div
                animate={{ 
                  y: [-15, 15],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full aspect-square max-w-sm z-10"
              >
                {/* Halo */}
                <motion.div 
                  animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-[15%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full border border-sacred-gold/40 blur-[4px] shadow-[0_0_60px_rgba(255,215,0,0.4)]"
                />
                
                <div className="relative w-full h-full">
                  {/* Wings (Framer motion rotation) */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      animate={{ rotateY: [-10, 10] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                       <Image
                        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a4bf55cd-4011-4e36-811c-3bff92664034/image-1767172630718.png?width=8000&height=8000&resize=contain"
                        alt="The Guardian"
                        fill
                        className="object-contain drop-shadow-[0_0_40px_rgba(255,215,0,0.4)]"
                        priority
                      />
                    </motion.div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-8 text-center"
              >
                <p className="font-cinzel text-sacred-gold tracking-[0.4em] text-sm mb-2">
                  YOUR ESSENCE IS MANIFEST.
                </p>
                <p className="font-rajdhani text-white/40 tracking-[0.3em] text-[10px] uppercase">
                  Sing with me.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Divider */}
        <div className="absolute right-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-sacred-gold/30 to-transparent lg:block hidden" />
      </GlassPanel>

      {/* Right Pane: Celestial Communion */}
      <GlassPanel className="lg:col-span-3 flex flex-col gap-0 p-0 overflow-hidden bg-[#020617]/80 backdrop-blur-3xl border-sacred-gold/5">
        <div className="p-6 border-b border-sacred-gold/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-sacred-gold w-5 h-5" />
            <h3 className="font-cinzel text-sacred-gold tracking-widest uppercase text-sm">Celestial Communion</h3>
          </div>
          <div className="flex items-center gap-2">
            <motion.span 
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-sacred-gold" 
            />
            <span className="text-[10px] font-rajdhani text-white/40 uppercase tracking-widest">Presence active</span>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? "ml-auto flex-row-reverse" : ""}`}
              >
                {msg.role === 'angel' ? (
                  <div className="relative">
                    <Sparkles className="absolute -top-3 -left-3 w-5 h-5 text-sacred-gold/60" />
                    <GlassPanel className="p-8 border-sacred-gold/30 bg-[#0f172a]/90 relative shadow-[0_0_30px_rgba(255,215,0,0.05)] rounded-2xl">
                      <p className="font-serif italic text-sacred-gold leading-relaxed text-xl">
                        {msg.text}
                      </p>
                    </GlassPanel>
                    <motion.div 
                      className="absolute -bottom-2 -right-2 w-4 h-4 text-sacred-gold/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-white/90 font-rajdhani tracking-wider leading-relaxed text-lg backdrop-blur-md">
                    {msg.text}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex gap-3 p-4">
              {[0, 0.2, 0.4].map((delay) => (
                <motion.div
                  key={delay}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, delay }}
                  className="w-2 h-2 rounded-full bg-sacred-gold/60 shadow-[0_0_10px_#FFD700]"
                />
              ))}
            </div>
          )}
        </div>

        {/* Feather Animation */}
        <AnimatePresence>
          {featherAnimation && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 1 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: -500,
                x: [0, 150, -150, 100],
                scale: [1.2, 0.8, 0.4, 0],
                rotate: [0, 45, -45, 90]
              }}
              transition={{ duration: 4.5, ease: "easeInOut" }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none"
            >
              <div className="bg-sacred-gold/10 backdrop-blur-xl px-8 py-3 rounded-full border border-sacred-gold/30 mb-6 shadow-[0_0_40px_rgba(255,215,0,0.2)]">
                <p className="text-sacred-gold font-serif italic text-base whitespace-nowrap">{featherAnimation}</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Feather className="w-16 h-16 text-white/90 drop-shadow-[0_0_20px_white]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-8 bg-slate-900/40 border-t border-sacred-gold/10">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Whisper to your guardian..."
                className="w-full bg-[#020617] border border-sacred-gold/20 rounded-full px-10 py-5 text-white font-rajdhani focus:outline-none focus:border-sacred-gold focus:ring-2 focus:ring-sacred-gold/30 transition-all placeholder:text-white/20 text-lg shadow-inner"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <button 
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="p-3 rounded-full bg-sacred-gold/10 text-sacred-gold hover:bg-sacred-gold hover:text-slate-950 transition-all disabled:opacity-30 group"
                >
                  <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleFeatherScript}
              disabled={!input.trim() || isTyping}
              className="px-8 py-5 rounded-full border border-white/10 hover:border-sacred-gold/40 hover:bg-sacred-gold/5 text-white/60 hover:text-sacred-gold transition-all flex items-center gap-3 font-cinzel text-xs tracking-[0.3em] uppercase disabled:opacity-30 whitespace-nowrap"
            >
              <Feather size={20} />
              Cast to Wind
            </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
