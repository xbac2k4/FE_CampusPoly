/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/workspaces/LoginScreen'
import OTP_screen from './src/workspaces/OTP_screen'
import SignUpScreen from './src/workspaces/SignUpScreen'
import SignUpPasswordScreen from './src/workspaces/SignUpPasswordScreen'
import SignUpNameScreen from './src/workspaces/SignUpNameScreen'
import SignUpImageScreen from './src/workspaces/SignUpImageScreen'
import EmailInputLoginScreen from './src/workspaces/EmailInputLoginScreen'
import SearchScreen from './src/workspaces/SearchScreen/SearchScreen'
import commentScreen from './src/workspaces/Comment/commentScreen'
import homeScreen from './src/workspaces/Home/homeScreen'
import profileScreen from './src/workspaces/ProfileScreen/profileScreen'
import 'react-native-gesture-handler';


import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
