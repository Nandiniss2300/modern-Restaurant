import { useState } from "react";
import { useMood } from "../context/MoodContext";

function Login({ onLogin }) {
  const { moodData } = useMood();
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👑");
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [isError, setIsError] = useState(false);

  if (!moodData) return null;

  const avatars = ["👑", "🦝", "🛹", "👻", "🧐", "📱", "⚡", "💅", "🔥", "🎧"];

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);

    const cleanName = val.trim().toUpperCase();
    const accounts = JSON.parse(localStorage.getItem("vibecheck_accounts") || "{}");
    if (cleanName && accounts[cleanName]) {
      setIsReturningUser(true);
      setSelectedAvatar(accounts[cleanName].avatar);
    } else {
      setIsReturningUser(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = username.trim().toUpperCase();
    if (!cleanName || passcode.length !== 4) return;

    const accounts = JSON.parse(localStorage.getItem("vibecheck_accounts") || "{}");

    if (isReturningUser) {
      // Validate returning user passcode
      if (accounts[cleanName] && accounts[cleanName].passcode === passcode) {
        onLogin({
          username: cleanName,
          avatar: accounts[cleanName].avatar
        });
      } else {
        // Wrong passcode - Trigger Shake Animation
        setIsError(true);
        setPasscode("");
        setTimeout(() => setIsError(false), 500);
      }
    } else {
      // Create new user account
      accounts[cleanName] = {
        avatar: selectedAvatar,
        passcode: passcode
      };
      localStorage.setItem("vibecheck_accounts", JSON.stringify(accounts));
      onLogin({
        username: cleanName,
        avatar: selectedAvatar
      });
    }
  };

  return (
    <div className="text-white min-h-[85vh] flex flex-col justify-center items-center px-6 relative font-outfit">
      {/* Background ambient glowing blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${moodData.glowColor} 0%, transparent 80%)`
        }}
      ></div>

      <div 
        className={`bg-black border-4 border-white p-8 md:p-12 max-w-md w-full relative z-10 transition-all duration-500 ${
          isError ? 'animate-shake border-red-500 shadow-[12px_12px_0_0_#ef4444]' : 'shadow-[12px_12px_0_0_white]'
        }`}
        style={{
          boxShadow: isError 
            ? '12px 12px 0px 0px #ef4444' 
            : `12px 12px 0px 0px #ffffff, 0 15px 40px -10px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}`
        }}
      >
        <div className={`absolute -top-6 -right-6 px-4 py-2 border-4 border-black font-black uppercase text-base rotate-12 transition-colors ${
          isError ? 'bg-red-500 text-white' : 'bg-white text-black'
        }`}>
          {isError ? "ACCESS DENIED 🛑" : isReturningUser ? "RETURNING USER 👤" : "NEW ENTITY 🌐"}
        </div>

        <div className="mb-8 border-b-4 border-white pb-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">
            VIBE <br/> <span className={isError ? 'text-red-500' : moodData.textAccent}>{isReturningUser ? "SECURITY" : "REGISTRATION"}</span>
          </h1>
          <p className="text-sm font-bold bg-zinc-900 inline-block p-1.5 border-2 border-white/20 uppercase tracking-wider">
            {isReturningUser ? "Verification required bestie." : "Establish your security passcode."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* USERNAME INPUT */}
          <div>
            <label className="block font-black uppercase tracking-widest text-xs mb-2">Nickname / Username</label>
            <input 
              type="text" 
              required
              maxLength="15"
              value={username} 
              onChange={handleUsernameChange} 
              className={`w-full bg-black border-4 border-white px-5 py-4 text-white font-bold focus:outline-none focus:border-white focus:shadow-[4px_4px_0_0_white] transition-all uppercase ${
                isError ? 'border-red-500 focus:shadow-[4px_4px_0_0_#ef4444]' : moodData.textAccent
              }`} 
              placeholder="e.g. NANDINI" 
            />
          </div>

          {/* PASSCODE INPUT */}
          <div>
            <label className="block font-black uppercase tracking-widest text-xs mb-2">
              {isReturningUser ? "Enter Vibe Passcode (4 Digits)" : "Set Vibe Passcode (4 Digits)"}
            </label>
            <input 
              type="password" 
              required
              pattern="[0-9]{4}"
              maxLength="4"
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))} 
              className={`w-full bg-black border-4 border-white px-5 py-4 text-white font-bold tracking-widest text-center text-xl focus:outline-none focus:border-white focus:shadow-[4px_4px_0_0_white] transition-all ${
                isError ? 'border-red-500 focus:shadow-[4px_4px_0_0_#ef4444]' : moodData.textAccent
              }`} 
              placeholder="••••" 
            />
          </div>

          {/* AVATAR SELECTION (Disabled if returning user) */}
          {!isReturningUser && (
            <div>
              <label className="block font-black uppercase tracking-widest text-xs mb-3">Choose your avatar</label>
              <div className="grid grid-cols-5 gap-3">
                {avatars.map((avatar) => {
                  const isSelected = selectedAvatar === avatar;
                  return (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`h-12 w-12 border-2 text-2xl flex items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                          ? `${moodData.accentClass} border-white shadow-[2px_2px_0_0_white] scale-110` 
                          : "bg-zinc-950 border-white/20 hover:border-white hover:scale-105"
                      }`}
                    >
                      {avatar}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            disabled={!username.trim() || passcode.length !== 4}
            className={`w-full py-4 border-4 border-black ${
              isError ? 'bg-red-500 text-white' : moodData.accentClass
            } font-black text-xl tracking-widest uppercase transition-all shadow-[6px_6px_0_0_white] hover:translate-y-0.5 hover:shadow-none disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none disabled:border-zinc-700 cursor-pointer`}
          >
            {isReturningUser ? "ACCESS GRANTED 🔓" : "REGISTER ENTITY 📡"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
