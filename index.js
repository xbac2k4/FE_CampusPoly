/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/workspaces/LoginScreen'
import EmailInputLoginScreen from './src/workspaces/EmailInputLoginScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => LoginScreen);
