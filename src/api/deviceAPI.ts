import {baseAPI} from './baseAPI';
import {GetDevicesRequest, IDevice, UpdateDeviceRequest} from '../types/device';
import {API_ROUTES} from '../config';
import {CRUDResponse} from '../types/auth';

export const deviceAPI = baseAPI.injectEndpoints({
  endpoints: builder => ({
    getAllDevices: builder.query<IDevice[], Partial<GetDevicesRequest>>({
      query: (params) => ({
        url: `${API_ROUTES.device}`,
        params: {
          ...params
        }
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({id}) => ({type: 'Device' as const, id})),
          {type: 'Device', id: 'LIST'}
          ]
        : [{type: 'Device', id: 'LIST'}]
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
      }),
      invalidatesTags: [{type: 'Device', id: 'LIST'}]
    }),
    updateDevice: builder.mutation<CRUDResponse, UpdateDeviceRequest>({
      query: (updated) => ({
        url: `${API_ROUTES.device}/${updated.deviceId}`,
        method: 'PUT',
        body: updated
      }),
      invalidatesTags: [{type: 'Device', id: 'LIST'}]
    }),
    deleteDevice: builder.mutation<CRUDResponse, number>({
      query: (id) => ({
        url: `${API_ROUTES.device}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'Device', id: 'LIST'}]
    }),
    createDeviceInfo: builder.mutation<CRUDResponse, Omit<UpdateDeviceRequest, 'name' | 'price'>>({
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