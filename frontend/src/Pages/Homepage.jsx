import { Header } from '../components/Header';
import { Product } from './Product';

export function HomePage({cartQuantity, addToCart}){

  return(
    <div className="homePage">
      <Header cartQuantity={cartQuantity}/>
      <Product addToCart={addToCart}/>
    </div>
  );
}