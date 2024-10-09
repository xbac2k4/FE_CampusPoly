import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';

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

      {/* thanh statusbar */}
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />

      {/* logo */}
      <Image
        source={require('../assets/images/logo.png')}
        style={st.logo}
        resizeMode="contain"
      />

      {/* nút trở lại */}
      <View
        style={{
          width: '90%',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/left-arrow.png')} />
        </TouchableOpacity>
      </View>

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

        {/* thông báo lỗi email */}
        <View style={{
          width: '90%',
        }}>
          <Text style={{ color: 'red' }}>{emailErrorText}</Text>
        </View>

        {/* nhập mật khẩu */}
        <View style={st.inputContainer}>
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
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color='red' />
          </TouchableOpacity>
        </View>

        {/* thông báo lỗi mật khẩu */}
        <View style={{
          width: '90%',
        }}>
          <Text style={{ color: 'red' }}>{passErrorText}</Text>
        </View>
      </View>

      {/* nút quên mật khẩu và đăng nhập */}
      <View style={st.bottomContainer}>
        <View style={st.bottomBar}>

          <TouchableOpacity
            onPress={handleLogin}
            style={[st.bottomBtn, { backgroundColor: '#D9D9D9' }]}>
            <Text
              style={st.btnText}>
              Tiếp
            </Text>
          </TouchableOpacity>
        </View>

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
  logo: { width: 180, height: 50 },
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
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    padding: 20,
    fontWeight: 'bold',
    fontSize: 15,
    borderRadius: 10,
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
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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