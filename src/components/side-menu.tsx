import React from 'react';
import {Layout} from 'antd';
import type { SiderTheme } from 'antd/es/layout/Sider';

interface SideMenuProps {
  theme?: SiderTheme
}

const SideMenu: React.FC<SideMenuProps> = ({ theme }) => {
  return (
    <Layout.Sider theme={theme}>
      Sider
    </Layout.Sider>
  );
};

export default SideMenu;