import { cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import {  getProduct } from '../../data/products.js';
import { moneyFormatting } from '../utilities/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getSelectedDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
  //cart generation
  let cartProductHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId || '1';

    cartProductHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date-${matchingProduct.id}">
          Delivery date: ${calculateDeliveryDate(getSelectedDeliveryOption(deliveryOptionId))}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${moneyFormatting(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary')
    .innerHTML = cartProductHTML;

  //delivery options generation
  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {

      const deliveryPriceString = deliveryOption.priceCents === 0 ?
        'FREE' : `$${moneyFormatting(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === (cartItem.deliveryOptionId || '1');

      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${calculateDeliveryDate(deliveryOption)}
            </div>
            <div class="delivery-option-price">
              ${deliveryPriceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  //delivery date calculator
  function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.days, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
  }

  //action of radio button of delivery options
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const radioButton = element.querySelector('input[type="radio"]');
      radioButton.checked = true;
      
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);

      const dateString = calculateDeliveryDate(getSelectedDeliveryOption(deliveryOptionId));
      const dateHeader = document.querySelector(`.js-delivery-date-${productId}`);
      dateHeader.innerHTML = `Delivery date: ${dateString}`;
      renderPaymentSummary();
    });
  });

  //checkout count
  let checkoutCount = document.querySelector('.js-checkout-count');
  checkoutCount.innerHTML = `${updateCartQuantity()} items`;

  //delete link working and updation checkout page
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderPaymentSummary();
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        const cartQuantity = updateCartQuantity();
        document.querySelector('.js-checkout-count')
          .innerHTML = `${cartQuantity} items`;
      });
    });

  //update link working and updation checkout page
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-quantity-label-${productId}`);

      if(link.innerHTML.trim() === 'Update'){
        link.innerHTML = 'Save';
        const currentQuantity = container.innerHTML;

        container.innerHTML = `<input 
            class="quantity-input js-quantity-input-${productId}" 
            type="number" 
            min="0" 
            value="${currentQuantity}"
            oninput="this.value = Math.abs(this.value)"
          >`;
      }else{
        link.innerHTML = 'Update';

        const inputEle =document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(inputEle.value);
        updateQuantity(productId, newQuantity);

        container.innerHTML = newQuantity;
        const cartQuantity = updateCartQuantity();
        document.querySelector('.js-checkout-count').innerHTML = `${cartQuantity} items`;
      }
      renderPaymentSummary();
    });
  });
}