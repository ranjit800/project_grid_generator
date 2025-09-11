import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridSize: { rows: 5, cols: 5 },
  elements: [],
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    placeElement: (state, action) => {
      const { position, element } = action.payload;
      const existing = state.elements.find(
        (el) =>
          el.position[0] === position[0] &&
          el.position[1] === position[1]
      );

      if (existing) {
        existing.items.push(element);
      } else {
        state.elements.push({ position, items: [element] });
      }
    },

    // ✅ update gridSize from JSON editor
    setGridSize: (state, action) => {
      state.gridSize = action.payload; // { rows, cols }
    },

    // ✅ update elements from JSON editor
    setElements: (state, action) => {
      state.elements = action.payload; // array of elements
    },
  },
});

export const { placeElement, setGridSize, setElements } = gridSlice.actions;
export default gridSlice.reducer;
