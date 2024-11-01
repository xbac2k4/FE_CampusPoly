
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import WelcomeScreen from '../workspaces/Welcome/WelcomeScreen';
import MenuAuthenticationScreen from '../workspaces/MenuAuth/MenuAuthenticationScreen';
import OTPScreen from '../workspaces/SignUp/OTP_screen';
import BottomTabNavigator from './BottomTabNavigator';
import Screens from './Screens';
import CommentScreen from '../workspaces/Comment/CommentScreen';
import MessagesScreen from '../workspaces/Messages/MessagesScreen';
import EditProfileScreen from '../workspaces/EditProfile/EditProfileScreen';
import ChatScreen from '../workspaces/ChatScreen/ChatScreen';
import CreatePostScreen from '../workspaces/CreatePost/CreatePostScreen';



const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.MenuAuth} component={MenuAuthenticationScreen} />
      <Stack.Screen name={Screens.OTP} component={OTPScreen} />
      <Stack.Screen name={Screens.BottomTab} component={BottomTabNavigator} />
      <Stack.Screen name={Screens.Comment} component={CommentScreen} />
      <Stack.Screen name={Screens.Message} component={MessagesScreen} />
      <Stack.Screen name={Screens.EditProfile} component={EditProfileScreen} />
      <Stack.Screen name={Screens.ChatView} component={ChatScreen} />
      <Stack.Screen name={Screens.CreatePost} component={CreatePostScreen} />





    </Stack.Navigator>
  )
}

export default MainStackNavigator