import { Link, useLocation } from "react-router-dom";
import { useMood } from "../context/MoodContext";

function Navbar({ user }) {
  const location = useLocation();
  const { moodData, isMuted, toggleMute, changeTrack } = useMood();

  if (!moodData) return null;

  const navLinks = [
    { name: "FYP (For You)", path: "/" },
    { name: "Aesthetic Menu", path: "/menu" },
    { name: "Spill the Tea", path: "/reviews" },
    { name: "Vibe Map", path: "/smart-table" },
    { name: "Story Invite", path: "/date-planner" },
    { name: "Receipts", path: "/profile" }
  ];

  return (
    <nav 
      className="fixed w-full z-50 top-0 start-0 border-b-4 border-white bg-black/60 backdrop-blur-xl transition-all duration-500 ease-out"
      style={{ 
        boxShadow: `0 4px 30px -10px ${moodData.glowColor || 'rgba(255, 255, 255, 0.15)'}, 0 4px 0px 0px #ffffff`
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className={`w-10 h-10 flex items-center justify-center ${moodData.accentClass} text-black font-black text-2xl rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300 shadow-[3px_3px_0_0_white] border-2 border-white`}>
            V
          </div>
          <div className="flex items-start md:items-center gap-2 flex-col md:flex-row">
            <span className="text-3xl font-black whitespace-nowrap text-white uppercase tracking-tighter transition-all duration-300 hover:tracking-normal leading-none">
              Vibe<span className={moodData.textAccent}>Check</span>
            </span>
            <div 
              className="text-[10px] font-black uppercase px-2 py-0.5 border-2 text-white rotate-[-2deg] transition-all duration-500 tracking-wider shadow-[2px_2px_0_0_white]"
              style={{
                backgroundColor: 'rgba(0,0,0,0.85)',
                borderColor: moodData.textAccent.includes("text-lime-400") ? '#a3e635' : 
                             moodData.textAccent.includes("text-fuchsia-500") ? "#d946ef" :
                             moodData.textAccent.includes("text-pink-500") ? "#ec4899" :
                             moodData.textAccent.includes("text-cyan-400") ? "#22d3ee" : "#818cf8",
                boxShadow: `0 0 10px ${moodData.glowColor}`
              }}
            >
              VIBE: {moodData.name}
            </div>
            {user && (
              <Link 
                to="/profile"
                className="text-[10px] font-black uppercase px-2 py-0.5 border-2 border-white bg-zinc-950 text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider shadow-[2px_2px_0_0_white] rotate-[1deg] flex items-center gap-1.5 select-none"
              >
                <span>{user.avatar}</span>
                <span>{user.username}</span>
              </Link>
            )}
          </div>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-4">
          {/* Dynamic Audio Visualizer & Track Controller */}
          <div className="flex items-center gap-3 bg-zinc-950/90 border-2 border-white px-3 py-1.5 shadow-[2px_2px_0_0_white] rotate-[-1deg]">
            {/* Equalizer Anim Waves */}
            <div className="flex items-end gap-[3px] h-5 w-8 relative overflow-hidden select-none">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-white origin-bottom" 
                  style={{ 
                    height: '100%', 
                    animation: !isMuted ? 'eq-dance 0.8s ease-in-out infinite alternate' : 'none',
                    animationDelay: `${i * 0.15}s`,
                    transform: isMuted ? 'scaleY(0.15)' : 'none'
                  }}
                ></div>
              ))}
            </div>
            
            {/* Mute toggle button */}
            <button 
              onClick={toggleMute}
              className="text-[10px] font-black uppercase text-white hover:text-zinc-300 transition-colors cursor-pointer tracking-wider"
            >
              {isMuted ? '🔇 MUTED' : '🔊 LIVE'}
            </button>
            
            {/* Dynamic Track selector */}
            <select
              onChange={(e) => changeTrack(e.target.value)}
              className="bg-black text-[9px] text-white font-black uppercase border border-white/30 px-1 py-0.5 focus:outline-none cursor-pointer tracking-wide rounded-none"
              defaultValue={moodData.id}
            >
              <option value="neutral">🎵 NPC Beats</option>
              <option value="stressed">🌧️ Goblin Rain</option>
              <option value="romantic">🎹 Jazz Lounge</option>
              <option value="party">🪩 Party Loop</option>
            </select>
          </div>
        </div>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col font-black uppercase tracking-widest p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`relative block py-2 px-3 transition-all duration-300 hover:-translate-y-1 ${
                      isActive
                        ? `${moodData.textAccent} drop-shadow-[0_0_8px_currentColor] scale-105`
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-3 right-3 h-1 bg-white shadow-[0_0_8px_currentColor] rounded-full transition-all duration-500 animate-pulse"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;