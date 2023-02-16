import {baseAPI} from './baseAPI';
import {AuthRequest, AuthResponse} from '../types';
import {API_ROUTES} from '../config';

export const userAPI = baseAPI.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (user) => ({
        url: `${API_ROUTES.user}/register`,
        method: 'POST',
        body: user
      })
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (user) => ({
        url: `${API_ROUTES.user}/login`,
        method: 'POST',
        body: user
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${API_ROUTES.user}/logout`,
        method: 'POST'
      })
    }),
    refresh: builder.query({
      query: () => ({
        url: `${API_ROUTES.user}/refresh`,
        method: 'get'
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyRefreshQuery
} = userAPI;