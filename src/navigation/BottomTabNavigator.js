
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import HomeScreen from '../workspaces/Home/homeScreen';
import SearchScreen from '../workspaces/SearchScreen/SearchScreen';
import NotificationScreen from '../workspaces/alert/alertScreen';
import ProfileScreen from '../workspaces/ProfileScreen/profileScreen';
import LinearGradient from 'react-native-linear-gradient';
import Screens from './Screens';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              height: 60,
              backgroundColor: '#000000',
              display: isKeyboardVisible ? 'none' : 'flex', // Ẩn/Hiện tab bar dựa trên bàn phím
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
            name="AddPost"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ focused }) => (
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
                      ? require('../assets/images/4781824_alarm_alert_attention_bell_clock_icon.png')
                      : require('../assets/images/alert2.png')
                  }
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Tab.Screen
            name={Screens.Profile}
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('../assets/images/proffile.png')
                      : require('../assets/images/profile2.png')
                  }
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </Tab.Navigator>
  )
}

export default BottomTabNavigator

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