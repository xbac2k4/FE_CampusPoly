import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

const Header = ({ user }) => (
  <View style={styles.headerContainer}>
    {/* Đặt StatusBar ẩn hoặc tùy chỉnh */}
    <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
    
    {/* Hiển thị ảnh bìa */}
    <Image source={user.backgroundImage} style={styles.backgroundImage} />
    
    {/* Hiển thị ảnh đại diện */}
    <Image source={user.profileImage} style={styles.profileImage} />
    
    <Text style={styles.name}>{user.name}</Text>
    <Text style={styles.location}>{user.location}</Text>
    <Text style={styles.bio}>{user.bio}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 0, 
  },
  backgroundImage: {
    position: 'absolute', // Đặt ảnh bìa ở vị trí tuyệt đố
    top: 0,
    left: 0,
    width: '100%',
    height: 160, 
    opacity: 0.9, 
    zIndex: -1,
  },
  profileImage: {
    width: 140, 
    height: 140, 
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 80,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  location: {
    fontSize: 16,
    color: '#727477',
    textAlign: 'center', 
  },
  bio: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    color: '#ECEBED',
  },
});

export default Header;
