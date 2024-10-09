/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/workspaces/LoginScreen'
import WelcomeScreen from './src/workspaces/WelcomeScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => WelcomeScreen);
