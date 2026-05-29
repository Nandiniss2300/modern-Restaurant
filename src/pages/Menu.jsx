import { useState } from "react";
import dishes from "../data/dishes";
import DishCard from "../components/DishCard";
import ReceiptModal from "../components/ReceiptModal";
import { useMood } from "../context/MoodContext";

function Menu() {
  const { moodData } = useMood();
  const [activeCategory, setActiveCategory] = useState(moodData?.recommendedCategory || "all");
  const [cart, setCart] = useState({}); // Mapping of dish.id to quantity
  const [showReceipt, setShowReceipt] = useState(false);

  const [filterVeg, setFilterVeg] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);

  if (!moodData) return null;

  const categories = [
    "all", "veg starters", "non-veg starters", "veg main", "non-veg main", 
    "italian", "french", "chinese", "south indian", "north indian", 
    "desserts", "drinks"
  ];
  
  // Gen Z category translation
  const categoryLabels = {
    "all": "FYP (All)",
    "veg starters": "Veg Pre-Game",
    "non-veg starters": "Meat Pre-Game",
    "veg main": "Veg Main Event",
    "non-veg main": "Meat Main Event",
    "italian": "Italian Mafia",
    "french": "Parisian Drip",
    "chinese": "Wok Star",
    "south indian": "South Side",
    "north indian": "North Side",
    "desserts": "Sweet Treat Era",
    "drinks": "Sip & Spill",
    "fastfood": "Late Night Cravings",
    "starters": "Pre-Game"
  };

  const addToCart = (dish) => {
    setCart((prev) => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1,
    }));
  };

  const removeFromCart = (dish) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[dish.id] > 1) {
        updated[dish.id] -= 1;
      } else {
        delete updated[dish.id];
      }
      return updated;
    });
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === "all" || dish.category === activeCategory;
    const matchesVeg = !filterVeg || dish.isVeg;
    const matchesGlutenFree = !filterGlutenFree || dish.glutenFree;
    return matchesCategory && matchesVeg && matchesGlutenFree;
  });

  const cartTotal = Object.keys(cart).reduce((sum, id) => {
    const dish = dishes.find(d => d.id === parseInt(id));
    return sum + (dish ? dish.price * cart[id] : 0);
  }, 0);

  const cartItems = Object.keys(cart).map(id => {
    const dish = dishes.find(d => d.id === parseInt(id));
    return { ...dish, quantity: cart[id] };
  }).filter(item => item.id !== undefined);

  return (
    <div className={`min-h-screen bg-black text-white font-outfit pt-24 pb-24 relative`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* BRUTALIST HEADER */}
        <div className="mb-12 border-b-4 border-white pb-8">
          <div className="inline-block px-4 py-1 mb-4 bg-white text-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_black] border-2 border-black rotate-[-2deg]">
            Aesthetic Menu
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 mix-blend-difference text-transparent bg-clip-text bg-white">
            SECURE <br/> THE <span className={moodData.textAccent}>BAG.</span>
          </h1>
          <p className="text-xl font-bold bg-zinc-900 inline-block p-2 border-2 border-white/20">
            Current Vibe Level: {moodData.name} 🔥
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-3/4">
            {/* BRUTALIST FILTERS - HORIZONTAL SCROLL */}
            <div className="flex overflow-x-auto pb-6 mb-8 gap-4 custom-scrollbar">
              {/* Highlight the AI recommended category */}
              {moodData.recommendedCategory !== "all" && categoryLabels[moodData.recommendedCategory] && (
                <button
                  onClick={() => setActiveCategory(moodData.recommendedCategory)}
                  className={`flex-none px-6 py-3 font-black uppercase tracking-wider text-sm border-4 border-black transition-all cursor-pointer ${
                    activeCategory === moodData.recommendedCategory
                      ? `${moodData.accentClass} text-black shadow-[6px_6px_0_0_white]`
                      : `bg-zinc-900 text-white hover:bg-zinc-800 border-white/20`
                  }`}
                  style={{
                    boxShadow: activeCategory === moodData.recommendedCategory 
                      ? `6px 6px 0px 0px #ffffff, 0 10px 25px -5px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}` 
                      : ''
                  }}
                >
                  ✨ AI PICK: {categoryLabels[moodData.recommendedCategory]}
                </button>
              )}
              
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex-none px-6 py-3 font-black uppercase tracking-wider text-sm border-4 transition-all cursor-pointer ${
                      isActive
                        ? `${moodData.accentClass} text-black border-black shadow-[6px_6px_0_0_white]`
                        : "bg-black text-white border-white hover:bg-white hover:text-black"
                    }`}
                    style={{
                      boxShadow: isActive 
                        ? `6px 6px 0px 0px #ffffff, 0 10px 25px -5px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}` 
                        : ''
                    }}
                  >
                    {categoryLabels[category] || category}
                  </button>
                );
              })}
            </div>

            {/* DIETARY TOGGLES */}
            <div className="flex flex-wrap gap-4 mb-8 bg-zinc-950 p-4 border-4 border-white select-none items-center">
              <span className="text-sm font-black uppercase tracking-wider text-zinc-400">
                DIETARY PREFERENCES:
              </span>
              <button
                onClick={() => setFilterVeg(!filterVeg)}
                className={`px-4 py-2 font-black uppercase text-xs border-4 transition-all flex items-center gap-2 cursor-pointer ${
                  filterVeg
                    ? "bg-green-500 border-black text-black shadow-[4px_4px_0_0_white]"
                    : "bg-black border-white text-white hover:bg-white hover:text-black"
                }`}
                style={{
                  boxShadow: filterVeg 
                    ? `4px 4px 0px 0px #ffffff, 0 0 20px ${moodData.glowColor || 'rgba(255,255,255,0.4)'}` 
                    : ''
                }}
              >
                <span>🥦 VEG ONLY</span>
                <div className={`w-4 h-4 border-2 flex items-center justify-center ${filterVeg ? 'border-black' : 'border-white'}`}>
                  {filterVeg && <div className="w-2 h-2 bg-black"></div>}
                </div>
              </button>

              <button
                onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                className={`px-4 py-2 font-black uppercase text-xs border-4 transition-all flex items-center gap-2 cursor-pointer ${
                  filterGlutenFree
                    ? "bg-amber-400 border-black text-black shadow-[4px_4px_0_0_white]"
                    : "bg-black border-white text-white hover:bg-white hover:text-black"
                }`}
                style={{
                  boxShadow: filterGlutenFree 
                    ? `4px 4px 0px 0px #ffffff, 0 0 20px ${moodData.glowColor || 'rgba(255,255,255,0.4)'}` 
                    : ''
                }}
              >
                <span>🌾 GLUTEN-FREE</span>
                <div className={`w-4 h-4 border-2 flex items-center justify-center ${filterGlutenFree ? 'border-black' : 'border-white'}`}>
                  {filterGlutenFree && <div className="w-2 h-2 bg-black"></div>}
                </div>
              </button>
            </div>

            {/* DISH GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} moodData={moodData} />
                ))
              ) : (
                <div className="col-span-2 text-center py-20 bg-zinc-900 border-4 border-zinc-700">
                  <p className="text-zinc-500 font-black text-2xl uppercase tracking-widest">NO DISHES FOUND BESTIE 💀</p>
                </div>
              )}
            </div>
          </div>

          {/* BRUTALIST CART SIDEBAR */}
          <div className="lg:w-1/4">
            <div 
              className="sticky top-28 bg-black border-4 border-white p-6 transition-all duration-300"
              style={{
                boxShadow: `12px 12px 0px 0px #ffffff, 0 15px 40px -10px ${moodData.glowColor || 'rgba(255,255,255,0.15)'}`
              }}
            >
              <h2 className="text-3xl font-black uppercase border-b-4 border-white pb-4 mb-6 tracking-tighter">
                YOUR HAUL 🛒
              </h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 opacity-50">👻</div>
                  <p className="text-zinc-400 font-bold uppercase">Bag is looking empty, bestie.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-zinc-900 p-3 border-2 border-white/20">
                      <div>
                        <h4 className="font-black uppercase text-sm">{item.name}</h4>
                        <p className={`text-xs font-bold ${moodData.textAccent}`}>₹{item.price} x {item.quantity}</p>
                      </div>
                      <span className="font-black">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t-4 border-white">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold uppercase text-zinc-400">Total Vibe:</span>
                  <span className={`text-4xl font-black ${moodData.textAccent} transition-colors duration-1000`}>₹{cartTotal}</span>
                </div>
                <button 
                  disabled={cartItems.length === 0}
                  onClick={() => setShowReceipt(true)}
                  className={`w-full py-4 font-black uppercase text-xl border-4 border-black transition-all cursor-pointer ${
                    cartItems.length === 0 
                      ? 'bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed' 
                      : `${moodData.accentClass} text-black shadow-[6px_6px_0_0_white] hover:bg-white hover:text-black hover:border-black hover:shadow-none`
                  }`}
                  style={{
                    boxShadow: cartItems.length > 0 
                      ? `6px 6px 0px 0px #ffffff, 0 10px 25px -5px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}` 
                      : ''
                  }}
                >
                  CHECKOUT 💳
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* RENDER RECEIPT MODAL */}
      {showReceipt && (
        <ReceiptModal 
          cartItems={cartItems} 
          cartTotal={cartTotal} 
          moodData={moodData} 
          onClose={() => setShowReceipt(false)} 
        />
      )}
    </div>
  );
}

export default Menu;