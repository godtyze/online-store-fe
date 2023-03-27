import React from 'react';
import Header from '@/components/header';
import {Outlet} from 'react-router-dom';
import Footer from '@/components/footer';

const AppLayout: React.FC = () => {
  return (
    <div className="app">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default AppLayout;