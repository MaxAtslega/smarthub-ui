import {API_BASE_URL} from "@/constants/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${API_BASE_URL}`,
        prepareHeaders: headers => {
            headers.set('Content-Type', 'application/json;charset=UTF-8');
            return headers;
        },
    }),
    tagTypes: ['User', 'System', 'Constant'],
    endpoints: _ => ({}),
});