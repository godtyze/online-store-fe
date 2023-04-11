import React, {useEffect} from 'react';
import {Button, Card, Form, Input} from 'antd';
import {useLoginMutation, useRegisterMutation} from '@/api/userAPI';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {CLIENT_ROUTES} from '@/config';
import {getErrorMessage, getPath} from '@/utils';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {LocationState} from '@/models';
import {useAppDispatch} from '@/hooks/redux';
import {setCredentials} from '@/store/slices/userSlice';
import '@/styles/components/form.scss';

interface FormItems {
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [form] = Form.useForm<FormItems>();
  const dispatch = useAppDispatch()
  const location = useLocation();
  const state = location.state as LocationState;
  const navigationPath = getPath(state);
  const navigate = useNavigate();
  const isLoginPage = location.pathname === CLIENT_ROUTES.login;
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

  let formSubmitError: string | null;
  if (isLoginPage) {
    formSubmitError = getErrorMessage(loginError);
  } else {
    formSubmitError = getErrorMessage(registerError);
  }

  const onFinish = (values: FormItems) => {
    const {email, password} = values;
    if (isLoginPage) {
       login({email, password});
    } else {
      register({email, password});
    }
  };

  useEffect(() => {
    if (isLoginSuccess && isLoginPage && loginData) {
      dispatch(setCredentials(loginData));
      navigate(navigationPath, {replace: true});
    }

    if (isRegisterSuccess && !isLoginPage && registerData) {
      dispatch(setCredentials(registerData));
      navigate(navigationPath, {replace: true});
    }
  }, [isLoginPage ? isLoginSuccess : isRegisterSuccess]);

  return (
    <Card>
      <Form
        name='auth-form'
        onFinish={onFinish}
        size='large'
        form={form}
      >
        {formSubmitError && <div style={{color: 'red', fontSize: '15px'}}>{formSubmitError}</div>}
        <Form.Item
          name='email'
          rules={[
            {required: true, message: 'E-mail не может быть пустым!'},
            {whitespace: true, message: 'E-mail не может быть пустым!'},
            {type: 'email', message: 'Некорректный E-mail!'}
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon'/>}
            placeholder='E-mail'
            autoComplete='off'
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
            prefix={<LockOutlined className='site-form-item-icon'/>}
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