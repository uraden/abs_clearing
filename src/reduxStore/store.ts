// create store for Redux toolkit 
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './features/globalDateSlice';
export const store = configureStore({
  reducer: {
    globalDate: globalReducer.global,
    globalProfile: globalReducer.profile,
  },
});
