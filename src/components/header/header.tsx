import React from 'react';
import {Layout} from 'antd';
import Logo from '../ui/logo';
import styles from '@/styles/components/header.module.scss';
import SearchBar from '@/components/header/search-bar';
import UserBar from '@/components/header/user-bar';
import {Link} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';

const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Link to={CLIENT_ROUTES.main}><Logo /></Link>
      <SearchBar />
      <UserBar />
    </Layout.Header>
  );
};

export default Header;