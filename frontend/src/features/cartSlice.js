import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
let products
if (localStorage.getItem('cart')) {
    products = JSON.parse(localStorage.getItem('cart'))
} else {
    products = []
}
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        productsCart: products,
        billDetail: {}
    },
    reducers: {
        addProduct: (state, action) => {
            let product = state.productsCart.find(item => item.id === action.payload.id)
            if (product) {
                product.quantity++
            } else {
                state.productsCart = [...state.productsCart, action.payload]
            }
        },
        deleteProduct: (state, action) => {
            state.productsCart = state.productsCart.filter((product) => product.id !== action.payload)
            toast.success(`Product deleted`, {
                style: {
                    borderRadius: ".5rem",
                    background: "#3f3d56",
                    color: "aliceblue",
                },
            });
        },
        increment: (state, action) => {
            let product = state.productsCart.find(item => item.id === action.payload)
            if (product && product.quantity < product.stock) {
                product.quantity++
            } else {
                toast(`${product.quantity} products available`, {
                    icon: "😓",
                    style: {
                        borderRadius: ".5rem",
                        background: "#3f3d56",
                        color: "aliceblue",
                    },
                });
            }
        },
        decrement: (state, action) => {
            let product = state.productsCart.find(item => item.id === action.payload)
            if (product && product.quantity > 1) {
                product.quantity--
            }
        },
        setBill: (state, action) => {
            state.billDetail = action.payload
        },
        clear: (state) => {
            state.productsCart = [];
        }
    }
})

export const { addProduct, deleteProduct, decrement, increment, setBill, clear } = cartSlice.actions
export default cartSlice.reducer