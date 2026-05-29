// Simulated Gen Z AI Engine
// Powered by Main Character Energy ✨

const moodDatabase = {
  neutral: {
    id: "neutral",
    name: "NPC Mode 🧍‍♂️",
    themeClass: "from-zinc-900 via-black to-zinc-900 text-zinc-100",
    accentClass: "bg-lime-400 text-black",
    textAccent: "text-lime-400",
    message: "Vibe check? Drop your mood below, bestie.",
    recommendedCategory: "all",
    vibe: "Chill, low-key, standard dining.",
    music: "Lo-Fi Beats to study/chill to",
    crowd: "Mid",
    glowColor: "rgba(163,230,53,0.4)",
    glowShadowClass: "shadow-[0_0_30px_-5px_rgba(163,230,53,0.45)]",
    orbGradient: "from-lime-400 via-emerald-400 to-teal-500",
  },
  feral: {
    id: "feral",
    name: "Feral / Goblin Mode 👺",
    themeClass: "from-black via-fuchsia-950 to-black text-fuchsia-50",
    accentClass: "bg-fuchsia-500 text-white",
    textAccent: "text-fuchsia-500",
    message: "You're giving stressed out feral energy rn. No cap, you need this bussin comfort food.",
    recommendedCategory: "fastfood", 
    vibe: "Dark corner, zero social interaction.",
    music: "Deftones / Grunge",
    crowd: "Ghost Town",
    glowColor: "rgba(217,70,239,0.4)",
    glowShadowClass: "shadow-[0_0_30px_-5px_rgba(217,70,239,0.45)]",
    orbGradient: "from-fuchsia-500 via-purple-600 to-rose-600",
  },
  maincharacter: {
    id: "maincharacter",
    name: "Main Character Energy 💅",
    themeClass: "from-black via-pink-950 to-black text-pink-50",
    accentClass: "bg-pink-500 text-white",
    textAccent: "text-pink-500",
    message: "Slay! You are literally the moment. We secured the aesthetic window seat for the IG story.",
    recommendedCategory: "starters",
    vibe: "Neon lighting, highly aesthetic.",
    music: "Ice Spice / PinkPantheress",
    crowd: "Poppin'",
    glowColor: "rgba(236,72,153,0.4)",
    glowShadowClass: "shadow-[0_0_30px_-5px_rgba(236,72,153,0.45)]",
    orbGradient: "from-pink-500 via-rose-400 to-violet-600",
  },
  hype: {
    id: "hype",
    name: "Lit / Hype 🔋",
    themeClass: "from-black via-cyan-950 to-black text-cyan-50",
    accentClass: "bg-cyan-400 text-black",
    textAccent: "text-cyan-400",
    message: "We outside! Let's get this bread. The energy is immaculate tonight.",
    recommendedCategory: "drinks",
    vibe: "Loud, flashing lights, massive hype.",
    music: "Playboi Carti / Yeat",
    crowd: "Packed",
    glowColor: "rgba(34,211,238,0.4)",
    glowShadowClass: "shadow-[0_0_30px_-5px_rgba(34,211,238,0.45)]",
    orbGradient: "from-cyan-400 via-sky-400 to-indigo-500",
  },
  delulu: {
    id: "delulu",
    name: "Delulu Era ☁️",
    themeClass: "from-black via-indigo-950 to-black text-indigo-50",
    accentClass: "bg-indigo-400 text-white",
    textAccent: "text-indigo-400",
    message: "Being delulu is the solulu. Time for girl dinner and aesthetic drinks.",
    recommendedCategory: "desserts",
    vibe: "Dreamy, soft aesthetic, cozy.",
    music: "Lana Del Rey",
    crowd: "Low-key",
    glowColor: "rgba(129,140,248,0.4)",
    glowShadowClass: "shadow-[0_0_30px_-5px_rgba(129,140,248,0.45)]",
    orbGradient: "from-indigo-400 via-purple-400 to-pink-500",
  }
};

export function detectMood(userInput) {
  const input = userInput.toLowerCase();
  
  if (input.includes("stress") || input.includes("tired") || input.includes("mad") || input.includes("hate") || input.includes("feral")) {
    return moodDatabase.feral;
  }
  if (input.includes("date") || input.includes("cute") || input.includes("slay") || input.includes("main character")) {
    return moodDatabase.maincharacter;
  }
  if (input.includes("party") || input.includes("hype") || input.includes("lit") || input.includes("outside")) {
    return moodDatabase.hype;
  }
  if (input.includes("sad") || input.includes("cry") || input.includes("delulu") || input.includes("soft")) {
    return moodDatabase.delulu;
  }
  
  return moodDatabase.neutral;
}

export function saveFoodMemory(key, value) {
  localStorage.setItem(`vibecheck_${key}`, JSON.stringify(value));
}

export function getFoodMemory(key) {
  const data = localStorage.getItem(`vibecheck_${key}`);
  return data ? JSON.parse(data) : null;
}
