import { useState } from 'react';
import { Link } from 'react-router';
import './signin.css';

export function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.username.includes('@')) {
      setError('Username cannot be an email address.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Form Submitted', formData);
    alert('Account created successfully!');
  };

  return (
    <>
    <title>Sign Up</title>
    <div className="signin-container">
      <Link to="/" className="signin-logo-link">
        <img className="signin-logo" src="images/amazon-logo.png" alt="Amazon Logo" />
      </Link>

      <div className="signin-box">
        <h1 className="signin-header">Create Account</h1>

        {error && (
          <div className="error-message-box">
            <div className="error-icon">!</div>
            <div className="error-text">
              <span className="error-header">There was a problem</span>
              <br />
              {error}
            </div>
          </div>
        )}

        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="signin-label">Your name</label>
          <input 
            type="text" 
            name="fullName" 
            placeholder="First and last name"
            className="signin-input" 
            value={formData.fullName} 
            onChange={handleChange}
          />

          <label htmlFor="username" className="signin-label">Username</label>
          <input 
            type="text" 
            name="username" 
            className="signin-input" 
            value={formData.username} 
            onChange={handleChange}
          />

          <label htmlFor="email" className="signin-label">Email</label>
          <input 
            type="email" 
            name="email" 
            className="signin-input" 
            value={formData.email} 
            onChange={handleChange}
          />

          <label htmlFor="password" className="signin-label">Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="At least 6 characters"
            className="signin-input" 
            value={formData.password} 
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword" className="signin-label">Re-enter password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            className="signin-input" 
            value={formData.confirmPassword} 
            onChange={handleChange}
          />

          <button type="submit" className="signin-button button-primary">
            Create your Amazon account
          </button>
        </form>

        <div className="signin-help" style={{borderTop: '1px solid #e7e7e7', paddingTop: '20px', marginTop: '20px'}}>
          Already have an account? <Link to="/signin" className="link-primary">Sign in</Link>
        </div>
      </div>

      <div className="signin-footer">
      </div>
    </div>
    </>
  );
}