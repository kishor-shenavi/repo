import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { createOrder } from '../services/orderService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleBuy = async (productId) => {
    try {
      await createOrder({ productId, quantity: 1 });
      setMessage('Order placed successfully!');
      window.scrollTo(0, 0);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      setMessage('Failed to place order.');
    }
  };

  if (loading) return <div style={styles.loading}>Loading products...</div>;

  return (
    <div style={styles.container}>
      {message && <div style={styles.alert}>{message}</div>}
      
      <div style={styles.banner}>
        <h2 style={styles.bannerText}>Up to 50% off | Top deals of the day</h2>
      </div>

      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <div style={styles.imagePlaceholder}>
              <span style={styles.imageText}>{product.name[0]}</span>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.productName}>{product.name}</h3>
              <div style={styles.rating}>⭐⭐⭐⭐☆ (4.5)</div>
              <div style={styles.priceContainer}>
                <span style={styles.currency}>$</span>
                <span style={styles.price}>{product.price}</span>
              </div>
              <p style={styles.description}>{product.description}</p>
              <div style={styles.delivery}>FREE delivery tomorrow</div>
              <button 
                onClick={() => handleBuy(product._id)} 
                style={styles.button}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <div style={styles.empty}>
          <p>Your search returned no products. Start by adding some!</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '20px',
  },
  loading: { textAlign: 'center', padding: '50px', fontSize: '1.2rem' },
  alert: {
    padding: '15px',
    backgroundColor: '#fff',
    border: '1px solid #27ae60',
    color: '#27ae60',
    borderRadius: '4px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  bannerText: { fontSize: '24px', fontWeight: 'bold' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  imagePlaceholder: {
    height: '200px',
    backgroundColor: '#f8f8f8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #eee',
  },
  imageText: { fontSize: '60px', color: '#ddd', fontWeight: 'bold' },
  cardContent: { padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 },
  productName: { fontSize: '18px', fontWeight: '500', marginBottom: '8px', color: '#007185' },
  rating: { fontSize: '14px', color: '#565959', marginBottom: '8px' },
  priceContainer: { display: 'flex', alignItems: 'flex-start', marginBottom: '10px' },
  currency: { fontSize: '12px', marginTop: '4px', fontWeight: 'bold' },
  price: { fontSize: '28px', fontWeight: 'bold' },
  description: { 
    fontSize: '14px', 
    color: '#565959', 
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  delivery: { fontSize: '12px', color: '#565959', marginBottom: '15px' },
  button: {
    backgroundColor: '#ffd814',
    border: '1px solid #fcd200',
    borderRadius: '20px',
    padding: '8px',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: 'auto',
  },
  empty: { textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '4px' }
};

export default ProductList;
