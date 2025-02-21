import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

// Mocks para o AuthContext
const mockLogout = jest.fn();
const mockUseAuth = {
  isAuthenticated: true,
  logout: mockLogout,
};

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth,
}));


const changeLanguageMock = jest.fn();
const translations: Record<string, string> = {
  welcome: 'Welcome',
  'categories.all': 'All',
  'categories.electronics': 'Electronics',
  'categories.jewelery': 'Jewelery',
  'categories.mens_clothing': "Men's Clothing",
  'categories.womens_clothing': "Women's Clothing",
  cart: 'Cart',
  logout: 'Logout',
  login: 'Login',
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => translations[key] || key,
    i18n: { changeLanguage: changeLanguageMock },
  }),
}));

// Mock para o react-router-dom (useNavigate)
const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

// Função auxiliar para renderizar o componente com BrowserRouter
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('verificando se os textos da da navbar estao aparecendo', () => {
    renderWithRouter(<Navbar />);


    expect(screen.getByText('Welcome')).toBeInTheDocument();


    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Jewelery')).toBeInTheDocument();
    expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
    expect(screen.getByText("Women's Clothing")).toBeInTheDocument();


    expect(screen.getByText('Cart')).toBeInTheDocument();


    expect(screen.getByText('Logout')).toBeInTheDocument();

    expect(screen.queryByText('Login')).toBeNull();
  });

  test('alternar abertura/fechamento do menu ao clicar no botão de toggle', () => {
    renderWithRouter(<Navbar />);

    const toggleButton = screen.getByRole('button', { name: /☰/i });
    const navMenu = screen.getByRole('navigation').querySelector('.nav-menu');

    // Inicialmente, o menu não deve conter a classe 'open'
    expect(navMenu).not.toHaveClass('open');

    // Ao clicar, o menu deve abrir (classe 'open' adicionada)
    fireEvent.click(toggleButton);
    expect(navMenu).toHaveClass('open');

    // Ao clicar novamente, o menu deve fechar
    fireEvent.click(toggleButton);
    expect(navMenu).not.toHaveClass('open');
  });

  test('executa logout e navega para "/" ao clicar no botão de logout', () => {
    renderWithRouter(<Navbar />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Verifica se a função de logout foi chamada
    expect(mockLogout).toHaveBeenCalled();

    // Verifica se a navegação ocorreu para "/"
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  test('muda o idioma ao clicar nos botões do seletor de idioma', () => {
    renderWithRouter(<Navbar />);

    const ptButton = screen.getByRole('button', { name: 'PT' });
    const enButton = screen.getByRole('button', { name: 'EN' });

    fireEvent.click(ptButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('pt');

    fireEvent.click(enButton);
    expect(changeLanguageMock).toHaveBeenCalledWith('en');
  });

  test('fecha o menu ao clicar em um link de categoria', () => {
    renderWithRouter(<Navbar />);


    const toggleButton = screen.getByRole('button', { name: /☰/i });
    fireEvent.click(toggleButton);

    const navMenu = screen.getByRole('navigation').querySelector('.nav-menu');
    expect(navMenu).toHaveClass('open');


    const categoryLink = screen.getByText('All');
    fireEvent.click(categoryLink);


    expect(navMenu).not.toHaveClass('open');
  });
});
