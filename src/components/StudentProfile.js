import React, { useState } from 'react';
import '../components/styles/StudentProfile.css';

const StudentProfile = () => {
  const [student, setStudent] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(student);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = () => {
    setStudent(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      <div className="profile-card">
        <img src={student.avatar} alt="Avatar" className="profile-avatar" />
        {isEditing ? (
          <form className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={saveChanges}>
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
