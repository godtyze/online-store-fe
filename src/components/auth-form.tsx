import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input} from 'antd';
import {useLoginMutation, useRegisterMutation} from '@/api/userAPI';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';
import {getErrorMessage} from '@/utils';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LocationState} from '@/models';
import {useAppDispatch} from '@/hooks/redux';
import {setCredentials} from '@/store/slices/userSlice';
import '@/styles/components/form.scss';

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation();
  const state = location.state as LocationState;
  const navigationPath = state && state.from !== CLIENT_ROUTES.login ? state.from : CLIENT_ROUTES.main;
  const navigate = useNavigate();
  const isLoginPage = location.pathname === CLIENT_ROUTES.login;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [
    login,
    {
      error: loginError,
      isLoading: isLoginLoading,
      data: loginData,
      isSuccess: isLoginSuccess
    }
  ] = useLoginMutation();
  const [
    register,
    {
      error: registerError,
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      data: registerData
    }
  ] = useRegisterMutation();

  let formError: string | null;
  if (isLoginPage) {
    formError = getErrorMessage(loginError);
  } else {
    formError = getErrorMessage(registerError);
  }

  const onFinish = async () => {
    if (isLoginPage) {
      await login({email, password});
    } else {
      await register({email, password});
    }
  };

  useEffect(() => {
    if (isLoginSuccess && isLoginPage && loginData) {
      dispatch(setCredentials(loginData));
      navigate(navigationPath);
    }

    if (isRegisterSuccess && !isLoginPage && registerData) {
      dispatch(setCredentials(registerData));
      navigate(navigationPath);
    }
  }, [isLoginPage ? isLoginSuccess : isRegisterSuccess]);

  return (
    <Card>
      <Form
        name="auth-form"
        onFinish={onFinish}
        size="large"
      >
        {formError && <div style={{color: 'red', fontSize: '15px'}}>{formError}</div>}
        <Form.Item
          name="e-mail"
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
            placeholder="E-mail"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {required: true, message: 'Пароль не может быть пустым!'},
            {min: 5, message: 'Пароль не может быть короче 5 символов!'}
          ]}
          hasFeedback
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            prefix={<LockOutlined className="site-form-item-icon"/>}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          {isLoginPage
            ? <span className="form-text">Нет аккаунта? <Link to={CLIENT_ROUTES.registration}>Зарегестрируйтесь!</Link></span>
            : <span className="form-text">Есть аккаунт? <Link to={CLIENT_ROUTES.login}>Войдите!</Link></span>
          }
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
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