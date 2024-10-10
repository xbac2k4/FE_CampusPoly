import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AuthenticationHeader from '../components/AuthenticationHeader';
import TwoButtonBottom from '../components/TwoButtonBottom';

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
        <View>
          <View style={st.inputContainer}>
            <Feather
              name="user"
              size={20}
              style={{ marginLeft: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setEmail(text)
                if (emailErrorText !== '') {
                  setEmailErrorText('')
                }
              }}
              value={email}
              placeholder="Email"
              style={st.emailInput}
            />
          </View>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{emailErrorText}</Text>
        </View>
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
  emailInput: {
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