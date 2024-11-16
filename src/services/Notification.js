import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

// nhận thông báo trong tr��ng thái background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Tin nhắn được xử lý trong nền!', remoteMessage);
  // await onDisplayNotification(remoteMessage.notification);
});

export async function notificationListener() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);

    // Alert.alert(
    //   remoteMessage.notification.title,
    //   remoteMessage.notification.body,
    // )
    onDisplayNotification(remoteMessage.notification);
  });

  return unsubscribe;
}

//hiển thị thông báo
async function onDisplayNotification(notification) {
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