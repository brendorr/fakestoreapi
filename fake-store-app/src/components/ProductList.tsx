import React from 'react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  isPopular?: boolean;
  isTopRated?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, isPopular, isTopRated }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          isPopular={isPopular}
          isTopRated={isTopRated}
        />
      ))}
    </div>
  );
};

export default ProductList;