import {Provider} from 'react-redux';
import {store} from './store';
import AppRouter from '@/components/app-router';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
