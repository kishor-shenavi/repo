import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPost } from '../services/postService';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    setLoading(true);
    try {
      await createPost(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <nav>
        <Link to="/" className="logo">MERN Blog</Link>
        <Link to="/" className="btn btn-outline">Back to Feed</Link>
      </nav>

      <div className="card">
        <div className="page-header" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem' }}>Create New Story</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Give your story a title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Tell your story..."
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Story'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
