import {commonApi} from "@/store/common.api";
import Constant from "@/models/Constant";

export const usersApi = commonApi.injectEndpoints({
    endpoints: builder => ({
        getConstantsByUserId: builder.query<Constant[], number>({
            query: (userId) => `/constants/${userId}`,
            providesTags: (result, error, userId) => [{ type: 'Constant', id: userId }],
        }),
        postConstant: builder.mutation<Constant, Partial<Constant>>({
            query: (newConstant) => ({
                url: '/constants',
                method: 'POST',
                body: newConstant,
            }),
            invalidatesTags: (result, error, { user_id }) => [{ type: 'Constant', id: user_id }],
        }),
        deleteConstantByUserIdAndName: builder.mutation<void, { userId: number; constantName: string }>({
            query: ({ userId, constantName }) => ({
                url: `/constants/${userId}/${constantName}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { userId }) => [{ type: 'Constant', id: userId }],
        }),
        putConstant: builder.mutation<void, { userId: number; constantName: string; newValue: string }>({
            query: ({ userId, constantName, newValue }) => ({
                url: `/constants/${userId}/${constantName}`,
                method: 'PUT',
                body: { value: newValue },
            }),
            invalidatesTags: (result, error, { userId }) => [{ type: 'Constant', id: userId }],
        }),
    }),
});



export const {  useGetConstantsByUserIdQuery,
    usePostConstantMutation,
    useDeleteConstantByUserIdAndNameMutation,
    usePutConstantMutation, } = usersApi;