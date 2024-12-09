import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, PixelRatio } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const { width } = Dimensions.get('window');
const scale = width / 375;

const normalize = (size) => {
  return PixelRatio.roundToNearestPixel(size * scale);
};

const UserComponent = ({ avatar, full_name }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.container, {
      backgroundColor: theme ? '#323232' : '#f3f4f8',
      elevation: theme ? 0 : 5,
    }]}>
      <TouchableOpacity style={styles.profileSection} onPress={() => {
        navigation.navigate(Screens.Profile);
      }}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={[styles.fullName, {
          color: theme ? '#fff' : Colors.background,
        }]}>{full_name}</Text>
        <View style={styles.notificationContainer}>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(10),
    padding: normalize(10),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(15),
    marginRight: normalize(10),
  },
  fullName: {
    fontSize: normalize(16),
    flex: 1,
    fontWeight: 'bold',
  },
  notificationContainer: {
    position: 'relative',
    marginRight: normalize(10),
  },
});
