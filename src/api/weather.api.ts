import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {OPEN_WEATHER_API_KEY} from "@/constants/constants";

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/' }),
    endpoints: (builder) => ({
        getWeatherByCoordinates: builder.query({
            keepUnusedDataFor: 43200, // 12 hours in seconds
            query: ({ lat, lon }) => `data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${OPEN_WEATHER_API_KEY}`,
        }),
        getWeatherByCity: builder.query({
            query: ({ city, state, country, limit = 5 }) =>
                `geo/1.0/direct?q=${city}${state ? `,${state}` : ''},${country}&limit=${limit}&appid=${OPEN_WEATHER_API_KEY}`,
        }),
    }),
});




export const { useGetWeatherByCoordinatesQuery, useGetWeatherByCityQuery  } = weatherApi;