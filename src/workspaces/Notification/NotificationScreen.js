import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Color';
import { getArray, markAllAsRead } from '../../store/NotificationState';

const NotificationScreen = () => {
  const [notification, setNotification] = useState([])

  useEffect(() => {
    getArray('notifications').then((notifications) => {
      setNotification(notifications);
    });
  }, []);


  const renderItem = ({ item }) => {

    const sentTime = new Date(item.sentTime);
    const currentTime = new Date();

    const isSameDay = sentTime.toDateString() === currentTime.toDateString();

    const time = isSameDay
      ? sentTime.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      })
      : sentTime.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });


    return (
      <TouchableOpacity 
      style={[styles.notificationItem, { backgroundColor: item.isRead ? Colors.background : '#3A3A3C' }
      ]}>

        <Image
          source={{ uri: item.notification.android.imageUrl }}
          style={styles.icon}
          borderRadius={20}
        />

        <View style={styles.notificationContent}>
          <Text style={styles.boldText}>{item.notification.title}</Text>
          <Text style={styles.notificationText}>
            {item.notification.body}
          </Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markAllAsRead}>Đánh dấu tất cả là đã đọc</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notification}
        renderItem={renderItem}
        keyExtractor={(item) => item.messageId}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 30
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  markAllAsRead: {
    color: '#007AFF',
    fontSize: 16,
  },

  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: '5%',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    color: '#fff',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  timeText: {
    color: '#A1A1A1', // Màu xám nhạt cho thời gian
    fontSize: 12,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#3A3A3C',
    width: '100%',
  },
});

export default NotificationScreen;
