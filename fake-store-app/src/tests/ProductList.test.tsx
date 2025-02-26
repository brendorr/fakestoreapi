import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../components/ProductList';
import { Product } from '../types/product';


jest.mock('../components/ProductCard', () => {
  return ({ product, isPopular, isTopRated }: { product: Product; isPopular?: boolean; isTopRated?: boolean; }) => (
    <div data-testid="product-card">
      {product.title}
      {isPopular ? ' - Popular' : ''}
      {isTopRated ? ' - Top Rated' : ''}
    </div>
  );
});

describe('ProductList Component', () => {
  const dummyProducts: Product[] = [
    {
      id: 1,
      title: 'Produto 1',
      price: 10,
      description: 'Descrição 1',
      category: 'Categoria 1',
      image: 'image1.png',
      rating: { rate: 4, count: 10 },
    },
    {
      id: 2,
      title: 'Produto 2',
      price: 20,
      description: 'Descrição 2',
      category: 'Categoria 2',
      image: 'image2.png',
      rating: { rate: 5, count: 20 },
    },
  ];

  test('renderiza um ProductCard para cada produto', () => {
    render(<ProductList products={dummyProducts} />);
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(dummyProducts.length);
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
  });

  test('passa as props isPopular e isTopRated para os ProductCards', () => {
    render(<ProductList products={dummyProducts} isPopular={true} isTopRated={true} />);

    expect(screen.getByText(/Produto 1.*Popular.*Top Rated/i)).toBeInTheDocument();
    expect(screen.getByText(/Produto 2.*Popular.*Top Rated/i)).toBeInTheDocument();
  });
});
