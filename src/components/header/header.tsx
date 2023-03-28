import React from 'react';
import {Layout} from 'antd';
import Logo from '../ui/logo';
import styles from '@/styles/components/header.module.scss';
import SearchBar from '@/components/header/search-bar';

const Header: React.FC = () => {
  return (
    <Layout.Header className={styles.header}>
      <Logo />
      <SearchBar />
    </Layout.Header>
  );
};

export default Header;