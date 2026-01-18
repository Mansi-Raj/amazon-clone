import { Cart } from '../data/cart';
import { Header } from '../components/Header';
import { Product } from './Product';

export function HomePage(){
  const [cartQuantity, addToCart] = Cart();
  
  return(
    <div className="homePage">
      <Header cartQuantity={cartQuantity}/>
      <Product addToCart={addToCart}/>
    </div>
  );
}