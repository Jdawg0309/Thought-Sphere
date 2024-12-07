import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/styles/StudentProfile.css';

const StudentProfile = ({ userId }) => {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setStudent(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      } catch (err) {
        console.error('Failed to fetch student data:', err);
      }
    };
    fetchStudent();
  }, [userId]);

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, formData);
      setStudent({ ...student, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      {student && (
        <div className="profile-card">
          <img src={student.avatar || 'https://via.placeholder.com/150'} alt="Avatar" className="profile-avatar" />
          {isEditing ? (
            <form className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <button onClick={saveChanges} className="btn btn-primary">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
