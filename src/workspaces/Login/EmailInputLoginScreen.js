import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AuthenticationHeader from '../../components/AuthHeader';
import TwoButtonBottom from '../../components/TwoButtonBottom';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';

const EmailInputLoginScreen = () => {
  const [email, setEmail] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleLogin = () => {
    if (email === '') {
      setEmailErrorText('Vui lòng nhập email')
      return
    }

    alert('Đăng nhập thành công')
  }
  return (
    <View style={st.container}>
      <AuthenticationHeader />

      {/* form đăng nhập */}
      <View style={st.loginForm}>

        {/* tiêu đề */}
        <View
          style={{ width: '80%' }}>
          <Text
            style={st.title}>
            Để bắt đầu, trước tiên hãy nhập số điện thoại, email hoặc @tên người dùng của bạn
          </Text>
        </View>

        {/* nhập email */}
        <CustomInput
          leadIcon={() => (
            <Feather
              name="user"
              size={20}
              style={{ marginLeft: 10 }}
            />
          )}
          name={email}
          onChangeText={(text) => {
            setEmail(text)
            if (emailErrorText !== '') {
              setEmailErrorText('')
            }
          }}
          placeholder={'Email'}
        />
        <ErrorMessage message={emailErrorText} />
      </View>

      {/* nút quên mật khẩu và đăng nhập */}
      <View style={st.bottomContainer}>
        <TwoButtonBottom
          text1='Quên mật khẩu?'
          text2='Tiếp theo'
          onPress1={() => alert('Quên mật khẩu')}
          onPress2={handleLogin}
        />

      </View>




    </View>
  )
}

export default EmailInputLoginScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
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
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})