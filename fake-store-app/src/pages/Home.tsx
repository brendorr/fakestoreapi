import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularProducts } from '../utils/getPopularProducts';
import { getTopRatedProducts } from '../utils/getTopRatedProducts';

const Home = () => {
  const { products, carts, loading, error } = useFetchProducts();
  const popularProducts = getPopularProducts(products, carts);
  const topRatedProducts = getTopRatedProducts(products);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      {/* mais aparecem nos carrinhos */}
      <h1>🔥 Produtos em Destaque</h1>
      <ProductList 
        products={popularProducts} 
        isPopular={true}
      />

      {/* melhores avaliados */}
      <h1>🏆 Melhores Avaliados</h1>
      <ProductList 
        products={topRatedProducts} 
        isTopRated={true}
      />
    </div>
  );
};

export default Home;