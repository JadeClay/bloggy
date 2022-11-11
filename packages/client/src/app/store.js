import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './reducers/userSlice';

export default configureStore({
    reducer: {
        user: userSlice,
    }
  })