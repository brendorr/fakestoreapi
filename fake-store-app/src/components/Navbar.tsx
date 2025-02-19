import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'all', label: 'Todos os Produtos' },
  { name: 'electronics', label: 'Eletrônicos' },
  { name: 'jewelery', label: 'Joias' },
  { name: "men's clothing", label: 'Roupas Masculinas' },
  { name: "women's clothing", label: 'Roupas Femininas' }
];

const Navbar = () => {
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
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;