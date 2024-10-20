import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './NotificationData';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});
