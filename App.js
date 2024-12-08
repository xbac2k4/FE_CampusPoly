import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { createChannel, notificationListener } from './src/services/Notification';
import { SocketProvider } from './src/services/provider/SocketContext';
import { ThemeProvider } from './src/services/provider/ThemeContext';
import { UserProvider } from './src/services/provider/UseContext';

const App = () => {

  // cho phép thông báo
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestNotificationPermission();
    createChannel();
    notificationListener(); // lắng nghe thông báo
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <SocketProvider>
          <AppNavigator />
        </SocketProvider>
      </UserProvider>
    </ThemeProvider>

  );
};

export default App;