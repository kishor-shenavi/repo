import React, { useState, useEffect } from 'react';
import { getOrders, cancelOrder } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        fetchOrders(); // Refresh to show the "Cancelled" status
        alert('Order cancelled successfully');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order');
      }
    }
  };

  if (loading) return <div style={styles.loading}>Loading orders...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Orders</h1>
      
      <div style={styles.tabs}>
        <div style={styles.activeTab}>All Orders</div>
      </div>

      <div style={styles.orderList}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div style={styles.headerItem}>
                <div style={styles.headerLabel}>ORDER PLACED</div>
                <div style={styles.headerValue}>{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <div style={styles.headerItem}>
                <div style={styles.headerLabel}>TOTAL</div>
                <div style={styles.headerValue}>${order.productId ? order.productId.price * order.quantity : '0'}</div>
              </div>
              <div style={styles.headerItem}>
                <div style={styles.headerLabel}>STATUS</div>
                <div style={{ ...styles.headerValue, color: order.status === 'Cancelled' ? '#c0392b' : '#27ae60' }}>
                  {order.status}
                </div>
              </div>
              <div style={styles.headerItemRight}>
                <div style={styles.headerLabel}>ORDER # {order._id.substring(0, 10).toUpperCase()}</div>
                <div style={styles.headerValue}><span style={styles.linkText}>Order Details</span></div>
              </div>
            </div>
            
            <div style={styles.orderBody}>
              <div style={styles.productInfo}>
                <div style={styles.productImage}>
                  {order.productId ? order.productId.name[0] : '?'}
                </div>
                <div style={styles.productDetails}>
                  <div style={styles.productName}>
                    {order.productId ? order.productId.name : 'Deleted Product'}
                  </div>
                  <div style={styles.returnInfo}>
                    {order.status === 'Cancelled' 
                      ? 'This order has been cancelled.' 
                      : `Return eligible through ${new Date(new Date(order.createdAt).getTime() + 30*24*60*60*1000).toLocaleDateString()}`}
                  </div>
                  <div style={styles.actionButtons}>
                  </div>
                </div>
              </div>
              <div style={styles.orderActions}>
                {order.status !== 'Cancelled' ? (
                  <>
                    <button style={styles.trackBtn}>Track package</button>
                    <button 
                      style={styles.cancelBtn} 
                      onClick={() => handleCancel(order._id)}
                    >
                      Cancel Order
                    </button>
                  </>
                ) : (
                  <div style={styles.cancelledBadge}>Cancelled</div>
                )}
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div style={styles.empty}>
            <p>You have not placed any orders in the past 3 months.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '20px' },
  loading: { textAlign: 'center', padding: '50px' },
  title: { fontSize: '28px', fontWeight: '400', marginBottom: '20px' },
  tabs: { display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' },
  activeTab: { 
    padding: '10px 20px', 
    borderBottom: '2px solid #e77600', 
    color: '#e77600', 
    fontWeight: 'bold' 
  },
  tab: { padding: '10px 20px', color: '#565959' },
  orderList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  orderCard: { 
    border: '1px solid #ddd', 
    borderRadius: '8px', 
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  orderHeader: { 
    backgroundColor: '#f0f2f2', 
    padding: '15px 20px', 
    display: 'flex', 
    gap: '40px',
    borderBottom: '1px solid #ddd',
    fontSize: '12px'
  },
  headerLabel: { color: '#565959', marginBottom: '4px' },
  headerValue: { color: '#333', fontWeight: '500' },
  headerItemRight: { marginLeft: 'auto', textAlign: 'right' },
  linkText: { color: '#007185', cursor: 'pointer' },
  orderBody: { padding: '20px', display: 'flex', justifyContent: 'space-between' },
  productInfo: { display: 'flex', gap: '20px' },
  productImage: { 
    width: '90px', 
    height: '90px', 
    backgroundColor: '#f8f8f8', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '30px',
    color: '#ccc',
    borderRadius: '4px'
  },
  productName: { color: '#007185', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' },
  returnInfo: { fontSize: '13px', color: '#565959', marginBottom: '15px' },
  actionButtons: { display: 'flex', gap: '10px' },
  orderActions: { display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' },
  trackBtn: { 
    backgroundColor: '#ffd814', 
    border: '1px solid #fcd200', 
    padding: '8px', 
    borderRadius: '8px',
    fontSize: '13px'
  },
  cancelledBadge: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '13px',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '1px solid #f5c6cb'
  },
  cancelBtn: { 
    backgroundColor: '#f8d7da', 
    border: '1px solid #f5c6cb', 
    color: '#721c24',
    padding: '8px', 
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer'
  },
  empty: { textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd' }
};

export default Orders;
