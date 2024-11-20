import { AppRegistry } from 'react-native';
import App from './App';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import registerNetworkListener from './src/utils/Network';

registerNetworkListener(); // kiểm tra mạng

AppRegistry.registerComponent(appName, () => App);
