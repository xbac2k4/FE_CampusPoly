import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/ProfileScreen/header';
import ProfileStats from '../../components/ProfileScreen/profileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { UserContext } from '../../services/provider/UseContext';
import { GET_USER_ID } from '../../services/ApiConfig';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const { user } = useContext(UserContext);
  const [id, setID] = useState();
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // console.log(route.params?.id);

  // Gọi hàm async để set ID
  const initializeID = () => {
    if (user?._id) {
      setID(user._id);  // Chỉ setID nếu user._id có giá trị hợp lệ
    }
  };
  const fetchUserData = async (userID) => {
    try {
      // console.log(`${GET_USER_ID}${id}`);
      const response = await fetch(`${GET_USER_ID}${userID}`);
      const data = await response.json();
      setUserProfile(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Tắt loading
    }
  };

  useEffect(() => {
    initializeID();
  }, [user._id]); // Chạy useEffect này khi user._id thay đổi

  useFocusEffect(
    useCallback(() => {
      const handleUserData = async () => {
        // initializeID();
        const handleUserData = async () => {
          initializeID();  // Đảm bảo ID được gán
        };
        handleUserData();
        setRefresh(true);
        // fetchUserData(id); // Gọi lại API khi màn hình được truy cập lại
        navigation.setParams({ refresh: false }); // Đặt lại refresh để tránh gọi lại không cần thiết
      }
      handleUserData();
    }, [id, route.params?.refresh])
  );
  useEffect(() => {
    // Nếu có updatedUser trong params, cập nhật userProfile
    // if (route.params?.updatedUser) {
    //   setUserProfile(route.params.updatedUser);
    //   setLoading(false); // Tắt loading khi có dữ liệu mới
    //   return;
    // }
    if (id) {
      fetchUserData(id);
      setRefresh(false);
    }
  }, [id, refresh]); // Chạy lại khi id hoặc updatedUser thay đổi

  return (
    <View style={styles.screen}>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
      ) : ( */}
      <ScrollView stickyHeaderIndices={[2]}>
        {/* Header and ProfileStats */}
        <Header data={userProfile} />
        <ProfileStats data={userProfile} />
        {/* ProfileTabs (Sticky) */}
        <ProfileTabs onTabSelect={setActiveTab} />

        {/* Conditionally render the posts based on activeTab */}
        {/* {activeTab === 'Posts' && <ProfilePosts data={user} />} */}
      </ScrollView>
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