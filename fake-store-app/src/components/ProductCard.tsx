import React from 'react';
import { Product } from '../types/product';
import Badge from './Badge';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  isPopular?: boolean;
  isTopRated?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isPopular, isTopRated }) => {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  return (
    <div className="product-card">
      {isPopular && <Badge label={t('popular')} color="#ff4757" />}
      {isTopRated && <Badge label={t('topRated')} />}
      
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="product-rating">
        <span>⭐ {product.rating.rate}</span>
        <span>({product.rating.count} {t('reviews')})</span>
      </div>
      <button onClick={() => addToCart(product)}>{t('addToCart')}</button>
    </div>
  );
};

export default ProductCard;