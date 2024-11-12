import { AppRegistry } from 'react-native';
import NotificationScreen from './src/workspaces/Notification/NotificationScreen';
import App from './App';
import SearchScreen from './src/workspaces/SearchScreen/SearchScreen'
import homeScreen from './src/workspaces/Home/homeScreen'
import profileScreen from './src/workspaces/ProfileScreen/profileScreen'
import Welcome from './src/workspaces/Welcome/WelcomeScreen'
import CommentScreen from './src/workspaces/Comment/CommentScreen';

import 'react-native-gesture-handler';


import { name as appName } from './app.json';
import FrProfileScreen from './src/workspaces/FrProfileScreen/FrProfileScreen';
import PostComponent from './src/components/Post/PostComponent';
import CreatePostScreen from './src/workspaces/CreatePost/CreatePostScreen';
import EditProfileScreen from './src/workspaces/EditProfile/EditProfileScreen';
import ChatScreen from './src/workspaces/ChatScreen/ChatScreen';

AppRegistry.registerComponent(appName, () => App);
