import { useState } from "react";
import { useMood } from "../context/MoodContext";

function Confetti() {
  const [particles] = useState(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 2.5}s`,
      color: ["#a3e635", "#d946ef", "#ec4899", "#22d3ee", "#818cf8"][Math.floor(Math.random() * 5)]
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
      {particles.map(p => (
        <div 
          key={p.id}
          className="absolute w-2.5 h-2.5 rotate-12 animate-[fall_linear_infinite]"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            backgroundColor: p.color,
            top: '-20px'
          }}
        ></div>
      ))}
      <style>{`
        @keyframes fall {
          0% { top: -20px; transform: rotate(0deg); opacity: 1; }
          100% { top: 100%; transform: translateY(700px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function DatePlanner() {
  const { moodData } = useMood();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", partner: "", occasion: "Date Night", time: "19:00" });
  const [stickers, setStickers] = useState({ showPoll: true, showLocation: true, timestampStyle: "12hr" });
  const [isGenerating, setIsGenerating] = useState(false);

  if (!moodData) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setStep(3);
      setIsGenerating(false);
    }, 2000);
  };

  // Convert 24hr format to 12hr AM/PM if needed
  const formatTime = (timeStr) => {
    if (stickers.timestampStyle === "24hr") return timeStr;
    const [hourStr, minStr] = timeStr.split(":");
    const hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minStr} ${ampm}`;
  };

  return (
    <div className="text-white min-h-screen pt-28 pb-20 px-6 font-outfit relative">
      {/* Background brutalist glow */}
      <div 
        className="absolute top-20 left-10 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${moodData.glowColor} 0%, transparent 80%)`
        }}
      ></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {step === 1 && (
          <div 
            className="bg-black border-4 border-white p-8 md:p-12 max-w-2xl w-full relative transition-all duration-300"
            style={{
              boxShadow: `12px 12px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}`
            }}
          >
            <div className="absolute -top-6 -right-6 bg-white text-black px-4 py-2 border-4 border-black font-black uppercase text-xl rotate-12 shadow-[4px_4px_0_0_black]">
              Step 1
            </div>

            <div className="mb-10 border-b-4 border-white pb-6">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                STORY <br/> <span className={moodData.textAccent} style={{ filter: `drop-shadow(0 0 8px ${moodData.glowColor})` }}>INVITE.</span>
              </h1>
              <p className="text-xl font-bold bg-zinc-900 inline-block p-2 border-2 border-white/20 uppercase tracking-widest">
                Configure your custom IG Story Card
              </p>
            </div>
            
            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase tracking-widest text-xs mb-2">Main Character (You)</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full bg-black border-4 border-white px-5 py-4 text-white font-bold focus:outline-none focus:border-white focus:shadow-[4px_4px_0_0_white] transition-all uppercase ${moodData.textAccent}`} placeholder="e.g. ALEX" />
                </div>
                <div>
                  <label className="block font-black uppercase tracking-widest text-xs mb-2">The Plus One</label>
                  <input type="text" value={formData.partner} onChange={(e) => setFormData({...formData, partner: e.target.value})} className={`w-full bg-black border-4 border-white px-5 py-4 text-white font-bold focus:outline-none focus:border-white focus:shadow-[4px_4px_0_0_white] transition-all uppercase ${moodData.textAccent}`} placeholder="e.g. SAM" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase tracking-widest text-xs mb-2">The Vibe</label>
                  <select value={formData.occasion} onChange={(e) => setFormData({...formData, occasion: e.target.value})} className="w-full bg-black border-4 border-white px-5 py-4 text-white font-bold focus:outline-none focus:shadow-[4px_4px_0_0_white] transition-all appearance-none rounded-none uppercase">
                    <option>Date Night</option>
                    <option>Anniversary</option>
                    <option>Birthday</option>
                    <option>Just Vibes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-black uppercase tracking-widest text-xs mb-2">Drop Time</label>
                  <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full bg-black border-4 border-white px-5 py-4 text-white font-bold focus:outline-none focus:shadow-[4px_4px_0_0_white] transition-all" />
                </div>
              </div>

              {/* Sticker Customizer Panel */}
              <div className="border-4 border-white bg-zinc-950 p-6 shadow-[6px_6px_0_0_white]">
                <h3 className="font-black uppercase tracking-wider text-sm mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
                  <span>🎨</span> Custom Stickers
                </h3>
                <div className="space-y-3 font-bold text-sm uppercase">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={stickers.showPoll}
                      onChange={(e) => setStickers({ ...stickers, showPoll: e.target.checked })}
                      className="w-5 h-5 accent-black border-2 border-white cursor-pointer bg-black"
                    />
                    Include "You Coming?" Poll
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={stickers.showLocation}
                      onChange={(e) => setStickers({ ...stickers, showLocation: e.target.checked })}
                      className="w-5 h-5 accent-black border-2 border-white cursor-pointer bg-black"
                    />
                    Include Location Sticker
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-zinc-400">Time Format:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeformat"
                        checked={stickers.timestampStyle === "12hr"}
                        onChange={() => setStickers({ ...stickers, timestampStyle: "12hr" })}
                        className="accent-black cursor-pointer"
                      />
                      12-Hour
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="radio" 
                        name="timeformat"
                        checked={stickers.timestampStyle === "24hr"}
                        onChange={() => setStickers({ ...stickers, timestampStyle: "24hr" })}
                        className="accent-black cursor-pointer"
                      />
                      24-Hour
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.partner}
              className={`w-full py-5 border-4 border-black ${moodData.accentClass} text-black font-black text-2xl tracking-widest uppercase transition-all shadow-[8px_8px_0_0_white] hover:translate-y-1 hover:shadow-none disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none disabled:border-zinc-700 cursor-pointer`}
            >
              NEXT STEP 🚀
            </button>
          </div>
        )}

        {step === 2 && (
          <div 
            className="bg-black border-4 border-white p-12 max-w-xl w-full text-center relative transition-all duration-300"
            style={{
              boxShadow: `12px 12px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}`
            }}
          >
             <div className="absolute -top-6 -right-6 bg-white text-black px-4 py-2 border-4 border-black font-black uppercase text-xl rotate-12 shadow-[4px_4px_0_0_black]">
              Step 2
            </div>

            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 animate-pulse">AI IS COOKING... 🍳</h2>
            
            <div className="space-y-6 mb-12 text-left">
              <div className="flex items-center gap-6 bg-zinc-900 border-4 border-white p-6 shadow-[4px_4px_0_0_white]">
                <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0_0_black] animate-bounce">✨</div>
                <div>
                  <p className="text-xs font-black tracking-widest uppercase text-zinc-400">Current Vibe</p>
                  <p className={`font-black text-2xl uppercase ${moodData.textAccent}`}>{moodData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 bg-zinc-900 border-4 border-white p-6 shadow-[4px_4px_0_0_white]">
                <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center text-3xl shadow-[4px_4px_0_0_black] animate-bounce" style={{ animationDelay: "200ms" }}>🍽️</div>
                <div>
                  <p className="text-xs font-black tracking-widest uppercase text-zinc-400">Menu Paired</p>
                  <p className={`font-black text-2xl uppercase ${moodData.textAccent}`}>The {moodData.recommendedCategory} Edit</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              className={`w-full py-5 border-4 border-black ${moodData.accentClass} text-black font-black text-xl tracking-widest uppercase transition-all shadow-[8px_8px_0_0_white] hover:translate-y-1 hover:shadow-none cursor-pointer`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
                  RENDERING GRAPHIC...
                </span>
              ) : "GENERATE IG STORY 📸"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-lg flex flex-col items-center relative">
            
            {/* Visual celebration particles on mount */}
            <Confetti />

            <div className="text-center mb-8 bg-zinc-900 border-4 border-white p-6 shadow-[8px_8px_0_0_white] w-full">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">GRAPHIC READY 💅</h2>
              <p className="text-zinc-400 font-bold text-sm uppercase tracking-widest">Screenshot and post to your story.</p>
            </div>
            
            {/* THE IG STORY GRAPHIC (9:16 Aspect Ratio) */}
            <div className="w-full aspect-[9/16] relative overflow-hidden border-8 border-white bg-black flex flex-col justify-between p-8 group shadow-[15px_15px_0_0_white]">
              
              {/* Background gradient map based on mood */}
              <div className={`absolute inset-0 bg-gradient-to-br ${moodData.themeClass} opacity-40 mix-blend-screen`}></div>
              
              {/* Halftone / Noise Overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

              {/* Top Section */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="bg-white text-black px-4 py-2 font-black uppercase text-sm border-2 border-black rotate-[-3deg] shadow-[4px_4px_0_0_black]">
                  VibeCheck Invite
                </div>
                <div className={`bg-black border-2 border-white px-3 py-1 text-xs font-black uppercase ${moodData.textAccent}`}>
                  {formatTime(formData.time)}
                </div>
              </div>

              {/* Middle Section (Main Content) */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                
                <div className="relative">
                  <h3 className="text-6xl font-black uppercase tracking-tighter leading-none mix-blend-overlay opacity-50 absolute -top-4 -left-4 w-full">
                    {formData.occasion}
                  </h3>
                  <h3 className={`text-6xl font-black uppercase tracking-tighter leading-none ${moodData.textAccent}`}>
                    {formData.occasion}
                  </h3>
                </div>

                <div className="bg-black/80 backdrop-blur-md border-4 border-white p-6 w-full shadow-[8px_8px_0_0_white]">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">To:</p>
                  <p className="text-3xl font-black uppercase mb-4 text-white">@{formData.partner}</p>
                  
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">From:</p>
                  <p className="text-3xl font-black uppercase text-white">@{formData.name}</p>
                </div>
                
                <div className="inline-block border-2 border-black bg-white text-black px-4 py-2 font-black uppercase rotate-[2deg] shadow-[4px_4px_0_0_black]">
                  Mood: {moodData.name}
                </div>

              </div>
              
              {/* Bottom Section (IG Stickers) */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                
                {/* Custom IG Poll Sticker */}
                {stickers.showPoll && (
                  <div className="bg-white p-3 rounded-2xl w-full max-w-[200px] shadow-2xl rotate-[-2deg]">
                    <p className="text-black font-bold text-center text-sm mb-3">You coming?</p>
                    <div className="flex border-t border-zinc-200">
                      <div className="flex-1 text-center py-2 text-black font-black border-r border-zinc-200 text-sm">YES</div>
                      <div className="flex-1 text-center py-2 text-black font-black text-sm">HARD YES</div>
                    </div>
                  </div>
                )}

                {/* Location Sticker */}
                {stickers.showLocation && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-xl rotate-[3deg]">
                    <span className="text-black font-black text-sm uppercase">📍 VIBECHECK APP</span>
                  </div>
                )}

              </div>

            </div>
            
            <div className="mt-12 flex gap-4 w-full">
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-transparent border-4 border-white text-white font-black uppercase hover:bg-white hover:text-black transition-colors cursor-pointer">
                Start Over
              </button>
              <button onClick={() => alert("Image saved to downloads folder! 📸")} className={`flex-1 py-4 ${moodData.accentClass} border-4 border-white text-black font-black uppercase shadow-[6px_6px_0_0_white] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer`}>
                Download 📥
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DatePlanner;
