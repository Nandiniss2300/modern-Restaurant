import dishes from "../data/dishes";
import DishCard from "../components/DishCard.jsx";

function Dishes() {
  return (
    <div className="page">
      <h1>Special Dishes</h1>

      <div className="grid">
        {dishes.map((dish, index) => (
          <DishCard key={index} {...dish} />
        ))}
      </div>
    </div>
  );
}

export default Dishes;