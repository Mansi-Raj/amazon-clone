import { Link } from 'react-router';
import './signin.css';

export function SignIn() {
  return (
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
  );
}