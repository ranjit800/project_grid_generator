import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gridSize: { rows: 20, cols: 20 },
  elements: [], // placed elements
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    setGridSize: (state, action) => {
      state.gridSize = action.payload;
    },
    addElement: (state, action) => {
      state.elements.push(action.payload);
    },
    updateElement: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.elements.findIndex(el => el.id === id);
      if (index !== -1) {
        state.elements[index] = { ...state.elements[index], ...updates };
      }
    },
    removeElement: (state, action) => {
      state.elements = state.elements.filter(el => el.id !== action.payload);
    },
  },
});

export const { setGridSize, addElement, updateElement, removeElement } = gridSlice.actions;
export default gridSlice.reducer;
