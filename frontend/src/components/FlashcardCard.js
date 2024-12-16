import React, { useState } from 'react';
import './styles/FlashcardCard.css';  // Ensure to import the CSS correctly

const FlashcardCard = ({ flashcard, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped(!isFlipped);

    return (
        <div className="flashcard-card" onClick={toggleFlip}>
            <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <div className="card-front">
                    <h3>{flashcard.question}</h3>
                    <button className="delete-button" onClick={(e) => {
                        e.stopPropagation();  // Prevents the flip from triggering when deleting
                        onDelete();
                    }}>Delete</button>
                </div>
                <div className="card-back">
                    <p>{flashcard.answer}</p>
                </div>
            </div>
        </div>
    );
};

export default FlashcardCard;
