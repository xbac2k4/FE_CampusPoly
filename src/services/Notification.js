import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Alert } from 'react-native';

// nhận thông báo trong trạng thái background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Tin nhắn được xử lý trong nền!', remoteMessage);
  await onDisplayNotification(remoteMessage.notification);
});

export async function notificationListener() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    await onDisplayNotification(remoteMessage.notification);

    // console.log('A new FCM message arrived!', remoteMessage);

    // Alert.alert(
    //   remoteMessage.notification.title,
    //   remoteMessage.notification.body,
    // )
  });

  return unsubscribe;
}

// Tạo kênh thông báo
async function createChannel() {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  } catch (error) {
    console.error('Failed to create notification channel:', error);
  }
}

//hiển thị thông báo
async function onDisplayNotification(notification) {
  console.log('Attempting to display notification:', notification);

  try {
    await createChannel(); // Tạo kênh thông báo trước khi hiển thị thông báo

    await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        largeIcon: notification.android.imageUrl,
        smallIcon: 'ic_campus_poly',
        color: '#211d1e',
      },
    });
  } catch (error) {
    console.error('Failed to display notification:', error);
  }
}

// Đăng ký trình xử lý sự kiện nền
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background event:', type, detail);
  switch (type) {
    case EventType.DISMISSED:
      console.log('Notification dismissed:', detail.notification);
      break;
    case EventType.PRESS:
      console.log('Notification press:', detail.notification);
      break;
  }
});