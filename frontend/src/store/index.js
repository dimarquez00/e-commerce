import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import categoryReducer from './slices/categorySlice';

// Crea el store global, agrupa todos los reducers (uno por dominio) en un solo objeto
export const store = configureStore({
  reducer: {
    cart: cartReducer,         // Gestiona el estado del carrito de compras
    category: categoryReducer, // Gestiona el estado de las categorías de productos
  },
});
