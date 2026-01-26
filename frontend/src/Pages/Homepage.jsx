import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Product } from './Product';
import { useCart } from '../data/cart';

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { cartQuantity, addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  // Filter products based on search (Frontend filtering for now)
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) || 
    product.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="homePage">
      <Header cartQuantity={cartQuantity} setSearch={setSearch}/>
      <Product products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}