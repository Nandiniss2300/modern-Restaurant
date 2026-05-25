import { createContext, useState, useContext, useEffect, useRef } from "react";
import { detectMood } from "../utils/aiEngine";

const MoodContext = createContext();

// Reliable public domain sound URLs for the MVP
const soundscapes = {
  neutral: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Restaurant_ambience.ogg",
  stressed: "https://upload.wikimedia.org/wikipedia/commons/1/13/Rain_Sound_Effect.ogg", // Using rain as calming lo-fi replacement
  romantic: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Jazz_piano_music.ogg",
  party: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Disco_beat.ogg",
  rainy: "https://upload.wikimedia.org/wikipedia/commons/1/13/Rain_Sound_Effect.ogg"
};

export function MoodProvider({ children }) {
  const [currentMood, setCurrentMood] = useState("neutral");
  const [moodData, setMoodData] = useState(null);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(true); // Start muted to respect autoplay policies
  const audioRef = useRef(new Audio(soundscapes.neutral));

  useEffect(() => {
    const data = detectMood("neutral");
    setMoodData(data);
    
    // Setup initial audio
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Background ambient level
    
    return () => {
      audioRef.current.pause();
    };
  }, []);

  // Handle mood change and audio switching
  const changeMood = (userInput) => {
    const newMoodData = detectMood(userInput);
    setCurrentMood(newMoodData.id);
    setMoodData(newMoodData);

    // Switch audio source
    const wasPlaying = !audioRef.current.paused && !isMuted;
    audioRef.current.pause();
    audioRef.current.src = soundscapes[newMoodData.id];
    
    if (wasPlaying || !isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <MoodContext.Provider value={{ currentMood, moodData, changeMood, isMuted, toggleMute }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}
