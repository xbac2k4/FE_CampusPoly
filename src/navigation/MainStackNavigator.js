
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import WelcomeScreen from '../workspaces/Welcome/WelcomeScreen';
import MenuAuthenticationScreen from '../workspaces/MenuAuth/MenuAuthenticationScreen';
import EmailInputLoginScreen from '../workspaces/Login/EmailInputLoginScreen';
import LoginScreen from '../workspaces/Login/LoginScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MenuAuthentication" component={MenuAuthenticationScreen} />
      <Stack.Screen name="EmailInputLogin" component={EmailInputLoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />


    </Stack.Navigator>
  )
}

export default MainStackNavigator