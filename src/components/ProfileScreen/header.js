import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Color';
import { ThemeContext } from '../../services/provider/ThemeContext';

const Header = ({ data, navigation }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.headerContainer}>
      {/* StatusBar customization */}
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={theme ? require('../../assets/images/arowleft.png') :
            require('../../assets/images/light_arowleft.png')
          }
          resizeMode="contain"
          style={{ width: 15, height: 15 }}
        />
      </TouchableOpacity>

      {/* Display background image or default image */}
      <Image
        source={{ uri: data?.background ? data?.background : 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/172740/Originals/background-la-gi-4.jpg' }
        }
        style={styles.backgroundImage}
      />

      {/* Display profile image or default avatar */}
      <Image
        source={
          data?.avatar
          && { uri: data?.avatar }
        }
        style={styles.profileImage}
      />

      {/* Display name and email icon */}
      <View style={styles.nameContainer}>
        <Text style={[styles.name, {
          color: theme ? '#fff' : Colors.background,
        }]}>{data?.full_name}</Text>
        
      </View>
      <Text style={{
        ...styles.bio,
        marginTop: 0,
        color: theme ? '#ECEBED' : '#333'
      }}>{data?.role[0]?.role_name}</Text>
      {/* Conditionally display bio if it exists */}
      {data?.bio ? <Text style={[styles.bio,{
        color : theme?  '#fff' : Colors.background 
      }]}>{data?.bio}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginTop: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
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
  },
  circleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 5,
  },
  bio: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Header;
