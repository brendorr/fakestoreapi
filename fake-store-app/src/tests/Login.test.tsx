
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { AuthContext } from '../contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';


const mockLogin = jest.fn();


const mockAuthContext = {
  isAuthenticated: false,
  user: null,
  login: mockLogin,
  logout: jest.fn(),
};

describe('Login Component', () => {
  test('executa o login corretamente', async () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Usuário');
    const passwordInput = screen.getByPlaceholderText('Senha');
    const submitButton = screen.getByRole('button', { name: /entrar/i });


    fireEvent.change(usernameInput, { target: { value: 'johnd' } });
    fireEvent.change(passwordInput, { target: { value: 'm38rmF$' } });


    fireEvent.click(submitButton);


    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('johnd', 'm38rmF$');
    });
  });
});
