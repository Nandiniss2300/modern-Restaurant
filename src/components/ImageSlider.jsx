import { useEffect, useState } from "react";

const images = [
  "/images/biryani.jpg",
  "/images/pizza.jpg",
  "/images/burger.jpg",
  "/images/hero.jpg"
];

function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1800); // ⏱ 1.8 sec (you can change 1500–2000)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <img src={images[index]} alt="food" />
    </div>
  );
}

export default ImageSlider;