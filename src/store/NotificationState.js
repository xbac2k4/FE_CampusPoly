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
const getArray = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting array:', e);
  }
};

export const addNotification = (message) => {
  console.log("message: ", message);

  getArray('notifications').then((notifications) => {
    if (notifications) {
      saveArray('notifications', [...notifications, message]);
    } else {
      saveArray('notifications', [message]);
    }
  });
  
}

// Sử dụng ví dụ
// const exampleArray = ['item1', 'item2', 'item3'];
// saveArray('myArrayKey', exampleArray);

// getArray('myArrayKey').then((array) => {
//   console.log(array);
// });