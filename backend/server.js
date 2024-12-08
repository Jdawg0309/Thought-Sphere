const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const flashcardsRoute = require('./routes/flashcards');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected to the correct database'))
  .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/flashcards', flashcardsRoute);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
