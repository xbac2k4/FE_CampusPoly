import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';

let initialConnectionChecked = false; // Biến để kiểm tra trạng thái kết nối ban đầu
let wasConnected = false; // Biến để lưu trạng thái kết nối trước đó

const SnackbarCustom = (text, duration) => {
    Snackbar.show({
        text: text,
        duration: duration,
        action: {
            text: 'OK',
            textColor: 'white',
            onPress: () => { Snackbar.dismiss(); },
        },
    });
}

const registerNetworkListener = () => {
    NetInfo.addEventListener(state => { // Đăng ký một listener để theo dõi các thay đổi về trạng thái kết nối mạng
        if (!initialConnectionChecked) { // Kiểm tra xem trạng thái kết nối ban đầu đã được kiểm tra chưa
            wasConnected = state.isConnected; // Cập nhật trạng thái kết nối ban đầu
            initialConnectionChecked = true; // Đánh dấu trạng thái kết nối ban đầu đã được kiểm tra
            return;
        }

        if (!state.isConnected) { // Nếu không có kết nối mạng
            SnackbarCustom('Kiểm tra lại kết nối của bạn', Snackbar.LENGTH_INDEFINITE);
        } else if (wasConnected !== state.isConnected) { // Nếu trạng thái kết nối thay đổi từ mất kết nối sang có kết nối
            SnackbarCustom('Đã kết nối mạng', Snackbar.LENGTH_SHORT);
        }

        wasConnected = state.isConnected; // Cập nhật trạng thái kết nối hiện tại
    });
};

export default registerNetworkListener;