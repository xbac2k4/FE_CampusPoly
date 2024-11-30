import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../services/provider/UseContext';
import CreatePostScreen from '../workspaces/CreatePost/CreatePostScreen';
import HomeScreen from '../workspaces/Home/homeScreen';
import MenuScreen from '../workspaces/Menu/MenuScreen';
import NotificationScreen from '../workspaces/Notification/NotificationScreen';
import SearchScreen from '../workspaces/SearchScreen/SearchScreen';
import Screens from './Screens';
import axios from 'axios';
import { GET_NOTIFICATIONS_BY_USERID } from '../services/ApiConfig';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { isRead, user, setIsRead } = useContext(UserContext);


  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const checkNotifications = async () => {
    const result = await axios.get(`${GET_NOTIFICATIONS_BY_USERID}?userId=${user._id}`);
    if (!result.data.success) {
      throw new Error('Lỗi khi lấy thông báo');
    }

    const hasUnread = result.data.notifications.some(notification => !notification.isRead);
    setIsRead(!hasUnread);
  };

  useEffect(() => {
    if (user) {
      checkNotifications();
    }
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          height: 60,
          backgroundColor: '#000',
          display: isKeyboardVisible ? 'none' : 'flex',
        },
      }}
    >
      <Tab.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/feed.png')
                  : require('../assets/images/feed2.png')
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Search}
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/search.png')
                  : require('../assets/images/search3.png')
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.CreatePost}
        component={CreatePostScreen} // Placeholder
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#F7B733', '#FC4A1A']}
                style={styles.gradientCircle}
              >
                <Image
                  source={require('../assets/images/add.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </LinearGradient>
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate(Screens.CreatePost)}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Alert}
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? (isRead
                    ? require('../assets/images/4781824_alarm_alert_attention_bell_clock_icon.png')
                    : require('../assets/images/dot_active_clock.png')
                  )
                  : (isRead
                    ? require('../assets/images/alert2.png')
                    : require('../assets/images/dot_alert2.png')
                  )
              }
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Menu}
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('../assets/images/Menu.png')
                  : require('../assets/images/Menu2.png')
              }
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCircle: {
    width: 50,
    height: 50,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
