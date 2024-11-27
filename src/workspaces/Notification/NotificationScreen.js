import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Color';
import { GET_NOTIFICATIONS_BY_USERID, GET_POST_ID, READ_ALL_NOTIFICATION, READ_NOTIFICATION } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';
import { useFocusEffect } from '@react-navigation/native';
import { Screen } from 'react-native-screens';
import Screens from '../../navigation/Screens';
import { TYPE_ADD_FRIEND, TYPE_COMMENT_POST, TYPE_CREATE_POST, TYPE_LIKE_POST } from '../../services/TypeNotify';
import NotificationModal from '../../components/Notification/NotificationModal';
import { SocketContext } from '../../services/provider/SocketContext';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal
  const { socket } = useContext(SocketContext);

  const fetchNotifications = async () => {
    try {
      if (!user || !user._id) {
        throw new Error('Không tìm thấy userID');
      }
      const result = await axios.get(`${GET_NOTIFICATIONS_BY_USERID}?userId=${user._id}`);
      if (!result.data.success) {
        throw new Error('Lỗi khi lấy thông báo');
      }

      setNotifications(result.data.notifications);
    } catch (e) {
      console.error('Error fetching notifications:', e);
    }
  };

  const handleConfirm = async () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false); // Hide modal
  };

  useEffect(() => {
    setLoading(true);
    fetchNotifications();
    setLoading(false);
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
    }, [user._id])
  );

  useFocusEffect(
    useCallback(() => {
      // fetchNotifications();
      if (socket) {
        socket.on('load_notification', () => {
          // console.log('12345555');
          fetchNotifications();
        })
      }
      return () => {
        socket.off('load_notification');
      };
    }, [socket, user._id])
  );

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    try {
      const result = axios.put(`${READ_ALL_NOTIFICATION}`, {
        userId: user._id
      });

      console.log(result);

    } catch (error) {
      console.log(error);

    }
    setLoading(false);
  };
  const fetchPostById = async (postId) => {
    try {
      const response = await fetch(`${GET_POST_ID}${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // nếu API yêu cầu JSON
        }
      });
      if (!response.ok) {
        console.error(`Error: ${response.status}`);
        return false;
      }

      const data = await response.json();
      // console.log(data);
      return Boolean(data.data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };
  const openModal = async (result) => {
    const isPostAvailable = await fetchPostById(result);
    // console.log(isPostAvailable);
    if (isPostAvailable) {
      navigation.navigate(Screens.Comment, { postId: result })
    } else {
      setModalVisible(true)
    }
  }

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
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });


    return (
      <TouchableOpacity
        onPress={() => {
          try {
            axios.put(`${READ_NOTIFICATION}`, {
              notificationId: item._id
            })
              .then((result) => {
                if (result?.data?.data?.type === TYPE_ADD_FRIEND) {
                  navigation.navigate(Screens.Profile, { id: result?.data?.data?.sender_id });
                } if (result?.data?.data?.type === TYPE_LIKE_POST) {
                  openModal(result?.data?.data?.post_id);
                } if (result?.data?.data?.type === TYPE_COMMENT_POST) {
                  openModal(result?.data?.data?.post_id);
                } if (result?.data?.data?.type === TYPE_CREATE_POST) {
                  openModal(result?.data?.data?.post_id);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log(error);
          }
        }}
        style={[styles.notificationItem, { backgroundColor: item.isRead ? Colors.background : '#3A3A3C' }]}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.icon}
          borderRadius={20}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.boldText}>{item.title}</Text>
          <Text style={styles.notificationText}>{item.body}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo</Text>
        <TouchableOpacity onPress={handleMarkAllAsRead}>
          <Text style={styles.markAllAsRead}>Đánh dấu tất cả là đã đọc</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications.reverse()}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={{ height: 60, backgroundColor: 'red' }} />
      <NotificationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Bài viết không tồn tại!"
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
    color: Colors.second,
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
