import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Color';
import { ThemeContext } from '../../services/provider/ThemeContext';

const DetailImage = ({ navigation, route }) => {
  const { image } = route.params;
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{
      backgroundColor: theme ? Colors.background : '#f3f4f8',
      flex: 1,
    }}>

      <TouchableOpacity style={{
        position: 'absolute', top: 20, left: 20, zIndex: 1,
        padding: 10,
      }} onPress={() => navigation.goBack()}>
        <Image
          source={theme
            ? require('../../assets/images/arowleft.png')
            : require('../../assets/images/light_arowleft.png')
          }
          resizeMode="contain"
          style={{ width: 15, height: 15 }}
        />
      </TouchableOpacity>
      <Image source={{ uri: image }} style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      }}
      />
    </View>
  )
}

export default DetailImage