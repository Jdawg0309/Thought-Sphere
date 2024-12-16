const express = require('express');
const Flashcard = require('../models/Flashcard');
const router = express.Router();

// GET all flashcards for the logged-in user
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user._id });
    res.status(200).json(flashcards);
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST a new flashcard
router.post('/', async (req, res) => {
  const { question, answer, category } = req.body;

  try {
    const newFlashcard = new Flashcard({
      userId: req.user._id,
      question,
      answer,
      category,
    });

    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (err) {
    console.error('Error saving flashcard:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// DELETE a flashcard
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found.' });
    }
    res.status(200).json({ message: 'Flashcard deleted.' });
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
