import { useState } from "react";
import { useMood } from "../context/MoodContext";

function SmartTable() {
  const { moodData } = useMood();
  const [selectedZone, setSelectedZone] = useState(null);
  const [bookedTicket, setBookedTicket] = useState(null);

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

  const handleBookZone = () => {
    const zone = zones.find(z => z.id === selectedZone);
    if (!zone) return;

    const userObj = JSON.parse(localStorage.getItem("vibecheck_user") || "{}");
    const passengerName = userObj.username ? `@${userObj.username}` : "GUEST";
    const ticketCode = `TKT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    const reservation = {
      id: `RES-${Date.now()}`,
      zoneId: zone.id,
      zoneLabel: zone.label,
      zoneType: zone.type,
      seats: zone.seats,
      timestamp: new Date().toLocaleString(),
      ticketCode: ticketCode,
      passenger: passengerName,
      vibe: moodData.name,
      glowColor: moodData.glowColor,
      accentClass: moodData.accentClass,
    };

    const existing = JSON.parse(localStorage.getItem("vibecheck_reservations") || "[]");
    existing.push(reservation);
    localStorage.setItem("vibecheck_reservations", JSON.stringify(existing));

    setBookedTicket(reservation);
  };

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
            
            {/* Dynamic Scanline Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent w-full h-24 pointer-events-none animate-scanline z-30"></div>

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
                <div 
                  key={zone.id}
                  className="absolute"
                  style={{ top: zone.top, left: zone.left }}
                >
                  {/* Concentric Radar Ripple Waves */}
                  {isRecommended && !isSelected && (
                    <>
                      <div 
                        className="absolute top-1/2 left-1/2 w-28 h-20 rounded-lg border-2 border-white/50 pointer-events-none animate-ripple"
                        style={{ animationDelay: '0s' }}
                      ></div>
                      <div 
                        className="absolute top-1/2 left-1/2 w-28 h-20 rounded-lg border-2 border-white/30 pointer-events-none animate-ripple"
                        style={{ animationDelay: '1.2s' }}
                      ></div>
                    </>
                  )}

                  <button
                    onClick={() => setSelectedZone(zone.id)}
                    className={`absolute flex flex-col items-center justify-center transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 border-4 z-20 cursor-pointer
                      ${zone.type === 'window' ? 'w-24 h-16' : zone.type === 'booth' ? 'w-24 h-20' : zone.type === 'lounge' ? 'w-32 h-16 rounded-full' : 'w-20 h-20'}
                      ${isRecommended && !isSelected ? `${moodData.accentClass} border-white shadow-[6px_6px_0_0_white] text-black hover:scale-110` : ''}
                      ${!isRecommended && !isSelected ? 'bg-black border-zinc-700 text-zinc-500 hover:border-white hover:text-white hover:bg-zinc-900' : ''}
                      ${isSelected ? 'bg-white border-black text-black scale-110 shadow-[8px_8px_0_0_white] z-30' : ''}
                    `}
                  >
                    {isRecommended && !isSelected && (
                      <div className="absolute -inset-2 border-2 border-white border-dashed animate-spin-slow rounded-full opacity-50 pointer-events-none"></div>
                    )}
                    <span className={`font-black text-xs text-center leading-tight tracking-wider uppercase px-1`}>{zone.label}</span>
                    {isRecommended && !isSelected && <span className="absolute -top-3 -right-3 text-lg bg-black rounded-full border-2 border-white w-6 h-6 flex items-center justify-center text-white pb-1">🎯</span>}
                  </button>
                </div>
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

                <button 
                  onClick={handleBookZone}
                  className={`w-full py-5 border-4 border-black font-black uppercase text-2xl tracking-widest transition-all ${moodData.accentClass} text-black shadow-[6px_6px_0_0_white] hover:translate-y-1 hover:shadow-none cursor-pointer`}
                >
                  SECURE ZONE 📍
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* CYBERNETIC BOARDING TICKET MODAL */}
      {bookedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div 
            className="bg-black border-4 border-white p-8 max-w-md w-full relative overflow-hidden"
            style={{
              boxShadow: `0 0 40px ${bookedTicket.glowColor || '#ffffff'}, 12px 12px 0px 0px #ffffff`
            }}
          >
            {/* Top Banner */}
            <div className="flex justify-between items-center border-b-4 border-dashed border-zinc-700 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Boarding Pass</span>
                <h4 className="text-xl font-black uppercase text-white tracking-tighter">VIBE SEATING</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</span>
                <h4 className="text-sm font-black uppercase text-green-400 tracking-tighter">CONFIRMED</h4>
              </div>
            </div>
            
            {/* Passenger / Identity Card */}
            <div className="relative py-2 px-4 border-2 border-zinc-700 bg-zinc-950 mb-4 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">PASSENGER ENTITY</span>
                <p className="text-md font-black uppercase text-white tracking-tight">{bookedTicket.passenger}</p>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-zinc-900 flex items-center justify-center text-lg">
                👤
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-4">
              <div className="relative py-2 px-4 border-2 border-zinc-700 bg-zinc-950">
                <div className="absolute -top-3 left-3 px-2 bg-black text-xs font-black uppercase text-zinc-400">Target Zone</div>
                <p className="text-2xl font-black uppercase text-white tracking-tight">{bookedTicket.zoneLabel}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative py-2 px-4 border-2 border-zinc-700 bg-zinc-950">
                  <div className="absolute -top-3 left-3 px-2 bg-black text-xs font-black uppercase text-zinc-400">Seats Locked</div>
                  <p className="text-xl font-black uppercase text-white tracking-tight">{bookedTicket.seats} Entities</p>
                </div>
                <div className="relative py-2 px-4 border-2 border-zinc-700 bg-zinc-950">
                  <div className="absolute -top-3 left-3 px-2 bg-black text-xs font-black uppercase text-zinc-400">Vibe Signature</div>
                  <p className="text-xl font-black uppercase text-white tracking-tight">{bookedTicket.vibe}</p>
                </div>
              </div>

              <div className="relative py-2 px-4 border-2 border-zinc-700 bg-zinc-950">
                <div className="absolute -top-3 left-3 px-2 bg-black text-xs font-black uppercase text-zinc-400">Timestamp</div>
                <p className="text-sm font-bold text-white">{bookedTicket.timestamp}</p>
              </div>
            </div>

            {/* Barcode section */}
            <div className="mt-6 pt-6 border-t-4 border-dashed border-zinc-700">
              <div className="flex items-center justify-center gap-0.5 bg-white p-4 border-2 border-black h-16 w-full select-none">
                {Array.from({ length: 45 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-black h-10"
                    style={{
                      width: i % 3 === 0 ? "4px" : i % 5 === 0 ? "1px" : "2px",
                      opacity: i % 7 === 0 ? 0.3 : 1
                    }}
                  ></div>
                ))}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono tracking-widest text-center mt-2">
                {bookedTicket.ticketCode}
              </div>
            </div>

            {/* Dismiss Button */}
            <div className="mt-6">
              <button 
                onClick={() => setBookedTicket(null)}
                className="w-full py-4 border-4 border-black bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-sm transition-all cursor-pointer shadow-[4px_4px_0_0_black]"
              >
                DISMISS ❌
              </button>
            </div>

            {/* Retro corner notches */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-zinc-900 border-r-2 border-b-2 border-zinc-700"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-zinc-900 border-l-2 border-b-2 border-zinc-700"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-zinc-900 border-r-2 border-t-2 border-zinc-700"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-900 border-l-2 border-t-2 border-zinc-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SmartTable;
