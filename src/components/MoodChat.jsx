import { useState, useEffect, useRef } from "react";
import { useMood } from "../context/MoodContext";

function MoodChat({ isOpen, onClose }) {
  const { moodData, changeMood } = useMood();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! How are you feeling today? (e.g., 'stressful day', 'romantic date', 'raining')" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // When moodData changes after a user input (and AI finishes "thinking")
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].sender === "user" && !isTyping) {
       setMessages((prev) => [...prev, { sender: "ai", text: moodData.message }]);
    }
  }, [moodData, isTyping, messages]);

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      changeMood(textToSend);
      setIsTyping(false);
    }, 1500);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto send after speaking
      setTimeout(() => handleSend(transcript), 500);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div 
      className={`fixed bottom-28 right-8 w-80 sm:w-96 border-4 border-white bg-black/95 backdrop-blur-2xl overflow-hidden z-50 transition-all duration-500 origin-bottom-right ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8 pointer-events-none'
      }`}
      style={{
        boxShadow: isOpen 
          ? `10px 10px 0px 0px #ffffff, 0 15px 40px -10px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}` 
          : 'none'
      }}
    >
      {/* Header */}
      <div className={`p-4 border-b-4 border-white flex justify-between items-center ${moodData.accentClass}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-none bg-black border-2 border-white flex items-center justify-center animate-pulse text-white">
            ✨
          </div>
          <div>
            <h3 className="font-black font-outfit text-sm uppercase tracking-wider">Mood2Meal AI</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-85">AI Assistant Active</p>
          </div>
        </div>
        <button onClick={onClose} className="text-current hover:scale-110 font-bold transition cursor-pointer text-lg">
          ✕
        </button>
      </div>

      {/* Chat Area */}
      <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 custom-scrollbar bg-black/40">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-[80%] p-3.5 border-2 text-sm uppercase tracking-wide font-bold ${
                msg.sender === "user" 
                  ? `${moodData.accentClass} border-black shadow-[3px_3px_0_0_white]` 
                  : "bg-zinc-900/90 text-stone-100 border-white/20"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-900/95 p-3 flex gap-1.5 items-center border-2 border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t-4 border-white flex gap-2 items-center bg-zinc-900/80">
        <button 
          onClick={startListening}
          className={`p-2 transition border-2 cursor-pointer flex items-center justify-center w-10 h-10 ${
            isListening 
              ? 'bg-red-500 text-white border-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
              : 'text-white border-white bg-black hover:bg-white hover:text-black'
          }`}
          title="Speak to AI"
        >
          🎤
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder={isListening ? "Listening..." : "How are you feeling?"}
          className="flex-grow bg-black border-2 border-white/30 focus:border-white px-4 py-2 text-sm text-white focus:outline-none transition placeholder-white/30 uppercase font-bold"
        />
        <button 
          onClick={() => handleSend(input)}
          className={`w-10 h-10 border-2 border-white cursor-pointer ${moodData.accentClass} flex items-center justify-center text-xl hover:brightness-110 active:scale-95 transition shadow-[2px_2px_0_0_white]`}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default MoodChat;
