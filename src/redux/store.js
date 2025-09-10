import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './gridSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    ui: uiReducer,
  },
});
