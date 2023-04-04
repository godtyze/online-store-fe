import AppRouter from '@/components/app-router';
import {useLazyRefreshQuery} from '@/api/userAPI';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import React, {useEffect} from 'react';
import {selectToken, setCredentials} from '@/store/slices/userSlice';
import {Row, Spin} from 'antd';
import './App.scss';

function App() {
  const [refresh, {data, isSuccess, isLoading}] = useLazyRefreshQuery({
    refetchOnFocus: false
  });
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token) {
      refresh();
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) dispatch(setCredentials(data));
  }, [isSuccess]);

  if (isLoading) {
    return <Row justify='center'><Spin size='large'/></Row>
  }

  return <AppRouter/>;
}

export default App;
