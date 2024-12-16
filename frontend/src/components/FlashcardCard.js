import React from 'react';
import './styles/FlashcardCard.css'; // Assuming the styles are in FlashcardCard.css

const FlashcardCard = ({ flashcard, onDelete }) => {
  // State to manage flip effect
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard-card" onClick={handleFlip}>
      <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-front">
          <h3>{flashcard.question}</h3>
        </div>
        <div className="card-back">
          <p>{flashcard.answer}</p>
          <button className="delete-button" onClick={(e) => {
            e.stopPropagation(); // Prevents the card flip when clicking on the button
            onDelete(flashcard._id);
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardCard;
