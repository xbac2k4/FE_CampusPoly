import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './alertData';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});
