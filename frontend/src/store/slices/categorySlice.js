import { createSlice } from '@reduxjs/toolkit';

// Define un slice de Redux que maneja el estado de las categorías de productos
// Las categorías se representan como un mapa: { [id]: name }
// Ejemplo: { "1": "Electrónica", "2": "Ropa" }
const categorySlice = createSlice({
  name: 'category', // Nombre del slice
  initialState: {
    // categoriesMap es un objeto donde cada clave es el id de la categoría y el valor es su nombre
    categoriesMap: {}
  },
  reducers: {

    // Reemplaza el mapa de categorías completo con los datos recibidos del servidor
    // Se llama una sola vez al cargar la lista de productos
    // action.payload = { "1": "Electrónica", "2": "Ropa", ... }
    setCategories: (state, action) => {
      state.categoriesMap = action.payload;
    },
  },
});

// Exporta las acciones para usarlas en los componentes con dispatch
export const { setCategories } = categorySlice.actions;

// Exporta el reducer para agregarlo al store global
export default categorySlice.reducer;
