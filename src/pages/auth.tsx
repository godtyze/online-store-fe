import React from 'react';
import {Layout, Row} from 'antd';
import AuthForm from '@/components/auth-form';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '@/hooks/redux';
import {selectUser} from '@/store/slices/userSlice';
import {LocationState} from '@/models';
import '@/styles/pages/auth.scss';

const Auth: React.FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const state = location.state as LocationState;

  if (user && state) {
    return <Navigate to={state.from} replace/>
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