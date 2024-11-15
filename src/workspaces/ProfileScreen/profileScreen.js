import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/ProfileScreen/header';
import ProfileStats from '../../components/ProfileScreen/profileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import FrProfileStats from '../../components/FrProfileScreen/frProfileStats';
import { UserContext } from '../../services/provider/UseContext';
import { GET_USER_ID } from '../../services/ApiConfig';
import { GET_POST_BY_USERID } from '../../services/ApiConfig';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const { user } = useContext(UserContext);
  const [id, setID] = useState();  // State để lưu ID của người dùng
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();  // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true);  // State để kiểm tra việc tải dữ liệu
  const [refresh, setRefresh] = useState(false);  // State để theo dõi việc làm mới dữ liệu

  // Gọi hàm async để set ID
  const initializeID = () => {
    if (user?._id) {
      setID(user._id);  // Chỉ setID nếu user._id có giá trị hợp lệ
    }
  };

  // Hàm để lấy dữ liệu người dùng từ API
  const fetchUserData = async (userID) => {
    setLoading(true);  // Bắt đầu tải dữ liệu
    try {
      const response = await fetch(`${GET_USER_ID}${userID}`);
      const data = await response.json();
      setUserProfile(data.data);  // Lưu dữ liệu vào state
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);  // Dừng loading khi đã có dữ liệu
    }
  };

  const fetchUserPosts = async (userID) => {
    setPostsLoading(true);
    try {
      const response = await fetch(`${GET_POST_BY_USERID}?user_id=${userID}`);
      const responseData = await response.json();
      // const sortedData = responseData.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(responseData.data);
      // console.log('Response Data (Posts):', responseData.data);

    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setPostsLoading(false);
    }
  };

  // Cập nhật ID khi user._id thay đổi
  useEffect(() => {
    initializeID();  // Chạy khi user._id thay đổi
  }, [user._id]);

  // Cập nhật lại dữ liệu người dùng khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      setRefresh(true);  // Đánh dấu cần làm mới dữ liệu
      navigation.setParams({ refresh: false });  // Reset lại trạng thái refresh
    }, [navigation])
  );

  // Gọi lại API nếu id thay đổi hoặc refresh được set
  useEffect(() => {
    const userID = route.params?.id || user._id;
    if (userID && refresh) {
      fetchUserData(userID);
      fetchUserPosts(userID);
      setRefresh(false);
    }
  }, [id, refresh, route.params?.id, user._id]);

  return (
    <View style={styles.screen}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView stickyHeaderIndices={[2]}>
          <Header data={userProfile} />

          {route.params?.id && route.params.id !== user._id ? (
            <FrProfileStats data={userProfile} />
          ) : (
            <ProfileStats data={userProfile} />
          )}

          <ProfileTabs onTabSelect={setActiveTab} />

          {activeTab === 'Posts' && (
            postsLoading ? (
              <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
            ) : (
              posts.length > 0 ? (
                <ProfilePosts data={posts} />
              ) : (
                <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 20 }}>
                  No posts to display.
                </Text>
              )
            )
          )}
        </ScrollView>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
});

export default ProfileScreen;
