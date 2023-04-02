import React, {useCallback, useState} from 'react';
import {Button, Card, Form, Input} from 'antd';
import {useLoginMutation, useRegisterMutation} from '@/api/userAPI';
import {Link, useLocation} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';
import {getErrorMessage} from '@/utils';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import '@/styles/components/form.scss';

const AuthForm: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === CLIENT_ROUTES.login;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {error: loginError, isLoading: isLoginLoading}] = useLoginMutation();
  const [register, {error: registerError, isLoading: isRegisterLoading}] = useRegisterMutation();
  let formError: string | null;

  if (isLoginPage) {
    formError = getErrorMessage(loginError);
  } else {
    formError = getErrorMessage(registerError);
  }

  const onFinish = useCallback(() => {
    if (isLoginPage) {
      login({email, password});
    } else {
      register({email, password});
    }
  }, []);

  return (
    <Card>
      <Form
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
        size='large'
      >
        {formError && <div style={{color: 'red', fontSize: '15px'}}>{formError}</div>}
        <Form.Item
          name='e-mail'
          rules={[
            {required: true, message: 'E-mail не может быть пустым!'},
            {whitespace: true, message: 'E-mail не может быть пустым!'},
            {type: 'email', message: 'Некорректный E-mail!'}
          ]}
          hasFeedback
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<UserOutlined className="site-form-item-icon"/>}
            placeholder='E-mail'
            autoComplete='off'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {required: true, message: 'Пароль не может быть пустым!'},
            {min: 8, message: 'Пароль не может быть короче 8 символов!'}
          ]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon"/>}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          {isLoginPage
            ? <span className='form-text'>Нет аккаунта? <Link to={CLIENT_ROUTES.registration}>Зарегестрируйтесь!</Link></span>
            : <span className='form-text'>Есть аккаунт? <Link to={CLIENT_ROUTES.login}>Войдите!</Link></span>
          }
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
            loading={isLoginPage ? isLoginLoading : isRegisterLoading}>
            {isLoginPage
              ? 'Войти'
              : 'Регистрация'
            }
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AuthForm;