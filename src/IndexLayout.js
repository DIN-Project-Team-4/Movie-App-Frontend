import React from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { Outlet } from 'react-router-dom';

const IndexLayout = () => {
  return (
    <>
      <Header />
      <main style={{ marginTop: '5rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default IndexLayout;
