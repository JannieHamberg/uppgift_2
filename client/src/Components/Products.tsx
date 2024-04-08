import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);


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
{/*       {error && <p>Error: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Products;
