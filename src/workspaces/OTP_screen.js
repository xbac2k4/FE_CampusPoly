import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthenticationHeader from '../components/AuthenticationHeader';
import OneButtonBottom from '../components/OneButtonBottom';


const inputLoginScreen = () => {
  const [OTP, setOTP] = useState('')
  const [OTPErrorText, setOTPErrorText] = useState('')

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleSignUp = () => {
    if (OTP === '') {
      setOTPErrorText('Vui lòng nhập OTP')
      return
    }

    alert('tiếp theo')
  }

  const handleForgetPassword = () => {
    alert('Quên mật khẩu')
  }
  return (
    <View style={st.container}>

      <AuthenticationHeader />

      {/* form nhập mã OTP */}
      <View style={st.loginForm}>

        {/* tiêu đề */}
        <View
          style={{ width: '80%' }}>
          <Text
            style={st.title}>
            Chúng tôi đã gửi mã cho bạn
          </Text>
          <Text
            style={st.description}>
            Nhập vào bên dưới để xác thực 123@gmail.com
          </Text>
        </View>

        {/* nhập mã OTP */}
        <View>
          <View style={st.inputContainer}>
            <MaterialCommunityIcons
              name="onepassword"
              size={20}
              style={{ marginLeft: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setOTP(text)
                if (OTPErrorText !== '') {
                  setOTPErrorText('')
                }
              }}
              value={OTP}
              placeholder="Mã xác nhận"
              style={st.input}
            />
          </View>

          {/* thông báo lỗi mã OTP */}
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{OTPErrorText}</Text>

          {/* không nhận được email */}
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={{ color: '#57B5F4', fontWeight: 'bold' }}>Bạn không nhận được email?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* nút tiếp theo */}
      <View style={st.bottomContainer}>
        <OneButtonBottom
          text='Tiếp theo'
          onPress={handleSignUp}
        />

      </View>




    </View>
  )
}

export default inputLoginScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: { width: 180, height: 50 },
  loginForm: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  description: {
    color: 'black',
    fontSize: 15,
    marginTop: 10,
  },
  input: {
    width: '90%',
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
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})