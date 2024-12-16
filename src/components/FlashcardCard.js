import React from 'react';

const FlashcardCard = ({ flashcard, onDelete }) => {
    return (
      <div>
        <h3>{flashcard.question}</h3>
        <p>{flashcard.answer}</p>
        <button onClick={() => onDelete(flashcard._id)}>Delete</button>
      </div>
    );
  };

export default FlashcardCard;
