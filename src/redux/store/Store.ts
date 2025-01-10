import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/CurrentUserSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;

