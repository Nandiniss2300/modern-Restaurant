import { useMood } from "../context/MoodContext";

function Profile() {
  const { moodData } = useMood();

  if (!moodData) return null;

  return (
    <div className="text-white min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"></span>
            <span className="text-sm font-medium tracking-wide">Food Memory Online</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 font-outfit drop-shadow-lg">
            AI Taste <span className={moodData.textAccent}>Profile</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Insights drawn from your past moods and dining selections.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* User ID Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group col-span-1">
            <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full ${moodData.accentClass} blur-[80px] opacity-20`}></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white/20 to-white/5 p-1 mb-4">
                <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center text-3xl">👤</div>
              </div>
              <h2 className="text-2xl font-bold font-outfit">Nandini</h2>
              <p className="text-white/50 text-sm mt-1 uppercase tracking-widest font-mono">ID: M2M-9941</p>
              
              <div className="w-full mt-8 text-left space-y-4">
                <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Current Active Vibe</p>
                  <p className={`font-semibold ${moodData.textAccent}`}>{moodData.name}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Most Frequent</p>
                  <p className="font-semibold text-indigo-400">Cozy & Comforting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            
            {/* Spice & Texture Radar */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold font-outfit mb-6 flex items-center gap-2">
                🌶️ Palate Analytics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">Spice Tolerance</span>
                    <span className="font-mono text-red-400">85%</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-600 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">Sweet Craving (Post-Stress)</span>
                    <span className="font-mono text-pink-400">92%</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-600 rounded-full w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">Experimental Dining</span>
                    <span className="font-mono text-cyan-400">40%</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-[40%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold font-outfit mb-4 flex items-center gap-2">
                🤖 AI Behavioral Summary
              </h3>
              <p className="text-white/70 leading-relaxed">
                Based on 24 recorded interactions, you show a strong correlation between <span className="text-white font-semibold">rainy weather</span> and cravings for <span className="text-white font-semibold">hot starters</span>. During high-stress days, your palate shifts towards <span className="text-white font-semibold">comfort foods and desserts</span>, avoiding experimental spices. You strongly prefer window seating when accompanied by a partner.
              </p>
              <button className={`mt-6 px-6 py-2 rounded-xl text-sm font-bold border border-white/20 hover:bg-white/10 transition-colors text-white`}>
                Export Full Report
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
