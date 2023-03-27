import {baseAPI} from './baseAPI';
import {API_ROUTES} from '@/config';
import {IType} from '@/models/type';

export const typeAPI = baseAPI.injectEndpoints({
  endpoints: builder => ({
    getAllTypes: builder.query<IType[], undefined>({
      query: () => ({
        url: API_ROUTES.type
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({id}) => ({type: 'Type' as const, id})),
          {type: 'Type', id: 'LIST'}
        ]
        : [{type: 'Type', id: 'LIST'}]
    }),
    createType: builder.mutation<IType, string>({
      query: (typeName) => ({
        url: API_ROUTES.type,
        method: 'POST',
        body: { name: typeName }
      }),
      invalidatesTags: [{type: 'Type', id: 'LIST'}]
    }),
    updateType: builder.mutation<object, Omit<IType, 'childBrands'>>({
      query: (type) => ({
        url: `${API_ROUTES.type}/${type.id}`,
        method: 'PUT',
        body: { name: type.name }
      }),
      invalidatesTags: [{type: 'Type', id: 'LIST'}]
    }),
    deleteType: builder.mutation<object, number>({
      query: (id) => ({
        url: `${API_ROUTES.type}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'Type', id: 'LIST'}]
    })
  })
});

export const {
  useGetAllTypesQuery,
  useCreateTypeMutation,
  useUpdateTypeMutation,
  useDeleteTypeMutation
} = typeAPI;