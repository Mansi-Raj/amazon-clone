import { useCart } from '../src/data/cart';
import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/Homepage';
import { Checkout } from './Pages/checkout/Checkout';
import './App.css';

function App() {
  const {cartQuantity, addToCart, cart, updateDeliveryOption, removeFromCart, updateQuantity} = useCart();

  return (
    <Routes>
      <Route index element={<HomePage cartQuantity={cartQuantity} addToCart={addToCart}/>}/>

      <Route path='/checkout' element={<Checkout 
        cartQuantity={cartQuantity} 
        cart={cart} 
        updateDeliveryOption={updateDeliveryOption}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}/>}
      />
    </Routes>
  )
}

export default App
