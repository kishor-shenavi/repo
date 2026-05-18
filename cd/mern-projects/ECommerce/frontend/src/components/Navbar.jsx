import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Link to="/" style={styles.logoLink}>
            <span style={styles.logoText}>ECommerce</span>
            <span style={styles.logoClone}>App</span>
          </Link>
        </div>

        <ul style={styles.navLinks}>
          <li>
            <Link to="/" style={styles.link}>
              <div style={styles.linkTop}>Hello</div>
              <div style={styles.linkBottom}>Products</div>
            </Link>
          </li>
          <li>
            <Link to="/orders" style={styles.link}>
              <div style={styles.linkTop}>Returns</div>
              <div style={styles.linkBottom}>& Orders</div>
            </Link>
          </li>
          <li>
            <Link to="/add-product" style={styles.link}>
              <div style={styles.linkTop}>Admin</div>
              <div style={styles.linkBottom}>Sell</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#131921',
    color: 'white',
    padding: '10px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1500px',
    margin: '0 auto',
    padding: '0 20px',
    gap: '20px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  logoClone: {
    fontSize: '12px',
    color: '#febd69',
    marginTop: '-5px',
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    height: '40px',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    padding: '0 10px',
    fontSize: '16px',
    outline: 'none',
  },
  searchButton: {
    backgroundColor: '#febd69',
    border: 'none',
    width: '45px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    border: '1px solid transparent',
  },
  linkTop: {
    fontSize: '12px',
    color: '#ccc',
  },
  linkBottom: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default Navbar;
