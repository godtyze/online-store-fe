import React from 'react';
import {Layout} from 'antd';
import SideMenu from '@/components/side-menu';

const Main: React.FC = () => {
  return (
    <Layout>
      <SideMenu theme='light'/>
      <Layout.Content>Content</Layout.Content>
    </Layout>
  );
};

export default Main;