import React from 'react';
import { getPopularProducts } from '../utils/getPopularProducts';
import { Product } from '../types/product';
import { Cart } from '../types/cart';

describe('getPopularProducts', () => {
  const products: Product[] = [
    { id: 1, title: 'Produto 1', price: 10, description: '', category: '', image: '', rating: { rate: 4, count: 10 } },
    { id: 2, title: 'Produto 2', price: 20, description: '', category: '', image: '', rating: { rate: 3, count: 5 } },
    { id: 3, title: 'Produto 3', price: 30, description: '', category: '', image: '', rating: { rate: 4.5, count: 15 } },
    { id: 4, title: 'Produto 4', price: 40, description: '', category: '', image: '', rating: { rate: 2, count: 8 } },
    { id: 5, title: 'Produto 5', price: 50, description: '', category: '', image: '', rating: { rate: 5, count: 20 } },
    { id: 6, title: 'Produto 6', price: 60, description: '', category: '', image: '', rating: { rate: 3.5, count: 12 } },
  ];

  const carts: Cart[] = [
    {
      id: 1,
      userId: 101,
      date: '2025-02-25',
      products: [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 },
      ],
    },
    {
      id: 2,
      userId: 102,
      date: '2025-02-26',
      products: [
        { productId: 1, quantity: 3 },
        { productId: 2, quantity: 1 },
        { productId: 5, quantity: 5 },
        { productId: 6, quantity: 2 },
      ],
    },
  ];

  test('retorna somente os produtos que aparecem nos carrinhos', () => {
    const popularProducts = getPopularProducts(products, carts);

    expect(popularProducts).toHaveLength(5); // Verificando se realmente foram pegos apenas 5

    // Verifica se nenhum produto sem registros aparece (produto 4 não deveria estar)
    expect(popularProducts.find(p => p.id === 4)).toBeUndefined();
  });

  test('retorna os produtos ordenados pela quantidade em carrinhos (descendente)', () => {
    const popularProducts = getPopularProducts(products, carts);

    // Produto 1 e 5 aparecem 5 vezes, logo, eles tem de ser os 2 primeiros, em qualquer ordem
    expect([1, 5]).toContain(popularProducts[0].id);
    expect([1, 5]).toContain(popularProducts[1].id);

    expect(popularProducts[2].id).toBe(6);
    // Os 2 ultimos (produto 2 e 3) podem estar em qualquer ordem
    const lastTwo = [popularProducts[3].id, popularProducts[4].id];
    expect(lastTwo.sort()).toEqual([1, 3, 2].filter(id => id === 2 || id === 3).sort());
  });
});
