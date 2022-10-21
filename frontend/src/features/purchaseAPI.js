import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from "../api";
export const purchaseAPI = createApi({
    reducerPath: 'purchaseAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        NewPurchase: builder.mutation({
            query(purchase) {
                return {
                    url: "/purchases",
                    method: "POST",
                    body: purchase,
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                };
            },
        }),
    })
})
export default purchaseAPI
export const { useNewPurchaseMutation } = purchaseAPI