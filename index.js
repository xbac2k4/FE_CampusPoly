/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/workspaces/LoginScreen'
import SignUpScreen from './src/workspaces/SignUpScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SignUpScreen);
