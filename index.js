/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/workspaces/LoginScreen'
import OTP_screen from './src/workspaces/OTP_screen'
import SignUpScreen from './src/workspaces/SignUpScreen'
import SignUpPasswordScreen from './src/workspaces/SignUpPasswordScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SignUpPasswordScreen);
