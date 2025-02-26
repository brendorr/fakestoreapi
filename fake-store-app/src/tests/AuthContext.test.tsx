
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';


jest.mock('../services/api', () => ({
  loginUser: jest.fn(),
}));


const AuthConsumer = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="user">{user || 'No User'}</div>
      <button onClick={() => login('johnd', 'm38rmF$')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const DummyComponent = () => {
    useAuth();
    return <div>Dummy</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('login atualiza estado e localStorage quando bem-sucedido', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ token: 'abc123' });
    
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    expect(screen.getByTestId('user')).toHaveTextContent('No User');

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user')).toHaveTextContent('johnd');
    });

    expect(localStorage.getItem('token')).toBe('abc123');
    expect(localStorage.getItem('user')).toBe('johnd');
  });

  test('logout limpa estado e localStorage', async () => {
    (loginUser as jest.Mock).mockResolvedValue({ token: 'abc123' });
    
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );


    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
    });


    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  test('login chama alert quando ocorre erro', async () => {

    (loginUser as jest.Mock).mockRejectedValue(new Error('Erro'));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Login falhou! Use usuário: "johnd", senha: "m38rmF$"');

      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user')).toHaveTextContent('No User');
    });

    alertSpy.mockRestore();
  });
  
  test('useAuth lança erro se não estiver dentro de AuthProvider', () => {
    expect(() => render(<DummyComponent />)).toThrow('useAuth must be used within an AuthProvider');
  });

  
});
