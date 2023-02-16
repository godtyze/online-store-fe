import {baseAPI} from './baseAPI';
import {GetDevicesRequest, IDevice, UpdateDeviceRequest} from '../types/device';
import {API_ROUTES} from '../config';

export const deviceAPI = baseAPI.injectEndpoints({
  endpoints: builder => ({
    getAllDevices: builder.query<IDevice[], Partial<GetDevicesRequest>>({
      query: (params) => ({
        url: `${API_ROUTES.device}`,
        params: {
          ...params
        }
      }),
      providesTags: ['Device']
    }),
    getOneDevice: builder.query<IDevice, number>({
      query: (id) => ({
        url: `${API_ROUTES.device}/${id}`
      })
    }),
    createDevice: builder.mutation<IDevice, FormData>({
      query: (device) => ({
        url: `${API_ROUTES.device}`,
        method: 'POST',
        body: device
      })
    }),
    updateDevice: builder.mutation<object, UpdateDeviceRequest>({
      query: (updated) => ({
        url: `${API_ROUTES.device}/${updated.deviceId}`,
        method: 'PUT',
        body: updated
      })
    }),
    deleteDevice: builder.mutation<object, number>({
      query: (id) => ({
        url: `${API_ROUTES.device}/${id}`,
        method: 'DELETE'
      })
    }),
    createDeviceInfo: builder.mutation<IDevice, Omit<UpdateDeviceRequest, 'name' | 'price'>>({
      query: (device) => ({
        url: `${API_ROUTES.device}/${device.deviceId}`,
        method: 'POST',
        body: device
      })
    })
  })
});

export const {
  useGetAllDevicesQuery,
  useGetOneDeviceQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useCreateDeviceInfoMutation
} = deviceAPI;