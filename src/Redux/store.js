import { configureStore } from '@reduxjs/toolkit';
import { adminReducer, studentReducer } from './Reducers/StudentReducer';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    student: studentReducer,
  },
});

export default store;

export const server = `http://localhost:5100`;
