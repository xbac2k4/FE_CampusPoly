import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FrProfileStats from '../../components/FrProfileScreen/frProfileStats';
import LoadingTimeline from '../../components/Loading/LoadingTimeline';
import { ProfileLoading } from '../../components/Loading/ProfileLoading';
import Header from '../../components/ProfileScreen/header';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import ProfileStats from '../../components/ProfileScreen/profileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import { GET_POST_BY_USERID, GET_USER_ID } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Bài viết');
  const { user } = useContext(UserContext);
  const [id, setID] = useState();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const initializeID = () => {
    if (user?._id) {
      setID(user._id);
    }
  };

  const fetchUserData = async (userID) => {
    setLoading(true);
    try {
      const response = await fetch(`${GET_USER_ID}${userID}`);
      const data = await response.json();
      setUserProfile(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (userID) => {
    setPostsLoading(true);
    try {
      const response = await fetch(`${GET_POST_BY_USERID}?user_id=${userID}`);
      const responseData = await response.json();
      setPosts(responseData.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setPostsLoading(false);
      console.log(posts);
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
        <ProfileLoading />
      ) : (
        <ScrollView stickyHeaderIndices={[2]}>
          <Header data={userProfile} navigation={navigation} />

          {route.params?.id && route.params.id !== user._id ? (
            <FrProfileStats data={userProfile} currentUserId={user._id} />
          ) : (
            <ProfileStats data={userProfile} />
          )}

          <ProfileTabs onTabSelect={setActiveTab} />

          {activeTab === 'Bài viết' && (
            postsLoading ? (
              <LoadingTimeline quantity={3} />
            ) : (
              posts.length > 0 ? (
                <ProfilePosts data={posts} navigation={navigation} />
              ) : (
                <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 20 }}>
                  Không có bài viết nào
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
