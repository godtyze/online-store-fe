import {baseAPI} from './baseAPI';
import {API_ROUTES} from '../config';
import {IBrand} from '../models/brand';
import {CRUDResponse} from '../models/user';

export const brandAPI = baseAPI.injectEndpoints({
  endpoints: builder => ({
    getAllBrands: builder.query<IBrand[], undefined>({
      query: () => ({
        url: API_ROUTES.brand
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({id}) => ({type: 'Brand' as const, id})),
          {type: 'Brand', id: 'LIST'}
        ]
        : [{type: 'Brand', id: 'LIST'}]
    }),
    createBrand: builder.mutation<IBrand, string>({
      query: (brandName) => ({
        url: API_ROUTES.brand,
        method: 'POST',
        body: { name: brandName }
      }),
      invalidatesTags: [{type: 'Brand', id: 'LIST'}]
    }),
    deleteBrand: builder.mutation<CRUDResponse, string>({
      query: (brandName) => ({
        url: API_ROUTES.brand,
        method: 'DELETE',
        body: { name: brandName }
      }),
      invalidatesTags: [{type: 'Brand', id: 'LIST'}]
    })
  })
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation
} = brandAPI;