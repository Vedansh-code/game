const Card = ({ card, flipped, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="front">❓</div>
        <div className="back">{card.emoji}</div>
      </div>
    </div>
  );
};

export default Card;