import { useCart } from '../../data/cart';
import { getSelectedDeliveryOption } from '../../data/deliveryOptions';
import { moneyFormatting } from '../../utilities/moneyFormatting';
import '../checkout/checkout.css';

export function PaymentSummary() {
  // 1. Get the current cart items from the Context
  const { cart } = useCart();

  // Safety check if cart hasn't loaded yet
  if (!cart) return <div>Loading...</div>;

  // 2. Calculate Product Total (Sum of price * quantity)
  const productPriceCents = cart.reduce((total, cartItem) => {
    return total + (cartItem.product.priceCents * cartItem.quantity);
  }, 0);

  // 3. Calculate Shipping Total (Sum of delivery option prices)
  const shippingPriceCents = cart.reduce((total, cartItem) => {
    // Default to option '1' (Free) if no option is set
    const optionId = cartItem.deliveryOptionId || '1'; 
    const deliveryOption = getSelectedDeliveryOption(optionId);
    
    // Add price if option exists, else 0
    return total + (deliveryOption ? deliveryOption.priceCents : 0);
  }, 0);

  // 4. Calculate Final Totals
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const estimatedTaxCents = totalBeforeTaxCents * 0.1; // 10% Tax
  const totalCents = totalBeforeTaxCents + estimatedTaxCents;
  
  // Calculate total item count for display
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Items ({cartQuantity}):</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(productPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(shippingPriceCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(totalBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(estimatedTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          ₹{moneyFormatting(totalCents)}
        </div>
      </div>

      <button className="place-order-button button-primary">
        Place your order
      </button>
    </>
  );
}