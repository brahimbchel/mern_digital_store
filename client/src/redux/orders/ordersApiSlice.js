import { apiSlice } from "../apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => '/api/orders'
        }),
        getOrder: builder.query({
            query: (id) => `/api/orders/${id}`,
        }),
        addOrder: builder.mutation({
            query: (order) => ({
                url: '/api/orders',
                method: 'POST',
                body: { ...order }
            }),
        }),
        updateOrderToPaid: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/api/orders/${id}/pay`,
                method: 'PATCH',
                body: patch
            }),
        }),
        updateOrderToDelivered: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/api/orders/${id}/deliver`,
                method: 'PATCH',
                body: patch
            }),
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: 'DELETE'
            }),
        }),
    })
})


export const {
    useGetAllOrdersQuery,
    useGetOrderQuery,
    useAddOrderMutation,
    useUpdateOrderToPaidMutation,
    useUpdateOrderToDeliveredMutation,
    useDeleteOrderMutation,
} = ordersApiSlice