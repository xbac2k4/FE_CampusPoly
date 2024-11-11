import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/ProfileScreen/header';
import ProfileStats from '../../components/ProfileScreen/profileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { UserContext } from '../../services/provider/UseContext';
import { GET_USER_ID } from '../../services/ApiConfig';
import { useFocusEffect } from '@react-navigation/native';
// Sample data
// const user = {
//   name: 'Alex Tsimikas',
//   location: 'Brooklyn, NY',
//   bio: 'Writer by Profession. Artist by Passion!',
//   profileImage: require('../../assets/images/avt.png'),
//   backgroundImage: require('../../assets/images/background.png'),
//   birthday: new Date('2024-10-14T04:15:12.857+00:00'),
//   friends: 4056,
//   sex: 'female',
//   posts: [
//     {
//       id: 1,
//       text: 'Exploring the canals of Venice!',
//       likes: 8998,
//       comments: 145,
//       images: [
//         require('../../assets/images/car2.jpg'),
//         require('../../assets/images/venice2.png'),
//         require('../../assets/images/venice3.png'),
//       ],
//       time: '1h ago',
//     },
//     {
//       id: 2,
//       text: 'Looking forward to my trip!',
//       likes: 215,
//       comments: 8,
//       images: [
//         require('../../assets/images/background.png'),
//       ],
//       time: '1d ago',
//     },
//     {
//       id: 3,
//       text: 'Going on vacation! Catch you all in 10 days. No call!!!!!!',
//       likes: 261,
//       comments: 12,
//       time: '3d ago'
//     },
//   ],
// };

const ProfileScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const { user } = useContext(UserContext);
  const [id, setID] = useState();
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);

  // Gọi hàm async để set ID
  const initializeID = async () => {
    await setID(user._id);
  };
  const fetchUserData = async () => {
    try {
      // console.log(`${GET_USER_ID}${id}`);
      const response = await fetch(`${GET_USER_ID}${id}`);
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
        await initializeID();
        fetchUserData(); // Gọi lại API khi màn hình được truy cập lại
      }
      handleUserData();
    }, [id])
  );
  useEffect(() => {
    // Nếu có updatedUser trong params, cập nhật userProfile
    if (route.params?.updatedUser) {
      setUserProfile(route.params.updatedUser);
      setLoading(false); // Tắt loading khi có dữ liệu mới
      return;
    }

    if (id) {
      fetchUserData();
    }
  }, [id, route.params?.updatedUser]); // Chạy lại khi id hoặc updatedUser thay đổi

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