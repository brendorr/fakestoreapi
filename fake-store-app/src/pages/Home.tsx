import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPopularProducts } from '../utils/getPopularProducts';
import { getTopRatedProducts } from '../utils/getTopRatedProducts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../components/Arrows'; 
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { products, carts, loading, error } = useFetchProducts();
  const popularProducts = getPopularProducts(products, carts);
  const topRatedProducts = getTopRatedProducts(products);
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      <div className="carousels-container">
        <div className="carousel-item">
        <h2>{t('productsFeatured')}</h2>
          <Slider {...sliderSettings}>
            {popularProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} isPopular={true} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="carousel-item">
        <h2>{t('topRateds')}</h2>
          <Slider {...sliderSettings}>
            {topRatedProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} isTopRated={true} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
