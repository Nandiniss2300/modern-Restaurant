import { useState } from "react";
import { useMood } from "../context/MoodContext";

function Reviews() {
  const { moodData } = useMood();
  
  const [reviewsList, setReviewsList] = useState([
    { id: 1, user: "@maincharacterr", pfp: "👑", rating: "5/5", text: "The truffle fries literally altered my brain chemistry. No cap.", likes: 14200, liked: false, time: "2h ago" },
    { id: 2, user: "@feral_foodie", pfp: "🦝", rating: "5/5", text: "Waitress was giving main character. Food was bussin respectfully.", likes: 8900, liked: false, time: "5h ago" },
    { id: 3, user: "@delulu_is_the_solulu", pfp: "✨", rating: "4/5", text: "Pricey but I secured the bag so it's fine. The aesthetic is immaculate.", likes: 45100, liked: false, time: "1d ago" },
    { id: 4, user: "@hypebeast_eats", pfp: "🛹", rating: "5/5", text: "They understood the assignment. The mocktails are straight fire.", likes: 99000, liked: false, time: "1d ago" },
    { id: 5, user: "@aesthetic_ghost", pfp: "👻", rating: "5/5", text: "I ascended while eating the paneer tikka. That is all.", likes: 1200000, liked: false, time: "2d ago" },
    { id: 6, user: "@mid_hunter", pfp: "🧐", rating: "1/5", text: "Thought it would be mid but I was wrong. I'm sorry.", likes: 402, liked: false, time: "3d ago" },
    { id: 7, user: "@food_tok_ceo", pfp: "📱", rating: "5/5", text: "If you aren't eating here you are quite literally missing out on life.", likes: 88300, liked: false, time: "1w ago" }
  ]);

  const [newReviewText, setNewReviewText] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  if (!moodData) return null;

  const toggleLike = (id) => {
    setReviewsList(prev => prev.map(rev => {
      if (rev.id === id) {
        return {
          ...rev,
          likes: rev.liked ? rev.likes - 1 : rev.likes + 1,
          liked: !rev.liked
        };
      }
      return rev;
    }));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    const newReview = {
      id: reviewsList.length + 1,
      user: "@guest_entity",
      pfp: "⚡",
      rating: "5/5",
      text: newReviewText,
      likes: 1,
      liked: true,
      time: "Just now"
    };

    setReviewsList([newReview, ...reviewsList]);
    setNewReviewText("");
    setShowAddForm(false);
  };

  const formatLikes = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-24 font-outfit overflow-hidden relative">
      {/* Background brutalist elements */}
      <div 
        className="absolute top-40 right-10 w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-15 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${moodData.glowColor} 0%, transparent 80%)`
        }}
      ></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-12 border-b-4 border-white pb-8 flex flex-col items-start">
          <div className="inline-block px-4 py-1.5 mb-4 bg-white text-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_black] border-2 border-black rotate-[-2deg]">
            Spill The Tea ☕
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 text-white">
            VIBE <br /> <span className={moodData.textAccent} style={{ filter: `drop-shadow(0 0 10px ${moodData.glowColor})` }}>CHECKS.</span>
          </h1>
          <p className="text-xl font-bold bg-zinc-900 inline-block p-2 border-2 border-white/20">
            Real reviews. No filter. 💅
          </p>
        </div>

        {/* Leave a review toggle button */}
        <div className="mb-12 text-center">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className={`w-full py-5 font-black uppercase text-xl border-4 border-black transition-all cursor-pointer ${
              showAddForm ? 'bg-zinc-800 text-white shadow-none' : `${moodData.accentClass} text-black shadow-[8px_8px_0_0_white] hover:translate-y-1 hover:shadow-none`
            }`}
            style={{
              boxShadow: !showAddForm ? `6px 6px 0px 0px #ffffff, 0 10px 20px -5px ${moodData.glowColor || 'rgba(255,255,255,0.2)'}` : 'none'
            }}
          >
            {showAddForm ? "CLOSE CONSOLE ✕" : "DROP A REVIEW 🎤"}
          </button>
        </div>

        {/* ADD REVIEW FORM */}
        {showAddForm && (
          <form 
            onSubmit={handleAddReview} 
            className="mb-12 bg-black border-4 border-white p-6 shadow-[10px_10px_0_0_white] animate-fade-in"
          >
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">Broadcast your vibe:</h3>
            <textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="The garlic bread altered my dna... (be honest)"
              required
              rows="3"
              className="w-full bg-zinc-950 border-4 border-white p-4 text-white font-bold placeholder-white/30 focus:outline-none focus:border-white transition-all uppercase tracking-wide text-sm"
            ></textarea>
            <button 
              type="submit"
              className={`mt-4 px-8 py-4 border-4 border-black font-black uppercase text-sm cursor-pointer ${moodData.accentClass} text-black shadow-[4px_4px_0_0_white] hover:translate-y-0.5 hover:shadow-none`}
            >
              SEND BROADCAST 📡
            </button>
          </form>
        )}

        {/* REVIEWS FEED */}
        <div className="space-y-8">
          {reviewsList.map((review) => (
            <div 
              key={review.id} 
              className="bg-black/80 border-4 border-white p-6 shadow-[8px_8px_0_0_white] transition-all duration-300 hover:scale-[1.01] relative group"
              style={{
                boxShadow: `8px 8px 0px 0px #ffffff, 0 10px 30px -10px ${moodData.glowColor || 'rgba(255,255,255,0.1)'}`
              }}
            >
              {/* Top Bar: User & Time */}
              <div className="flex justify-between items-center mb-4 border-b-2 border-zinc-850 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 border-2 border-white bg-zinc-900 flex items-center justify-center text-2xl shadow-[2px_2px_0_0_white]">
                    {review.pfp}
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-tight text-white">{review.user}</h3>
                    <p className={`text-xs font-bold ${moodData.textAccent}`}>{review.time}</p>
                  </div>
                </div>
                <div className="bg-white text-black px-3 py-1 font-black text-sm border-2 border-black rotate-[5deg] shadow-[2px_2px_0_0_black]">
                  {review.rating}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-6">
                "{review.text}"
              </p>

              {/* Engagement Bar */}
              <div className="flex gap-6 text-zinc-400 font-bold text-sm select-none">
                <button 
                  onClick={() => toggleLike(review.id)}
                  className={`transition-all duration-350 cursor-pointer flex items-center gap-2 text-base font-black ${
                    review.liked ? 'text-red-500 scale-105' : 'hover:text-white'
                  }`}
                >
                  <span className={`text-xl transition-transform ${review.liked ? 'animate-ping duration-150 absolute opacity-50' : ''}`}>❤️</span>
                  <span className="relative z-10">{review.liked ? '❤️' : '🤍'} {formatLikes(review.likes)}</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span> Reply
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xl">🔗</span> Share
                </div>
              </div>

              {/* Decorative tag */}
              <div className={`absolute -right-4 -bottom-4 bg-white text-black px-3 py-1 font-black uppercase text-xs border-2 border-black rotate-[-10deg] shadow-[2px_2px_0_0_black] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                Based
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Reviews;
