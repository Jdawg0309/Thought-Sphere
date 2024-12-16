import React from 'react';
import FlashcardCard from './FlashcardCard'; // Import the FlashcardCard component
import './styles/FlashcardGrid.css'; // Assuming the styles for the grid are in FlashcardGrid.css

const FlashcardGrid = ({ flashcards, onDelete }) => {
  // Grouping flashcards by category
  const categories = flashcards.reduce((acc, card) => {
    acc[card.category] = acc[card.category] || [];
    acc[card.category].push(card);
    return acc;
  }, {});

  return (
    <div className="flashcard-grid">
      {Object.entries(categories).map(([category, cards], index) => (
        <div key={index} className="category-column">
          <h2>{category}</h2>
          {cards.map((card) => (
            <FlashcardCard key={card._id} flashcard={card} onDelete={onDelete} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlashcardGrid;
