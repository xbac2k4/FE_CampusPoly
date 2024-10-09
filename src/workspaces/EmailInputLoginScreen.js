import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';

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
        <View style={st.bottomBar}>
          <TouchableOpacity
            style={[st.bottomBtn, { backgroundColor: 'white' }]}>
            <Text
              style={st.btnText}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
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

export default EmailInputLoginScreen

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