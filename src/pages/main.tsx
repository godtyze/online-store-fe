import React from 'react';
import {Layout} from 'antd';

const Main: React.FC = () => {
  return (
    <Layout>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout.Content>Content</Layout.Content>
    </Layout>
  );
};

export default Main;