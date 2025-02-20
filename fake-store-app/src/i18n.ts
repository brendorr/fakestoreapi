
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to FakeStore",
      login: "Login",
      logout: "Logout",
      "cart": "Cart",
      "productsFeatured": "Trending",
      "topRateds": "Top Rated",
      "popular": "Popular",
      "topRated": "Top Rated",
      "reviews": "reviews",
      "addToCart": "Add to Cart",
      "cartTitle": "Shopping Cart",
      "cartEmpty": "Your cart is empty.",
      "backToShopping": "Back to shopping",
      "quantity": "Quantity",
      "subtotal": "Subtotal",
      "total": "Total",
      "remove": "Remove",
      "clearCart": "Clear Cart",
      "checkout": "Checkout",
      "checkoutMessage": "Purchase simulated! Thank you!",
      "categories": {
        "all": "All Products",
        "electronics": "Electronics",
        "jewelery": "Jewelry",
        "mens_clothing": "Men's Clothing",
        "womens_clothing": "Women's Clothing"
      }

    }
  },
  pt: {
    translation: {
      welcome: "Bem-vindo à FakeStore",
      login: "Entrar",
      logout: "Sair",
      "cart": "Carrinho",
      "productsFeatured": "Produtos em Destaque",
      "topRateds": "Melhores Avaliados",
      "popular": "Popular",
      "topRated": "Top Avaliado",
      "reviews": "avaliações",
      "addToCart": "Adicionar ao Carrinho",
      "cartTitle": "Carrinho de Compras",
      "cartEmpty": "Seu carrinho está vazio.",
      "backToShopping": "Voltar às compras",
      "quantity": "Quantidade",
      "subtotal": "Subtotal",
      "total": "Total",
      "remove": "Remover",
      "clearCart": "Limpar Carrinho",
      "checkout": "Finalizar Compra",
      "checkoutMessage": "Compra simulada! Obrigado!",
      "categories": {
        "all": "Todos os Produtos",
        "electronics": "Eletrônicos",
        "jewelery": "Joias",
        "mens_clothing": "Roupas Masculinas",
        "womens_clothing": "Roupas Femininas"
      }

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // idioma padrão
    fallbackLng: 'pt', // idioma de reserva caso a tradução não seja encontrada
    interpolation: {
      escapeValue: false, // React já faz a sanitização
    },
  });

export default i18n;
