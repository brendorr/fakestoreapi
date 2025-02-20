import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularProducts } from '../utils/getPopularProducts';
import { getTopRatedProducts } from '../utils/getTopRatedProducts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { products, carts, loading, error } = useFetchProducts();
  const popularProducts = getPopularProducts(products, carts);
  const topRatedProducts = getTopRatedProducts(products);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-page">
      <h1>🔥 Produtos em Destaque</h1>
      <Slider {...sliderSettings}>
        {popularProducts.map(product => (
          <div key={product.id}>
            <ProductCard product={product} isPopular={true} />
          </div>
        ))}
      </Slider>

      <h1>🏆 Melhores Avaliados</h1>
      <Slider {...sliderSettings}>
        {topRatedProducts.map(product => (
          <div key={product.id}>
            <ProductCard product={product} isTopRated={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
