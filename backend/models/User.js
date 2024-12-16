const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: 'https://via.placeholder.com/150' },
  quizzesTaken: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },
  flashcards: [flashcardSchema], // Embedded flashcards
});

module.exports = mongoose.model('User', userSchema);
