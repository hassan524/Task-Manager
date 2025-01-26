import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/CurrentUserSlice'; 

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    user: userReducer, // Your user reducer
  },
});

export default store;