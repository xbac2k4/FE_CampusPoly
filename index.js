import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'; // Nhập khẩu Provider từ react-redux
import { store } from './src/workspaces/alert/store'; // Nhập khẩu Redux store từ file store của bạn
import AlertScreen from './src/workspaces/alert/alertScreen';
import { name as appName } from './app.json';

// Bọc AlertScreen bằng Provider
const Alert = () => (
  <Provider store={store}>
    <AlertScreen />
  </Provider>
);

// Đăng ký component
AppRegistry.registerComponent(appName, () => Alert);
