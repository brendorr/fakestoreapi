import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;