import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../services/provider/UseContext';
import styles from '../../assets/style/FriendList';
import FriendListComponent from '../../components/FriendListComponent/FriendListConponent';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Color';
import { REMOVE_FRIEND, UPDATE_FRIEND } from '../../services/ApiConfig';
import { SocketContext } from '../../services/provider/SocketContext';
import { TYPE_ADD_FRIEND } from '../../services/TypeNotify';
import NotificationModal from '../../components/Notification/NotificationModal';

const FriendListScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [friendList, setFriendList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('accepted');
  const { sendNotifySocket } = useContext(SocketContext);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal
  const [id, setId] = useState();

  const fetchFriendList = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/v1/users/get-user-by-id/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const friends = data?.data?.friends || [];
      setFriendList(friends);
      // console.log("Danh sách bạn", friends);

    } catch (error) {
      console.error('Error fetching friend list:', error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchFriendList();
    }
  }, [user?._id]);

  const filteredFriends = friendList.filter((friend) =>
    selectedTab === 'accepted'
      ? friend?.status_id?.status_name === 'Chấp nhận'
      : friend?.status_id?.status_name === 'Chờ phản hồi'
  );

  const onConfirm = async (id) => {
    // console.log(id);
    await updateFriend(id);
  }
  const onDeleteFriend = (id) => {
    // console.log(id);
    setId(id);
    setModalVisible(true);
  }

  const updateFriend = async (currentUserId) => {
    const response = await fetch(`${UPDATE_FRIEND}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user._id,
        user_friend_id: currentUserId,
      }),
    });
    if (response.ok) {
      await sendNotifySocket(user.full_name, user._id, 'đã chấp nhận kết bạn', currentUserId, TYPE_ADD_FRIEND);
      // console.log(response.data);
      fetchFriendList();
    }
  }

  const deleteFriend = async () => {
    const response = await fetch(`${REMOVE_FRIEND}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user._id,
        user_friend_id: id,
      }),
    });
    if (response.ok) {
      // await sendNotifySocket(user.full_name, user._id, 'đã chấp nhận kết bạn', id, TYPE_ADD_FRIEND);
      // console.log(response.data);
      fetchFriendList();
    }
  }

  const handleConfirm = async () => {
    await deleteFriend();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false); // Hide modal
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Nút quay lại */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Image
            source={require('../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <View style={styles.barHeader}>
          <Text style={styles.textHeader}>Danh sách bạn bè</Text>
          <View style={{ height: 2, backgroundColor: '#fff' }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setSelectedTab('accepted')}
            style={[
              styles.tab,
              // selectedTab === 'accepted' && styles.activeTab,
            ]}
          >
            <LinearGradient
              colors={selectedTab === 'accepted' ? [Colors.first, Colors.second] : [Colors.background, Colors.background]}
              style={{ ...styles.tab, width: 170 }}
            >
              <Text style={selectedTab === 'accepted' ? styles.activeTabText : styles.tabText}>
                Bạn bè
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('pending')}
            style={[
              styles.tab,
              // selectedTab === 'pending' && styles.activeTab,
            ]}
          >
            <LinearGradient
              colors={selectedTab === 'pending' ? [Colors.first, Colors.second] : [Colors.background, Colors.background]}
              style={{ ...styles.tab, width: 170 }}
            >
              <Text style={selectedTab === 'pending' ? styles.activeTabText : styles.tabText}>
                Lời mời kết bạn
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Danh sách bạn bè */}
        <View>
          <Text style={styles.textHeader}>
            {selectedTab === 'accepted' ? ' Danh sách bạn bè' : ' Danh sách lời mời'}
          </Text>
          {filteredFriends.map((friend, index) => {
            // const friendData = friend.user_id.find((u) => u._id !== user._id);
            const friendData = friend.user_id.find((u, index) => u._id !== user._id);
            // console.log(friendData);
            const isDifferentId = friend.user_id[0]?._id !== user._id;
            // const send_id = friendData.
            const statusDisplay = friend?.status_id?.status_name === 'Chấp nhận' ? 'Bạn bè' : friend?.status_id?.status_name;

            return (
              <FriendListComponent
                key={index}
                avatar={friendData?.avatar}
                full_name={friendData?.full_name}
                send_id={isDifferentId}
                status={statusDisplay} // Hiển thị trạng thái "Bạn bè"
                onDeleteFriend={() => {
                  onDeleteFriend(friendData._id)
                }}
                onConfirm={() => {
                  onConfirm(friendData._id)
                }}
              />
            );
          })}
        </View>
      </ScrollView>
      <NotificationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Bạn có chắc chắn hủy bạn bè? (Lựa chọn không thể hoàn tác)"
      />
    </View>
  );
};

export default FriendListScreen;
