import {FC} from 'react';
import Header from '@/components/header/header';
import {Outlet} from 'react-router-dom';
import Footer from '@/components/footer';

const AppLayout: FC = () => {
  return (
    <div className="app">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default AppLayout;