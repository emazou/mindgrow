import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api_url from "../api";


export const publicationsAPI = createApi({
    reducerPath: 'publicationsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${api_url}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllPublications: builder.query({
            query: (obj) => `/publications?category=${obj.category}`
        }),
        getOnePublication: builder.query({
            query: (id) => `/publications/${id}`
        }),
        getNewPublication: builder.mutation({
            query(publication) {
                return {
                    url: "/publications",
                    method: "POST",
                    body: publication,
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                };
            },
        }),
        deletePublication: builder.mutation({
            query(id) {
                return {
                    url: "/publications/" + id,
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                };
            },
        }),
        editPublication: builder.mutation({
            query: (body) => ({
                url: `/publications/${body._id}`,
                method: 'PATCH',
                body: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        getPublication: builder.mutation({
            query: (id) => ({
                url: `/publications/${id}`,
                method: 'GET'
            })
        }),
    })
})
export default publicationsAPI
export const { useGetAllPublicationsQuery, useGetOnePublicationQuery, useGetNewPublicationMutation, useDeletePublicationMutation, useEditPublicationMutation, useGetPublicationMutation } = publicationsAPI
