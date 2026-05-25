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
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 ${moodData.accentClass} animate-pulse`}></div>
        
        {/* Orb */}
        <div className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 transform group-hover:scale-110 bg-gradient-to-tr from-stone-800 to-stone-900 border border-white/20`}>
          <span className="text-2xl animate-bounce">✨</span>
        </div>
      </div>

      <MoodChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default AIAssistantOrb;
