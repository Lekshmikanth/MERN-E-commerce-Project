import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Product', 'Cart'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout',
                method: 'GET',
            }),
        }),
        addToCart: builder.mutation({
            query: (cartData) => ({
                url: '/cart/add',
                method: 'POST',
                body: cartData,
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteFromCart: builder.mutation({
            query: ({userId, productId}) => ({
                url: `/cart/delete`,
                method: 'DELETE',
                body: { userId, productId }
            }),
            invalidatesTags: ['Cart'],
        }),
        getCart: builder.query({
            query: (userId) => `/cart/${userId}`,
            providesTags: ['Cart'],
        }),
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
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useAddToCartMutation,
    useDeleteFromCartMutation,
    useGetCartQuery,
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = appSlice;
