import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPostById, updatePost } from '../services/postService';

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setFormData({
          title: response.data.title,
          content: response.data.content,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updatePost(id, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading post data...</p></div>;
  }

  return (
    <div className="container animate-fade-in">
      <nav>
        <Link to="/" className="logo">MERN Blog</Link>
        <Link to="/" className="btn btn-outline">Back to Feed</Link>
      </nav>

      <div className="card">
        <div className="page-header" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.75rem' }}>Edit Story</h2>
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
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem' }}
            disabled={updating}
          >
            {updating ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
