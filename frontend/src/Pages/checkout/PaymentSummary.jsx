import { useCart } from '../../data/cart';
import { moneyFormatting } from '../../utilities/moneyFormatting';
import '../checkout/checkout.css';

export function PaymentSummary() {
  // Pull the summary data directly from the Cart Context
  const { cart, cartSummary } = useCart();

  if (!cart || !cartSummary) return <div>Loading...</div>;

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Items ({cartSummary.cartQuantity}):</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(cartSummary.totalProductPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(cartSummary.totalShippingCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(cartSummary.totalBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(cartSummary.estimatedTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(cartSummary.totalCents)}
        </div>
      </div>

      <button className="place-order-button button-primary" disabled={cart.length === 0}>
        Place your order
      </button>
    </>
  );
}