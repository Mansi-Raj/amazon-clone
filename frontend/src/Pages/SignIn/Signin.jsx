import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../data/cart';
import './signin.css';

export function SignIn() {
  const navigate = useNavigate();
  const { mergeGuestCart } = useCart();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          // Save Token and Name
          localStorage.setItem('token', data.token);
          if (data.name) {
            localStorage.setItem('name', data.name);
          }
          
          // Merge Guest Cart
          await mergeGuestCart(); 

          // Redirect
          navigate('/');
      } else {
          setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
    <title>Sign In</title>
    <div className="signin-container">
      <Link to="/" className="signin-logo-link">
        <img className="signin-logo" src="images/amazon-logo.png" alt="Amazon Logo" />
      </Link>

      <div className="signin-box">
        <h1 className="signin-header">Sign in</h1>

        <form className="signin-form">
          <label htmlFor="email" className="signin-label">Email</label>
          <input type="text" id="email" className="signin-input" />

          <label htmlFor="password" className="signin-label">Password</label>
          <input type="password" id="password" className="signin-input" />

          <div className="forgot-password-link">
            <a href="#" className="link-primary">Forgot Password?</a>
          </div>

          <button type="submit" className="signin-button button-primary">
            Sign In
          </button>
        </form>
      </div>

      <div className="new-account-section">
        <div className="new-account-divider">
          <span className="divider-line"></span>
          <span className="divider-text">New to Amazon?</span>
          <span className="divider-line"></span>
        </div>
        
        <Link to="/signup" className="create-account-link">
          <button className="create-account-button">
            Create your Amazon account
          </button>
        </Link>
      </div>

      <div className="signin-footer">
        <div className="footer-copyright">
        </div>
      </div>
    </div>
    </>
  );
}