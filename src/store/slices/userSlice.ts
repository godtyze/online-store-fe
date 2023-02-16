import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthResponse, UserState} from '../../types';
import {RootState} from '../index';

const initialState: UserState = {
  accessToken: '',
  user: null
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = '';
    }
  }
});


export const { setCredentials, logOut } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectToken = (state: RootState) => state.userReducer.accessToken;

