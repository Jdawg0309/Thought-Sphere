import React, { useState } from 'react';

const FlashcardForm = ({ setFlashcards }) => {
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;
    setFlashcards((prev) => [...prev, { ...formData, _id: Date.now() }]);
    setFormData({ question: '', answer: '' });
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      <h2>Add Flashcard</h2>
      <input
        type="text"
        placeholder="Question"
        value={formData.question}
        onChange={(e) => setFormData({ ...formData, question: e.target.value })}
      />
      <input
        type="text"
        placeholder="Answer"
        value={formData.answer}
        onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default FlashcardForm;
