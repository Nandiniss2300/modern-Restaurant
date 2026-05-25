import { Link, useLocation } from "react-router-dom";
import { useMood } from "../context/MoodContext";

function Navbar() {
  const location = useLocation();
  const { moodData, isMuted, toggleMute } = useMood();

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
    <nav className="fixed w-full z-50 top-0 start-0 border-b-4 border-white bg-black/80 backdrop-blur-3xl shadow-[0_4px_0_0_white] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className={`w-10 h-10 flex items-center justify-center ${moodData.accentClass} text-black font-black text-2xl rotate-12 group-hover:-rotate-12 transition-transform shadow-[4px_4px_0_0_white] border-2 border-white`}>
            V
          </div>
          <span className="self-center text-3xl font-black whitespace-nowrap text-white uppercase tracking-tighter mix-blend-difference">
            Vibe<span className={moodData.textAccent}>Check</span>
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center gap-4">
          {/* Audio Toggle */}
          <button 
            onClick={toggleMute}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-widest border-2 border-white transition-all ${isMuted ? 'bg-black text-white hover:bg-white hover:text-black' : `${moodData.accentClass} text-black shadow-[4px_4px_0_0_white] hover:translate-y-1 hover:shadow-none`}`}
          >
            {isMuted ? '🔇 Audio Off' : '🔊 Audio On'}
          </button>
        </div>

        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col font-black uppercase tracking-widest p-4 md:p-0 mt-4 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`block py-2 px-3 transition-all duration-200 hover:-translate-y-1 ${
                    location.pathname === link.path
                      ? `${moodData.textAccent} drop-shadow-[0_0_10px_currentColor] underline decoration-4 underline-offset-8`
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;