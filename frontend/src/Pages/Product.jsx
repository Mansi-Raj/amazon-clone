import { moneyFormatting } from '../utilities/moneyFormatting';
import './product.css';

export function Product({ products, addToCart }) {
  // The URL where Spring Boot serves static images
  const BACKEND_URL = 'http://localhost:8080';

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-container">
          <div className="product-image-container">
            <img 
              className="product-image" 
              // Appending backend URL to the image path from JSON
              src={`${BACKEND_URL}/${product.image}`} 
              alt={product.name} 
            />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

          <div className="product-rating-container">
            {/* Rating stars are still UI assets in Frontend, so we use relative path */}
            <img 
              className="product-rating-stars"
              src={`images/ratings/rating-${product.rating.stars * 10}.png`} 
              alt={`${product.rating.stars} stars`}
            />
            <div className="product-rating-count link-primary">
              {product.rating.count}
            </div>
          </div>

          <div className="product-price">
            ₹{moneyFormatting(product.priceCents)}
          </div>

          <div className="product-quantity-container">
            <select id={`quantity-${product.id}`}>
              {[...Array(10).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
          </div>

          <div className="product-spacer"></div>

          <button 
            className="add-to-cart-button button-primary"
            onClick={() => {
              const quantitySelect = document.getElementById(`quantity-${product.id}`);
              const quantity = Number(quantitySelect.value);
              addToCart(product.id, quantity);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}