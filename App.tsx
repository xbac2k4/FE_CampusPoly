
import { View, StyleSheet, Image, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/workspaces/alert/store';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { Home, Search, Profile, Comment, Alert } from './src/workspaces/Home/index';

const Tab = createBottomTabNavigator();

const App = () => {
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
    <Provider store={store}>
      <NavigationContainer>
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
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/feed.png')
                      : require('./src/assets/images/feed2.png')
                  }
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/search.png')
                      : require('./src/assets/images/search3.png')
                  }
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Tab.Screen
            name="AddPost"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.iconContainer}>
                  <LinearGradient
                    colors={['#F7B733', '#FC4A1A']}
                    style={styles.gradientCircle}
                  >
                    <Image
                      source={require('./src/assets/images/add.png')}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Alert"
            component={Alert}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/4781824_alarm_alert_attention_bell_clock_icon.png')
                      : require('./src/assets/images/alert2.png')
                  }
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require('./src/assets/images/proffile.png')
                      : require('./src/assets/images/profile2.png')
                  }
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>

  );
};

export default App;

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
