import { useState } from "react";

function DishCard({ dish, addToCart, removeFromCart, cart = {}, moodData }) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a stable aesthetic hype score based on dish name length
  const hypeScore = 80 + (dish.name.length % 20);
  const quantity = cart[dish.id] || 0;

  return (
    <div 
      className="bg-black border-4 border-white group relative overflow-hidden flex flex-col transition-all duration-500 ease-out hover:-translate-y-2"
      style={{
        boxShadow: isHovered 
          ? `12px 12px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor}` 
          : '8px 8px 0px 0px #ffffff'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-64 relative border-b-4 border-white overflow-hidden shrink-0">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={dish.img || dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover saturate-150 contrast-125 scale-110 transition-transform duration-[10s] ease-out group-hover:scale-125 group-hover:translate-x-2 group-hover:-translate-y-2" 
          />
        </div>
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors duration-[0.8s] z-10 pointer-events-none"></div>
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 font-black uppercase text-xs border-2 border-black rotate-[-5deg] shadow-[2px_2px_0_0_black] z-20">
          {dish.category}
        </div>

        {/* Hype Score */}
        <div 
          className="absolute bottom-4 right-4 text-black px-3 py-1 font-black uppercase text-xs border-2 border-black rotate-[3deg] shadow-[2px_2px_0_0_black] z-20 transition-colors duration-500"
          style={{
            backgroundColor: moodData.accentClass.includes("bg-lime-400") ? "#a3e635" : 
                             moodData.accentClass.includes("bg-fuchsia-500") ? "#d946ef" :
                             moodData.accentClass.includes("bg-pink-500") ? "#ec4899" :
                             moodData.accentClass.includes("bg-cyan-400") ? "#22d3ee" : "#818cf8"
          }}
        >
          HYPE: {hypeScore}% 🔥
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Title row with Veg/Non-Veg indicators */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-2xl font-black uppercase tracking-tight w-2/3 leading-none text-white flex items-center gap-2">
            {/* Square stamp badge for Veg / Non-Veg */}
            <span 
              className={`w-4 h-4 shrink-0 border-2 flex items-center justify-center ${dish.isVeg ? 'border-green-600' : 'border-red-600'}`} 
              title={dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
            </span>
            {dish.name}
          </h3>
          <span className={`font-black text-2xl ${moodData.textAccent} transition-colors duration-1000`}>₹{dish.price}</span>
        </div>

        {/* Spicy & Gluten Free tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4 select-none">
          {dish.glutenFree && (
            <span className="text-[9px] font-black bg-amber-400 border border-black text-black px-1.5 py-0.5 shadow-[1px_1px_0_0_black] uppercase">
              🌾 GF
            </span>
          )}
          {dish.spicy > 0 && (
            <span className="text-[9px] font-black bg-red-600 border border-black text-white px-1.5 py-0.5 shadow-[1px_1px_0_0_black] uppercase flex items-center gap-0.5">
              {"🌶️".repeat(dish.spicy)}
            </span>
          )}
        </div>
        
        <p className="text-zinc-400 font-bold text-sm mb-6 line-clamp-2 leading-snug flex-grow">
          {dish.desc || dish.description || "Aesthetic eats curated for the moment."}
        </p>

        {quantity > 0 ? (
          <div className="flex items-center gap-0 border-4 border-white mt-auto select-none">
            <button 
              onClick={() => removeFromCart(dish)} 
              className="px-5 py-4 bg-black hover:bg-white hover:text-black text-white font-black text-xl border-r-4 border-white transition-all cursor-pointer w-16 text-center"
            >
              -
            </button>
            <div className="flex-grow text-center font-black text-sm uppercase tracking-widest bg-zinc-900 text-white py-4">
              {quantity} In Bag
            </div>
            <button 
              onClick={() => addToCart(dish)} 
              className="px-5 py-4 bg-black hover:bg-white hover:text-black text-white font-black text-xl border-l-4 border-white transition-all cursor-pointer w-16 text-center"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            onClick={() => addToCart(dish)}
            className={`w-full py-4 bg-transparent border-4 border-white text-white font-black uppercase tracking-widest text-base transition-all mt-auto cursor-pointer ${
              isHovered ? `bg-white text-black shadow-[4px_4px_0_0_white]` : ''
            }`}
          >
            {isHovered ? "SECURE IT 💸" : "ADD TO CART"}
          </button>
        )}
      </div>
    </div>
  );
}

export default DishCard;