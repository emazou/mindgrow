import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modalEditProduct: false,
        modalDeleteProduct: false,
        modalDeleteQuestion:false,
        modalDeleteAnswer:false,
        modalEditPublication: false,
        modalDeletePublication: false
    },
    reducers: {
        setModalEditProduct: (state) => {
            state.modalEditProduct = !state.modalEditProduct
        },
        setModalDeleteProduct: (state) => {
            state.modalDeleteProduct = !state.modalDeleteProduct
        },
        setModalDeleteAnswer: (state) => {
            state.modalDeleteAnswer = !state.modalDeleteAnswer
        },
        setModalDeleteQuestion: (state) => {
            state.modalDeleteQuestion = !state.modalDeleteQuestion
        },
        setModalEditPublication: (state) => {
            state.modalEditPublication = !state.modalEditPublication
        },
        setModalDeletePublication: (state) => {
            state.modalDeletePublication = !state.modalDeletePublication
        },
    },

})

export const { setModalEditProduct, setModalDeleteProduct, setModalDeleteAnswer, setModalDeleteQuestion, setModalEditPublication, setModalDeletePublication } = modalSlice.actions

export default modalSlice.reducer