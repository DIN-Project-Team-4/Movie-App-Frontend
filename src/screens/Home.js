import React from 'react';
import Carousel from '../components/Home/Carousel.js';
import Celebrities from '../components/Home/Celebrities.js';

function Home() {
  return (
    <div className='main-div'>
      <Carousel />
      <Celebrities />
    </div>
  );
}

export default Home;
