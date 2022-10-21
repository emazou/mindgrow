import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import apiurl from "../api";


export const questionsAnswersAPI = createApi({
    reducerPath: 'publicationsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiurl}`
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllQuestions: builder.mutation({
            query: (id) => ({
                url: `/questions?product=${id}`,
                method: "GET"
            })
        }),
        getAnswer: builder.mutation({
            query: (id) => ({
                url: `/answers/${id}`,
                method: "GET"
            })
        }),
        newQuestion: builder.mutation({
            query: (body) => ({
                url: `/questions/`,
                method: "POST",
                body: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        newAnswer: builder.mutation({
            query: (body) => ({
                url: `/answers/`,
                method: "POST",
                body: body,
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        deleteAnswer: builder.mutation({
            query: (id) => ({
                url: `/answers/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/questions/${id}`,
                method: "DELETE",
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }),
    })
})
export default questionsAnswersAPI
export const {useGetAnswerMutation, useNewQuestionMutation, useGetAllQuestionsMutation, useNewAnswerMutation, useDeleteAnswerMutation, useDeleteQuestionMutation} = questionsAnswersAPI
