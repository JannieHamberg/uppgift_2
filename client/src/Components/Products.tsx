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
          <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={product.images[0]} alt="product" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.description}</p>
              <p>{(product.default_price.unit_amount / 100).toLocaleString()} SEK</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => addToCart(product)}>Köp</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
  
};

export default Products;
