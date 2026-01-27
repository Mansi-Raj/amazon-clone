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
          product={cartItem.product}
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

  // Use String() to ensure we match '1' (string) with 1 (number) if necessary
  const deliveryOptionId = String(cartItem.deliveryOptionId || '1');
  const deliveryOption = getSelectedDeliveryOption(deliveryOptionId);
  const dateString = calculateDeliveryDate(deliveryOption || deliveryOptions[0]); // Fallback safely

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

  return (
    <div className="cart-item-container">
      <div className="order-summary js-order-summary">
        <div className="delivery-date">
          Delivery date: {dateString}
        </div>

        <div className="cart-item-details-grid">
          <img 
            className="product-image" 
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
        
        // FIX: Compare as strings to prevent Type Mismatches (1 vs '1')
        const isChecked = String(deliveryOption.id) === String(cartItem.deliveryOptionId || '1');

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option js-delivery-option"
            onClick={() => updateDeliveryOption(product.id, deliveryOption.id)}
          >
            <input
              type="radio"
              className="delivery-option-input"
              name={`delivery-option-${product.id}`}
              checked={isChecked}
              // onChange is needed to avoid React warnings, but the parent div's onClick handles the logic
              onChange={() => updateDeliveryOption(product.id, deliveryOption.id)}
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