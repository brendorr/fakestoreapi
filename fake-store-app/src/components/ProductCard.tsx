import React from 'react';
import { Product } from '../types/product';
import Badge from './Badge';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  isPopular?: boolean;
  isTopRated?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isPopular, isTopRated }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      {isPopular && <Badge label="Popular" color="#ff4757" />}
      {isTopRated && <Badge label="Top Avaliado" />}
      
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="product-rating">
        <span>⭐ {product.rating.rate}</span>
        <span>({product.rating.count} avaliações)</span>
      </div>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;