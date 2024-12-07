import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Color';

const DetailImage = ({ navigation, route }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>

      <TouchableOpacity style={{
        position: 'absolute', top: 20, left: 20, zIndex: 1,
        padding: 10,
      }} onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/images/arowleft.png')}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  }
})