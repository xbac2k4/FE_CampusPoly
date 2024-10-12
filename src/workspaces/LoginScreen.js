import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AuthenticationHeader from '../components/AuthenticationHeader';
import TwoButtonBottom from '../components/TwoButtonBottom';
import CustomInput from '../components/CustomInput';
import ErrorMessage from '../components/ErrorMessage';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passErrorText, setPassErrorText] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleLogin = () => {
    if (email === '' && password === '') {
      setEmailErrorText('Vui lòng nhập email')
      setPassErrorText('Vui lòng nhập mật khẩu')
      return
    }
    if (email === '') {
      setEmailErrorText('Vui lòng nhập email')
      return
    }

    if (password === '') {
      setPassErrorText('Vui lòng nhập mật khẩu')
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
            Đăng nhập
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

        {/* thông báo lỗi email */}
        <ErrorMessage message={emailErrorText} />

        {/* nhập mật khẩu */}
        <CustomInput
          leadIcon={() => (
            <Feather
              name="lock"
              size={20}
              style={{ marginLeft: 10 }}
            />
          )}
          name={password}
          onChangeText={(text) => {
            setPassword(text)
            if (passErrorText !== '') {
              setPassErrorText('')
            }
          }}
          placeholder={'Mật khẩu'}
          trailingIcon={() => (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={st.iconContainer}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} />
            </TouchableOpacity>
          )}
          secureTextEntry={!showPassword}
        />

        {/* thông báo lỗi mật khẩu */}
        <ErrorMessage message={passErrorText} />
      </View>

      {/* nút quên mật khẩu và đăng nhập */}
      <View style={st.bottomContainer}>
        <TwoButtonBottom
          text1='Quên mật khẩu?'
          text2='Đăng nhập'
          onPress1={() => alert('Quên mật khẩu')}
          onPress2={handleLogin}
        />
      </View>

    </View>
  )
}

export default LoginScreen

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
    fontSize: 35,
    color: 'black',
  },
  iconContainer: {
    padding: 10,
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})