import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../data/cart';
import './signin.css';

export function SignUp() {
  const navigate = useNavigate();
  const { mergeGuestCart } = useCart();
  
  // 'signup' or 'otp'
  const [step, setStep] = useState('signup'); 
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  // Step 1: Register and Request OTP
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp'); // Switch to OTP screen
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Save Token & Redirect
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        await mergeGuestCart();
        navigate('/');
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Verification failed.");
    }
  };

  return (
    <>
    <title>Sign Up</title>
    <div className="signin-container">
      <Link to="/" className="signin-logo-link">
        <img className="signin-logo" src="images/amazon-logo.png" alt="Amazon Logo" />
      </Link>

      <div className="signin-box">
        <h1 className="signin-header">
          {step === 'signup' ? 'Create Account' : 'Verify Email'}
        </h1>

        {error && (
          <div className="error-message-box">
            <div className="error-icon">!</div>
            <div className="error-text">{error}</div>
          </div>
        )}

        {step === 'signup' ? (
          // --- FORM 1: SIGN UP DETAILS ---
          <form className="signin-form" onSubmit={handleSignupSubmit}>
            <label htmlFor="fullName" className="signin-label">Your name</label>
            <input type="text" name="fullName" className="signin-input" required
              value={formData.fullName} onChange={handleChange} />

            <label htmlFor="username" className="signin-label">Username</label>
            <input type="text" name="username" className="signin-input" required
              value={formData.username} onChange={handleChange} />

            <label htmlFor="email" className="signin-label">Email</label>
            <input type="email" name="email" className="signin-input" required
              value={formData.email} onChange={handleChange} />

            <label htmlFor="password" className="signin-label">Password</label>
            <input type="password" name="password" placeholder="At least 6 characters" className="signin-input" required
              value={formData.password} onChange={handleChange} />

            <label htmlFor="confirmPassword" className="signin-label">Re-enter password</label>
            <input type="password" name="confirmPassword" className="signin-input" required
              value={formData.confirmPassword} onChange={handleChange} />

            <button type="submit" className="signin-button button-primary">
              Verify email
            </button>
          </form>
        ) : (
          // --- FORM 2: OTP ENTRY ---
          <form className="signin-form" onSubmit={handleOtpSubmit}>
            <p className="signin-text">
              We've sent a One Time Password (OTP) to <b>{formData.email}</b>. 
              Please enter it below.
            </p>
            
            <label htmlFor="otp" className="signin-label">Enter OTP</label>
            <input 
              type="text" 
              name="otp" 
              className="signin-input" 
              placeholder="Ex: 123456"
              value={otp} 
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button type="submit" className="signin-button button-primary">
              Create your Amazon account
            </button>
            
            <button 
              type="button" 
              className="link-primary" 
              style={{marginTop: '15px', background: 'none', border: 'none', cursor: 'pointer'}}
              onClick={() => setStep('signup')}
            >
              Change Email
            </button>
          </form>
        )}

        <div className="signin-help" style={{borderTop: '1px solid #e7e7e7', paddingTop: '20px', marginTop: '20px'}}>
          Already have an account? <Link to="/signin" className="link-primary">Sign in</Link>
        </div>
      </div>
    </div>
    </>
  );
}