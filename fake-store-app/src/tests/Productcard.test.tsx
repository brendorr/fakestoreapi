import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { Product } from '../types/product';

const sampleProduct: Product = {
  id: 1,
  title: 'Produto Exemplo',
  price: 29.99,
  description: 'Descrição do produto',
  category: 'electronics',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe('ProductCard - Cobertura de branches', () => {
  const renderProductCard = (props: { isPopular?: boolean; isTopRated?: boolean } = {}) => {
    const mockAddToCart = jest.fn();
    render(
      <I18nextProvider i18n={i18n}>
        <CartContext.Provider
          value={{
            cartItems: [],
            addToCart: mockAddToCart,
            removeFromCart: jest.fn(),
            clearCart: jest.fn(),
          }}
        >
          <ProductCard product={sampleProduct} {...props} />
        </CartContext.Provider>
      </I18nextProvider>
    );
    return { mockAddToCart };
  };

  test('renderiza Badge de "popular" quando isPopular é true', () => {
    renderProductCard({ isPopular: true });
    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
  });

  test('não renderiza Badge de "popular" quando isPopular é false ou não definido', () => {
    renderProductCard({ isPopular: false });
    expect(screen.queryByText(/Popular/i)).toBeNull();
  });

  test('renderiza Badge de "topRated" quando isTopRated é true', () => {
    renderProductCard({ isTopRated: true });
    expect(screen.getByText(/Top Avaliado/i)).toBeInTheDocument();
  });

  test('não renderiza Badge de "topRated" quando isTopRated é false ou não definido', () => {
    renderProductCard({ isTopRated: false });
    expect(screen.queryByText(/Top Avaliado/i)).toBeNull();
  });

  test('renderiza ambos os badges quando isPopular e isTopRated são true', () => {
    renderProductCard({ isPopular: true, isTopRated: true });
    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
    expect(screen.getByText(/Top Avaliado/i)).toBeInTheDocument();
  });

  test('chama addToCart ao clicar no botão "Adicionar ao Carrinho"', () => {
    const { mockAddToCart } = renderProductCard();
    const button = screen.getByRole('button', { name: /adicionar ao carrinho/i });
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalledWith(sampleProduct);
  });

  test('renderiza os detalhes do produto corretamente', () => {
    renderProductCard();
    expect(screen.getByAltText(sampleProduct.title)).toBeInTheDocument();
    expect(screen.getByText(sampleProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${sampleProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${sampleProduct.rating.rate}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${sampleProduct.rating.count}`, 'i'))).toBeInTheDocument();
  });
});
