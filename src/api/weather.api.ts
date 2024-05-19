import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {OPEN_WEATHER_API_KEY} from "@/constants/constants";

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/3.0/' }),
    endpoints: (builder) => ({
        getWeatherByCoordinates: builder.query({
            keepUnusedDataFor: 43200, // 12 hours in seconds
            query: ({ lat, lon }) => `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${OPEN_WEATHER_API_KEY}`,
        }),
    }),
});




export const { useGetWeatherByCoordinatesQuery  } = weatherApi;