import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import {baseAPI} from '../api/baseAPI';

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    userReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseAPI.middleware),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;