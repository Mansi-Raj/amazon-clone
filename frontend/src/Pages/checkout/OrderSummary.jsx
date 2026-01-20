import { products } from '../../data/products';
import { moneyFormatting } from '../../utilities/moneyFormatting';
import { deliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions';
import '../checkout/checkout.css';

export function OrderSummary({ cart }) {
  return (
    <>
      {cart.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);

        if (!product) return null;

        return (
          <div className="cart-item-container" key={product.id}>
            <div className="order-summary js-order-summary">
              <div className="delivery-date">
                Delivery date:
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={product.image} alt={product.name} />

                <div className="cart-item-details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">
                    $ {moneyFormatting(product.priceCents * cartItem.quantity)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity: {cartItem.quantity}
                      <span className="quantity-label"></span>
                    </span>
                    <span 
                      className="update-quantity-link link-primary js-update-link"
                      data-product-id={product.id}
                    >
                      Update
                    </span>
                    <span 
                      className="delete-quantity-link link-primary js-delete-link"
                      data-product-id={product.id}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <DeliveryOptions product={product} cartItem={cartItem} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

function DeliveryOptions({ product, cartItem }) {
  return (
    <>
      {deliveryOptions.map((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);
        const priceString = deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${moneyFormatting(deliveryOption.priceCents)} -`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option js-delivery-option"
            data-product-id={product.id}
            data-delivery-option-id={deliveryOption.id}
          >
            <input
              type="radio"
              checked={isChecked}
              className="delivery-option-input"
              name={`delivery-option-${product.id}`}
              readOnly
            />
            <div>
              <div className="delivery-option-date">
                {dateString}
              </div>
              <div className="delivery-option-price">
                {priceString} Shipping
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}