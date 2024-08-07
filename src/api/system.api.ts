import {commonApi} from "@/store/common.api";
import User from "@/models/User";

export const usersApi = commonApi.injectEndpoints({
    endpoints: builder => ({
        shutdown: builder.mutation<void, void>({
            query: () => ({
                url: '/system/shutdown',
                method: 'POST',
            }),
        }),
        reboot: builder.mutation<void, void>({
            query: () => ({
                url: '/system/reboot',
                method: 'POST',
            }),
        }),
    }),
});



export const { useShutdownMutation, useRebootMutation } = usersApi;