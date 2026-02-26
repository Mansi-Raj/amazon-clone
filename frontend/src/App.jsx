import { Routes, Route } from 'react-router';
import { useCart } from '../src/data/cart';
import { HomePage } from './Pages/Homepage';
import { Checkout } from './Pages/checkout/Checkout';
import { SignIn } from './Pages/SignIn/Signin';
import { SignUp } from './Pages/SignIn/Signup';
import { AdminLayout } from './Pages/Admin/AdminLayout';
import { AdminDashboard } from './Pages/Admin/AdminDashboard';
import { AdminProducts } from './Pages/Admin/AdminProducts';
import { AdminOrders } from './Pages/Admin/AdminOrders';
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

      <Route path='/admin' element={<AdminLayout />}/>

      <Route path='dashboard' element={<AdminDashboard />} />
      <Route path='products' element={<AdminProducts />} />
      <Route path='orders' element={<AdminOrders />} />
    </Routes>
  )
}

export default App
