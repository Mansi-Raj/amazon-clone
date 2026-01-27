import { useEffect, useState, createContext, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartData, setCartData] = useState({
    items: [],
    cartQuantity: 0,
    totalCents: 0
  });

  const getToken = () => localStorage.getItem("token");

  const fetchCart = async () => {
    const token = getToken();
    
    if (token) {
      // 1. LOGGED IN: Fetch from API
      try {
        const response = await fetch('http://localhost:8080/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCartData(data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      // 2. GUEST: Fetch from LocalStorage
      const localCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      // Calculate basic stats for guest (simulated)
      const quantity = localCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartData({ items: localCart, cartQuantity: quantity, totalCents: 0 }); // You might need to fetch product details to calculate price
    }
  };

  useEffect(() => {
    fetchCart();
  }, []); // Run once on mount

  const addToCart = async (productId, quantity) => {
    const token = getToken();

    if (token) {
      // SERVER ADD
      await fetch(`http://localhost:8080/api/cart/add?productId=${productId}&quantity=${quantity}`, { 
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } else {
      // LOCAL ADD
      const localCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const existingItem = localCart.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        localCart.push({ productId, quantity, deliveryOptionId: '1' });
      }
      localStorage.setItem('guestCart', JSON.stringify(localCart));
    }
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    if (token) {
      await fetch(`http://localhost:8080/api/cart/remove/${productId}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } else {
      const localCart = JSON.parse(localStorage.getItem('guestCart')) || [];
      const newCart = localCart.filter(item => item.productId !== productId);
      localStorage.setItem('guestCart', JSON.stringify(newCart));
    }
    fetchCart();
  };

  // Expose a helper to trigger merge
  const mergeGuestCart = async () => {
    const token = getToken();
    const guestCart = JSON.parse(localStorage.getItem('guestCart')) || [];

    if (guestCart.length > 0 && token) {
      await fetch('http://localhost:8080/api/cart/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(guestCart)
      });
      // Clear local cart after merge
      localStorage.removeItem('guestCart');
      // Refresh global cart
      fetchCart();
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart: cartData.items, 
      cartQuantity: cartData.cartQuantity,
      cartSummary: cartData,
      addToCart, 
      removeFromCart,
      mergeGuestCart // Export this!
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}