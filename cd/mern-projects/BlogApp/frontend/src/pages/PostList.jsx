import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../services/postService';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post._id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return <div className="container"><p>Loading posts...</p></div>;
  }

  return (
    <div className="container animate-fade-in">
      <nav>
        <Link to="/" className="logo">MERN Blog</Link>
        <Link to="/create" className="btn btn-primary">Create New Post</Link>
      </nav>

      <div className="page-header">
        <h1>Latest Stories</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore our latest blog posts</p>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <h2>No posts found</h2>
          <p>Be the first to share your thoughts!</p>
          <Link to="/create" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Start Writing</Link>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <div className="post-actions">
                <Link to={`/edit/${post._id}`} className="btn btn-outline" style={{ flex: 1 }}>Edit</Link>
                <button 
                  onClick={() => handleDelete(post._id)} 
                  className="btn btn-danger"
                  style={{ flex: 1 }}
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

export default PostList;
