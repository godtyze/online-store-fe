import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut} from '../store/slices/userSlice';
import {API_ROUTES, BASE_API_URL} from '../config';
import {RootState} from '../store';
import {AuthResponse} from '../types/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers: Headers, api) => {
    const token = (api.getState() as RootState).userReducer.accessToken;
    if (token) {
      headers.set('authorization', token);
    }

    return headers;
  }
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(`${API_ROUTES.user}/refresh`, api, extraOptions);
    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data as AuthResponse));
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result;
};

export const baseAPI = createApi({
  refetchOnFocus: true,
  tagTypes: ['Device', 'Type', 'Brand'],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
});