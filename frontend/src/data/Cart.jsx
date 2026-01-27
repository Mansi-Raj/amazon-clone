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
      
      if (localCart.length === 0) {
        setCartData({ items: [], cartQuantity: 0, totalCents: 0, totalProductPriceCents: 0, totalShippingCents: 0, totalBeforeTaxCents: 0, estimatedTaxCents: 0 });
        return;
      }

      try {
        // Fetch all products to get details (name, image, price)
        const productRes = await fetch('http://localhost:8080/api/products');
        const allProducts = await productRes.json();

        // Merge product details into cart items
        let totalProductPrice = 0;
        let totalQuantity = 0;

        const hydratedCart = localCart.map(item => {
          const product = allProducts.find(p => p.id === item.productId);
          if (product) {
            totalProductPrice += product.priceCents * item.quantity;
            totalQuantity += item.quantity;
            return { ...item, product }; // Attach full product object
          }
          return null;
        }).filter(item => item !== null);

        // Calculate Guest Summaries (Simplified logic)
        const shipping = 0; // Free shipping for guests or calculate based on deliveryOptionId if needed
        const totalBeforeTax = totalProductPrice + shipping;
        const tax = totalBeforeTax * 0.1;
        const total = totalBeforeTax + tax;

        setCartData({ 
          items: hydratedCart, 
          cartQuantity: totalQuantity, 
          totalProductPriceCents: totalProductPrice,
          totalShippingCents: shipping,
          totalBeforeTaxCents: totalBeforeTax,
          estimatedTaxCents: tax,
          totalCents: total
        });
        
      } catch (err) {
        console.error("Error loading guest cart products", err);
      }
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

  const updateDeliveryOption = async (productId, deliveryOptionId) => {
     const token = getToken();
     if(token) {
         try {
        await fetch(`http://localhost:8080/api/cart/delivery-option/${productId}?optionId=${deliveryOptionId}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        // Refresh cart to get updated totals/summary
        fetchCart(); 
      } catch (error) {
        console.error("Error updating delivery option:", error);
      }
     } else {
         const localCart = JSON.parse(localStorage.getItem('guestCart')) || [];
         const item = localCart.find(i => i.productId === productId);
         if(item) item.deliveryOptionId = deliveryOptionId;
         localStorage.setItem('guestCart', JSON.stringify(localCart));
         fetchCart();
     }
  }

  const updateQuantity = async (productId, newQuantity) => {
      const token = getToken();
      if(token) {
          try {
            await fetch(`http://localhost:8080/api/cart/update/${productId}?quantity=${newQuantity}`, {
              method: 'PUT',
              headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchCart();
          } catch (error) {
            console.error("Error updating quantity:", error);
          }
      } else {
          const localCart = JSON.parse(localStorage.getItem('guestCart')) || [];
          const item = localCart.find(i => i.productId === productId);
          if(item) item.quantity = newQuantity;
          localStorage.setItem('guestCart', JSON.stringify(localCart));
          fetchCart();
      }
  }

  return (
    <CartContext.Provider value={{ 
      cart: cartData.items, 
      cartQuantity: cartData.cartQuantity,
      cartSummary: cartData,
      addToCart, 
      removeFromCart,
      updateDeliveryOption,
      updateQuantity,
      mergeGuestCart // Export this!
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}