import { apiSlice } from "../apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/api/products'
        }),
        getProduct: builder.query({
            query: (id) => `/api/products/${id}`,
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/api/products',
                method: 'POST',
                body: { ...product }
            }),
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/api/products/${id}`,
                method: 'PATCH',
                body: patch
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: 'DELETE'
            }),
        }),
    })
})


export const {
    useGetAllProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice