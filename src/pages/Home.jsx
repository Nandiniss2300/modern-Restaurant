import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMood } from "../context/MoodContext";
import dishes from "../data/dishes";

function Home() {
  const navigate = useNavigate();
  const { moodData } = useMood();
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

  return (
    <div className={`text-white min-h-screen bg-black overflow-hidden font-outfit`}>
      {/* MASSIVE BRUTALIST HERO */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-24 pb-16 px-6">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/adventure_hero.png"
            alt="Hero"
            className="w-full h-full object-cover opacity-50 saturate-200 contrast-125"
          />
          <div className={`absolute inset-0 opacity-80 mix-blend-color bg-gradient-to-tr ${moodData.themeClass}`}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Marquee Background */}
        <div className="absolute top-1/4 left-0 w-full overflow-hidden whitespace-nowrap opacity-10 -rotate-3 z-0 pointer-events-none">
          <h1 className="text-[15rem] font-black uppercase text-white inline-block animate-[marquee_20s_linear_infinite]">
            VIBE CHECK VIBE CHECK VIBE CHECK
          </h1>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="inline-block px-4 py-1 mb-8 bg-white text-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_black] border-2 border-black rotate-2">
            AI Detected: {moodData.name}
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-white mb-6 uppercase leading-[0.85] tracking-tighter mix-blend-difference drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            MAIN <br/>
            <span className={`${moodData.textAccent} drop-shadow-none`}>CHARACTER</span> <br/>
            ENERGY.
          </h1>
          
          <p className="text-xl md:text-2xl font-bold bg-black text-white inline-block p-2 mb-10 border-2 border-white/20">
            {moodData.message}
          </p>

          <div className="flex flex-wrap gap-6 mt-4">
            <button
              onClick={() => navigate("/menu")}
              className={`${moodData.accentClass} text-black px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-black shadow-[8px_8px_0_0_black] hover:translate-y-2 hover:shadow-none transition-all active:scale-95`}
            >
              Order Now 💸
            </button>
            <button 
              onClick={() => navigate("/smart-table")}
              className="bg-white text-black px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-black shadow-[8px_8px_0_0_black] hover:translate-y-2 hover:shadow-none transition-all"
            >
              Secure The Bag 📍
            </button>
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <div className={`w-full ${moodData.accentClass} text-black py-3 overflow-hidden border-y-4 border-black font-black uppercase text-2xl whitespace-nowrap`}>
        <div className="animate-[marquee_10s_linear_infinite] inline-block">
           ✨ LIVE CROWD: {moodData.crowd.toUpperCase()} ✨ NOW PLAYING: {moodData.music.toUpperCase()} ✨ AESTHETIC: {moodData.vibe.toUpperCase()} ✨ LIVE CROWD: {moodData.crowd.toUpperCase()} ✨ NOW PLAYING: {moodData.music.toUpperCase()}
        </div>
      </div>

      {/* THE FOR YOU PAGE TIKTOK STYLE FEED */}
      <section className="py-24 relative z-10 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-6xl font-black uppercase text-white mb-2 tracking-tighter">
              FYP <span className={moodData.textAccent}>(For You Page)</span>
            </h2>
            <p className="text-zinc-400 text-xl font-bold">Curated specifically for your current {moodData.name} vibe.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recommendedDishes.map((dish, idx) => (
              <div key={idx} className="bg-black border-4 border-white group relative overflow-hidden transition-transform hover:-translate-y-2 shadow-[8px_8px_0_0_white] hover:shadow-[16px_16px_0_0_white]">
                <div className="h-72 relative border-b-4 border-white overflow-hidden">
                  <img src={dish.image || dish.img} alt={dish.name} className="w-full h-full object-cover saturate-150 contrast-125 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 font-black uppercase text-sm border-2 border-black rotate-[-5deg]">
                    HYPE: {Math.floor(Math.random() * 20 + 80)}% 🔥
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight w-2/3">{dish.name}</h3>
                    <span className={`font-black text-2xl ${moodData.textAccent} drop-shadow-[2px_2px_0_rgba(255,255,255,1)]`}>₹{dish.price || 250}</span>
                  </div>
                  <button className={`w-full py-4 ${moodData.accentClass} text-black border-4 border-black font-black uppercase text-lg hover:bg-white transition-colors`}>
                    ADD TO CART 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AESTHETIC CONCEPTS */}
      <section className="py-24 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black text-white mb-12 uppercase tracking-tighter text-center">
            AESTHETIC <span className="text-zinc-600 line-through">ROOMS</span> DROP
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Concept 1 */}
            <div className="group relative overflow-hidden border-4 border-white shadow-[10px_10px_0_0_white] h-96">
              <img src="/images/adventure_forest.png" alt="Forest Cafe" className="w-full h-full object-cover saturate-200 contrast-150" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-4xl font-black uppercase text-lime-400 drop-shadow-[2px_2px_0_#fff]">Enchanted Core 🌲</h3>
                <p className="text-white font-bold bg-black inline-block px-2 py-1 mt-2">Cottagecore / Fairy Grunge</p>
              </div>
            </div>

            {/* Concept 2 */}
            <div className="group relative overflow-hidden border-4 border-white shadow-[10px_10px_0_0_white] h-96">
              <img src="/images/adventure_underwater.png" alt="Underwater" className="w-full h-full object-cover saturate-200 contrast-150" />
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