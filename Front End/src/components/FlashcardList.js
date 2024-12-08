import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashcardCard from './FlashcardCard';
import FlashcardForm from './FlashcardForm';
import './styles/Flashcards.css';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState('');

  // Fetch flashcards from backend
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
        console.error(err);
      }
    };

    fetchFlashcards();
  }, []);

  // Add a flashcard
  const addFlashcard = (newFlashcard) => {
    setFlashcards((prev) => [...prev, newFlashcard]);
  };

  // Delete a flashcard
  const deleteFlashcard = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards((prev) => prev.filter((flashcard) => flashcard._id !== id));
    } catch (err) {
      setError('Failed to delete flashcard.');
      console.error(err);
    }
  };

  return (
    <div className="flashcard-list">
      <h1>Your Flashcards</h1>
      {error && <p className="error-message">{error}</p>}
      {flashcards.map((flashcard) => (
        <FlashcardCard
          key={flashcard._id}
          flashcard={flashcard}
          onDelete={deleteFlashcard}
        />
      ))}
      <FlashcardForm addFlashcard={addFlashcard} />
    </div>
  );
};

export default FlashcardList;
