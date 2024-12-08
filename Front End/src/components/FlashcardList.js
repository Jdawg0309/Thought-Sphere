import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashcardCard from './FlashcardCard';
import FlashcardForm from './FlashcardForm';
import './styles/Flashcards.css';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/flashcards', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlashcards(response.data);
      } catch (err) {
        setError('Failed to fetch flashcards.');
      }
    };

    fetchFlashcards();
  }, []);

  return (
    <div className="flashcard-list">
      <h1>Your Flashcards</h1>
      {error && <p className="error-message">{error}</p>}
      {flashcards.map((flashcard) => (
        <FlashcardCard key={flashcard._id} flashcard={flashcard} setFlashcards={setFlashcards} />
      ))}
      <FlashcardForm setFlashcards={setFlashcards} />
    </div>
  );
};

export default FlashcardList;
