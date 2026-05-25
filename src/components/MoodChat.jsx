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
    <div className={`fixed bottom-24 right-6 w-80 sm:w-96 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-2xl overflow-hidden z-50 transition-all duration-500 origin-bottom-right bg-stone-900/90 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}`}>
      {/* Header */}
      <div className={`p-4 border-b border-white/10 flex justify-between items-center ${moodData.accentClass} bg-opacity-20`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/20 to-white/5 flex items-center justify-center animate-pulse">
            ✨
          </div>
          <div>
            <h3 className="text-white font-semibold font-outfit text-sm">Mood2Meal AI</h3>
            <p className={`text-xs ${moodData.textAccent}`}>Online</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white transition">
          ✕
        </button>
      </div>

      {/* Chat Area */}
      <div className="p-4 h-80 overflow-y-auto flex flex-col gap-3 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.sender === "user" 
                ? `${moodData.accentClass} text-white rounded-br-sm shadow-lg` 
                : "bg-white/10 text-stone-100 rounded-bl-sm border border-white/5"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center border border-white/5">
              <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }}></span>
              <span className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-white/10 flex gap-2 items-center bg-black/20">
        <button 
          onClick={startListening}
          className={`p-2 transition rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
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
          className="flex-grow bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition placeholder-white/30"
        />
        <button 
          onClick={() => handleSend(input)}
          className={`w-10 h-10 rounded-full ${moodData.accentClass} flex items-center justify-center text-white hover:brightness-110 transition shadow-lg`}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default MoodChat;
