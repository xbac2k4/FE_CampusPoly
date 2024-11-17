import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Alert } from 'react-native';

// nhận thông báo trong trạng thái background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Tin nhắn được xử lý trong nền!', remoteMessage);
  await onDisplayNotification(remoteMessage);
});

export async function notificationListener() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    await onDisplayNotification(remoteMessage);

    console.log('A new FCM message arrived!', remoteMessage);

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
      id: 'default1',
      name: 'Default Channel1',
      importance: AndroidImportance.HIGH,
      sound:'notification'
    });
  } catch (error) {
    console.error('Failed to create notification channel:', error);
  }
}

//hiển thị thông báo
async function onDisplayNotification(remoteMessage) {

  try {
    await createChannel(); // Tạo kênh thông báo trước khi hiển thị thông báo

    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default1',
        importance: AndroidImportance.HIGH,
        largeIcon: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.smallIcon,
        timestamp: remoteMessage.sentTime || new Date().getTime(), // Sử dụng sentTime hoặc thời gian hiện tại
        showTimestamp: true, // Hiển thị thời gian trong thông báo
      },
    });
  } catch (error) {
    console.error('Failed to display notification:', error);
  }
}

async function onBackgroundEvent({ type, detail }) {
  switch (type) {
    case EventType.DISMISSED:
      console.log('Notification dismissed:', detail.notification);
      break;
    case EventType.PRESS:
      console.log('Notification press:', detail.notification);
      break;
  }
}

// Đăng ký sự kiện nền
notifee.onBackgroundEvent(onBackgroundEvent);

// Đăng ký sự kiện foreground
notifee.onForegroundEvent(onBackgroundEvent);