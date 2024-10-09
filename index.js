/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import LoginScreen from './src/workspaces/LoginScreen'
import OTP_screen from './src/workspaces/OTP_screen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => OTP_screen);
