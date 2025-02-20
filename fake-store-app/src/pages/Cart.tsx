import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { t } = useTranslation();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>{t('cartTitle')}</h1>
      {cartItems.length === 0 ? (
        <p>
          {t('cartEmpty')} <Link to="/">{t('backToShopping')}</Link>
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} width="50" />
                <h3>{item.title}</h3>
                <p>{t('quantity')}: {item.quantity}</p>
                <p>{t('subtotal')}: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>{t('remove')}</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>{t('total')}: ${total.toFixed(2)}</h2>
            <button onClick={clearCart}>{t('clearCart')}</button>
            <button onClick={() => alert(t('checkoutMessage'))}>{t('checkout')}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
