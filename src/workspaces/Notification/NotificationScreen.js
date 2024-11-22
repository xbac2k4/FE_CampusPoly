import React from 'react';
import { FlatList, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NotificationScreen = () => {
  const notifications = [
    {
      collapseKey: "com.fe_campuspoly",
      data: {},
      from: "248843730555",
      messageId: "0:1732289383695370%fe7eaefefe7eaefe",
      notification: {
        android: {
          color: "#211d1e",
          imageUrl: "https://play-lh.googleusercontent.com/DsyWoouXk7psjF7DCG6MJj_rX9RR9-liQskZXoKvcqQIu_ybUm4F5RntxWh1IZAVSLI",
          smallIcon: "ic_campus_poly",
          sound: "default"
        },
        body: "Học tiếng anh đi! 😡",
        title: "Chào mừng bạn đến với CampusPoly"
      },
      originalPriority: 2,
      priority: 2,
      sentTime: 1732289383684,
      ttl: 2419200
    }
  ]


  const renderItem = ({ item }) => {

    // console.log("item: ", item.notification.android.imageUrl);
    
    return (
      <View style={styles.notificationItem}>

        <View style={styles.iconContainer}>
          <Image
            source={{ uri: item.notification.android.imageUrl }}
            style={styles.icon}
          />
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            <Text style={styles.boldText}>{item.notification.title}</Text> {item.notification.body}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity>
          <Text style={styles.markAllAsRead}>Đánh dấu tất cả là đã đọc</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
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
    backgroundColor: '#121212',
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
    color: '#F50057',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: '#A1A1A1',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 20,
    height: 20,
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
