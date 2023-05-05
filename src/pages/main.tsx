import {FC} from 'react';
import {Layout} from 'antd';
import SideMenu from '@/components/side-menu/side-menu';
import DeviceList from '@/components/device-list';

const Main: FC = () => {
  return (
    <Layout>
      <SideMenu theme='light'/>
      <Layout.Content>
        <DeviceList />
      </Layout.Content>
    </Layout>
  );
};

export default Main;