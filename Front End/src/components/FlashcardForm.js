import React, { useState } from 'react';
import axios from 'axios';
import './styles/FlashcardForm.css';

const FlashcardForm = ({ setFlashcards }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(''); // Define category
  const [errorMessage, setErrorMessage] = useState(''); // Define errorMessage

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/flashcards',
        { question, answer, category }, // Include category in request
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFlashcards((prev) => [...prev, response.data]); // Update flashcards list
      setQuestion('');
      setAnswer('');
      setCategory(''); // Reset category
      setErrorMessage('');
    } catch (err) {
      console.error('Error adding flashcard:', err.response?.data || err.message);
      setErrorMessage('Failed to add flashcard. Please try again.');
    }
  };

  return (
    <div className="flashcard-form">
      <h2>Add Flashcard</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Flashcard
        </button>
      </form>
    </div>
  );
};

export default FlashcardForm;
