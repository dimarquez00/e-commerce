import { createSlice } from '@reduxjs/toolkit';

// Define un slice de Redux que maneja el estado del carrito de compras
// El carrito se representa como un objeto: { [productId]: quantity }
const cartSlice = createSlice({
  name: 'cart', // Nombre del slice
  initialState: {
    // items es un objeto donde cada clave es el id del producto y el valor es la cantidad
    // Ejemplo: { "3": 2, "7": 1 } significa 2 unidades del producto 3 y 1 del 7
    items: {}
  },
  reducers: {

    // Agrega o incrementa la cantidad de un producto en el carrito
    // action.payload = { id: "3", quantity: 2 }
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      // Si el producto ya existe, suma la cantidad; si no, la asigna desde cero
      state.items[id] = (state.items[id] || 0) + quantity;
    },

    // Actualiza la cantidad exacta de un producto ya existente en el carrito
    // action.payload = { id: "3", quantity: 5 }
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },

    // Elimina un producto del carrito por su id
    // action.payload = "3"  (el id del producto a eliminar)
    removeFromCart: (state, action) => {
      // delete elimina la propiedad del objeto de estado
      delete state.items[action.payload];
    },

    // Vacía el carrito por completo (se usa al confirmar un pedido)
    clearCart: (state) => {
      state.items = {};
    },
  },
});

// Exporta las acciones para usarlas en los componentes con dispatch
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// Exporta el reducer para agregarlo al store global
export default cartSlice.reducer;
