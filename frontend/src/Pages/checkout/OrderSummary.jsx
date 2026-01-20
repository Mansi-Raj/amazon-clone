import { useState } from 'react';
import { products } from '../../data/products';
import { moneyFormatting } from '../../utilities/moneyFormatting';
import { deliveryOptions, calculateDeliveryDate, getSelectedDeliveryOption } from '../../data/deliveryOptions';
import '../checkout/checkout.css';

export function OrderSummary({ cart, updateDeliveryOption, removeFromCart, updateQuantity }) {
  return (
    <>
      {cart.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        if (!product) return null;

        return (
          <CartItem 
            key={product.id}
            product={product}
            cartItem={cartItem}
            updateDeliveryOption={updateDeliveryOption}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        );
      })}
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

  return (
    <div className="cart-item-container">
      <div className="order-summary js-order-summary">
        <div className="delivery-date">
          Delivery date: {dateString}
        </div>

        <div className="cart-item-details-grid">
          <img className="product-image" src={product.image} alt={product.name} />

          <div className="cart-item-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">
              ₹{moneyFormatting(product.priceCents * cartItem.quantity)}
            </div>
            
            <div className="product-quantity">
              {isEditing ? (
                <span>
                  <input 
                    className="quantity-input" 
                    type="number" 
                    min="1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ width: '40px', marginRight: '5px' }} 
                  />
                  <span 
                    className="save-quantity-link link-primary" 
                    onClick={handleSaveClick}
                  >
                    Save
                  </span>
                </span>
              ) : (
                <span>
                  Quantity: {cartItem.quantity}
                  <span 
                    className="update-quantity-link link-primary js-update-link"
                    data-product-id={product.id}
                    onClick={handleUpdateClick}
                    style={{ cursor: 'pointer', marginLeft: '5px' }}
                  >
                    Update
                  </span>
                </span>
              )}

              <span 
                className="delete-quantity-link link-primary js-delete-link"
                data-product-id={product.id}
                onClick={() => removeFromCart(product.id)}
                style={{ cursor: 'pointer' }}
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
            style={{ cursor: 'pointer' }}
          >
            <input
              type="radio"
              checked={isChecked}
              className="delivery-option-input"
              name={`delivery-option-${product.id}`}
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