import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, 
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};


export const getProductsByCategory = async (category: string) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};


export default api;