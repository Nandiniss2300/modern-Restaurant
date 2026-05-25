import { useState } from "react";

function DishCard({ dish, addToCart, moodData }) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a random hype score for the aesthetic
  const hypeScore = Math.floor(Math.random() * 20 + 80);

  return (
    <div 
      className="bg-black border-4 border-white group relative overflow-hidden shadow-[8px_8px_0_0_white] hover:shadow-[16px_16px_0_0_white] flex flex-col transition-all duration-500 ease-out hover:-translate-y-2"
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
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none"></div>
        
        {/* Brutalist Category Tag */}
        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 font-black uppercase text-sm border-2 border-black rotate-[-5deg] shadow-[2px_2px_0_0_black] z-20">
          {dish.category}
        </div>

        {/* Hype Score */}
        <div className={`absolute bottom-4 right-4 ${moodData.accentClass} text-black px-3 py-1 font-black uppercase text-sm border-2 border-black rotate-[3deg] shadow-[2px_2px_0_0_black] z-20`}>
          HYPE: {hypeScore}% 🔥
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black uppercase tracking-tight w-2/3 leading-none text-white">{dish.name}</h3>
          <span className={`font-black text-2xl ${moodData.textAccent} drop-shadow-[2px_2px_0_rgba(255,255,255,1)]`}>₹{dish.price}</span>
        </div>
        
        <p className="text-zinc-400 font-bold text-sm mb-6 line-clamp-2 leading-snug flex-grow">
          {dish.desc || dish.description || "Aesthetic eats for the main character."}
        </p>

        <button 
          onClick={() => addToCart(dish)}
          className={`w-full py-4 bg-transparent border-4 border-white text-white font-black uppercase tracking-widest text-lg transition-all mt-auto ${
            isHovered ? `bg-white text-black shadow-[4px_4px_0_0_white]` : ''
          }`}
        >
          {isHovered ? "SECURE IT 💸" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

export default DishCard;