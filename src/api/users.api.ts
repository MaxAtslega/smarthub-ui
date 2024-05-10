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
        }),
        updateUser: builder.mutation<User, { user: User }>({
            query: ({ user }) => ({
                url: `/users`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<User, { user: User }>({
            query: ({ user }) => ({
                url: `/example/${user.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});



export const { useGetUsersQuery, useCreateUserMutation } = usersApi;