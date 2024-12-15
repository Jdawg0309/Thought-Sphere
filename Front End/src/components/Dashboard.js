import React, { useState, useEffect } from 'react';
import './styles/FlashcardPage.css';
import { FlashcardArray } from "react-quizlet-flashcard";

const FlashcardPage = () => {
    const [flashcards, setFlashcards] = useState(JSON.parse(localStorage.getItem('flashcards')) || []);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('categories')) || []);
    const [newCategory, setNewCategory] = useState('');


    const organizeFlashcards = () => {
   
      
        // Organise flashcards by category
        const categorizedFlashcards = categories.reduce((acc, category) => {
          acc[category] = flashcards.map((card, index) => {
            if (card.category === category) {
              return {
                id: index,
                frontHTML: <div style={{textAlign:'center', marginTop:'150px', fontSize:'36', color:'blueviolet'}}>{card.title}</div>,
                backHTML: <div style={{textAlign:'center', marginTop:'150px', fontSize:'24'}}>{card.content}</div>
              };
            }
            return null;
          }).filter(Boolean);
          return acc;
        }, {});
      
        return categorizedFlashcards;
      };
    useEffect(() => {
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [flashcards, categories]);
 
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        } else {
            alert('Category is either empty or already exists.');
        }
    };
/*

*/  

    const handleAddFlashcard = (e) => {

        e.preventDefault();
        if (title && content && category) {
            setFlashcards([...flashcards, { title, content, category }]);
            setTitle('');
            setContent('');
        } else {
       
            alert('Please fill in all fields and select a category.');
        }
    };
    return (
        <div className="dashboard-container">
            <h1>Create Flashcards</h1>
            <div className='form-style-cat'> 
            <form  onSubmit={handleAddCategory}>

                <label>New Category:</label>
                <input 
                    type="text"
                       className='formbold-form-cat'
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter a new category"
                />

                <button className='formbold-btn'
                 type="submit">Add Category</button>
             
            </form>
            </div>
        <div className='form-style'>
      

            <form onSubmit={handleAddFlashcard}>
           
           <div className='formbold-input-flex'>
                <label>Question:</label>
                <input
                    type="text"
                    className='formbold-form-input'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter flashcard title"
                />
    </div>
    <div className='formbold-input-flex'>
                <label>Answer:</label>
                <textarea
                    value={content}
                    className='formbold-form-input'
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter flashcard content"
                ></textarea>
                </div>
                <div className='formbold-input-flex'>
                <label>Category:</label>
                <select
                className='formbold-form-input'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                </div>
        
                <button className='formbold-btn'
                type="submit">Add Flashcard</button>
            </form>
            </div>
            <div>
            <h2>Your Flashcards</h2>   
            { categories.map((category) => (
                <div>
                     <h3>Category: {category}</h3>
            <FlashcardArray cards={organizeFlashcards()[category]} />
            </div>
              ))
            }
            </div>
        </div>
    );
    
};

export default FlashcardPage;
