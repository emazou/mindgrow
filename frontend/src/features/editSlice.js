import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: { idEdit: "", idDelete: "", stateProducts: false, idDeleteQuestion: "", idDeleteAnswer: "" },
  reducers: {
    setIdEdit: (state, action) => {
      state.idEdit = action.payload;
    },
    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
    },
    setStateProducts: (state) => {
      state.stateProducts = !state.stateProducts
    },
    setStatePublications: (state) => {
      state.statePublications = !state.statePublications
    },
    setIdDeleteQuestion: (state, action) => {
      state.idDeleteQuestion = action.payload;
    },
    setIdDeleteAnswer: (state, action) => {
      state.idDeleteAnswer = action.payload;
    }
  },
});

export const { setIdEdit, setIdDelete, setStateProducts, setIdDeleteQuestion, setIdDeleteAnswer, setStatePublications } = editSlice.actions

export default editSlice.reducer