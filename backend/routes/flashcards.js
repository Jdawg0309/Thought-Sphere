const express = require('express');
const auth = require('../middleware/auth'); // Middleware to protect routes
const Flashcard = require('../models/Flashcard'); // Flashcard model
const router = express.Router();

// @route GET /api/flashcards
// @desc Get all flashcards for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user.id });
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/flashcards
// @desc Add a new flashcard
router.post('/', auth, async (req, res) => {
  const { question, answer, category } = req.body;

  try {
    const newFlashcard = new Flashcard({
      userId: req.user.id,
      question,
      answer,
      category,
    });

    const savedFlashcard = await newFlashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route PUT /api/flashcards/:id
// @desc Update a flashcard
router.put('/:id', auth, async (req, res) => {
  const { question, answer, category } = req.body;

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { question, answer, category },
      { new: true }
    );

    if (!updatedFlashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json(updatedFlashcard);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route DELETE /api/flashcards/:id
// @desc Delete a flashcard
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(req.params.id);

    if (!deletedFlashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json({ message: 'Flashcard deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
