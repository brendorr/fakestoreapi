import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getProducts, getProductsByCategory } from '../services/api';

export const useFetchCategory = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = category === 'all' 
          ? await getProducts() 
          : await getProductsByCategory(category);
        setProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};