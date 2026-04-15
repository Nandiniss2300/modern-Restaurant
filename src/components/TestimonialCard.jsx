function TestimonialCard({ name, review }) {
  return (
    <div className="testimonial">
      <h4>{name}</h4>
      <p>"{review}"</p>
    </div>
  );
}

export default TestimonialCard;