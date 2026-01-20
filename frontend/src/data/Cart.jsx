import { useEffect, useState } from 'react';

export function useCart(){
  const[cart, setCart] = useState(()=>{
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart):[];
  })

  useEffect(() =>{
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  const addToCart = (productId, quantity) =>{setCart(prevCart =>{
    const existingProduct = prevCart.find(product => product.productId === productId);

    if(existingProduct){
      return prevCart.map( product => product.productId === productId ? {...product, quantity:product.quantity+quantity}:product);
    }else{
      return[...prevCart, {productId, quantity}];
    }
  });
  };

  return {cartQuantity, addToCart, cart};
}