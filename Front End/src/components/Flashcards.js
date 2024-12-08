import React from 'react';
import FlashcardList from './FlashcardList';

const Flashcards = ({ user }) => {
  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.name}!</h2>
      <FlashcardList />
    </div>
  );
};

export default Flashcards;
