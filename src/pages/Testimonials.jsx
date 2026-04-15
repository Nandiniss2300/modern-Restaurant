import { useState, useEffect } from "react";
import testimonials from "../data/testimonials";

function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <h1>Customer Reviews</h1>
      <h3>{testimonials[index].name}</h3>
      <p>{testimonials[index].review}</p>
    </div>
  );
}

export default Testimonials;