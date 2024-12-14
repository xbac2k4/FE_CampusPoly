import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';
import registerNetworkListener from './src/utils/Network';

registerNetworkListener();

const RootComponent = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootComponent);
