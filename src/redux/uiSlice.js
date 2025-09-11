// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   activeTab: "tile",
//   activeTool: "mouse",
//   selectedElement: null,
//   previewCell: null,
//   zoom: 1, // 👈 new state (1 = normal, 2 = double, 0.5 = half)
// };

// const uiSlice = createSlice({
//   name: "ui",
//   initialState,
//   reducers: {
//     setActiveTab: (state, action) => { state.activeTab = action.payload },
//     setActiveTool: (state, action) => { state.activeTool = action.payload },
    
//     setSelectedElement: (state, action) => { state.selectedElement = action.payload },
//     setPreviewCell: (state, action) => { state.previewCell = action.payload },
//     clearPreviewCell: (state) => { state.previewCell = null },
//     setZoom: (state, action) => { state.zoom = action.payload }, // 👈
//   },
// });

// export const { 
//   setActiveTab, setActiveTool, setSelectedElement, 
//   setPreviewCell, clearPreviewCell, setZoom 
// } = uiSlice.actions;
// export default uiSlice.reducer;


// src/redux/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "tile",      // json | tile | render
  activeTool: null,       // null means no tool active
  selectedElement: null,
  previewCell: null,
  zoom: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveTool: (state, action) => {
      state.activeTool = action.payload;
    },
    // toggle: if same tool clicked -> deactivate (null), else set new tool
    toggleTool: (state, action) => {
      const toolId = action.payload;
      state.activeTool = state.activeTool === toolId ? null : toolId;
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    setPreviewCell: (state, action) => {
      state.previewCell = action.payload;
    },
    clearPreviewCell: (state) => {
      state.previewCell = null;
    },
    setZoom: (state, action) => {
      state.zoom = action.payload;
    },
  },
});

export const {
  setActiveTab,
  setActiveTool,
  toggleTool,
  setSelectedElement,
  setPreviewCell,
  clearPreviewCell,
  setZoom,
} = uiSlice.actions;

export default uiSlice.reducer;
