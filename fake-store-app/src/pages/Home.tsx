import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularProducts } from '../utils/getPopularProducts';

const Home = () => {
  const { products, carts, loading, error } = useFetchProducts();
  const popularProducts = getPopularProducts(products, carts);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      <h1>Produtos em Destaque 🏆</h1>
      <ProductList products={popularProducts} />
    </div>
  );
};

export default Home;