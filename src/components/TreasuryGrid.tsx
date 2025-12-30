"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GlassPanel from "./GlassPanel";
import { Gift, Music, Star, X, Ticket, Heart } from "lucide-react";

const gifts = [
  {
    id: "gold",
    title: "The Gold Standard",
    description: "Definition of Worth",
    icon: Star,
    color: "#FFD700",
    message: "You are the Gold Standard of my life. Your resilience and grace are more precious than the finest ore. This Emerald represents the depth of your soul.",
    visual: "💎"
  },
  {
    id: "silver",
    title: "The Silver Incense",
    description: "Resonant Playlist",
    icon: Music,
    color: "#C0C0C0",
    message: "Your voice is the incense that lifts the room. Here is a collection of resonances that match your frequency.",
    visual: "🎵"
  },
  {
    id: "bronze",
    title: "The Bronze Gift",
    description: "Surprise Manger",
    icon: Gift,
    color: "#CD7F32",
    message: "The sweetness of life is found in small surprises. Open to reveal the earthly delights prepared for you.",
    visual: "🎁",
    tabs: [
      { id: "ticket", label: "The Ticket", content: "Cinema Surprise: A private screening of your favorite classic, accompanied by starlight.", icon: Ticket },
      { id: "sweetness", label: "The Sweetness", content: "Chocolate Voucher: SACRED-COCOA-2024. Redeem for a box of artisanal truffles.", icon: Heart }
    ]
  }
];

export default function TreasuryGrid() {
  const [selectedGift, setSelectedGift] = useState<typeof gifts[0] | null>(null);
  const [activeTab, setActiveTab] = useState("ticket");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2 h-full">
      {gifts.map((gift, idx) => (
        <motion.div
          key={gift.id}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-full"
        >
          <GlassPanel 
            className="h-full flex flex-col items-center justify-center text-center gap-6 cursor-pointer group"
            delay={idx * 0.1}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center relative"
              style={{ background: `${gift.color}20`, border: `1px solid ${gift.color}40` }}
            >
              <gift.icon className="w-12 h-12" style={{ color: gift.color }} />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: gift.color }}
              />
            </div>
            
            <div>
              <h3 className="text-xl font-cinzel mb-2" style={{ color: gift.color }}>{gift.title}</h3>
              <p className="text-white/40 font-rajdhani uppercase tracking-widest text-xs">{gift.description}</p>
            </div>
            
            <button 
              onClick={() => setSelectedGift(gift)}
              className="px-6 py-2 rounded-full border border-white/10 hover:border-white/40 transition-all font-rajdhani text-sm"
            >
              Unveil
            </button>
          </GlassPanel>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <GlassPanel className="w-full max-w-2xl p-12 relative overflow-visible">
              <button 
                onClick={() => setSelectedGift(null)}
                className="absolute -top-12 right-0 text-white/40 hover:text-white flex items-center gap-2 font-rajdhani"
              >
                Close Treasury <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-4">
                    <selectedGift.icon className="w-8 h-8" style={{ color: selectedGift.color }} />
                    <h2 className="text-3xl font-cinzel" style={{ color: selectedGift.color }}>{selectedGift.title}</h2>
                  </div>
                  
                  <p className="text-xl font-serif italic text-white/90 leading-relaxed border-l-2 pl-6" style={{ borderColor: selectedGift.color }}>
                    {selectedGift.message}
                  </p>

                  {selectedGift.tabs ? (
                    <div className="space-y-4 pt-4">
                       <div className="flex gap-2">
                         {selectedGift.tabs.map(tab => (
                           <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-rajdhani uppercase tracking-tighter text-sm",
                              activeTab === tab.id 
                                ? "bg-white/10 border-white/20 text-white" 
                                : "border-transparent text-white/40 hover:text-white/60"
                            )}
                           >
                             <tab.icon className="w-4 h-4" />
                             {tab.label}
                           </button>
                         ))}
                       </div>
                       <motion.div
                         key={activeTab}
                         initial={{ opacity: 0, x: 10 }}
                         animate={{ opacity: 1, x: 0 }}
                         className="p-6 rounded-2xl bg-white/5 border border-white/5 font-rajdhani text-white/80"
                       >
                         {selectedGift.tabs.find(t => t.id === activeTab)?.content}
                       </motion.div>
                    </div>
                  ) : (
                    <div className="text-6xl pt-8 animate-bounce w-fit mx-auto">
                      {selectedGift.visual}
                    </div>
                  )}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
