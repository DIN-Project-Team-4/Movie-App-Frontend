import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getTrendingCelebrities } from '../Search/searchApi.js';
import './Celebrities.css'

export default function Celebrities() {
  const [trendingCelebrities, setTrendingCelebrities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // Fetch trending movies on the first render
  useEffect(() => {
    const fetchTrendingCelebrities = async () => {
      const data = await getTrendingCelebrities();
      if (data && data.results) {
        setTrendingCelebrities(data.results);
        setIsLoading(false);
      }
    };
    fetchTrendingCelebrities();
  }, []);

  return (
    <div className="celebrities-main">
      {/* Title Section */}
      <div className="container-title">
        <h2>Most Popular Celebrities </h2>
      </div>

      {isLoading ? (
        <p>Loading trending celebrities...</p>
      ) : (

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            // Responsive breakpoints
            480: {
              slidesPerView: 2, // 2 slides for devices with a width >= 480px
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3, // 3 slides for devices with a width >= 768px
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4, // 4 slides for devices with a width >= 1024px
              spaceBetween: 30,
            },
          }}
        >
          {trendingCelebrities.map((item) => (
            // Check if profile_path exists before rendering
            item.profile_path ? (
              <SwiperSlide key={item.id}>
                <div className="swiper-container">
                  <img
                    src={`${IMAGE_BASE_URL}${item.profile_path}`}
                    alt={item.name}
                  />
                  <div className="celebrity-name">{item.name}</div>
                  <div className="rank">{item.rank}</div>
                </div>
              </SwiperSlide>
            ) : null // If profile_path is not available, don't render this slide
          ))}
        </Swiper>
      )}
    </div>
  )
}


