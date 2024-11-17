import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './Celebrities.css'
import { getTrendingCelebrities } from './API_endpoints.js'; 

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
      <div style={{ width: "90%", margin: "auto" }}>
        {/* Title Section */}
        <div className="titleContainer">
            <div className="yellowLine"></div>
              <h2 className="title">Most Popular Celebrities </h2>
        </div>

        {isLoading ? (
                <p>Loading trending movies...</p>
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
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={`${IMAGE_BASE_URL}${item.profile_path}`}
                        alt={item.name}
                        style={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ marginTop: "8px", fontSize: "14px", fontWeight: "bold" }}>{item.name}</div>
                      <div style={{ fontSize: "12px", color: "gray" }}>{item.rank}</div>
                    </div>
                  </SwiperSlide>
                 ): null // If profile_path is not available, don't render this slide
              ))}
            </Swiper>
          )}
    </div>
    )
}

