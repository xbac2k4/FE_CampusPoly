/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import MenuAuthenticationScreen from './src/workspaces/MenuAuthenticationScreen'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MenuAuthenticationScreen);
