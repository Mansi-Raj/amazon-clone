import { useState } from 'react';
import { Header } from '../components/Header';
import { Product } from './Product';

export function HomePage({cartQuantity, addToCart}){
  const [search, setSearch] = useState('');

  return(
    <div className="homePage">
      <Header cartQuantity={cartQuantity} setSearch={setSearch}/>
      <Product addToCart={addToCart} search={search}/>
    </div>
  );
}