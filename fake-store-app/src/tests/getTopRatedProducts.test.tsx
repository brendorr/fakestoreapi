import React from 'react';
import { getTopRatedProducts } from '../utils/getTopRatedProducts';
import { Product } from '../types/product';

describe('getTopRatedProducts', () => {
  const products: Product[] = [
    { id: 1, title: 'Produto 1', price: 10, description: '', category: '', image: '', rating: { rate: 4, count: 25 } },
    { id: 2, title: 'Produto 2', price: 20, description: '', category: '', image: '', rating: { rate: 4.6, count: 15 } }, 
    { id: 3, title: 'Produto 3', price: 30, description: '', category: '', image: '', rating: { rate: 4.5, count: 30 } },
    { id: 4, title: 'Produto 4', price: 40, description: '', category: '', image: '', rating: { rate: 2, count: 20 } },
    { id: 5, title: 'Produto 5', price: 50, description: '', category: '', image: '', rating: { rate: 5, count: 50 } },
    { id: 6, title: 'Produto 6', price: 60, description: '', category: '', image: '', rating: { rate: 3.5, count: 22 } },
    { id: 7, title: 'Produto 7', price: 70, description: '', category: '', image: '', rating: { rate: 4.8, count: 21 } },
  ];

  test('filtra produtos com reviews >= 20, ordena por rate decrescente e retorna no máximo 5 produtos', () => {
    const topRated = getTopRatedProducts(products);
    // Produto 2 não deve entrar porque não possui 20 reviews
    // Produto 5 (rate 5), Produto 7 (rate 4.8), Produto 3 (rate 4.5), Produto 1 (rate 4), Produto 6 (rate 3.5), Produto 4 (rate 2)
    const expectedOrder = [5, 7, 3, 1, 6];
    expect(topRated.map(p => p.id)).toEqual(expectedOrder);
    expect(topRated).toHaveLength(5);
  });

  test('permite alterar o minReviews via parâmetro', () => {
    // Usando um minReviews menor (por exemplo, 15) para incluir o produto 2
    const topRated = getTopRatedProducts(products, 15);

    const expectedOrder = [5, 7, 2, 3, 1]; // Agora que o 2 foi incluso, a ordem deve ser essa
    expect(topRated.map(p => p.id)).toEqual(expectedOrder);
    expect(topRated).toHaveLength(5);
  });
});
