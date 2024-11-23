import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu mảng
const saveArray = async (key, array) => {
  try {
    const jsonValue = JSON.stringify(array);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving array:', e);
  }
};

// Lấy mảng
export const getArray = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting array:', e);
  }
};

// Thêm thông báo mới
export const addNotification = (message) => {
  console.log("message: ", message);

  getArray('notifications').then((notifications) => {
    if (notifications) {
      // Kiểm tra xem messageId đã tồn tại hay chưa
      const exists = notifications.some(notification => notification.messageId === message.messageId);
      if (!exists) {
        // Thêm thuộc tính isRead với giá trị mặc định là false
        const newMessage = { ...message, isRead: false };
        saveArray('notifications', [...notifications, newMessage]);
      } else {
        console.log('Thông báo đã tồn tại');
      }
    } else {
      // Thêm thuộc tính isRead với giá trị mặc định là false
      const newMessage = { ...message, isRead: false };
      saveArray('notifications', [newMessage], setNotifications);
    }
  });
};

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = () => {
  getArray('notifications').then((notifications) => {
    if (notifications) {
      const updatedNotifications = notifications.map(notification => {
        return { ...notification, isRead: true };
      });

      saveArray('notifications', updatedNotifications, setNotifications);
    }
  });
};