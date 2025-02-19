import { Product } from '../types/product';
import { Cart } from '../types/cart';

export const getPopularProducts = (products: Product[], carts: Cart[]) => {
   // contando quantas vezes um produto aparece nos carrinhos
  const productCounts: Record<number, number> = {};
  carts.forEach((cart) => {
    cart.products.forEach((item) => {
      productCounts[item.productId] = (productCounts[item.productId] || 0) + item.quantity;
    });
  });

  return products
    .filter((product) => productCounts[product.id] > 0) 
    .sort((a, b) => productCounts[b.id] - productCounts[a.id])
    .slice(0, 5); 
};