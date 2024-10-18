import { AppRegistry } from 'react-native';
import AlertScreen from './src/workspaces/alert/alertScreen';
import App from './App';
import LoginScreen from './src/workspaces/Login/LoginScreen'
import OTP_screen from './src/workspaces/SignUp/OTP_screen'
import SignUpScreen from './src/workspaces/SignUp/SignUpScreen'
import SignUpPasswordScreen from './src/workspaces/SignUp/SignUpPasswordScreen'
import SignUpNameScreen from './src/workspaces/SignUp/SignUpNameScreen'
import SignUpImageScreen from './src/workspaces/SignUp/SignUpImageScreen'
import EmailInputLoginScreen from './src/workspaces/Login/EmailInputLoginScreen'
import SearchScreen from './src/workspaces/SearchScreen/SearchScreen'
import commentScreen from './src/workspaces/Comment/commentScreen'
import homeScreen from './src/workspaces/Home/homeScreen'
import profileScreen from './src/workspaces/ProfileScreen/profileScreen'
import Welcome from './src/workspaces/Welcome/WelcomeScreen'
import 'react-native-gesture-handler';


import {name as appName} from './app.json';
import CommentScreen from './src/workspaces/Comment/commentScreen';

AppRegistry.registerComponent(appName, () => CommentScreen);
