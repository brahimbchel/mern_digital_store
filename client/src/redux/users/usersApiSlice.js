import { apiSlice } from "../apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/api/users',
        }),
        getUser: builder.query({
            query: (id) => `/api/users/${id}`,
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: '/api/users',
                method: 'POST',
                body: { ...user }
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/api/users/${id}`,
                method: 'PATCH',
                body: patch
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/users/${id}`,
                method: 'DELETE'
            }),
        }),
    }),
    overrideExisting: false,
})


export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice