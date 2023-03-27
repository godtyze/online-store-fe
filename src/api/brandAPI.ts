import {baseAPI} from './baseAPI';
import {API_ROUTES} from '@/config';
import {IBrand} from '@/models/brand';
import {CRUDResponse} from '@/models/user';

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
    createBrand: builder.mutation<IBrand, Omit<IBrand, 'id'>>({
      query: (brand) => ({
        url: API_ROUTES.brand,
        method: 'POST',
        body: { name: brand.name, typeId: brand.typeId }
      }),
      invalidatesTags: [{type: 'Brand', id: 'LIST'}]
    }),
    updateBrand: builder.mutation<CRUDResponse, IBrand>({
      query: (brand) => ({
        url: `${API_ROUTES.brand}/${brand.id}`,
        method: 'PUT',
        body: { typeId: brand.typeId }
      }),
      invalidatesTags: [{type: 'Brand', id: 'LIST'}]
    }),
    deleteBrand: builder.mutation<CRUDResponse, number>({
      query: (id) => ({
        url: `${API_ROUTES.brand}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'Brand', id: 'LIST'}]
    })
  })
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation
} = brandAPI;