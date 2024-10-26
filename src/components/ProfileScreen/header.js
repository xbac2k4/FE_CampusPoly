import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ user }) => (
  <View style={styles.headerContainer}>
    {/* Đặt StatusBar ẩn hoặc tùy chỉnh */}
    <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
    
    {/* Hiển thị ảnh bìa */}
    <Image source={user.backgroundImage} style={styles.backgroundImage} />
    
    {/* Hiển thị ảnh đại diện */}
    <Image source={user.profileImage} style={styles.profileImage} />
    
    {/* Hiển thị tên và biểu tượng email */}
    <View style={styles.nameContainer}>
      <Text style={styles.name}>{user.name}</Text>
      
      {/* Clickable email icon */}
      <TouchableOpacity style={styles.circleIcon} onPress={() => { /* handle icon press */ }}>
        <Icon name="mail-outline" size={15} color="#fff" />
      </TouchableOpacity>
    </View>
    
    <Text style={styles.bio}>{user.bio}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 0, 
  },
  backgroundImage: {
    position: 'absolute',
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
  nameContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  circleIcon: {
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    backgroundColor: '#333', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 8, 
    marginTop: 5
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
