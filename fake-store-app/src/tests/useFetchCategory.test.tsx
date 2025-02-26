import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useFetchCategory } from '../hooks/useFetchCategory';
import { getProducts, getProductsByCategory } from '../services/api';

jest.mock('../services/api', () => ({
  getProducts: jest.fn(),
  getProductsByCategory: jest.fn(),
}));

const DummyComponent = ({ category }: { category: string }) => {
  const { products, loading, error } = useFetchCategory(category);
  return (
    <div>
      <div data-testid="loading">{loading ? 'loading' : 'loaded'}</div>
      <div data-testid="error">{error || 'no error'}</div>
      <div data-testid="products">{products.length}</div>
    </div>
  );
};

describe('useFetchCategory via DummyComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('busca produtos via getProducts quando category é "all"', async () => {
    const mockProducts = [{ id: 1, title: 'Produto 1' }];
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);

    render(<DummyComponent category="all" />);


    expect(screen.getByTestId('loading')).toHaveTextContent('loading');

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('products')).toHaveTextContent(String(mockProducts.length));
    expect(screen.getByTestId('error')).toHaveTextContent('no error');
  });

  test('busca produtos via getProductsByCategory quando category não é "all"', async () => {
    const mockProducts = [{ id: 2, title: 'Produto 2' }];
    (getProductsByCategory as jest.Mock).mockResolvedValue(mockProducts);

    render(<DummyComponent category="electronics" />);

    expect(screen.getByTestId('loading')).toHaveTextContent('loading');

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(getProductsByCategory).toHaveBeenCalledWith('electronics');
    expect(screen.getByTestId('products')).toHaveTextContent(String(mockProducts.length));
    expect(screen.getByTestId('error')).toHaveTextContent('no error');
  });

  test('define mensagem de erro quando a chamada a API falha', async () => {
    (getProducts as jest.Mock).mockRejectedValue(new Error('API error'));

    render(<DummyComponent category="all" />);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
    });

    expect(screen.getByTestId('products')).toHaveTextContent('0');
    expect(screen.getByTestId('error')).toHaveTextContent('Erro ao carregar produtos');
  });
});
