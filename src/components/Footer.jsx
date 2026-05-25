import { Link } from "react-router-dom";
import { useMood } from "../context/MoodContext";

function Footer() {
  const { moodData } = useMood();

  return (
    <footer className="bg-black border-t-4 border-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start mb-6 md:mb-0">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 flex items-center justify-center ${moodData?.accentClass || 'bg-white'} text-black font-black text-2xl -rotate-12 group-hover:rotate-12 transition-transform shadow-[4px_4px_0_0_white] border-2 border-white`}>
              V
            </div>
            <span className="self-center text-3xl font-black whitespace-nowrap text-white uppercase tracking-tighter">
              Vibe<span className={moodData?.textAccent || 'text-white'}>Check</span>
            </span>
          </Link>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-white hover:text-gray-300 transition uppercase font-black tracking-widest text-sm underline decoration-2 underline-offset-4">TikTok</a>
          <a href="#" className="text-white hover:text-gray-300 transition uppercase font-black tracking-widest text-sm underline decoration-2 underline-offset-4">IG</a>
          <a href="#" className="text-white hover:text-gray-300 transition uppercase font-black tracking-widest text-sm underline decoration-2 underline-offset-4">BeReal</a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
          <p className="text-white font-black uppercase text-sm tracking-widest">
            &copy; 2024 VibeCheck. No cap.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;