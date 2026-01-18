import { products } from '../data/products';
import { moneyFormatting } from '../utilities/moneyFormatting';

export function Product(){
  return(
    <div className="main">
      <div className="products-grid js-products-grid">
        {products.map((product) => {
          return(
            <div className="product-container">
              <div className="product-image-container">
                <img className="product-image" src="${product.image}" />
              </div>
            
              <div className="product-name limit-text-to-2-lines"> 
                ${product.name}
              </div>
            
              <div className="product-rating-container">
                <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="" className="product-rating-stars" />
                <div className="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
            
              <div className="product-price">
                ${moneyFormatting(product.priceCents)}
              </div>
            
              <div className="product-quantity-container">
                <select className="js-quantity-selector-${product.id}">
                  ${generateOptions(10)}
                </select>
              </div>
            
              <div className="product-spacer"></div>
            
              <div className="add-to-cart js-added-${product.id}">
              </div>
            
              <button className="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
                    Add to Cart
              </button>
            </div>
          );        
        })}
      </div>
    </div>
  )
}

function generateOptions(count) {
  let options = '';
  for (let i = 1; i <= count; i++) {
    options += `<option value="${i}">${i}</option>`;
  }
  return options;
}