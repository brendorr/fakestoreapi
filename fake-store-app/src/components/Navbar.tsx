import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import '../styles/Navbar.css'; 

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
  const [menuOpen, setMenuOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false); 
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMenuOpen(false); 
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={() => setMenuOpen(false)}>{t('welcome')}</Link>
      </div>


      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
  {menuOpen ? '✖' : '☰'}
</button>



      <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <div className="nav-categories">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={`/category/${category.name}`} 
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {t(category.key)}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="nav-link" onClick={() => setMenuOpen(false)}>{t('cart')}</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link">{t('logout')}</button>
          ) : (
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>{t('login')}</Link>
          )}
          
          {/* Seletor de idioma */}
          <div className="language-selector">
            <button onClick={() => changeLanguage('pt')}>PT</button>
            <button onClick={() => changeLanguage('en')}>EN</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
