import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashcardCard from './FlashcardCard';
import FlashcardForm from './FlashcardForm';
import './styles/Flashcards.css';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState('');

  // Fetch flashcards on component mount
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/flashcards', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFlashcards(response.data); // Store fetched flashcards in state
      } catch (err) {
        setError('Failed to fetch flashcards.');
        console.error('Error fetching flashcards:', err.message);
      }
    };

    fetchFlashcards();
  }, []);

  // Add a new flashcard
  const addFlashcard = async (newFlashcard) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/users/flashcards', newFlashcard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards((prevFlashcards) => [...prevFlashcards, response.data]); // Update state with the new flashcard
    } catch (err) {
      setError('Error adding flashcard.');
      console.error('Error adding flashcard:', err.message);
    }
  };

  // Delete a flashcard
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/users/flashcards/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards((prevFlashcards) => prevFlashcards.filter((card) => card._id !== id)); // Remove from state
    } catch (err) {
      setError('Error deleting flashcard.');
      console.error('Error deleting flashcard:', err.message);
    }
  };

  return (
    <div className="flashcard-list">
      <h1>Your Flashcards</h1>
      {error && <p className="error-message">{error}</p>}
      
      {/* FlashcardForm for adding new flashcards */}
      <FlashcardForm addFlashcard={addFlashcard} />

      {/* Display flashcards or a fallback message */}
      {flashcards.length > 0 ? (
        flashcards.map((flashcard) => (
          <FlashcardCard
            key={flashcard._id}
            flashcard={flashcard}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No flashcards available. Add your first one!</p>
      )}
    </div>
  );
};

export default FlashcardList;
