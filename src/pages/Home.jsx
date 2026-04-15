import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
  const images = [
    "/images/biryani.jpg",
    "/images/pizza.jpg",
    "/images/burger.jpg",
    "/images/hero.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1800); // ⏱ 1.8 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Global Spice 🍽️</h1>
          <p>Experience Taste Like Never Before</p>
          <button onClick={() => navigate("/menu")}>
                Explore Menu
                </button>
        </div>
      </section>

      {/* AUTO IMAGE SLIDER */}
      <section className="section">
        <h2>Our Specials</h2>

        
        <div className="slider">
  <div
    className="slider-track"
    style={{ transform: `translateX(-${index * 100}%)` }}
  >
    {images.map((img, i) => (
      <div className="slide" key={i}>
        <img src={img} alt="food" />
        <div className="slide-text">Delicious Food 🍽️</div>
      </div>
    ))}
  </div>

  {/* DOTS */}
  <div className="dots">
    {images.map((_, i) => (
      <span
        key={i}
        className={index === i ? "dot active" : "dot"}
        onClick={() => setIndex(i)}
      ></span>
    ))}
  </div>

  {/* ARROWS */}
  <button
    className="prev"
    onClick={() =>
      setIndex(index === 0 ? images.length - 1 : index - 1)
    }
  >
    ❮
  </button>

  <button
    className="next"
    onClick={() => setIndex((index + 1) % images.length)}
  >
    ❯
  </button>
</div>
      </section>

      {/* DISHES */}
      <section className="section">
        <h2>Popular Dishes</h2>

        <div className="grid">
          <div className="card">
            <img src="/images/biryani.jpg" alt="biryani" />
            <h3>Biryani</h3>
          </div>

          <div className="card">
            <img src="/images/pizza.jpg" alt="pizza" />
            <h3>Pizza</h3>
          </div>

          <div className="card">
            <img src="/images/burger.jpg" alt="burger" />
            <h3>Burger</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;