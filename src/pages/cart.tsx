import {FC} from 'react';
import {Layout} from 'antd';
import {useGetBasketDevicesQuery} from '@/api/userAPI';
import {useAppSelector} from '@/hooks/redux';
import {selectUser} from '@/store/slices/userSlice';
import {Navigate} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';

const Cart: FC = () => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={CLIENT_ROUTES.main} replace/>;
  }

  const {data, isLoading} = useGetBasketDevicesQuery(user.id, {refetchOnFocus: false});

  console.log(data);

  return (
    <Layout>
      cart page
    </Layout>
  );
};

export default Cart;