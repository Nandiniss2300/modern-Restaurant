import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import SmartTable from "./pages/SmartTable.jsx";
import DatePlanner from "./pages/DatePlanner.jsx";
import Profile from "./pages/Profile.jsx";
import Reviews from "./pages/Reviews.jsx";
import { MoodProvider, useMood } from "./context/MoodContext.jsx";
import AIAssistantOrb from "./components/AIAssistantOrb.jsx";

function AppContent() {
  const [cart, setCart] = useState([]);
  const { moodData } = useMood();

  if (!moodData) return null; // Wait for initial mood load

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 bg-gradient-to-br ${moodData.themeClass}`}>
      <Router>
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/menu"
              element={<Menu cart={cart} setCart={setCart} />}
            />
            <Route path="/smart-table" element={<SmartTable />} />
            <Route path="/date-planner" element={<DatePlanner />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
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