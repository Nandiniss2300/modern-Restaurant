import { useState } from "react";
import { useMood } from "../context/MoodContext";

function Profile({ user, onLogout }) {
  const { moodData } = useMood();
  const [expandedReceipt, setExpandedReceipt] = useState(null);

  const [reservations, setReservations] = useState(() => {
    const allRes = JSON.parse(localStorage.getItem("vibecheck_reservations") || "[]");
    return allRes.filter(
      (res) => res.passenger.toLowerCase() === `@${user.username}`.toLowerCase()
    );
  });

  const cancelReservation = (id) => {
    const allRes = JSON.parse(localStorage.getItem("vibecheck_reservations") || "[]");
    const updatedAll = allRes.filter(r => r.id !== id);
    localStorage.setItem("vibecheck_reservations", JSON.stringify(updatedAll));
    setReservations(updatedAll.filter(
      (res) => res.passenger.toLowerCase() === `@${user.username}`.toLowerCase()
    ));
  };

  if (!moodData || !user) return null;

  // Retrieve user-specific receipts
  const userKey = user.username.toUpperCase();
  const allReceipts = JSON.parse(localStorage.getItem("vibecheck_receipts") || "{}");
  const userReceipts = allReceipts[userKey] || [];

  const toggleReceiptExpand = (idx) => {
    setExpandedReceipt(expandedReceipt === idx ? null : idx);
  };

  return (
    <div className="text-white min-h-screen pt-28 pb-20 px-6 font-outfit relative">
      {/* Background ambient glowing blob */}
      <div 
        className="absolute top-40 left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full blur-[130px] opacity-10 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${moodData.glowColor} 0%, transparent 80%)`
        }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 border-b-4 border-white pb-8">
          <div className="inline-block px-4 py-1.5 mb-4 bg-white text-black font-black uppercase tracking-widest text-sm border-2 border-black rotate-[2deg] shadow-[3px_3px_0_0_black]">
            Taste Sensor Node 📡
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none mb-4">
            AI Taste <span className={moodData.textAccent} style={{ filter: `drop-shadow(0 0 10px ${moodData.glowColor})` }}>Profile</span>
          </h1>
          <p className="text-zinc-400 font-bold uppercase text-lg max-w-2xl mx-auto mt-2">
            Palate diagnostics calculated from your past moods and selections.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* User ID Card */}
          <div 
            className="bg-black/80 border-4 border-white p-8 relative overflow-hidden transition-all duration-300 flex flex-col items-center text-center col-span-1 h-fit"
            style={{
              boxShadow: `8px 8px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.1)'}`
            }}
          >
            <div className="w-24 h-24 border-4 border-white bg-zinc-900 flex items-center justify-center text-4xl shadow-[4px_4px_0_0_white] mb-6 select-none">
              {user.avatar}
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">{user.username}</h2>
            <p className="text-zinc-500 font-bold text-xs mt-1 uppercase tracking-widest font-mono">ID: M2M-{1000 + (user.username.length * 153) % 9000}</p>
            
            <div className="w-full mt-8 text-left space-y-4">
              <div className="bg-zinc-950 p-4 border-2 border-white/20">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-black">Current Active Vibe</p>
                <p className={`font-black uppercase text-lg ${moodData.textAccent}`}>{moodData.name}</p>
              </div>
              <div className="bg-zinc-950 p-4 border-2 border-white/20">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-black font-mono">Active Invoices</p>
                <p className="font-black uppercase text-lg text-indigo-400">{userReceipts.length} Recorded Invoices</p>
              </div>
            </div>

            {/* Logout Action */}
            <button 
              onClick={onLogout}
              className="mt-8 w-full py-4 border-4 border-black bg-white text-black hover:bg-black hover:text-white hover:border-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[3px_3px_0_0_black] hover:shadow-none hover:translate-y-0.5"
            >
              Sign Out 🚪
            </button>
          </div>

          {/* Analytics Dashboard & Receipts */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            
            {/* Spice & Texture Radar */}
            <div 
              className="bg-black/80 border-4 border-white p-8 transition-all duration-300"
              style={{
                boxShadow: `8px 8px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.1)'}`
              }}
            >
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
                🌶️ Palate Analytics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-black uppercase tracking-wider mb-2">
                    <span>Spice Tolerance</span>
                    <span className="font-mono text-red-400 text-base">85%</span>
                  </div>
                  <div className="h-6 w-full bg-black border-2 border-white overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-600 w-[85%] border-r-2 border-white"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-black uppercase tracking-wider mb-2">
                    <span>Sweet Craving (Post-Stress)</span>
                    <span className="font-mono text-pink-400 text-base">92%</span>
                  </div>
                  <div className="h-6 w-full bg-black border-2 border-white overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-600 w-[92%] border-r-2 border-white"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-black uppercase tracking-wider mb-2">
                    <span>Experimental Dining</span>
                    <span className="font-mono text-cyan-400 text-base">40%</span>
                  </div>
                  <div className="h-6 w-full bg-black border-2 border-white overflow-hidden p-0.5">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 w-[40%] border-r-2 border-white"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div 
              className="bg-black/80 border-4 border-white p-8 transition-all duration-300"
              style={{
                boxShadow: `8px 8px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.1)'}`
              }}
            >
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
                🤖 AI Behavioral Diagnostics
              </h3>
              <p className="text-zinc-300 font-bold leading-relaxed text-base uppercase tracking-wide">
                Based on recorded interactions, you show a strong correlation between <span className="text-white font-black underline underline-offset-4 decoration-2 decoration-white">rainy weather</span> and cravings for <span className="text-white font-black underline underline-offset-4 decoration-2 decoration-white">hot starters</span>. During high-stress days, your palate shifts towards <span className="text-white font-black underline underline-offset-4 decoration-2 decoration-white">comfort foods and desserts</span>. You strongly prefer window seating when accompanied by a partner.
              </p>
            </div>

          </div>
        </div>

        {/* ACTIVE RESERVATIONS (BOARDING PASSES) */}
        <div className="mt-12">
          <div 
            className="bg-black/80 border-4 border-white p-8 transition-all duration-300"
            style={{
              boxShadow: `8px 8px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.1)'}`
            }}
          >
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 border-b-2 border-zinc-800 pb-2">
              🎫 Active Seating Passes
            </h3>

            {reservations.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-white/20">
                <span className="text-5xl block mb-3 opacity-60">📍</span>
                <p className="text-zinc-500 font-black uppercase tracking-widest text-lg">No active reservations secured.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {reservations.map((res) => (
                  <div 
                    key={res.id}
                    className="border-4 border-white bg-zinc-950 p-6 relative overflow-hidden transition-all duration-300 flex flex-col justify-between"
                    style={{
                      boxShadow: `0 0 20px ${res.glowColor || '#ffffff'}, 4px 4px 0px 0px #ffffff`
                    }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start border-b-2 border-dashed border-zinc-800 pb-3 mb-4 select-none">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Boarding Pass</span>
                        <h4 className="font-black text-sm text-white">{res.zoneLabel}</h4>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-950 px-2 py-0.5 border border-green-800">
                        ACTIVE
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="space-y-2.5 font-bold uppercase text-[11px] mb-4">
                      <div className="flex justify-between border-b border-zinc-900 pb-1">
                        <span className="text-zinc-500">Passenger</span>
                        <span className="text-white">{res.passenger}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1">
                        <span className="text-zinc-500">Capacity Locked</span>
                        <span className="text-white">{res.seats} Entities</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1">
                        <span className="text-zinc-500">Mood Signature</span>
                        <span className="text-white">{res.vibe}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-900 pb-1">
                        <span className="text-zinc-500">Secured Time</span>
                        <span className="text-white normal-case">{res.timestamp}</span>
                      </div>
                    </div>

                    {/* Barcode representation */}
                    <div className="bg-white p-3 border-2 border-black h-12 w-full flex items-center justify-center gap-0.5 select-none my-4">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-black h-8"
                          style={{
                            width: i % 4 === 0 ? "3px" : i % 3 === 0 ? "1px" : "1.5px",
                            opacity: i % 9 === 0 ? 0.2 : 1
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-[9px] text-zinc-400 font-mono tracking-widest text-center mb-4 select-none">
                      {res.ticketCode}
                    </div>

                    {/* Actions */}
                    <button 
                      onClick={() => cancelReservation(res.id)}
                      className="w-full py-2 bg-red-950 border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white hover:border-black font-black uppercase text-xs tracking-widest transition-all cursor-pointer shadow-[3px_3px_0_0_black] hover:shadow-none hover:translate-y-0.5"
                    >
                      RELEASE SECURED ZONE ⚠️
                    </button>

                    {/* Retro corner notches */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-zinc-900 border-r-2 border-b-2 border-zinc-800"></div>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-zinc-900 border-l-2 border-b-2 border-zinc-800"></div>
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 bg-zinc-900 border-r-2 border-t-2 border-zinc-800"></div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-zinc-900 border-l-2 border-t-2 border-zinc-800"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECEIPTS BILLING HISTORY (PAST HAULS) */}
        <div className="mt-12">
          <div 
            className="bg-black/80 border-4 border-white p-8 transition-all duration-300"
            style={{
              boxShadow: `8px 8px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.1)'}`
            }}
          >
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-2 border-b-2 border-zinc-850 pb-2">
              🧾 Past Hauls & Receipts
            </h3>

            {userReceipts.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-white/20">
                <span className="text-5xl block mb-3 opacity-60">💀</span>
                <p className="text-zinc-500 font-black uppercase tracking-widest text-lg">No past checkouts recorded bestie.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userReceipts.map((receipt, idx) => {
                  const isExpanded = expandedReceipt === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border-4 border-white bg-zinc-950/80 p-4 transition-all duration-300"
                    >
                      {/* Receipt Header Click to toggle expansion */}
                      <div 
                        onClick={() => toggleReceiptExpand(idx)}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 cursor-pointer font-bold select-none text-sm uppercase"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-white">ORDER #{receipt.orderNumber}</span>
                          <span className="text-zinc-500 font-mono">|</span>
                          <span className="text-zinc-400">{receipt.date} {receipt.time}</span>
                          <span className="text-zinc-500 font-mono">|</span>
                          <span className={`px-2 py-0.5 border border-white/30 text-[10px] ${moodData.textAccent}`}>
                            {receipt.moodName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-400">Total:</span>
                          <span className={`text-xl font-black ${moodData.textAccent}`}>₹{receipt.total}</span>
                          <span className="text-base text-zinc-500 ml-1">{isExpanded ? "▲" : "▼"}</span>
                        </div>
                      </div>

                      {/* Expanded Invoiced Items details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t-2 border-white/20 border-dashed animate-fade-in text-xs uppercase tracking-wide">
                          <p className="font-black text-zinc-500 mb-2">Itemized Bill:</p>
                          <div className="space-y-2 max-w-md">
                            {receipt.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex justify-between font-bold">
                                <span className="text-zinc-300">{item.quantity}x {item.name}</span>
                                <span>₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between font-bold text-zinc-400 max-w-md">
                            <span>Hype Level</span>
                            <span>{receipt.hypeScore}% 🔥</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
