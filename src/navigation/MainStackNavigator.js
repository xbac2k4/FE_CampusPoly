
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import WelcomeScreen from '../workspaces/Welcome/WelcomeScreen';
import MenuAuthenticationScreen from '../workspaces/MenuAuth/MenuAuthenticationScreen';
import EmailInputLoginScreen from '../workspaces/Login/EmailInputLoginScreen';
import LoginScreen from '../workspaces/Login/LoginScreen';
import SignUpScreen from '../workspaces/SignUp/SignUpScreen';
import OTPScreen from '../workspaces/SignUp/OTP_screen';
import SignUpPasswordScreen from '../workspaces/SignUp/SignUpPasswordScreen';
import SignUpNameScreen from '../workspaces/SignUp/SignUpNameScreen';
import SignUpImageScreen from '../workspaces/SignUp/SignUpImageScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MenuAuthentication" component={MenuAuthenticationScreen} />
      <Stack.Screen name="EmailInputLogin" component={EmailInputLoginScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SignUpPassword" component={SignUpPasswordScreen} />
      <Stack.Screen name="SignUpName" component={SignUpNameScreen} />
      <Stack.Screen name="SignUpImage" component={SignUpImageScreen} />






    </Stack.Navigator>
  )
}

export default MainStackNavigator