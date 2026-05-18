import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createStudent } from '../services/studentService';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createStudent(formData);
      navigate('/');
    } catch (err) {
      alert('Error creating student. Please check all fields.');
      setLoading(false);
    }
  };

  return (
    <div className="container fade-in">
      <Link to="/" style={{ color: '#94a3b8', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to List</Link>
      <h1>Add Student</h1>
      
      <div className="card" style={{ maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter student age"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course name"
              required
            />
          </div>
          
          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
            {loading ? 'Saving...' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
