import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  { name: 'all', label: 'Todos os Produtos' },
  { name: 'electronics', label: 'Eletrônicos' },
  { name: 'jewelery', label: 'Joias' },
  { name: "men's clothing", label: 'Roupas Masculinas' },
  { name: "women's clothing", label: 'Roupas Femininas' }
];

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">FakeStore</Link>
      </div>
      
      <div className="nav-categories">
        {categories.map((category) => (
          <Link 
            key={category.name}
            to={`/category/${category.name}`}
            className="nav-link"
          >
            {category.label}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <Link to="/cart" className="nav-link">Carrinho</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="nav-link">Logout</button>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;