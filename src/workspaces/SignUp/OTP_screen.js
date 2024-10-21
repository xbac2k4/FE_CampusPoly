import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthenticationHeader from '../../components/AuthHeader';
import OneButtonBottom from '../../components/OneButtonBottom';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';


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
      <View style={st.form}>

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
          <CustomInput
            name={OTP}
            placeholder='Mã xác nhận'
            leadIcon={() => (
              <MaterialCommunityIcons
                name="onepassword"
                size={20}
                style={{ marginLeft: 10 }}
              />
            )}
            onChangeText={(text) => {
              setOTP(text)
              if (OTPErrorText !== '') {
                setOTPErrorText('')
              }
            }}
          />

          {/* thông báo lỗi mã OTP */}
          <ErrorMessage message={OTPErrorText} />

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
  form: {
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
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})