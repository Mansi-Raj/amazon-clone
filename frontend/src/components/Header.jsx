import { Link, useState, useEffect } from 'react-router';
import './header.css';

export function Header({ cartQuantity, setSearch }){
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token && name) {
      setUser({ name });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
    setShowDropdown(false);
    window.location.reload(); // Refresh page to reset app state
  };

  return(
    <div className="amazon-header">
      <div className="amazon-header-left-section">
        <Link to="/" className="header-link">
          <img className="amazon-logo"
            src="images/amazon-logo-white.png" />
          <img className="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png" />
        </Link>
      </div>

      <div className="amazon-header-middle-section">
        <input className="search-bar" type="text" placeholder="Search" 
        onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="amazon-header-right-section">
        {user ? (
          <div className="header-dropdown-container">
            <div 
              className="header-link profile-section" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="profile-symbol">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="profile-text-container">
                <span className="returns-text">Hello, {user.name}</span>
                <span className="orders-text">Profile &#9662;</span>
              </div>
            </div>

            {showDropdown && (
              <div className="logout-dropdown">
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link className="orders-link header-link" to="/signin">
            <span className="returns-text">Hello, sign in</span>
            <span className="orders-text">Account & Lists</span>
          </Link>
        )}

        <Link className="orders-link header-link" to="/return&orders">
          <span className="returns-text">Returns</span>
          <span className="orders-text">& Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png"/>
          <div className="cart-quantity js-cart-quantity">{cartQuantity || 0}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  )
}