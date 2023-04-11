import {baseAPI} from './baseAPI';
import {DeviceToBasketRequest, AuthRequest, AuthResponse} from '@/models/user';
import {API_ROUTES} from '@/config';
import {GetDevicesResponse} from '@/models/device';

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
    refresh: builder.query<AuthResponse, void>({
      query: () => ({
        url: `${API_ROUTES.user}/refresh`
      })
    }),
    getBasketDevices: builder.query<GetDevicesResponse, number>({
      query: (userId) => ({
        url: `${API_ROUTES.user}/${userId}/basket`
      }),
      providesTags: (result) => result
        ? [
          ...result.rows.map(({id}) => ({type: 'BasketDevice' as const, id})),
          {type: 'BasketDevice', id: 'LIST'}
        ]
        : [{type: 'BasketDevice', id: 'LIST'}]
    }),
    addDeviceToBasket: builder.mutation<AuthResponse, DeviceToBasketRequest>({
      query: (req) => ({
        url: `${API_ROUTES.user}/${req.userId}/basket`,
        method: 'POST',
        body: { deviceId: req.deviceId },
        invalidatesTags: [{type: 'BasketDevice', id: 'LIST'}]
      })
    }),
    deleteDeviceFromBasket: builder.mutation<AuthResponse, DeviceToBasketRequest>({
      query: (req) => ({
        url: `${API_ROUTES.user}/${req.userId}/basket`,
        method: 'DELETE',
        body: { deviceId: req.deviceId },
        invalidatesTags: [{type: 'BasketDevice', id: 'LIST'}]
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useLazyRefreshQuery,
  useGetBasketDevicesQuery,
  useAddDeviceToBasketMutation,
  useDeleteDeviceFromBasketMutation
} = userAPI;