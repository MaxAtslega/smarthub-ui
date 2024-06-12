import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Station, Country, Tag } from '@/models/Radio';

interface StationsByNameArgs {
    name: string;
}

interface TopStationsByClicksArgs {
    country: string;
    tag: string;
    limit: number;
}

export const radioApi = createApi({
    reducerPath: 'radioApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://all.api.radio-browser.info' }),
    endpoints: (builder) => ({
        getCountries: builder.query<Country[], void>({
            query: () => '/json/countries',
        }),
        getTags: builder.query<Tag[], void>({
            query: () => '/json/tags',
        }),
        getStationsByCountry: builder.query<Station[], string>({
            query: (country) => `/json/stations/bycountry/${country}?limit=20`,
        }),
        getStationsByTag: builder.query<Station[], string>({
            query: (tag) => `/json/stations/bytag/${tag}?limit=20`,
        }),
        getStationsByName: builder.query<Station[], StationsByNameArgs>({
            query: ({  name }) => ({
                url: `/json/stations/search`,
                params: { name, limit: 20 },
            }),
        }),
        getTopStationsByClicks: builder.query<Station[], TopStationsByClicksArgs>({
            query: ({ country, tag, limit }) => ({
                url: `/json/stations/topclick`,
                params: { country, tag, limit, offset: 0 },
            }),
        }),
    }),
});

export const {
    useGetCountriesQuery,
    useGetTagsQuery,
    useGetStationsByCountryQuery,
    useGetStationsByTagQuery,
    useGetStationsByNameQuery,
    useGetTopStationsByClicksQuery,
} = radioApi;
