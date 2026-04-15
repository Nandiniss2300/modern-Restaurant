import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Global Spice</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dishes">Dishes</Link>
        <Link to="/menu">Menu</Link>
      </div>
    </nav>
  );
}

export default Navbar;