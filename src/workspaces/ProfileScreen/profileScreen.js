import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/ProfileScreen/header';
import ProfileStats from '../../components/ProfileScreen/profileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
// Sample data
const user = {
  name: 'Alex Tsimikas',
  location: 'Brooklyn, NY',
  bio: 'Writer by Profession. Artist by Passion!',
  profileImage: require('../../assets/images/avt.png'),
  backgroundImage: require('../../assets/images/background.png'),
  birthday: new Date('2024-10-14T04:15:12.857+00:00'),
  friends: 4056,
  sex: 'female',
  posts: [
    {
      id: 1,
      text: 'Exploring the canals of Venice!',
      likes: 8998,
      comments: 145,
      images: [
        require('../../assets/images/car2.jpg'),
        require('../../assets/images/venice2.png'),
        require('../../assets/images/venice3.png'),
      ],
      time: '1h ago',
    },
    {
      id: 2,
      text: 'Looking forward to my trip!',
      likes: 215,
      comments: 8,
      images: [
        require('../../assets/images/background.png'),
      ],
      time: '1d ago',
    },
    {
      id: 3,
      text: 'Going on vacation! Catch you all in 10 days. No call!!!!!!',
      likes: 261,
      comments: 12,
      time: '3d ago'
    },
  ],
};

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [id, setID] = useState('670ca3898cfc1be4b41b183b');
  const [user1, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(`${process.env.GET_USER_ID}${id}`);

        const response = await fetch(`${process.env.GET_USER_ID}${id}`)
        const data = await response.json();
        console.log('user:',data.data);
        setUser(data.data); // Lưu người dùng vào state (giả sử data.data)
        // setLoading(false); // Tắt loading
        // console.log(user1);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        // setError(error); // Lưu lỗi vào state
        // setLoading(false); // Tắt loading
      } finally {
        setLoading(false); // Tắt loading
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.screen}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView stickyHeaderIndices={[2]}>
          {/* Header and ProfileStats */}
          <Header data={user1} />
          <ProfileStats data={user1} />
          {/* ProfileTabs (Sticky) */}
          <ProfileTabs onTabSelect={setActiveTab} />

          {/* Conditionally render the posts based on activeTab */}
          {activeTab === 'Posts' && <ProfilePosts data={user} />}
        </ScrollView>)}
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