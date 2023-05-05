import {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Row} from 'antd';
import {useAppSelector} from '@/hooks/redux';
import {selectUser} from '@/store/slices/userSlice';
import {UserOutlined} from '@ant-design/icons';
import {ShoppingCartOutlined} from '@ant-design/icons';
import {CLIENT_ROUTES} from '@/config';
import '@/styles/components/user-bar.scss';

const UserBar: FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const onLoginClick = () => navigate(CLIENT_ROUTES.login);
  const onCartClick = () => navigate(CLIENT_ROUTES.cart);
  const onProfileClick = () => navigate(CLIENT_ROUTES.profile);

  if (!user) {
    return <Button type='primary' icon={<UserOutlined />} onClick={onLoginClick}>Войти</Button>;
  }

  return (
    <Row>
      <Button icon={<ShoppingCartOutlined />} onClick={onCartClick}>Корзина</Button>
      <Button icon={<UserOutlined />} onClick={onProfileClick}>Профиль</Button>
    </Row>
  );
};

export default UserBar;