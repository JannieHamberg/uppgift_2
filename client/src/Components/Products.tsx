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
    <div className="products-bg p-10 text-white pb-20">
    <div className="flex justify-center flex-wrap gap-4 mt-20 w-100">
      <div className="w-full text-center">
        <h1 className="text-2xl mt-10 p-10 ml-10">Våra tjänster</h1>
      </div>
      {products.map((product: Product) => (
        <div key={product.id} className="card w-96 glass text-black">
          <figure className="card-image flex justify-center items-center overflow-hidden h-60">
            <img src={product.images[0]} alt="product" className="card-image-img w-full h-60 " />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <p>{(product.default_price.unit_amount / 100).toFixed(2)} SEK</p>
            <p>{product.description}</p>
            <div className="card-actions justify-end">
              <button className="buy-btn btn btn-white pl-10 pr-10 text-l shadow-xl" onClick={() => addToCart(product)}>Köp</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
  
};

export default Products;
