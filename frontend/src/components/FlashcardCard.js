import React from 'react';

const FlashcardCard = ({ flashcard, onDelete }) => {
    return (
        <li className="flashcard-card">
            <h3>{flashcard.question}</h3>
            <p>{flashcard.answer}</p>
            <button onClick={onDelete}>Delete</button>
        </li>
    );
};

export default FlashcardCard;
