import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileScreen from './src/workspaces/ProfileScreen/profileScreen';
import LoginScreen from './src/workspaces/LoginScreen';
import WelcomeScreen from './src/workspaces/WelcomeScreen';
import HomeScreen from './src/workspaces/Home/homeScreen';

const App = () => {
  return (
    <View style={styles.screen}>
      <ProfileScreen />
      <LoginScreen />
      <WelcomeScreen />
      <HomeScreen />
    </View>
  );
};

export default App
  
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
