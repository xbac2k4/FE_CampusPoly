import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import ProfileScreen from './src/workspaces/ProfileScreen/profileScreen';
import CommentScreen from './src/workspaces/Comment/commentScreen';
import HomeScreen from './src/workspaces/Home/homeScreen';
import {Home,Search, Profile} from './src/workspaces/Home/index';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
            backgroundColor: '#000000',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./src/assets/images/feed.png') // Icon khi đang ở Home
                    : require('./src/assets/images/feed2.png') // Icon khi không ở Home
                }
                style={{width: 24, height: 24}}
                resizeMode="contain"
              />
            ),
          })}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./src/assets/images/search.png') // Icon khi đang ở Home
                    : require('./src/assets/images/search3.png') // Icon khi không ở Home
                }
                style={{width: 24, height: 24}}
                resizeMode="contain"
              />
            ),
          })}
        />
         <Tab.Screen
          name="AddPost"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={['#F7B733', '#FC4A1A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientCircle}
                >
                  <Image
                    source={focused ? require('./src/assets/images/add.png') : require('./src/assets/images/add.png')}
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
          component={Home}
          options={({ route }) => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require('./src/assets/images/4781824_alarm_alert_attention_bell_clock_icon.png') // Icon khi đang ở Home
                    : require('./src/assets/images/alert2.png') // Icon khi không ở Home
                }
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            ),
          })}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('./src/assets/images/proffile.png') // Icon khi đang ở Home
                    : require('./src/assets/images/profile2.png') // Icon khi không ở Home
                }
                style={{width: 24, height: 24}}
                resizeMode="contain"
              />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCircle: {
    width: 50, // Kích thước vòng tròn
    height: 50,
    borderRadius: 32, // Bán kính vòng tròn
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24, // Kích thước ảnh bên trong
    height: 24,
  },
});
