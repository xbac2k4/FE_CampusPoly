import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ data }) => {
  const defaultBackgroundImage = require('../../assets/images/default-bg.png');
  const defaultAvatar = require('../../assets/images/default-profile.png');

  return (
    <View style={styles.headerContainer}>
      {/* StatusBar customization */}
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

      {/* Display background image or default image */}
      <Image
        source={
          data.background
            ? { uri: data.background.replace('localhost', '10.0.2.2') }
            : defaultBackgroundImage
        }
        style={styles.backgroundImage}
      />

      {/* Display profile image or default avatar */}
      <Image
        source={
          data.avatar
            ? { uri: data.avatar.replace('localhost', '10.0.2.2') }
            : defaultAvatar
        }
        style={styles.profileImage}
      />

      {/* Display name and email icon */}
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{data.full_name}</Text>
        <TouchableOpacity style={styles.circleIcon} onPress={() => { /* handle icon press */ }}>
          <Icon name="mail-outline" size={15} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conditionally display bio if it exists */}
      {data.bio ? <Text style={styles.bio}>{data.bio}</Text> : null}
    </View>
  );
};

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
    marginTop: 5,
  },
  bio: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    color: '#ECEBED',
  },
});

export default Header;
