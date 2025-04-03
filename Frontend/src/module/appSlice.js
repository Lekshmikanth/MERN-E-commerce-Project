import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (filter) => filter ? `/products?category=${filter}` : '/products',
            providesTags: ['Product'],
        }),
        addProduct: builder.mutation({
            query: (formData) => ({
                url: '/products/add',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (formData) => ({
                url: `/products/edit/${formData?._id}`,
                method: 'PUT',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = appSlice;
