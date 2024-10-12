import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import TwoButtonBottom from '../components/OneButtonBottom';

const SignUpImageScreen = () => {

  // lưu trữ uri ảnh người dùng chọn
  const [imageUri, setImageUri] = useState(null);

  // Hàm xử lý khi người dùng ấn nút tiếp theo
  const handleName = () => {
    alert('tiếp theo')
  }

  // Hàm xử lý khi người dùng ấn nút bỏ qua
  const abandon = () => {
    alert('Bỏ qua bây giờ')
  }

  // Hàm chọn ảnh từ thư viện
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (res.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh');
      } else if (res.error) {
        console.log('Lỗi: ', res.error);
      } else {
        const uri = res.assets[0].uri;
        setImageUri(uri);
      }
    })
  }

  return (
    <View style={st.container}>

      {/* thanh statusbar */}
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />

      {/* logo */}
      <Image
        source={require('../assets/images/logo.png')}
        style={st.logo}
        resizeMode="contain"
      />

      {/* form nhập */}
      <View style={st.form}>

        {/* tiêu đề */}
        <View
          style={{ width: '90%' }}>
          <Text
            style={st.title}>
            Chọn một ảnh hồ sơ
          </Text>
          <Text
            style={st.description}>
            Có một tấm ảnh selfie yêu thích? Hãy tải lên ngay bây giờ.
          </Text>
        </View>

        {/* nút tải ảnh */}
        <TouchableOpacity onPress={selectImage}>
          {imageUri ? (
            // nếu có ảnh thì hiển thị ảnh
            <Image source={{ uri: imageUri }} style={st.image} />
          ) : (
            // nếu không có ảnh thì hiển thị nút tải ảnh
            <Image source={require('../assets/images/upload-image.png')} />)}

        </TouchableOpacity>
      </View>

      {/* nút tiếp theo */}
      <View style={st.bottomContainer}>
        <TwoButtonBottom
          text2="Tiếp theo"
          text1="Bỏ qua bây giờ"
          onPress2={handleName}
          onPress1={abandon}
        />
      </View>

    </View>
  )
}

export default SignUpImageScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: { width: 180, height: 50 },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  description: {
    color: '#71767B',
    fontSize: 15,
    marginTop: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
})