import { Link } from 'react-router';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './checkout.css';
import './checkout-header.css';

export function Checkout({cartQuantity, cart, updateDeliveryOption, removeFromCart, updateQuantity}){
  return(
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="amazon-logo" src="images/amazon-logo.png"/>
              <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png"/>
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link js-checkout-count"
              href="amazon.html">{cartQuantity} items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png"/>
          </div>
        </div>
      </div>

        <div className="main">
          <div className="page-title">Review your order</div>

          <div className="checkout-grid">
            <div className="order-summary-details">
              <OrderSummary cart={cart} 
                updateDeliveryOption={updateDeliveryOption}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </div>

            <div className="payment-summary js-payment-summary">
              <PaymentSummary cart={cart} 
                cartQuantity={cartQuantity}
              />
            </div>
          </div>
        </div>
    </>
  )
}