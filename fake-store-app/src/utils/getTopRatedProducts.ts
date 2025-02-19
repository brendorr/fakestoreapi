import { Product } from '../types/product';

export const getTopRatedProducts = (products: Product[], minReviews = 20) => {
  return products
    .filter(product => product.rating.count >= minReviews) 
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5); 
};