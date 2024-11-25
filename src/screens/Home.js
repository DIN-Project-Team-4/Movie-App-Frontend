import React from 'react';
import Carousel from '../components/Carousel.js';
import Celebrities from '../components/Celebrities.js';

function Home() {
  return (
    <div className='main-div'>
      <Carousel />
      <Celebrities />
    </div>
  );
}

export default Home;
