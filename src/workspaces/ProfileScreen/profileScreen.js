import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  friends: 4056, 
  posts: [
    {
      id: 1,
      text: 'Exploring the canals of Venice!',
      likes: 8998,
      comments: 145,
      images: [
        require('../../assets/images/venice1.png'),
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

  return (
    <View style={styles.screen}>
      <ScrollView stickyHeaderIndices={[2]}>
        {/* Header and ProfileStats */}
        <Header user={user} />
        <ProfileStats friends={user.friends} />
        
        {/* ProfileTabs (Sticky) */}
        <ProfileTabs onTabSelect={setActiveTab} />

        {/* Conditionally render the posts based on activeTab */}
        {activeTab === 'Posts' && <ProfilePosts user={user} />}
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