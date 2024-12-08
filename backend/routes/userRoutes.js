const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as per your project structure
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware
const router = express.Router();

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// POST: Register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST: Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    console.log('User fetched from DB:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET: Retrieve all flashcards for a user
router.get('/:userId/flashcards', authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.flashcards || []);
  } catch (err) {
    console.error('Error fetching flashcards:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST: Add a new flashcard for a user
router.post('/:userId/flashcards', authMiddleware, async (req, res) => {
  const { userId } = req.params;
  const { question, answer, category } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newFlashcard = { question, answer, category };
    user.flashcards.push(newFlashcard);
    await user.save();

    res.status(201).json(user.flashcards);
  } catch (err) {
    console.error('Error adding flashcard:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// PUT: Update a flashcard
router.put('/:userId/flashcards/:flashcardId', authMiddleware, async (req, res) => {
  const { userId, flashcardId } = req.params;
  const { question, answer, category } = req.body;

  try {
    const user = await User.findById(userId);
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
    console.error('Error updating flashcard:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// DELETE: Delete a flashcard
router.delete('/:userId/flashcards/:flashcardId', authMiddleware, async (req, res) => {
  const { userId, flashcardId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.flashcards = user.flashcards.filter((flashcard) => flashcard._id.toString() !== flashcardId);
    await user.save();

    res.status(200).json(user.flashcards);
  } catch (err) {
    console.error('Error deleting flashcard:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
