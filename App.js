import React, { useEffect } from 'react';
import { ToastAndroid, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/workspaces/Notification/store';
import { UserProvider } from './src/services/provider/UseContext';
import { SocketProvider } from './src/services/provider/SocketContext';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { notificationListener } from './src/services/Notification';

const App = () => {

  // cho phép thông báo
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
          if (result === RESULTS.GRANTED) {
            ToastAndroid.show('Đã cho phép thông báo', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Không cho phép thông báo', ToastAndroid.SHORT);
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        ToastAndroid.show('Không cần yêu cầu quyền thông báo', ToastAndroid.SHORT);
      }
    };

    requestNotificationPermission();
    notificationListener(); // lắng nghe thông báo
  }, []);

  return (
    <Provider store={store}>
      <UserProvider>
        <SocketProvider>
          <AppNavigator />
        </SocketProvider>
      </UserProvider>
    </Provider>
  );
};

export default App;