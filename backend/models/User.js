const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  createdAt: { type: Date, default: Date.now },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure this is hashed
  profilePic: { type: String, default: 'https://via.placeholder.com/150' }, // Default profile picture
  quizzesTaken: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },
  flashcards: [flashcardSchema], // Array of embedded flashcards
});

module.exports = mongoose.model('Student', studentSchema);
