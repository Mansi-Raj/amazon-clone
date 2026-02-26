import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Admin.css'; // You'll need to create basic CSS for layout

export function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/signin');
  }, [navigate]);

  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/products">Products</Link></li>
          <li><Link to="/admin/orders">Orders & Returns</Link></li>
        </ul>
        <button onClick={() => {
            localStorage.removeItem('adminToken');
            navigate('/signin');
        }}>Logout</button>
      </nav>
      <main className="admin-content">
        <Outlet />
      </main>
      <footer className="admin-footer-fixed">
        © 2026 Amazon Clone Admin
      </footer>
    </div>
  );
}