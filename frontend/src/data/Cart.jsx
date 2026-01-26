import { useEffect, useState, createContext, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartData, setCartData] = useState({
    items: [],
    cartQuantity: 0,
    totalCents: 0,
    totalProductPriceCents: 0,
    totalShippingCents: 0,
    totalBeforeTaxCents: 0,
    estimatedTaxCents: 0
  });

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cart');
      const data = await response.json();
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity) => {
    await fetch(`http://localhost:8080/api/cart/add?productId=${productId}&quantity=${quantity}`, { method: 'POST' });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await fetch(`http://localhost:8080/api/cart/remove/${productId}`, { method: 'DELETE' });
    fetchCart();
  };

  const updateQuantity = async (productId, newQuantity) => {
    await fetch(`http://localhost:8080/api/cart/update/${productId}?quantity=${newQuantity}`, { method: 'PUT' });
    fetchCart();
  };

  const updateDeliveryOption = async (productId, deliveryOptionId) => {
    await fetch(`http://localhost:8080/api/cart/delivery-option/${productId}?optionId=${deliveryOptionId}`, { method: 'PUT' });
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ 
      cart: cartData.items, 
      cartQuantity: cartData.cartQuantity,
      cartSummary: cartData, // Expose full summary for payment
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      updateDeliveryOption 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}