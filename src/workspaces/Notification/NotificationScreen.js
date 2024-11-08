import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { markAllAsRead } from './NotificationData'; // Import action từ notificationSlice



const NotificationScreen = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();


  const renderItem = ({ item }) => {
    let iconSource;

    // Sử dụng URL của ảnh
    switch (item.icon) {
      case 'like':
        iconSource = 'https://cdn-icons-png.flaticon.com/512/4926/4926585.png';
        break;
      case 'cake':
        iconSource = 'https://cdn-icons-png.flaticon.com/512/4549/4549811.png';
        break;
      case 'comment':
        iconSource = 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/512/comment-icon.png';
        break;
      default:
        iconSource = 'https://cdn-icons-png.flaticon.com/512/4926/4926585.png';
    }

    return (
      <View style={styles.notificationItem}>

        <View style={styles.iconContainer}>
          <Image
            source={{ uri: iconSource }}
            style={styles.icon}
          />
        </View>

        <View style={styles.notificationContent}>
          <Text style={styles.notificationText}>
            <Text style={styles.boldText}>{item.user}</Text> {item.action}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  };


  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity onPress={() => dispatch(markAllAsRead())}>
          <Text style={styles.markAllAsRead}>Đánh dấu tất cả là đã đọc</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
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
    marginTop:30
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
