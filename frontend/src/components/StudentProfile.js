import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/StudentProfile.css';

const StudentProfile = ({ user, profilePic, setProfilePic, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePic: user?.profilePic || profilePic || '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      setSuccessMessage('');
      setErrorMessage('');

      // Update profile via API
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/students/${user.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update user state and profilePic
      setUser(response.data);
      setProfilePic(response.data.profilePic);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      profilePic: user?.profilePic || profilePic || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="profile-card">
        <img
          src={formData.profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-avatar"
        />
        {isEditing ? (
          <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Profile Picture URL</label>
              <input
                type="text"
                value={formData.profilePic}
                onChange={(e) => handleChange('profilePic', e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <h2>{formData.name}</h2>
            <p><strong>Email:</strong> {formData.email}</p>
            <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
