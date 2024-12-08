const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); // Updated path
const Flashcard = require('../models/Flashcard');

// POST: Add a new flashcard
router.post('/', verifyToken, async (req, res) => {
  const { question, answer, category } = req.body;

  try {
    const newFlashcard = new Flashcard({
      question,
      answer,
      category,
      user: req.user.id, // Assuming the user ID is included in the token
    });
    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (err) {
    console.error('Error saving flashcard:', err);
    res.status(500).json({ message: 'Server error while adding flashcard' });
  }
});

// GET: Retrieve flashcards for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user.id });
    res.status(200).json(flashcards);
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ message: 'Server error while fetching flashcards' });
  }
});

module.exports = router;
