import { useState } from "react";
import { useMood } from "../context/MoodContext";

function SmartTable() {
  const { moodData } = useMood();
  const [selectedZone, setSelectedZone] = useState(null);

  if (!moodData) return null;

  // Determine which zone type is recommended based on mood
  let recommendedType = "standard";
  if (moodData.id === "romantic") recommendedType = "window";
  if (moodData.id === "stressed" || moodData.id === "rainy") recommendedType = "booth";
  if (moodData.id === "party") recommendedType = "lounge";

  // Renamed tables to "Zones" for Gen Z vibe
  const zones = [
    { id: 1, type: "window", label: "NEON ALLEY", seats: 2, top: "15%", left: "15%" },
    { id: 2, type: "window", label: "MAIN ST.", seats: 2, top: "35%", left: "15%" },
    { id: 3, type: "window", label: "THE OBSERVER", seats: 2, top: "55%", left: "15%" },
    { id: 4, type: "standard", label: "PIT 1", seats: 4, top: "25%", left: "45%" },
    { id: 5, type: "standard", label: "PIT 2", seats: 4, top: "55%", left: "45%" },
    { id: 6, type: "lounge", label: "DJ BOOTH SEC", seats: 6, top: "80%", left: "30%" },
    { id: 7, type: "lounge", label: "VIP COUCH", seats: 6, top: "80%", left: "70%" },
    { id: 8, type: "booth", label: "THE BUNKER", seats: 4, top: "25%", left: "80%" },
    { id: 9, type: "booth", label: "VAULT 2", seats: 4, top: "45%", left: "80%" },
    { id: 10, type: "booth", label: "DARK ROOM", seats: 4, top: "65%", left: "80%" },
  ];

  return (
    <div className="text-white min-h-screen pt-24 pb-20 px-6 font-outfit">
      <div className="max-w-6xl mx-auto">
        
        {/* BRUTALIST HEADER */}
        <div className="mb-12 border-b-4 border-white pb-8">
          <div className="inline-block px-4 py-1 mb-4 bg-white text-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_black] border-2 border-black rotate-[-2deg]">
            System Radar Active
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4 mix-blend-difference text-transparent bg-clip-text bg-white">
            VIBE <br/> <span className={moodData.textAccent}>RADAR.</span>
          </h1>
          <p className="text-xl font-bold bg-zinc-900 inline-block p-2 border-2 border-white/20 uppercase">
            Locking in your target zone based on {moodData.name} energy.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* MAP AREA */}
          <div className="w-full lg:w-2/3 bg-black border-4 border-white p-4 shadow-[12px_12px_0_0_white] relative overflow-hidden aspect-[4/3] md:aspect-video group">
            
            {/* Grid Background Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 2px, transparent 2px), linear-gradient(90deg, white 2px, transparent 2px)', backgroundSize: '50px 50px' }}></div>
            
            {/* Ambient Pulse */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${moodData.accentClass} blur-[120px] opacity-10 pointer-events-none mix-blend-screen`}></div>
            
            {/* Map Labels */}
            <div className="absolute top-4 left-4 text-white px-3 py-1 bg-black border-2 border-white text-xs font-black uppercase tracking-widest z-10 shadow-[2px_2px_0_0_white]">Window View</div>
            <div className="absolute top-4 right-4 text-white px-3 py-1 bg-black border-2 border-white text-xs font-black uppercase tracking-widest z-10 shadow-[2px_2px_0_0_white]">The Vaults</div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white px-3 py-1 bg-black border-2 border-white text-xs font-black uppercase tracking-widest z-10 shadow-[2px_2px_0_0_white]">High Energy Sectors</div>

            {/* Render Zones */}
            {zones.map(zone => {
              const isRecommended = zone.type === recommendedType;
              const isSelected = selectedZone === zone.id;
              
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`absolute flex flex-col items-center justify-center transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 border-4 z-20 
                    ${zone.type === 'window' ? 'w-24 h-16' : zone.type === 'booth' ? 'w-24 h-20' : zone.type === 'lounge' ? 'w-32 h-16 rounded-full' : 'w-20 h-20'}
                    ${isRecommended && !isSelected ? `${moodData.accentClass} border-white shadow-[6px_6px_0_0_white] text-black hover:scale-110` : ''}
                    ${!isRecommended && !isSelected ? 'bg-black border-zinc-700 text-zinc-500 hover:border-white hover:text-white hover:bg-zinc-900' : ''}
                    ${isSelected ? 'bg-white border-black text-black scale-110 shadow-[8px_8px_0_0_white] z-30' : ''}
                  `}
                  style={{ top: zone.top, left: zone.left }}
                >
                  {isRecommended && !isSelected && (
                     <div className="absolute -inset-2 border-2 border-white border-dashed animate-spin-slow rounded-full opacity-50 pointer-events-none"></div>
                  )}
                  <span className={`font-black text-xs text-center leading-tight tracking-wider uppercase px-1`}>{zone.label}</span>
                  {isRecommended && !isSelected && <span className="absolute -top-3 -right-3 text-lg bg-black rounded-full border-2 border-white w-6 h-6 flex items-center justify-center text-white pb-1">🎯</span>}
                </button>
              );
            })}
          </div>

          {/* DETAILS PANEL */}
          <div className="w-full lg:w-1/3 space-y-8">
            
            <div className="bg-black border-4 border-white p-6 shadow-[8px_8px_0_0_white]">
              <h3 className="text-xl font-black mb-4 uppercase tracking-tighter flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
                <span className="text-2xl animate-pulse">📡</span> SYSTEM OVERRIDE
              </h3>
              <div className={`p-4 border-4 border-black ${moodData.accentClass} text-black shadow-[4px_4px_0_0_black]`}>
                <p className="font-black text-xl uppercase mb-1">{recommendedType === "window" ? "Main Street Aesthetics" : recommendedType === "booth" ? "The Dark Room" : recommendedType === "lounge" ? "Center of Attention" : "The Pit"}</p>
                <p className="font-bold text-sm leading-snug">Vibe check passed for: {moodData.vibe.toLowerCase()}</p>
              </div>
            </div>

            {selectedZone && (
              <div className="bg-zinc-900 border-4 border-white p-6 shadow-[8px_8px_0_0_white] animate-fade-in relative">
                
                <div className="absolute -top-4 -right-4 bg-white text-black px-3 py-1 border-2 border-black font-black text-xs rotate-[-5deg] shadow-[2px_2px_0_0_black]">
                  TARGET LOCKED
                </div>

                <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-white pb-2">ZONE COMMS</h3>
                
                <div className="space-y-4 mb-8 font-bold uppercase tracking-widest text-sm">
                  <div className="flex justify-between items-end border-b-2 border-zinc-800 pb-2">
                    <span className="text-zinc-500">Designation</span>
                    <span className="text-xl">{zones.find(t => t.id === selectedZone)?.label}</span>
                  </div>
                  <div className="flex justify-between items-end border-b-2 border-zinc-800 pb-2">
                    <span className="text-zinc-500">Max Capacity</span>
                    <span className="text-xl">{zones.find(t => t.id === selectedZone)?.seats} Entities</span>
                  </div>
                  <div className="flex justify-between items-end border-b-2 border-zinc-800 pb-2">
                    <span className="text-zinc-500">Sector Type</span>
                    <span className={`text-xl ${moodData.textAccent}`}>{zones.find(t => t.id === selectedZone)?.type}</span>
                  </div>
                </div>

                <button className={`w-full py-5 border-4 border-black font-black uppercase text-2xl tracking-widest transition-all ${moodData.accentClass} text-black shadow-[6px_6px_0_0_white] hover:translate-y-1 hover:shadow-none`}>
                  SECURE ZONE 📍
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default SmartTable;
