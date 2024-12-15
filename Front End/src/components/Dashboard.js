import React from 'react';
import './styles/Dashboard.css';
import { FaPlus, FaChartPie, FaClipboardList } from 'react-icons/fa';

const Dashboard = ({ user, stats, recentActivities }) => {
  return (
    <div className="dashboard-container">
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name}!</h2>
        </div>
      )}

      {/* Quick Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <FaChartPie className="stat-icon" />
          <h2>{stats?.flashcards || 0}</h2>
          <p>Total Flashcards</p>
        </div>
        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <h2>{stats?.quizzes || 0}</h2>
          <p>Quizzes Taken</p>
        </div>
        <div className="stat-card">
          <FaPlus className="stat-icon" />
          <h2>{stats?.categories || 0}</h2>
          <p>Categories</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2>Recent Activities</h2>
        {recentActivities && recentActivities.length > 0 ? (
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        ) : (
          <p>No recent activity to show.</p>
        )}
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <button className="btn btn-primary"  onClick={() => navigate('/flashcards')}>
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
