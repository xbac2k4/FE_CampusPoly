import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Screens from '../../navigation/Screens'

const MenuAuthenticationScreen = ({ navigation }) => {

  const thanhNgang = () => {
    return (
      <View
        style={{
          backgroundColor: 'black',
          height: 1,
          width: '40%',
        }}
      />
    )
  }
  return (
    <View style={st.container}>

      {/* làm cho thanh statusbar trong suốt */}
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />

      {/* phần nội dung */}
      <View style={st.content}>

        {/* logo ứng dụng */}
        <Image source={require('../../assets/images/logo.png')} />

        {/* tiêu đề */}
        <Text style={st.title}>Cùng xem điều gì đang diễn ra ngay bây giờ</Text>

        {/* phần nút */}
        <View
          style={st.buttonContainer}
        >

          {/* nút đăng nhập với google */}
          <TouchableOpacity
            style={st.btn}
            onPress={() => navigation.navigate(Screens.BottomTab)}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/images/GoogleLogo.png')} />
            <Text
              style={st.btnText}
            >Tiếp tục với Google</Text>
          </TouchableOpacity>

          {/* hoặc */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '80%',
            }}>
            {thanhNgang()}
            <Text style={{ color: 'black', fontWeight: 'bold' }}>hoặc</Text>
            {thanhNgang()}
          </View>

          {/* nút tạo tài khoản */}
          <TouchableOpacity
            style={st.btn}
            onPress={() => navigation.navigate(Screens.SignUp)}
          >
            <Text
              style={st.btnText}
            >Tạo tài khoản</Text>
          </TouchableOpacity>

          {/* Điều khoản */}
          <Text
            style={{
              width: '80%',
              textAlign: 'center',
            }}>
            <Text style={{ color: 'black' }}>Bằng cách đăng ký bạn đồng ý với </Text>
            <Text style={{ color: '#2412ed', }}>Điều khoản, Chính sách riêng tư và Sử dụng cookie </Text>
            <Text style={{ color: 'black' }}>của chúng tôi</Text>
          </Text>
        </View>

        {/* đăng nhập */}
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            padding: 10
          }}>
          <Text style={{ color: 'black' }}>Bạn đã có một tài khoản? </Text>
          <Text onPress={() => navigation.navigate(Screens.EmailInputLogin)} style={{ color: '#57b5f4', fontWeight: 'bold' }}>Đăng nhập</Text>
        </Text>
      </View>


    </View>
  )
}

export default MenuAuthenticationScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: 10,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10
  }
})