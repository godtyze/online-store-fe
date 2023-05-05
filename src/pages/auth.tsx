import {FC} from 'react';
import {Layout, Row} from 'antd';
import AuthForm from '@/components/auth-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppSelector} from '@/hooks/redux';
import {selectUser} from '@/store/slices/userSlice';
import {LocationState} from '@/models';
import {getPath} from '@/utils';
import '@/styles/pages/auth.scss';

const Auth: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const state = location.state as LocationState;
  const navigationPath = getPath(state);
  const navigate = useNavigate();

  if (user) {
    navigate(navigationPath, {replace: true});
  }

  return (
    <Layout className='auth-layout'>
      <Row justify='center'>
        <AuthForm />
      </Row>
    </Layout>
  );
};

export default Auth;