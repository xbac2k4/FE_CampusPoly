
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
import BottomTabNavigator from './BottomTabNavigator';
import Screens from './Screens';
import CommentScreen from '../workspaces/Comment/CommentScreen';
import MessagesScreen from '../workspaces/messages/messagesScreen';



const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.MenuAuth} component={MenuAuthenticationScreen} />
      <Stack.Screen name={Screens.EmailInputLogin} component={EmailInputLoginScreen} />
      <Stack.Screen name={Screens.Login} component={LoginScreen} />
      <Stack.Screen name={Screens.SignUp} component={SignUpScreen} />
      <Stack.Screen name={Screens.OTP} component={OTPScreen} />
      <Stack.Screen name={Screens.SignUpPassword} component={SignUpPasswordScreen} />
      <Stack.Screen name={Screens.SignUpName} component={SignUpNameScreen} />
      <Stack.Screen name={Screens.SignUpImage} component={SignUpImageScreen} />
      <Stack.Screen name={Screens.BottomTab} component={BottomTabNavigator} />
      <Stack.Screen name={Screens.Comment} component={CommentScreen} />
      <Stack.Screen name={Screens.Message} component={MessagesScreen} />


    </Stack.Navigator>
  )
}

export default MainStackNavigator