// create store for Redux toolkit 
import { configureStore } from '@reduxjs/toolkit';
import globalDateReducer from './features/globalDateSlice';
export const store = configureStore({
  reducer: {
    globalDate: globalDateReducer,
  },
});
