import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';



const SignUpImageScreen = () => {

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleName = () => {
    alert('tiếp theo')
  }

  const abandon = () => {
    alert('Bỏ qua bây giờ')
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
        <TouchableOpacity>
          <Image source={require('../assets/images/upload-image.png')} />
        </TouchableOpacity>


      </View>

      {/* nút tiếp theo */}
      <View style={st.bottomContainer}>
        <View style={st.bottomBar}>
          <TouchableOpacity
            onPress={abandon}
            style={[st.bottomBtn, { backgroundColor: 'white' }]}>
            <Text
              style={st.btnText}>
              Bỏ qua bây giờ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleName}
            style={[st.bottomBtn, { backgroundColor: '#D9D9D9' }]}>
            <Text
              style={st.btnText}>
              Tiếp theo
            </Text>
          </TouchableOpacity>
        </View>

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
  input: {
    flex: 1,
    padding: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    borderRadius: 10,
  },
  suggestedName: {
    color: '#57B5F4',
    fontSize: 15,
    marginRight: 10
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopColor: 'black',
    borderTopWidth: 2,
    paddingHorizontal: 20,
  },

  bottomBtn: {
    padding: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
    height: 55,
    elevation: 5
  },

  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  }
})