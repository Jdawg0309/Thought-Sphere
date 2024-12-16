import React, { useState } from 'react';
import axios from 'axios';
import './styles/FlashcardCard.css';  // Make sure to update the path if necessary

// Function to call OpenAI API to generate flashcards
const generateFlashcard = async () => {
  const prompt = "Generate a flashcard question and answer about a basic science fact.";
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: prompt,
      max_tokens: 100
    }, {
      headers: {
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,  // Replace YOUR_OPENAI_API_KEY with your actual API key
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].text.trim();
    const [question, answer] = content.split(';');  // Assume format "question; answer"
    return { question, answer, category: "Science" };
  } catch (error) {
    console.error('Error generating flashcard:', error);
    throw error;
  }
};

const FlashcardForm = ({ addFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) {
      setError('Question and answer are required.');
      return;
    }

    const newFlashcard = { question, answer, category };

    try {
      await addFlashcard(newFlashcard);
      setQuestion('');
      setAnswer('');
      setCategory('');
      setError('');
    } catch (err) {
      setError('Failed to add flashcard.');
    }
  };

  const handleGenerateFlashcard = async () => {
    try {
      const card = await generateFlashcard();
      setQuestion(card.question);
      setAnswer(card.answer);
      setCategory(card.category);
    } catch (err) {
      setError('Failed to generate flashcard.');
    }
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add Flashcard</button>
      <button type="button" onClick={handleGenerateFlashcard}>Generate Flashcard</button>
    </form>
  );
};

export default FlashcardForm;
