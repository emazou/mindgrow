import { configureStore } from '@reduxjs/toolkit'
import usersAPI from './userAPI'
import loggedSlice from './loggedSlice'
import productsAPI from './productsAPI'
import publicationsAPI from './publicationsAPI'
import modalSlice from './modalSlice'
import cartSlice from './cartSlice'
import reloadSlice from './reLoadSlice'
import editSlice from './editSlice'
import questionsAnswersAPI from './questionsAnswersAPI'
export const store = configureStore({
    reducer: {
        [usersAPI.reducerPath]: usersAPI.reducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
        [questionsAnswersAPI.reducerPath]: questionsAnswersAPI.reducer,
        logged: loggedSlice,
        modal: modalSlice,
        cart: cartSlice,
        reload: reloadSlice,
        edit: editSlice,
        [publicationsAPI.reducerPath]: publicationsAPI.reducer,
    }
})