import { moneyFormatting } from '../../utilities/moneyFormatting';
import { products } from '../../data/products';
import { getSelectedDeliveryOption } from '../../data/deliveryOptions';
import '../checkout/checkout.css';

export function PaymentSummary({cart, cartQuantity}){
  let totalProductPrice = 0;
  let totalShippingCost = 0;

  cart.map((cartItem)=>{
    const deliveryOptionID = cartItem.deliveryOptionId || '1';
    const deliveryOption = getSelectedDeliveryOption(deliveryOptionID);
    totalShippingCost += deliveryOption.priceCents;

    const product = products.find((p) => p.id ===cartItem.productId);
    totalProductPrice += product.priceCents * cartItem.quantity;
  })

  let totalBeforeTax = totalProductPrice + totalShippingCost
  let totalTax = totalBeforeTax * 0.1;
  let total = totalBeforeTax + totalTax;

 return(
  <>
    <div className="payment-summary-title">
      Order Summary
    </div>

    <div className="payment-summary-row">
      <div>Items ({cartQuantity || 0}):</div>
      <div className="payment-summary-money">
        ${moneyFormatting(totalProductPrice)}
      </div>
    </div>

    <div className="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div className="payment-summary-money">
        ${moneyFormatting(totalShippingCost)}
      </div>
    </div>

    <div className="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div className="payment-summary-money">
        ${moneyFormatting(totalBeforeTax)}
      </div>
    </div>

    <div className="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div className="payment-summary-money">
        ${moneyFormatting(totalTax)}
      </div>
    </div>

    <div className="payment-summary-row total-row">
      <div>Order total:</div>
      <div className="payment-summary-money">
        ${moneyFormatting(total)}
      </div>
    </div>

    <button className="place-order-button button-primary">
      Place your order
    </button>
  </>
 );
}