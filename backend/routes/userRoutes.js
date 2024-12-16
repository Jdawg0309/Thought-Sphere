const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST: Register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      flashcards: []
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST: Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET: Retrieve all flashcards for a user
router.get('/flashcards', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.flashcards);
  } catch (err) {
    console.error('Error fetching flashcards:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST: Add a new flashcard
router.post('/flashcards', authMiddleware, async (req, res) => {
  const { question, answer, category } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newFlashcard = {
      question,
      answer,
      category,
      userId: req.user.id
    };
    user.flashcards.push(newFlashcard);
    await user.save();
    res.status(201).json(user.flashcards);
  } catch (err) {
    console.error('Error adding flashcard:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// PUT: Update a flashcard
router.put('/flashcards/:flashcardId', authMiddleware, async (req, res) => {
  const { flashcardId } = req.params;
  const { question, answer, category } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const flashcard = user.flashcards.id(flashcardId);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    flashcard.question = question || flashcard.question;
    flashcard.answer = answer || flashcard.answer;
    flashcard.category = category || flashcard.category;
    await user.save();
    res.status(200).json(user.flashcards);
  } catch (err) {
    console.error('Error updating flashcard:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// DELETE: Delete a flashcard
router.delete('/flashcards/:flashcardId', authMiddleware, async (req, res) => {
  const { flashcardId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.flashcards = user.flashcards.filter(
      flashcard => flashcard._id.toString() !== flashcardId
    );
    await user.save();
    res.status(200).json(user.flashcards);
  } catch (err) {
    console.error('Error deleting flashcard:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
