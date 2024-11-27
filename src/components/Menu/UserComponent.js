import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';

const { width } = Dimensions.get('window');
const scale = width / 375;  // 375 is a standard width for scaling (like iPhone 11)

const normalize = (size) => {
  return PixelRatio.roundToNearestPixel(size * scale);
};

const UserComponent = ({ avatar, full_name }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileSection} onPress={()=>{
        navigation.navigate(Screens.Profile);
      }}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.fullName}>{full_name}</Text>
        <View style={styles.notificationContainer}>
       
        </View>
      </TouchableOpacity>
      
    
    </View>
  );
};

export default UserComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    borderRadius: normalize(10),
    padding: normalize(10),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(10),
  },
  avatar: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
    marginRight: normalize(10),
  },
  fullName: {
    color: '#ffffff',
    fontSize: normalize(16),
    flex: 1,
  },
  notificationContainer: {
    position: 'relative',
    marginRight: normalize(10),
  },
  notificationIcon: {
    width: normalize(20),
    height: normalize(20),
  },
  notificationBadge: {
    position: 'absolute',
    top: -normalize(4),
    right: -normalize(4),
    backgroundColor: '#FF0000',
    borderRadius: normalize(10),
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#ffffff',
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: "#cccc",
  },
  createPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(10),
    marginLeft: normalize(10),
  },
  addIconContainer: {
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: '#fff',
    padding: normalize(5),
  },
  addIcon: {
    width: normalize(15),
    height: normalize(15),
  },
  createPageText: {
    color: '#9fa0a2',
    fontSize: normalize(14),
    marginLeft: normalize(10),
  },
});
