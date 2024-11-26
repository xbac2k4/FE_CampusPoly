import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../services/provider/UseContext';
import styles from '../../assets/style/FriendList';
import FriendListComponent from '../../components/FriendListComponent/FriendListConponent';

const FriendListScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [friendList, setFriendList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('accepted');

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
      console.log("Danh sách bạn", friends);
      
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
              selectedTab === 'accepted' && styles.activeTab,
            ]}
          >
            <Text style={selectedTab === 'accepted' ? styles.activeTabText : styles.tabText}>
              Đã chấp nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('pending')}
            style={[
              styles.tab,
              selectedTab === 'pending' && styles.activeTab,
            ]}
          >
            <Text style={selectedTab === 'pending' ? styles.activeTabText : styles.tabText}>
              Đang chờ phản hồi
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách bạn bè */}
        <View>
          <Text style={[styles.textHeader, { marginTop: 10 }]}>
            {selectedTab === 'accepted' ? ' Danh sách bạn đã chấp nhận' : ' Danh sách bạn đang chờ phản hồi'}
          </Text>
          {filteredFriends.map((friend, index) => {
            const friendData = friend.user_id.find((u) => u._id !== user._id);
            const statusDisplay = friend?.status_id?.status_name === 'Chấp nhận' ? 'Bạn bè' : friend?.status_id?.status_name;
            
            return (
              <FriendListComponent
                key={index}
                avatar={friendData?.avatar}
                full_name={friendData?.full_name}
                status={statusDisplay} // Hiển thị trạng thái "Bạn bè"
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendListScreen;
