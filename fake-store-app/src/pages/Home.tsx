import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { Product } from '../types/product';

const Home = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;