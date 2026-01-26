import { useState } from 'react';
import { moneyFormatting } from '../../utilities/moneyFormatting';
import { calculateDeliveryDate, getSelectedDeliveryOption, deliveryOptions } from '../../data/deliveryOptions';
import '../checkout/checkout.css';

// The URL where Spring Boot serves static images
const BACKEND_URL = 'http://localhost:8080';

export function OrderSummary({ cart, updateDeliveryOption, removeFromCart, updateQuantity }) {
  if (!cart || cart.length === 0) {
    return <div className="empty-cart-message">Your cart is empty.</div>;
  }

  return (
    <>
      {cart.map((cartItem) => (
        <CartItem 
          key={cartItem.product.id}
          product={cartItem.product} // The backend now nests the full product inside the cart item
          cartItem={cartItem}
          updateDeliveryOption={updateDeliveryOption}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ))}
    </>
  );
}

function CartItem({ product, cartItem, updateDeliveryOption, removeFromCart, updateQuantity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(cartItem.quantity);

  const deliveryOptionId = cartItem.deliveryOptionId || '1';
  const deliveryOption = getSelectedDeliveryOption(deliveryOptionId);
  const dateString = calculateDeliveryDate(deliveryOption);

  const handleUpdateClick = () => {
    setInputValue(cartItem.quantity);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const newQty = Number(inputValue);
    if (newQty > 0) {
      updateQuantity(product.id, newQty);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setInputValue(cartItem.quantity);
  };

  return (
    <div className="cart-item-container">
      <div className="order-summary js-order-summary">
        <div className="delivery-date">
          Delivery date: {dateString}
        </div>

        <div className="cart-item-details-grid">
          <img 
            className="product-image" 
            // Appending backend URL to the image path
            src={`${BACKEND_URL}/${product.image}`} 
            alt={product.name} 
          />

          <div className="cart-item-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">
              ₹{moneyFormatting(product.priceCents)}
            </div>
            
            <div className="product-quantity">
              {isEditing ? (
                <span className="quantity-edit-container">
                  <input 
                    className="quantity-input" 
                    type="number" 
                    min="1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <span className="save-quantity-link link-primary" onClick={handleSaveClick}>
                    Save
                  </span>
                  <span className="delete-quantity-link link-primary" onClick={handleCancelClick}>
                    Cancel
                  </span>
                </span>
              ) : (
                <span>
                  Quantity: {cartItem.quantity}
                  <span 
                    className="update-quantity-link link-primary js-update-link"
                    onClick={handleUpdateClick}
                  >
                    Update
                  </span>
                </span>
              )}

              <span 
                className="delete-quantity-link link-primary js-delete-link"
                onClick={() => removeFromCart(product.id)}
              >
                Delete
              </span>
            </div>
          </div>

          <div className="delivery-options">
            <div className="delivery-options-title">
              Choose a delivery option:
            </div>
            <DeliveryOptions 
              product={product} 
              cartItem={cartItem} 
              updateDeliveryOption={updateDeliveryOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryOptions({ product, cartItem, updateDeliveryOption }) {
  return (
    <>
      {deliveryOptions.map((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);
        const priceString = deliveryOption.priceCents === 0
          ? 'FREE'
          : `₹${moneyFormatting(deliveryOption.priceCents)} -`;
        
        const isChecked = deliveryOption.id === (cartItem.deliveryOptionId || '1');

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option js-delivery-option"
            onClick={() => updateDeliveryOption(product.id, deliveryOption.id)}
          >
            <input
              type="radio"
              checked={isChecked}
              className="delivery-option-input"
              name={`delivery-option-${product.id}`}
              readOnly
            />
            <div>
              <div className="delivery-option-date">
                {dateString}
              </div>
              <div className="delivery-option-price">
                {priceString} Shipping
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}