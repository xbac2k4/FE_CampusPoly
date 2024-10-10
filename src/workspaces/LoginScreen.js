import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AuthenticationHeader from '../components/AuthenticationHeader';
import TwoButtonBottom from '../components/OneButtonBottom';

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

        {/* thông báo lỗi email */}
        <View style={{
          width: '90%'
        }}>
          <Text style={{ color: 'red' }}>{emailErrorText}</Text>
        </View>

        {/* nhập mật khẩu */}
        <View style={st.inputContainer}>
          <Feather
            name="lock"
            size={20}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            onChangeText={(text) => {
              setPassword(text)
              if (passErrorText !== '') {
                setPassErrorText('')
              }
            }}
            value={password}
            placeholder="Mật khẩu"
            style={st.passwordInput}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={st.iconContainer}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} />
          </TouchableOpacity>
        </View>

        {/* thông báo lỗi mật khẩu */}
        <View style={{
          width: '90%'
        }}>
          <Text style={{ color: 'red', }}>{passErrorText}</Text>
        </View>
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
  emailInput: {
    width: '90%',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 15,
  },
  passwordInput: {
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
  iconContainer: {
    padding: 10,
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})