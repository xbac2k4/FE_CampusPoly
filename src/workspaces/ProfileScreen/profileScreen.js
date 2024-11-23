import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import Header from '../../components/ProfileScreen/header';
import ProfileStats from '../../components/ProfileScreen/profileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import FrProfileStats from '../../components/FrProfileScreen/frProfileStats';
import { UserContext } from '../../services/provider/UseContext';
import { GET_USER_ID, GET_POST_BY_USERID, ADD_FRIEND, UPDATE_FRIEND } from '../../services/ApiConfig';
import { useFocusEffect } from '@react-navigation/native';
import LoadingTimeline from '../../components/Loading/LoadingTimeline ';

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const { user } = useContext(UserContext);
  const [id, setID] = useState();
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [buttonState, setButtonState] = useState('Add Friend');

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

  const handleButtonPress = async () => {
    try {
      if (buttonState === 'Add Friend') {
        const response = await fetch(`${ADD_FRIEND}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: user._id,
            user_friend_id: userProfile._id,
          }),
        });
        if (response.ok) {
          setButtonState('Request Sent');
        }
      } else if (buttonState === 'Awaiting Approval') {
        const response = await fetch(`${UPDATE_FRIEND}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userProfile._id,
            user_friend_id: user._id,
          }),
        });
        if (response.ok) {
          setButtonState('Friend');
        }
      }
    } catch (error) {
      console.error('Error handling friend request:', error);
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
          <Header data={userProfile} navigation={navigation} />

          {route.params?.id && route.params.id !== user._id ? (
            <FrProfileStats data={userProfile} currentUserId={user._id} />
          ) : (
            <ProfileStats data={userProfile} />
          )}

          <ProfileTabs onTabSelect={setActiveTab} />

          {activeTab === 'Posts' && (
            postsLoading ? (
              <LoadingTimeline quantity={3} />
            ) : (
              posts.length > 0 ? (
                <ProfilePosts data={posts} navigation={navigation} />
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
