
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import WelcomeScreen from '../workspaces/Welcome/WelcomeScreen';
import MenuAuthenticationScreen from '../workspaces/MenuAuth/MenuAuthenticationScreen';
import BottomTabNavigator from './BottomTabNavigator';
import Screens from './Screens';
import CommentScreen from '../workspaces/Comment/CommentScreen';
import MessagesScreen from '../workspaces/Messages/MessagesScreen';
import EditProfileScreen from '../workspaces/EditProfile/EditProfileScreen';
import ChatScreen from '../workspaces/ChatScreen/ChatScreen';
import CreatePostScreen from '../workspaces/CreatePost/CreatePostScreen';
import { Profile } from '../workspaces/Home';
import FriendListScreen from '../workspaces/FriendListScreen/FriendListScreen';
import HelpCenterScreen from '../workspaces/SupportList/HelpCenterScreen';
import ReportIssueScreen from '../workspaces/SupportList/ReportIssueScreen';
import TermsAndPoliciesScreen from '../workspaces/SupportList/TermsAndPoliciesScreen';
import Introduce from '../workspaces/SupportList/navSupport/Introduce';
import Accountinformation from '../workspaces/SupportList/navSupport/Accountinformation';
import Loginproblem from '../workspaces/SupportList/navSupport/Loginproblem';
import Page from '../workspaces/SupportList/navSupport/Page';
import Security from '../workspaces/SupportList/navSupport/Security';
import Privacy from '../workspaces/SupportList/navSupport/Privacy';



const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.MenuAuth} component={MenuAuthenticationScreen} options={{ animation: 'ios' }} />
      <Stack.Screen name={Screens.BottomTab} component={BottomTabNavigator} options={{ animation: 'ios' }} />
      <Stack.Screen name={Screens.Comment} component={CommentScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name={Screens.Message} component={MessagesScreen} options={{ animation: 'ios' }} />
      <Stack.Screen name={Screens.EditProfile} component={EditProfileScreen} options={{ animation: 'ios' }} />
      <Stack.Screen name={Screens.ChatView} component={ChatScreen} options={{ animation: 'ios' }} />
      <Stack.Screen name={Screens.CreatePost} component={CreatePostScreen} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name={Screens.Profile} component={Profile} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name={Screens.FriendListScreen} component={FriendListScreen} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.HelpCenter} component={HelpCenterScreen} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.ReportIssue} component={ReportIssueScreen} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.TermsAndPolic} component={TermsAndPoliciesScreen} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.Introduce} component={Introduce} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.Accountinformation} component={Accountinformation} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.Loginproblem} component={Loginproblem} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.Page} component={Page} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.Security} component={Security} options={{ animation: 'ios' }} />
       <Stack.Screen name={Screens.Privacy} component={Privacy} options={{ animation: 'ios' }} />
    </Stack.Navigator>
  )
}

export default MainStackNavigator