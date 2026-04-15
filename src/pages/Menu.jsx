import { useState } from "react";
import dishes from "../data/dishes";

function Menu() {
  const [filter, setFilter] = useState("all");

  const filteredItems =
    filter === "all"
      ? dishes
      : dishes.filter((item) => item.category === filter);

  return (
    <div className="section">
      <h2>Our Menu 🍽️</h2>

      {/* FILTER BUTTONS */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "veg" ? "active" : ""}
          onClick={() => setFilter("veg")}
        >
          Veg 🍀
        </button>

        <button
          className={filter === "nonveg" ? "active" : ""}
          onClick={() => setFilter("nonveg")}
        >
          Non-Veg 🍗
        </button>

        <button
          className={filter === "fastfood" ? "active" : ""}
          onClick={() => setFilter("fastfood")}
        >
          Fast Food 🍔
        </button>

        <button
          className={filter === "starters" ? "active" : ""}
          onClick={() => setFilter("starters")}
        >
          Starters 🍟
        </button>

        <button
          className={filter === "desserts" ? "active" : ""}
          onClick={() => setFilter("desserts")}
        >
          Desserts 🍰
        </button>

        <button
          className={filter === "drinks" ? "active" : ""}
          onClick={() => setFilter("drinks")}
        >
          Drinks 🥤
        </button>
      </div>

      {/* GRID */}
      <div className="grid">
        {filteredItems.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <h4 className="badge">{item.category}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;