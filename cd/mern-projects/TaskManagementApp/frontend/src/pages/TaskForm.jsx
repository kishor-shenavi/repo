import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createTask, getTaskById, updateTask } from '../services/taskService';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    setFetching(true);
    try {
      const { data } = await getTaskById(id);
      setFormData({
        title: data.title,
        description: data.description,
        status: data.status
      });
      setFetching(false);
    } catch (error) {
      console.error('Error fetching task:', error);
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateTask(id, formData);
      } else {
        await createTask(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading-spinner">Loading task data...</div>;

  return (
    <div className="fade-in">
      <header className="header">
        <h1>{isEditMode ? 'Edit Task' : 'Create Task'}</h1>
        <Link to="/" className="btn btn-outline">
          Back to List
        </Link>
      </header>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Describe the task..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
            </button>
            <Link to="/" className="btn btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
