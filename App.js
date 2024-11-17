import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import { notificationListener } from './src/services/Notification';
import { SocketProvider } from './src/services/provider/SocketContext';
import { UserProvider } from './src/services/provider/UseContext';
import { store } from './src/workspaces/Notification/store';

const App = () => {

  // cho phép thông báo
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
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