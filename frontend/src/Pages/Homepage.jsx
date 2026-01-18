import { Header } from '../components/Header';
import { Product } from './Product';

export function HomePage(){
  return(
    <div className="homePage">
      <Header />
      <Product />
    </div>
  );
}