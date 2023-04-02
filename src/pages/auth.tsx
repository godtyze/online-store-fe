import React from 'react';
import {Layout, Row} from 'antd';
import AuthForm from '@/components/auth-form';
import '@/styles/pages/auth.scss';

const Auth: React.FC = () => {
  return (
    <Layout className='ant-layout'>
      <Row justify='center'>
        <AuthForm />
      </Row>
    </Layout>
  );
};

export default Auth;