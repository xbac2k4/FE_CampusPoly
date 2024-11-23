import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';
import registerNetworkListener from './src/utils/Network';

registerNetworkListener();


AppRegistry.registerComponent(appName, () => App);
