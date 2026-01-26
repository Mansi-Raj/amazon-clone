import { moneyFormatting } from '../../utilities/moneyFormatting';
import '../checkout/checkout.css';

export function PaymentSummary({ cartSummary }) {
  // If cartSummary hasn't loaded yet, handle gracefully
  if (!cartSummary) return <div>Loading...</div>;

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Items ({cartSummary.cartQuantity || 0}):</div>
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

      <button className="place-order-button button-primary">
        Place your order
      </button>
    </>
  );
}