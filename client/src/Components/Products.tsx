import React, { useState, useEffect } from 'react';
import { Product, useCart } from '../Contexts/CartContext';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const {addToCart} = useCart();


  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("There's been a problem with your fetch operation:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: Product) => (
         <div key={product.id}>
            <div>{product.images}</div>
            <h3>{product.id}</h3>
            <p>{product.default_price.unit_amount / 100} sek</p>
            <p>{product.description}</p>

            <button onClick={() => addToCart(product)}>Köp</button>
         </div>
        ))}
      </ul>
    </div>
  );
};

export default Products;
