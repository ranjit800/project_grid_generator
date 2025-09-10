import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'tile', // "json" | "tile" | "render"
  selectedElement: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
  },
});

export const { setActiveTab, setSelectedElement } = uiSlice.actions;
export default uiSlice.reducer;
