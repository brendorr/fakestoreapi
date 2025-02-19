import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchCategory } from '../hooks/useFetchCategory';
import ProductList from '../components/ProductList';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { products, loading, error } = useFetchCategory(categoryName || 'all');

  return (
    <div className="page-container">
      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      {products.length > 0 && <ProductList products={products} />}
    </div>
  );
};

export default CategoryPage;