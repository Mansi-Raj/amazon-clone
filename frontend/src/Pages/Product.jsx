import { useState } from 'react';
import { products } from '../data/products';
import { moneyFormatting } from '../utilities/moneyFormatting';
import './product.css';

export function Product({addToCart}){
  const [quantity, setQuantity] = useState(1);
  return(
    <div className="main-header">
      <div className="products-grid js-products-grid">
        {products.map((product) => {
          return(
            <div key={product.id} className="product-container">
              <div className="product-image-container">
                <img className="product-image" src={product.image} />
              </div>
            
              <div className="product-name limit-text-to-2-lines"> 
                {product.name}
              </div>
            
              <div className="product-rating-container">
                <img src={`images/ratings/rating-${product.rating.stars * 10}.png`} alt="" className="product-rating-stars" />
                <div className="product-rating-count link-primary">
                  {product.rating.count}
                </div>
              </div>
            
              <div className="product-price">
                ₹{moneyFormatting(product.priceCents)}
              </div>
            
              <div className="product-quantity-container">
                <select value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            
              <div className="product-spacer"></div>
            
              <div className={`add-to-cart js-added-₹{product.id}`}>
              </div>
            
              <button className="add-to-cart-button button-primary js-add-to-cart" data-product-id ={product.id} onClick={
                ()=> addToCart(product.id, quantity)}>
                Add to Cart
              </button>
            </div>
          );        
        })}
      </div>
    </div>
  )
}