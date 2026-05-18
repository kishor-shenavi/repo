import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/studentService';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch students. Is the backend running?');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student._id !== id));
      } catch (err) {
        alert('Failed to delete student');
      }
    }
  };

  if (loading) return <div className="container"><h2>Loading students...</h2></div>;
  if (error) return <div className="container"><h2 style={{ color: '#ef4444' }}>{error}</h2></div>;

  return (
    <div className="container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Student Records</h1>
        <Link to="/add" className="button btn-add">Add New Student</Link>
      </div>

      <div className="card">
        {students.length === 0 ? (
          <p>No students found. Add some!</p>
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.course}</td>
                  <td className="actions">
                    <Link to={`/edit/${student._id}`} className="button btn-edit" style={{ padding: '0.4em 0.8em', textDecoration: 'none' }}>
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(student._id)} className="btn-delete" style={{ padding: '0.4em 0.8em' }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentList;
