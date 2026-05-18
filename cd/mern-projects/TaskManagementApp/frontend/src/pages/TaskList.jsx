import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask, updateTask } from '../services/taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const { data } = await updateTask(task._id, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <div className="loading-spinner">Loading tasks...</div>;

  return (
    <div className="fade-in">
      <header className="header">
        <h1>Task Manager</h1>
        <Link to="/create" className="btn btn-primary">
          + New Task
        </Link>
      </header>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Get started by creating your first task.</p>
          <Link to="/create" className="btn btn-primary">
            Create Task
          </Link>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span className={`status-badge status-${task.status}`}>
                  {task.status}
                </span>
              </div>
              <p className="task-desc">{task.description}</p>
              <div className="task-actions">
                <button
                  onClick={() => toggleStatus(task)}
                  className={`btn ${task.status === 'pending' ? 'btn-success' : 'btn-outline'}`}
                >
                  {task.status === 'pending' ? 'Mark Done' : 'Undo'}
                </button>
                <Link to={`/edit/${task._id}`} className="btn btn-outline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
