import React, { useState } from 'react';
import './styles/FlashcardCard.css';  // Ensure to import the CSS correctly
import axios from 'axios';

const FlashcardCard = ({ flashcard, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => setIsFlipped(!isFlipped);

    // Updated to use passed delete function with the correct ID
    const handleDelete = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/users/flashcards/${flashcard._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onDelete(flashcard._id);
      } catch (err) {
        // Assuming setError is available from context or props
        console.error('Error deleting flashcard:', err.message);
        alert('Error deleting flashcard.');
      }
    };

    return (
        <div className="flashcard-card" onClick={toggleFlip}>
            <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                <div className="card-front">
                    <h3>{flashcard.question}</h3>
                    <button className="delete-button" onClick={(e) => {
                        e.stopPropagation();  // Prevents the flip from triggering when deleting
                        handleDelete();  // Use the specific handleDelete for this card
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
