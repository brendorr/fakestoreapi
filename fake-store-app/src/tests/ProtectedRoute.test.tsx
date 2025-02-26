import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../components/ProtectedRoute';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const DummyComponent = () => <div data-testid="protected">Conteúdo Protegido</div>;

describe('ProtectedRoute Component', () => {
  test('renderiza os children quando autenticado', () => {

    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <DummyComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected')).toBeInTheDocument();
  });

  test('redireciona para "/login" quando não autenticado', () => {

    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <DummyComponent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div data-testid="login">Página de Login</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
