import React from 'react';

const FlashcardCard = ({ flashcard, onDelete }) => {
  return (
    <div className="flashcard-card">
      <h3>{flashcard.question}</h3>
      <p>{flashcard.answer}</p>
      <button
        className="btn btn-danger"
        onClick={() => onDelete(flashcard._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default FlashcardCard;
