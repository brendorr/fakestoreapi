// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const categories = [
  { name: 'all', key: 'categories.all' },
  { name: 'electronics', key: 'categories.electronics' },
  { name: 'jewelery', key: 'categories.jewelery' },
  { name: "men's clothing", key: 'categories.mens_clothing' },
  { name: "women's clothing", key: 'categories.womens_clothing' }
];

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">{t('welcome')}</Link>
      </div>
      
      <div className="nav-categories">
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={`/category/${category.name}`}
            className="nav-link"
          >
            {t(category.key)}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <Link to="/cart" className="nav-link">{t('cart')}</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="nav-link">{t('logout')}</button>
        ) : (
          <Link to="/login" className="nav-link">{t('login')}</Link>
        )}
        {/* Seletor de idioma */}
        <div>
          <button onClick={() => changeLanguage('pt')}>PT</button>
          <button onClick={() => changeLanguage('en')}>EN</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
