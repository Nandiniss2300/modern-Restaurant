import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "../context/MoodContext";
import dishes from "../data/dishes";

function Home() {
  const navigate = useNavigate();
  const { moodData, changeMood } = useMood();
  const [index, setIndex] = useState(0);

  const images = [
    "/images/biryani.jpg",
    "/images/pizza.jpg",
    "/images/burger.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const recommendedDishes = dishes.filter(d => 
    moodData.recommendedCategory === "all" || d.category === moodData.recommendedCategory
  ).slice(0, 3);

  const vibeOptions = [
    { id: "neutral", query: "neutral", name: "NPC Mode 🧍‍♂️", vibe: "Chill & low-key" },
    { id: "feral", query: "feral", name: "Goblin Mode 👺", vibe: "Goblin comfort style" },
    { id: "maincharacter", query: "main character", name: "Main Character 💅", vibe: "High-key aesthetic" },
    { id: "hype", query: "hype", name: "Lit Mode 🔋", vibe: "Pure high energy" },
    { id: "delulu", query: "delulu", name: "Delulu Era ☁️", vibe: "Dreamy soft vibe" }
  ];

  return (
    <div className="text-white min-h-screen bg-black overflow-hidden font-outfit relative">
      {/* Dynamic Floating Mesh Blob 1 */}
      <div 
        className="absolute top-24 left-1/4 w-[40vw] h-[40vw] rounded-full blur-[150px] mix-blend-screen opacity-10 animate-pulse-slow pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${moodData.glowColor} 0%, transparent 80%)`
        }}
      ></div>

      {/* Dynamic Floating Mesh Blob 2 */}
      <div 
        className="absolute top-[60vh] right-1/4 w-[35vw] h-[35vw] rounded-full blur-[130px] mix-blend-screen opacity-10 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${moodData.glowColor} 0%, transparent 80%)`,
          animation: 'pulse-slow 6s ease-in-out infinite'
        }}
      ></div>

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-16 px-6 border-b-4 border-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/adventure_hero.png"
            alt="Hero"
            className="w-full h-full object-cover opacity-30 saturate-150 contrast-125 transition-all duration-1000"
          />
          <div className={`absolute inset-0 opacity-70 mix-blend-color bg-gradient-to-tr ${moodData.themeClass} transition-all duration-1000`}></div>
          {/* Subtle Halftone Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
        </div>

        {/* Marquee Background */}
        <div className="absolute top-1/4 left-0 w-full overflow-hidden whitespace-nowrap opacity-5 -rotate-3 z-0 pointer-events-none select-none">
          <h1 className="text-[12rem] font-black uppercase text-white inline-block animate-[marquee_25s_linear_infinite]">
            VIBE CHECK VIBE CHECK VIBE CHECK
          </h1>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="inline-block px-4 py-2 mb-8 bg-white text-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_black] border-2 border-black rotate-2 select-none">
            ⚡ VIBE DETECTED: {moodData.name}
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-white mb-6 uppercase leading-[0.85] tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            MAIN <br/>
            <span className={`${moodData.textAccent} drop-shadow-none transition-colors duration-1000`}>CHARACTER</span> <br/>
            ENERGY.
          </h1>
          
          <p className="text-xl md:text-2xl font-bold bg-black border-4 border-white p-4 mb-10 max-w-xl shadow-[6px_6px_0_0_white]">
            "{moodData.message}"
          </p>

          <div className="flex flex-wrap gap-6 mt-4">
            <button
              onClick={() => navigate("/menu")}
              className={`${moodData.accentClass} text-black px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-black shadow-[8px_8px_0_0_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 cursor-pointer`}
            >
              Order Now 💸
            </button>
            <button 
              onClick={() => navigate("/smart-table")}
              className="bg-white text-black px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-black shadow-[8px_8px_0_0_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95 cursor-pointer"
            >
              Secure The Table 📍
            </button>
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <div 
        className="w-full text-black py-4 overflow-hidden border-b-4 border-black font-black uppercase text-xl whitespace-nowrap transition-all duration-1000"
        style={{
          backgroundColor: moodData.accentClass.includes("bg-lime-400") ? "#a3e635" : 
                           moodData.accentClass.includes("bg-fuchsia-500") ? "#d946ef" :
                           moodData.accentClass.includes("bg-pink-500") ? "#ec4899" :
                           moodData.accentClass.includes("bg-cyan-400") ? "#22d3ee" : "#818cf8"
        }}
      >
        <div className="animate-[marquee_12s_linear_infinite] inline-block">
           ✨ LIVE CROWD: {moodData.crowd.toUpperCase()} ✨ NOW PLAYING: {moodData.music.toUpperCase()} ✨ AESTHETIC: {moodData.vibe.toUpperCase()} ✨ LIVE CROWD: {moodData.crowd.toUpperCase()} ✨ NOW PLAYING: {moodData.music.toUpperCase()}
        </div>
      </div>

      {/* INTERACTIVE VIBE SELECTOR DASHBOARD */}
      <section className="py-20 relative z-10 bg-zinc-950 border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 border-b-2 border-white/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="inline-block px-3 py-1 mb-3 bg-white text-black font-black uppercase text-xs border-2 border-black rotate-[-1deg]">
                Vibe Control
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                MANUALLY <span className={moodData.textAccent}>TUNED.</span>
              </h2>
            </div>
            <p className="text-zinc-400 font-bold max-w-sm uppercase text-sm leading-snug">
              Wanna swap the mood? Override the AI sensor to adjust the environment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {vibeOptions.map((vibe) => {
              const isActive = moodData.id === vibe.id;
              return (
                <button
                  key={vibe.id}
                  onClick={() => changeMood(vibe.query)}
                  className={`p-6 border-4 text-left transition-all duration-300 transform cursor-pointer flex flex-col justify-between h-40 ${
                    isActive 
                      ? `${moodData.accentClass} border-white shadow-[6px_6px_0_0_white] scale-105 z-10` 
                      : 'bg-black border-zinc-700 text-zinc-400 hover:border-white hover:text-white hover:shadow-[4px_4px_0_0_white]'
                  }`}
                  style={{
                    boxShadow: isActive ? `6px 6px 0px 0px #ffffff, 0 10px 30px -5px ${moodData.glowColor}` : ''
                  }}
                >
                  <span className="font-black text-xl uppercase leading-tight">{vibe.name}</span>
                  <span className="text-xs font-bold opacity-80 mt-2 uppercase tracking-wide">{vibe.vibe}</span>
                </button>
              );
            })}
          </div>

          {/* DYNAMIC VIBE PORTAL ACTION CONTAINER */}
          <div 
            className="mt-12 bg-black border-4 border-white p-8 transition-all duration-500 relative overflow-hidden"
            style={{
              boxShadow: `10px 10px 0px 0px #ffffff, 0 15px 40px -10px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}`
            }}
          >
            {/* Pulsing decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${moodData.accentClass} blur-[60px] opacity-25 pointer-events-none`}></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Vibe Directive Active</span>
                <h3 className="text-3xl font-black uppercase tracking-tight mt-1 mb-2">
                  What is the move for <span className={moodData.textAccent}>{moodData.name}</span>?
                </h3>
                <p className="text-zinc-400 font-bold text-sm uppercase max-w-xl">
                  {moodData.id === "feral" && "GOBLIN MODE: Grab comforting fastfood from our Wok Star and Pre-Game selection, and lock in 'The Bunker' on the Vibe Map."}
                  {moodData.id === "maincharacter" && "MAIN CHARACTER: Order highly-aesthetic starters for your story and secure the 'Neon Alley' window seat immediately."}
                  {moodData.id === "hype" && "LIT MODE: Load up on drinks and pre-game bites, then link up at the 'DJ Booth' or 'VIP Couch' section."}
                  {moodData.id === "delulu" && "DELULU ERA: Treat yourself to our sweet treats collection and reserve the dreamy 'Vault 2' booth."}
                  {moodData.id === "neutral" && "NPC MODE: Low-key standard dining. Grab a bit of everything and choose any available Pit tables."}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 shrink-0">
                <button
                  onClick={() => navigate("/menu")}
                  className={`px-6 py-4 font-black uppercase text-sm border-4 border-black ${moodData.accentClass} text-black cursor-pointer shadow-[4px_4px_0_0_white] hover:translate-y-0.5 hover:shadow-none transition-all`}
                >
                  Explore paired eats 🍔
                </button>
                <button
                  onClick={() => navigate("/smart-table")}
                  className="px-6 py-4 font-black uppercase text-sm border-4 border-white bg-black text-white cursor-pointer shadow-[4px_4px_0_0_white] hover:translate-y-0.5 hover:shadow-none transition-all hover:bg-white hover:text-black hover:border-black"
                >
                  Locate target zone 📡
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FOR YOU PAGE TIKTOK STYLE FEED */}
      <section className="py-24 relative z-10 bg-black border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-6xl font-black uppercase text-white mb-2 tracking-tighter">
              FYP <span className={moodData.textAccent}>(For You Page)</span>
            </h2>
            <p className="text-zinc-400 text-xl font-bold uppercase">Aesthetic dishes handpicked for your {moodData.name} vibe.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recommendedDishes.map((dish, idx) => (
              <div 
                key={idx} 
                className="bg-black border-4 border-white group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[8px_8px_0_0_white] hover:shadow-[16px_16px_0_0_white]"
                style={{
                  '--glow-color': moodData.glowColor
                }}
              >
                <div className="h-72 relative border-b-4 border-white overflow-hidden">
                  <img src={dish.image || dish.img} alt={dish.name} className="w-full h-full object-cover saturate-150 contrast-125 group-hover:scale-110 transition-transform duration-[8s] ease-out" />
                  <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 font-black uppercase text-sm border-2 border-black rotate-[-5deg]">
                    HYPE: {Math.floor(Math.random() * 20 + 80)}% 🔥
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight w-2/3 leading-none">{dish.name}</h3>
                    <span className={`font-black text-2xl ${moodData.textAccent}`}>₹{dish.price || 250}</span>
                  </div>
                  <button 
                    onClick={() => navigate("/menu")}
                    className={`w-full py-4 ${moodData.accentClass} text-black border-4 border-black font-black uppercase text-lg hover:bg-white hover:text-black transition-colors cursor-pointer`}
                  >
                    ORDER NOW 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AESTHETIC CONCEPTS */}
      <section className="py-24 relative z-10 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-white mb-12 uppercase tracking-tighter text-center">
            AESTHETIC <span className="text-zinc-600 line-through">ROOMS</span> DROP
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Concept 1 */}
            <div className="group relative overflow-hidden border-4 border-white shadow-[10px_10px_0_0_white] hover:shadow-[16px_16px_0_0_white] transition-all duration-500 h-96 cursor-pointer">
              <img src="/images/adventure_forest.png" alt="Forest Cafe" className="w-full h-full object-cover saturate-150 contrast-125 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-4xl font-black uppercase text-lime-400 drop-shadow-[2px_2px_0_#fff]">Enchanted Core 🌲</h3>
                <p className="text-white font-bold bg-black inline-block px-2 py-1 mt-2">Cottagecore / Fairy Grunge</p>
              </div>
            </div>

            {/* Concept 2 */}
            <div className="group relative overflow-hidden border-4 border-white shadow-[10px_10px_0_0_white] hover:shadow-[16px_16px_0_0_white] transition-all duration-500 h-96 cursor-pointer">
              <img src="/images/adventure_underwater.png" alt="Underwater" className="w-full h-full object-cover saturate-150 contrast-125 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-4xl font-black uppercase text-cyan-400 drop-shadow-[2px_2px_0_#fff]">Abyssal Drip 🌊</h3>
                <p className="text-white font-bold bg-black inline-block px-2 py-1 mt-2">Cyberpunk / Deep Sea</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default Home;