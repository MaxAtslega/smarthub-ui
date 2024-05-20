import {commonApi} from "@/store/common.api";
import User from "@/models/User";

export const usersApi = commonApi.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<User[], void>({
            query: () => ({
                url: '/users',
            }),
            providesTags: result => [{ type: 'User', id: 'List' }],
        }),
        createUser: builder.mutation<User, { user: Partial<User> }>({
            query: ({ user }) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: [{ type: 'User', id: 'List' }],
        }),
        updateUser: builder.mutation<User, { user: User }>({
            query: ({ user }) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: [{ type: 'User', id: 'List' }],
        }),
        deleteUser: builder.mutation<User, { user: User }>({
            query: ({ user }) => ({
                url: `/users/${user.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'User', id: 'List' }],
        }),
    }),
});



export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation } = usersApi;