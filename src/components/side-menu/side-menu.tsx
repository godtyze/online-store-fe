import {FC} from 'react';
import {Layout} from 'antd';
import type { SiderTheme } from 'antd/es/layout/Sider';
import {useGetAllTypesQuery} from '@/api/typeAPI';
import Filter from './filter';
import Loader from '@/components/ui/loader';

interface SideMenuProps {
  theme?: SiderTheme
}

const SideMenu: FC<SideMenuProps> = ({ theme }) => {
  const {data, isLoading} = useGetAllTypesQuery(undefined, {
    refetchOnFocus: false
  });

  if (isLoading) {
    return (
      <Layout.Sider theme={theme}>
        <Loader isCenter={true} size='small'/>
      </Layout.Sider>
    );
  }

  return (
    <Layout.Sider theme={theme}>
      <Filter data={data}/>
    </Layout.Sider>
  );
};

export default SideMenu;