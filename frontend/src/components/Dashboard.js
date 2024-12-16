import React, { useState, useEffect } from 'react';
import './styles/Dashboard.css';
import { FaPlus, FaChartPie, FaClipboardList } from 'react-icons/fa';
import axios from 'axios'; // Make sure to install axios if not already

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({ flashcards: 0, quizzes: 0, categories: 0 });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const res = await axios.get(`/api/users/${user._id}/details`); // Endpoint to fetch user details
          setStats({
            flashcards: res.data.flashcards.length,
            quizzes: res.data.quizzesTaken,
            categories: res.data.categories.length // Ensure your backend provides this data
          });
          setRecentActivities(res.data.recentActivities); // Assume this data is provided
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="dashboard-container">
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name}!</h2>
        </div>
      )}

      <div className="stats-section">
        <div className="stat-card">
          <FaChartPie className="stat-icon" />
          <h2>{stats.flashcards}</h2>
          <p>Total Flashcards</p>
        </div>
        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <h2>{stats.quizzes}</h2>
          <p>Quizzes Taken</p>
        </div>
        <div className="stat-card">
          <FaPlus className="stat-icon" />
          <h2>{stats.categories}</h2>
          <p>Categories</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activities</h2>
        {recentActivities.length > 0 ? (
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        ) : (
          <p>No recent activity to show.</p>
        )}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <button className="btn btn-primary" onClick={() => alert('Add a flashcard')}>
          Add Flashcard
        </button>
        <button className="btn btn-secondary" onClick={() => alert('Start a quiz')}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
