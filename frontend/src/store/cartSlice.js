import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        items: {}
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId, quantity } = action.payload;

            state.items[productId] = (state.items[productId] || 0 ) + quantity;
        },

        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;

            state.items[productId] = quantity;
        },

        removeFromCart: (state, action) => {
            delete state.items[action.payload];
        },

        clearCart: (state) => {
            state.items = {};
        }
    }
});

export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;