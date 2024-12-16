import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';


// nhận thông báo trong trạng thái background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Tin nhắn được xử lý trong nền!', remoteMessage);
  await onDisplayNotification(remoteMessage);
});

export async function notificationListener() {


  const unsubscribe = messaging().onMessage(async remoteMessage => {
    // const data = remoteMessage.data;

    // // Kiểm tra loại thông báo
    // if (data.type === 'friend_request') {
    //   await onDisplayFriendRequestNotification(data);
    //   return;
    // }
    await onDisplayNotification(remoteMessage);

    console.log('A new FCM message arrived!', remoteMessage);

  });


  return unsubscribe;
}

// Tạo kênh thông báo
export async function createChannel() {
  try {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default'
    });
    console.log('Channel created successfully');

  } catch (error) {
    console.error('Failed to create notification channel:', error);
  }
}

//hiển thị thông báo
async function onDisplayNotification(remoteMessage) {

  try {
    // await createChannel();

    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        // largeIcon: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.smallIcon,
        timestamp: remoteMessage.sentTime || new Date().getTime(), // Sử dụng sentTime hoặc thời gian hiện tại
        showTimestamp: true, // Hiển thị thời gian trong thông báo
      },
    });
  } catch (error) {
    console.error('Failed to display notification:', error);
  }
}
// Hiển thị thông báo lời mời kết bạn
// async function onDisplayFriendRequestNotification(data) {
//   try {
//     await notifee.createChannel({
//       id: 'friend_request',
//       name: 'Friend Requests',
//       importance: AndroidImportance.HIGH,
//       sound: 'default'
//     });

//     await notifee.displayNotification({
//       title: 'Lời mời kết bạn',
//       body: `Bạn nhận được lời mời kết bạn từ ${data.senderId}`,
//       android: {
//         channelId: 'friend_request',
//         importance: AndroidImportance.HIGH,
//         actions: [
//           {
//             title: 'Chấp nhận',
//             pressAction: { id: 'accept', launchActivity: 'default' },
//           },
//           {
//             title: 'Hủy',
//             pressAction: { id: 'decline', launchActivity: 'default' },
//           },
//         ],
//       },
//     });
//   } catch (error) {
//     console.error('Failed to display notification:', error);
//   }
// }

// Lắng nghe sự kiện khi nhấn nút
// notifee.onForegroundEvent(async ({ type, detail }) => {
//   if (type === EventType.ACTION_PRESS) {
//     if (detail.pressAction.id === 'accept') {
//       console.log('Accepted friend request!');
//       // Gửi API chấp nhận
//     } else if (detail.pressAction.id === 'decline') {
//       console.log('Declined friend request!');
//       // Gửi API hủy
//     }
//   }
// });
async function onBackgroundEvent({ type, detail }) {
  switch (type) {
    case EventType.DISMISSED:
      console.log('Bạn đã xóa thông báo');
      break;
    case EventType.PRESS:
      console.log('Bạn đã nhấn vào thông báo');
      break;
  }
}

// Đăng ký sự kiện nền
notifee.onBackgroundEvent(onBackgroundEvent);

// Đăng ký sự kiện foreground
notifee.onForegroundEvent(onBackgroundEvent);