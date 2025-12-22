import { addToCart, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyFormatting } from './utilities/money.js';

//generate html for each product
let productHTML = '';

products.forEach((product) => {
  productHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="" class="product-rating-stars">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${moneyFormatting(product.priceCents)}
      </div>

      <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        ${generateOptions(10)}
      </select>
    </div>

      <div class="product-spacer"></div>

      <div class="add-to-cart js-added-${product.id}">
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

//quantity option of each product
function generateOptions(count) {
  let options = '';
  for (let i = 1; i <= count; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
}
document.querySelector('.js-products-grid').innerHTML = productHTML;


let cartQuantity = document.querySelector('.js-cart-quantity');
cartQuantity.innerHTML = updateCartQuantity();

//add to cart button working
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
     const productId = button.dataset.productId;

     addToCart(productId);
     cartQuantity.innerHTML = updateCartQuantity();


     let addedMark = document.querySelector(`.js-added-${productId}`); 
     addedMark.innerHTML = '<img class="check-mark" src="images/icons/checkmark.png" alt=""> Added';

     setTimeout(() => {addedMark.innerHTML = ''}, 2000);
  });
});