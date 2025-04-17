import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Product', 'Cart', 'User', 'Category', 'Order'],
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
        getAllUsers: builder.query({
            query: () => '/users/all',
            providesTags: ['User'],
        }),
        makeUserAdmin: builder.mutation({
            query: ({ id, value }) => ({
                url: `/users/make-admin/${id}`,
                method: 'PUT',
                body: { isAdmin: value }
            }),
            invalidatesTags: ['User'],
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
            query: ({ userId, productId }) => ({
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
            query: ({ filterKey, filterValue }) => filterKey ? `/products?${filterKey}=${filterValue}` : '/products',
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
            query: ({ id, formData }) => ({
                url: `/products/edit/${id}`,
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
        getCategories: builder.query({
            query: () => '/categories',
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation({
            query: (formData) => ({
                url: '/categories/add',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        getOrders: builder.query({
            query: (userId) => `/orders/${userId}`,
            providesTags: ['Order']
        }),
        placeOrderFromCart: builder.mutation({
            query: (userId) => ({
                url: `/orders/from-cart/${userId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Cart', 'Order']
        }),

    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetAllUsersQuery,
    useMakeUserAdminMutation,
    useAddToCartMutation,
    useDeleteFromCartMutation,
    useGetCartQuery,
    useGetProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetOrdersQuery,
    usePlaceOrderFromCartMutation
} = appSlice;
