import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import SmartTable from "./pages/SmartTable.jsx";
import DatePlanner from "./pages/DatePlanner.jsx";
import Profile from "./pages/Profile.jsx";
import Reviews from "./pages/Reviews.jsx";
import Login from "./pages/Login.jsx";
import { MoodProvider, useMood } from "./context/MoodContext.jsx";
import AIAssistantOrb from "./components/AIAssistantOrb.jsx";

// Page transitions wrapper
function AnimatedPageWrapper({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition-wrap flex-grow flex flex-col">
      {children}
    </div>
  );
}

function AppContent() {
  const [cart, setCart] = useState([]);
  const { moodData } = useMood();
  
  // User Auth State
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("vibecheck_user");
    return stored ? JSON.parse(stored) : null;
  });
  
  // Glitch transition state
  const [showGlitch, setShowGlitch] = useState(false);
  const prevMoodId = useRef(null);

  useEffect(() => {
    if (moodData) {
      if (prevMoodId.current && prevMoodId.current !== moodData.id) {
        setShowGlitch(true);
        const timer = setTimeout(() => setShowGlitch(false), 850);
        prevMoodId.current = moodData.id;
        return () => clearTimeout(timer);
      }
      prevMoodId.current = moodData.id;
    }
  }, [moodData]);

  const handleLogin = (userData) => {
    localStorage.setItem("vibecheck_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("vibecheck_user");
    setUser(null);
  };

  if (!moodData) return null; // Wait for initial mood load

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 bg-gradient-to-br ${moodData.themeClass}`}>
      {/* SCREEN-WIDE GLITCH TRANSTION OVERLAY */}
      {showGlitch && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-black select-none pointer-events-none uppercase">
          <div className="absolute inset-0 bg-black opacity-95"></div>
          {/* Neon moving scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent w-full h-24 animate-scanline"></div>
          
          <div className="relative z-10 text-center animate-glitch-shake">
            <h2 className="text-4xl md:text-6xl text-white tracking-widest leading-none mb-4">
              ENVIRONMENT OVERRIDE
            </h2>
            <p className={`text-xl md:text-2xl ${moodData.textAccent} tracking-wider`}>
              AI SYNC: {moodData.name}
            </p>
          </div>
        </div>
      )}

      <Router>
        <Navbar user={user} />
        <main className="flex-grow pt-20 flex flex-col">
          <AnimatedPageWrapper>
            {!user ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/menu"
                  element={<Menu cart={cart} setCart={setCart} />}
                />
                <Route path="/smart-table" element={<SmartTable />} />
                <Route path="/date-planner" element={<DatePlanner />} />
                <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
                <Route path="/reviews" element={<Reviews />} />
              </Routes>
            )}
          </AnimatedPageWrapper>
        </main>
        <Footer />
        <AIAssistantOrb />
      </Router>
    </div>
  );
}

function App() {
  return (
    <MoodProvider>
      <AppContent />
    </MoodProvider>
  );
}

export default App;