import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={<Menu cart={cart} setCart={setCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;