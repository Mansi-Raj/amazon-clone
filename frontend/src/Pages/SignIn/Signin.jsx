import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../data/cart';
import './signin.css';

export function SignIn() {
  const navigate = useNavigate();
  const { mergeGuestCart } = useCart();
  
  // Toggle State
  const [loginType, setLoginType] = useState('customer'); // 'customer' or 'admin'
  const [adminStep, setAdminStep] = useState(1); // 1 = Email, 2 = OTP
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  // --- CUSTOMER LOGIN LOGIC ---
  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem('token', data.token);
          if (data.name) localStorage.setItem('name', data.name);
          await mergeGuestCart(); 
          navigate('/');
      } else {
          setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  // --- ADMIN OTP LOGIC ---
  const handleAdminSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/admin/auth/generate-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setAdminStep(2);
      } else {
        setError('Unauthorized admin email address.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };

  const handleAdminVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/admin/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid or expired OTP.');
      }
    } catch (err) {
      setError('Server error. Try again later.');
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

        {/* --- TOGGLE BUTTONS --- */}
        <div className="login-toggle">
          <button 
            className={`toggle-btn ${loginType === 'customer' ? 'active' : ''}`}
            onClick={() => { setLoginType('customer'); setError(''); setEmail(''); setPassword(''); }}
          >
            Customer
          </button>
          <button 
            className={`toggle-btn ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => { setLoginType('admin'); setError(''); setAdminStep(1); setEmail(''); setOtp(''); }}
          >
            Admin
          </button>
        </div>

        {/* --- ERROR MESSAGE --- */}
        {error && (
          <div className="error-message-box">
            <span className="error-icon">!</span>
            <div>
              <div className="error-header">There was a problem</div>
              <div className="error-text">{error}</div>
            </div>
          </div>
        )}

        {/* --- CUSTOMER FORM --- */}
        {loginType === 'customer' && (
          <form className="signin-form" onSubmit={handleCustomerSubmit}>
            <label htmlFor="email" className="signin-label">Email</label>
            <input 
              type="email" 
              id="email" 
              className="signin-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="signin-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="signin-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot-password-link">
              <a href="#" className="link-primary">Forgot Password?</a>
            </div>

            <button type="submit" className="signin-button button-primary">
              Sign In
            </button>
          </form>
        )}

        {/* --- ADMIN FORM --- */}
        {loginType === 'admin' && adminStep === 1 && (
          <form className="signin-form" onSubmit={handleAdminSendOtp}>
            <label htmlFor="adminEmail" className="signin-label">Admin Email</label>
            <input 
              type="email" 
              id="adminEmail" 
              className="signin-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <button type="submit" className="signin-button button-primary">
              Send OTP
            </button>
          </form>
        )}

        {loginType === 'admin' && adminStep === 2 && (
          <form className="signin-form" onSubmit={handleAdminVerifyOtp}>
            <p style={{fontSize: '13px', marginBottom: '10px'}}>OTP sent to <strong>{email}</strong></p>
            
            <label htmlFor="otp" className="signin-label">Enter 6-digit OTP</label>
            <input 
              type="text" 
              id="otp" 
              className="signin-input" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength="6"
            />
            
            <button type="submit" className="signin-button button-primary">
              Verify & Login
            </button>
          </form>
        )}

      </div>

      {/* Hide Create Account section if Admin login is selected */}
      {loginType === 'customer' && (
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
      )}

      <div className="signin-footer">
        <div className="footer-copyright">
          © 2026, Amazon-Clone.com, Inc. or its affiliates
        </div>
      </div>
    </div>
    </>
  );
}