import React from 'react';

const FlashcardCard = ({ flashcard, setFlashcards }) => {
  return (
    <div className="flashcard-card">
      <h3>{flashcard.question}</h3>
      <p>{flashcard.answer}</p>
      <button
        className="btn btn-danger"
        onClick={() =>
          setFlashcards((prev) =>
            prev.filter((item) => item._id !== flashcard._id)
          )
        }
      >
        Delete
      </button>
    </div>
  );
};

export default FlashcardCard;
