import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const baseApi = createApi({
reducerPath: 'api',
baseQuery: fetchBaseQuery({
baseUrl: "https://b5-assignment-3-xi.vercel.app/api",
}),
tagTypes: ['Book', 'Borrow'],
endpoints: () => ({}),
});