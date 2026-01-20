import { useCart } from '../src/data/cart';
import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/Homepage';
import { Checkout } from './Pages/checkout/Checkout';
import { SignIn } from './Pages/SignIn/Signin';
import { SignUp } from './Pages/SignIn/Signup';
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

      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App
