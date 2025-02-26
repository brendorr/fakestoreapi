
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '../contexts/CartContext';
import { Product } from '../types/product';
import { useAuth } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));


beforeAll(() => {
  jest.spyOn(window, 'Audio').mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
  } as unknown as HTMLAudioElement));
});


const DummyCartConsumer = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  return (
    <div>
      <div data-testid="cart-length">{cartItems.length}</div>
      {cartItems.map(item => (
        <div key={item.id} data-testid={`cart-item-${item.id}`}>
          {item.title} - Quantity: {item.quantity}
        </div>
      ))}
      <button onClick={() => addToCart({
        id: 1,
        title: 'Produto 1',
        price: 10,
        description: 'desc',
        category: 'cat',
        image: 'img.png',
        rating: { rate: 4, count: 10 },
      })}>
        Add Produto 1
      </button>
      <button onClick={() => removeFromCart(1)}>
        Remove Produto 1
      </button>
      <button onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {

    (useAuth as jest.Mock).mockReturnValue({ user: 'testuser' });
    localStorage.removeItem('cart_testuser');
  });

  test('addToCart adiciona produto e incrementa quantidade', async () => {
    render(
      <CartProvider>
        <DummyCartConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-length')).toHaveTextContent('0');

    fireEvent.click(screen.getByText('Add Produto 1'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
    });
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Quantity: 1');

    fireEvent.click(screen.getByText('Add Produto 1'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Quantity: 2');
    });

    const stored = localStorage.getItem('cart_testuser');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored as string);
    const prod = parsed.find((item: Product & { quantity: number }) => item.id === 1);
    expect(prod.quantity).toBe(2);
  });

  test('removeFromCart remove o produto do carrinho', async () => {
    render(
      <CartProvider>
        <DummyCartConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Produto 1'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
    });

    fireEvent.click(screen.getByText('Remove Produto 1'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
    });
    expect(screen.queryByTestId('cart-item-1')).toBeNull();
  });

  test('clearCart esvazia o carrinho', async () => {
    render(
      <CartProvider>
        <DummyCartConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Produto 1'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
    });

    fireEvent.click(screen.getByText('Clear Cart'));
    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
    });
    expect(screen.queryByTestId('cart-item-1')).toBeNull();
  });

  test('quando não há usuário, cartItems é definido como vazio', async () => {

    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(
      <CartProvider>
        <DummyCartConsumer />
      </CartProvider>
    );


    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('0');
    });
  });

  test('se há um carrinho salvo no localStorage, ele é carregado', async () => {

    const savedCart = [{ id: 1, title: 'Produto Salvo', price: 10, description: 'desc', category: 'cat', image: 'img.png', rating: { rate: 4, count: 10 }, quantity: 3 }];
    localStorage.setItem('cart_testuser', JSON.stringify(savedCart));

    render(
      <CartProvider>
        <DummyCartConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('cart-length')).toHaveTextContent('1');
    });
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Produto Salvo');
    expect(screen.getByTestId('cart-item-1')).toHaveTextContent('Quantity: 3');
  });
});
