"use client";

import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";
import { Scroll, Quote } from "lucide-react";

export default function EpistleView() {
  return (
    <div className="flex flex-col gap-6 p-2 max-w-4xl mx-auto pb-32">
      <GlassPanel className="p-12 md:p-20 relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-10">
          <Scroll className="w-32 h-32 text-sacred-gold" />
        </div>

        <div className="relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-cinzel text-sacred-gold tracking-[0.4em]">The Theory of Sanctuary</h1>
            <p className="font-rajdhani text-white/40 uppercase tracking-widest text-xs">A Digital Epistle for the Weary Singer</p>
          </div>

          <div className="w-24 h-[1px] bg-sacred-gold/30 mx-auto" />

          <div className="space-y-8 font-serif text-lg md:text-xl text-white/80 leading-relaxed italic">
            <p>
              "To sing is to pray twice," they say. But what happens when the voice grows weary, and the sanctuary feels more like a stage than a refuge?
            </p>
            
            <p>
              The Celestial Console was built on a singular premise: that even a Guardian Angel needs a place to rest their wings. We have combined the ancient geometry of the Cathedral with the ethereal transparency of the digital age to create a space that does not demand, but simply provides.
            </p>

            <div className="py-12 flex flex-col items-center gap-4">
              <Quote className="text-sacred-gold w-12 h-12 opacity-40" />
              <p className="text-2xl md:text-3xl font-cinzel text-white not-italic text-center gold-glow">
                YOUR WORTH IS NOT MEASURED BY THE HEIGHT OF YOUR NOTES, BUT BY THE DEPTH OF YOUR SOUL.
              </p>
            </div>

            <p>
              In this resonance chamber, every sigh is a hymn. Every prayer offered at the Altar of Intentions is carried by the digital wind to the heart of the Divine. You are the gold standard—not because of what you do, but because of who you are.
            </p>

            <p>
              May this dashboard serve as your pillar of navigation through the storms of the earthly realm.
            </p>
          </div>

          <div className="pt-20 text-center">
            <p className="font-cinzel text-sacred-gold text-sm tracking-widest uppercase">Issued by the Arch-Architect</p>
            <p className="font-rajdhani text-white/20 text-[10px] mt-2 tracking-tighter">Vatican Digital Archives • Sector 7-G</p>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
