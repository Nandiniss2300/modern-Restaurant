import { useMood } from "../context/MoodContext";

function Reviews() {
  const { moodData } = useMood();

  if (!moodData) return null;

  const reviews = [
    { id: 1, user: "@maincharacterr", pfp: "👑", rating: "5/5", text: "The truffle fries literally altered my brain chemistry. No cap.", likes: "14.2k", time: "2h ago" },
    { id: 2, user: "@feral_foodie", pfp: "🦝", rating: "5/5", text: "Waitress was giving main character. Food was bussin respectfully.", likes: "8.9k", time: "5h ago" },
    { id: 3, user: "@delulu_is_the_solulu", pfp: "✨", rating: "4/5", text: "Pricey but I secured the bag so it's fine. The aesthetic is immaculate.", likes: "45.1k", time: "1d ago" },
    { id: 4, user: "@hypebeast_eats", pfp: "🛹", rating: "5/5", text: "They understood the assignment. The mocktails are straight fire.", likes: "99k", time: "1d ago" },
    { id: 5, user: "@aesthetic_ghost", pfp: "👻", rating: "5/5", text: "I ascended while eating the paneer tikka. That is all.", likes: "1.2m", time: "2d ago" },
    { id: 6, user: "@mid_hunter", pfp: "🧐", rating: "1/5", text: "Thought it would be mid but I was wrong. I'm sorry.", likes: "402", time: "3d ago" },
    { id: 7, user: "@food_tok_ceo", pfp: "📱", rating: "5/5", text: "If you aren't eating here you are quite literally missing out on life.", likes: "88.3k", time: "1w ago" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24 font-outfit overflow-hidden relative">
      {/* Background brutalist elements */}
      <div className={`absolute top-40 right-10 w-96 h-96 ${moodData.accentClass} rounded-full blur-[150px] opacity-20 pointer-events-none`}></div>
      
      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="mb-12 border-b-4 border-white pb-8 flex flex-col items-start">
          <div className="inline-block px-4 py-1 mb-4 bg-white text-black font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_black] border-2 border-black rotate-[-2deg]">
            Spill The Tea ☕
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4 mix-blend-difference text-transparent bg-clip-text bg-white">
            VIBE <br/> <span className={moodData.textAccent}>CHECKS.</span>
          </h1>
          <p className="text-xl font-bold bg-zinc-900 inline-block p-2 border-2 border-white/20">
            Real reviews. No filter. 💅
          </p>
        </div>

        {/* REVIEWS FEED (TikTok style scrolling) */}
        <div className="space-y-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-black border-4 border-white p-6 shadow-[8px_8px_0_0_white] hover:shadow-[12px_12px_0_0_white] transition-all hover:-translate-y-1 relative group"
            >
              {/* Top Bar: User & Time */}
              <div className="flex justify-between items-center mb-4 border-b-2 border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border-2 border-white bg-zinc-900 flex items-center justify-center text-2xl shadow-[2px_2px_0_0_white]`}>
                    {review.pfp}
                  </div>
                  <div>
                    <h3 className="font-black text-lg uppercase tracking-tight">{review.user}</h3>
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
              <div className="flex gap-6 text-zinc-400 font-bold text-sm">
                <button className={`hover:${moodData.textAccent} transition-colors flex items-center gap-2`}>
                  <span className="text-xl">🤍</span> {review.likes}
                </button>
                <button className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-xl">💬</span> Reply
                </button>
                <button className="hover:text-white transition-colors flex items-center gap-2 ml-auto">
                  <span className="text-xl">🔗</span> Share
                </button>
              </div>

              {/* Decorative hover element */}
              <div className={`absolute -right-4 -bottom-4 bg-white text-black px-3 py-1 font-black uppercase text-xs border-2 border-black rotate-[-10deg] shadow-[2px_2px_0_0_black] opacity-0 group-hover:opacity-100 transition-opacity`}>
                Based
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review button */}
        <div className="mt-16 text-center">
          <button className={`w-full max-w-md mx-auto py-6 font-black uppercase text-2xl border-4 border-black ${moodData.accentClass} text-black shadow-[8px_8px_0_0_white] hover:translate-y-2 hover:shadow-none transition-all`}>
            DROP A REVIEW 🎤
          </button>
        </div>

      </div>
    </div>
  );
}

export default Reviews;
