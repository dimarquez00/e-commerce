import { createSlice } from '@reduxjs/toolkit';

// Define un slice de Redux que maneja el estado de las categorías de productos
// Las categorías se representan como un mapa: { [id]: name }
// Ejemplo: { "1": "Electrónica", "2": "Ropa" }
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    // categoriesMap es un objeto donde cada clave es el id de la categoría y el valor es su nombre
    categoriesMap: {}
  },
  reducers: {

    // Reemplaza el mapa completo (se usa al cargar la app por primera vez)
    // action.payload = { "1": "Electrónica", "2": "Ropa", ... }
    setCategories: (state, action) => {
      state.categoriesMap = action.payload;
    },

    // Agrega una nueva categoría al mapa (se usa desde el panel admin al crear)
    // action.payload = { id: 3, name: "Deportes" }
    addCategory: (state, action) => {
      const { id, name } = action.payload;
      state.categoriesMap[id] = name;
    },

    // Actualiza el nombre de una categoría existente (se usa desde el panel admin al editar)
    // action.payload = { id: 3, name: "Deportes y Fitness" }
    updateCategory: (state, action) => {
      const { id, name } = action.payload;
      state.categoriesMap[id] = name;
    },

    // Elimina una categoría del mapa por su id (se usa desde el panel admin al borrar)
    // action.payload = 3  (el id de la categoría a eliminar)
    removeCategory: (state, action) => {
      delete state.categoriesMap[action.payload];
    },
  },
});

export const { setCategories, addCategory, updateCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
