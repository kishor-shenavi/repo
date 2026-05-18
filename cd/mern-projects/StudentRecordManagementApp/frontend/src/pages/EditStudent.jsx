import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/studentService';

const EditStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        setFormData({
          name: response.data.name,
          age: response.data.age,
          course: response.data.course,
        });
        setLoading(false);
      } catch (err) {
        alert('Error fetching student details');
        navigate('/');
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateStudent(id, formData);
      navigate('/');
    } catch (err) {
      alert('Error updating student');
      setSaving(false);
    }
  };

  if (loading) return <div className="container"><h2>Loading details...</h2></div>;

  return (
    <div className="container fade-in">
      <Link to="/" style={{ color: '#94a3b8', marginBottom: '1rem', display: 'inline-block' }}>&larr; Back to List</Link>
      <h1>Edit Student</h1>
      
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
          
          <button type="submit" disabled={saving} style={{ width: '100%', marginTop: '1rem', backgroundColor: '#10b981' }}>
            {saving ? 'Saving...' : 'Update Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
