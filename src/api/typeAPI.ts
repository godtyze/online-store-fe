import {baseAPI} from './baseAPI';
import {API_ROUTES} from '../config';
import {IType} from '../models/type';

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
    deleteType: builder.mutation<object, string>({
      query: (typeName) => ({
        url: API_ROUTES.type,
        method: 'DELETE',
        body: { name: typeName }
      }),
      invalidatesTags: [{type: 'Type', id: 'LIST'}]
    })
  })
});

export const {
  useGetAllTypesQuery,
  useCreateTypeMutation,
  useDeleteTypeMutation
} = typeAPI;