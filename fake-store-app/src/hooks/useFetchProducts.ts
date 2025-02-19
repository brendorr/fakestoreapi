import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getProducts, getCarts } from '../services/api'; 
import { Cart } from '../types/cart'; 

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, cartsData] = await Promise.all([
          getProducts(),
          getCarts(), 
        ]);
        
        setProducts(productsData);
        setCarts(cartsData);
      } catch (err) {
        setError('Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, carts, loading, error }; 
};