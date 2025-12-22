import { cart, updateCartQuantity } from '../../data/cart.js';
import { getSelectedDeliveryOption } from '../../data/deliveryOptions.js';
import { getProduct } from '../../data/products.js';
import { moneyFormatting } from '../utilities/money.js';

export function renderPaymentSummary(){
  let totalProductPrice = 0;
  let shippingPrice = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    totalProductPrice += product.priceCents * cartItem.quantity;

    const deliveryOption = getSelectedDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents;
  });

  let totalBeforeTax = totalProductPrice + shippingPrice;
  let totalTax = totalBeforeTax * 0.1;
  let total = totalBeforeTax + totalTax;

  const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${updateCartQuantity()}):</div>
        <div class="payment-summary-money">
          $${moneyFormatting(totalProductPrice)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        $${moneyFormatting(shippingPrice)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
        $${moneyFormatting(totalBeforeTax)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${moneyFormatting(totalTax)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          $${moneyFormatting(total)}
        </div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}