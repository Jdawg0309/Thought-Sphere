import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlashcardCard from './FlashcardCard';
import FlashcardForm from './FlashcardForm';
import './styles/Flashcards.css';

const FlashcardList = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/flashcards', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFlashcards(response.data);
            } catch (err) {
                setError('Failed to fetch flashcards.');
                console.error('Error fetching flashcards:', err.message);
            }
        };

        fetchFlashcards();
    }, []);

    const addFlashcard = async (newFlashcard) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5000/api/users/flashcards',
                newFlashcard,
                { headers: { Authorization: `Bearer ${token}` }
            });
            setFlashcards(prevFlashcards => [...prevFlashcards, response.data]);
        } catch (err) {
            setError('Failed to add flashcard.');
            console.error('Error adding flashcard:', err.message);
        }
    };

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Your Flashcards</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <FlashcardForm addFlashcard={addFlashcard} />
            <div className="flashcard-grid">
                {flashcards.map(flashcard => (
                    <FlashcardCard
                        key={flashcard._id}
                        flashcard={flashcard}
                    />
                ))}
            </div>
        </div>
    );
};

export default FlashcardList;
