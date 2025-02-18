import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';


const Home = () => {
  const { products, loading, error } = useFetchProducts();

  return (
    <div className="home-page">
      <h1>Produtos em Destaque</h1>
      {loading && <LoadingSpinner />}
      {products.length > 0 && <ProductList products={products} />}
    </div>
  );
};

export default Home;