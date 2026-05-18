import React, { useState } from 'react';
import { createProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
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
      await createProduct(formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Create Listing</h1>
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="What are you selling?"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Price (USD)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="Set a fair price"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Tell buyers about your product..."
                style={styles.textarea}
              />
            </div>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Creating...' : 'Post Listing'}
            </button>
          </form>
          <div style={styles.footer}>
            By posting, you agree to Amazon Clone's <span style={styles.link}>Conditions of Use</span> and <span style={styles.link}>Privacy Notice</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { backgroundColor: 'white', minHeight: 'calc(100vh - 60px)', display: 'flex', justifyContent: 'center', padding: '40px 20px' },
  container: { width: '100%', maxWidth: '400px' },
  title: { fontSize: '28px', fontWeight: '400', marginBottom: '20px', textAlign: 'center' },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '13px', fontWeight: 'bold' },
  input: { 
    padding: '10px', 
    borderRadius: '3px', 
    border: '1px solid #a6a6a6', 
    fontSize: '14px',
    outline: 'none',
    boxShadow: '0 1px 0 rgba(255,255,255,.5), inset 0 1px 0 rgba(0,0,0,.07)'
  },
  textarea: { 
    padding: '10px', 
    borderRadius: '3px', 
    border: '1px solid #a6a6a6', 
    fontSize: '14px',
    minHeight: '100px',
    outline: 'none',
    resize: 'vertical'
  },
  button: {
    backgroundColor: '#ffd814',
    border: '1px solid #fcd200',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '10px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px 0 rgba(213,217,217,.5)'
  },
  footer: { marginTop: '20px', fontSize: '12px', color: '#565959', lineHeight: '1.5' },
  link: { color: '#007185', cursor: 'pointer' }
};

export default AddProduct;
