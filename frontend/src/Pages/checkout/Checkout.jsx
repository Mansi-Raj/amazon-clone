import { Link } from 'react-router';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useCart } from '../../data/cart';
import './checkout.css';
import './checkout-header.css';

export function Checkout() {
  const { cart, cartQuantity, updateDeliveryOption, removeFromCart, updateQuantity, cartSummary } = useCart();

  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="amazon-logo" src="images/amazon-logo.png" alt="Amazon Logo"/>
              <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png" alt="Mobile Logo"/>
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link js-checkout-count" to="/">{cartQuantity} items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="Lock Icon"/>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary-details">
            <OrderSummary 
              cart={cart} 
              updateDeliveryOption={updateDeliveryOption}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </div>

          <div className="payment-summary js-payment-summary">
            <PaymentSummary cartSummary={cartSummary} />
          </div>
        </div>
      </div>
    </>
  );
}