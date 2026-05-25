import React from 'react';

function ReceiptModal({ cartItems, cartTotal, moodData, onClose }) {
  // Generate random data for the receipt
  const orderNumber = Math.floor(Math.random() * 90000) + 10000;
  const hypeScore = Math.floor(Math.random() * 20) + 80;
  const date = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm flex flex-col items-center animate-fade-in">
        
        {/* Receipt Container */}
        <div className="w-full bg-white text-black p-8 shadow-[12px_12px_0_0_black] border-4 border-black rotate-[-1deg] relative overflow-hidden">
          
          {/* Jagged top edge effect using pure CSS borders */}
          <div className="absolute top-0 left-0 w-full flex justify-between px-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-black rounded-b-full -mt-2"></div>
            ))}
          </div>

          <div className="text-center mb-6 mt-4 border-b-4 border-black pb-4 border-dashed">
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-2">VibeCheck</h2>
            <p className="text-sm font-bold uppercase tracking-widest">Aesthetic Eats</p>
            <p className="text-xs font-bold mt-2">ORDER #{orderNumber}</p>
            <p className="text-xs font-bold">{date} {time}</p>
          </div>

          <div className="mb-6 space-y-3">
            <p className="text-sm font-black uppercase tracking-widest border-b-2 border-black pb-1">Your Haul:</p>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm font-bold">
                <span className="w-2/3 uppercase">{item.quantity}x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-black border-dashed pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-black uppercase">
              <span>Total Vibe</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold mt-2">
              <span>Hype Score</span>
              <span>{hypeScore}% 🔥</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold mt-1">
              <span>Mood Pick</span>
              <span className="uppercase">{moodData.name}</span>
            </div>
          </div>

          {/* Fake Barcode */}
          <div className="flex justify-center mb-4">
            <div className="flex items-end gap-[2px] h-16 w-full max-w-[250px]">
              {[...Array(40)].map((_, i) => (
                <div key={i} className={`bg-black ${Math.random() > 0.5 ? 'h-full' : 'h-3/4'}`} style={{ width: `${Math.random() * 4 + 1}px` }}></div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs font-bold uppercase tracking-widest mt-4">Thank you for passing the vibe check.</p>
          
          {/* Jagged bottom edge effect */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between px-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-black rounded-t-full -mb-2"></div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-zinc-900 border-4 border-white text-white font-black uppercase text-sm hover:bg-black transition-all"
          >
            Close
          </button>
          <button 
            onClick={() => alert("Sharing to IG Story! (Mock)")}
            className={`flex-1 py-3 ${moodData.accentClass} border-4 border-white text-black font-black uppercase text-sm shadow-[6px_6px_0_0_white] hover:translate-y-1 hover:shadow-none transition-all`}
          >
            Share to Story 📸
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReceiptModal;
