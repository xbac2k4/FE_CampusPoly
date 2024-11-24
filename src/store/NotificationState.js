import firestore from '@react-native-firebase/firestore';

// Thêm thông báo mới
export const addNotification = async (message) => {
  try {
    const notificationsSnapshot = await firestore().collection('notifications').get();
    const notifications = notificationsSnapshot.docs.map(doc => doc.data());

    // Kiểm tra xem messageId đã tồn tại hay chưa
    const exists = notifications.some(notification => notification.messageId === message.messageId);
    if (!exists) {
      let newMessage = { ...message, isRead: false };
      if (message.data.userIds !== undefined) {

        const userIdsArray = JSON.parse(message.data.userIds);
        const newData = { ...message.data, userIds: userIdsArray };

        // Thêm thuộc tính isRead với giá trị mặc định là false
        newMessage = { ...message, isRead: false, data: newData };
      }
      // Lưu thông báo vào Firestore
      await firestore().collection('notifications').add(newMessage);
    } else {
      console.log('Notification already exists, not adding.');
    }
  } catch (e) {
    console.error('Error adding notification:', e);
  }
};

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async () => {
  try {
    const notificationsSnapshot = await firestore().collection('notifications').get();
    const batch = firestore().batch();

    notificationsSnapshot.forEach(doc => {
      batch.update(doc.ref, { isRead: true });
    });

    await batch.commit();
  } catch (e) {
    console.error('Error marking all as read:', e);
  }
};