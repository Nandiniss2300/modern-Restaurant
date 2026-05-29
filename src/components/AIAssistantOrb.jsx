import { useState } from "react";
import MoodChat from "./MoodChat";
import { useMood } from "../context/MoodContext";

function AIAssistantOrb() {
  const [isOpen, setIsOpen] = useState(false);
  const { moodData } = useMood();

  // Make sure moodData is available before rendering
  if (!moodData) return null;

  return (
    <>
      <div 
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Ambient Pulsing Glow Aura */}
        <div 
          className={`absolute w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-1000 bg-gradient-to-tr ${moodData.orbGradient || 'from-lime-400 to-emerald-500'} animate-pulse-slow`}
        ></div>
        
        {/* Rotating Outer Orbital Ring 1 */}
        <div className="absolute w-20 h-20 rounded-full border-2 border-white/10 border-dashed animate-spin-slow pointer-events-none group-hover:border-white/30 group-hover:scale-105 transition-all duration-700"></div>

        {/* Rotating Inner Orbital Ring 2 (Counter-rotated) */}
        <div 
          className={`absolute w-16 h-16 rounded-full border border-dashed pointer-events-none group-hover:scale-110 transition-all duration-700`}
          style={{
            borderColor: moodData.glowColor || 'rgba(255,255,255,0.2)',
            animation: 'spin-slow 8s linear infinite reverse'
          }}
        ></div>
        
        {/* Core Glassmorphic Orb Sphere */}
        <div className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 bg-black/60 backdrop-blur-xl border border-white/30 overflow-hidden">
          {/* Internal core color blob */}
          <div className={`absolute inset-0.5 rounded-full bg-gradient-to-tr ${moodData.orbGradient || 'from-lime-400 to-emerald-500'} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-full pointer-events-none"></div>
          
          <span className="text-2xl z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            ✨
          </span>
        </div>

        {/* Float label on hover */}
        <div className="absolute right-16 bg-black border-2 border-white px-3 py-1 font-black uppercase text-xs tracking-widest text-white whitespace-nowrap shadow-[4px_4px_0_0_white] opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
          Vibe Check AI 📡
        </div>
      </div>

      <MoodChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default AIAssistantOrb;
