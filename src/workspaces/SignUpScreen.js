import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AuthenticationHeader from '../components/AuthenticationHeader';
import OneButtonBottom from '../components/OneButtonBottom';


const LoginScreen = () => {
  const [name, setName] = useState('')
  const [nameErrorText, setNameErrorText] = useState('')

  const [email, setEmail] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')

  const [birthDay, setBirthDay] = useState('')
  const [birthDayErrorText, setBirthDayErrorText] = useState('')

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleSignUp = () => {
    if (email === '' && name === '' && birthDay === '') {
      setEmailErrorText('Vui lòng nhập email')
      setNameErrorText('Vui lòng nhập tên')
      setBirthDayErrorText('Vui lòng nhập ngày sinh')
      return
    }

    if (name === '') {
      setNameErrorText('Vui lòng nhập tên')
      return
    }

    if (email === '') {
      setEmailErrorText('Vui lòng nhập email')
      return
    }

    if (birthDay === '') {
      setBirthDayErrorText('Vui lòng nhập ngày sinh')
      return
    }

    alert('Đăng ký thành công')
  }
  return (
    <View style={st.container}>
      <AuthenticationHeader />

      {/* form đăng nhập */}
      <View style={st.loginForm}>

        {/* tiêu đề */}
        <Text
          style={st.title}>
          Tạo tài khoản của bạn
        </Text>

        {/* nhập tên */}
        <View style={st.inputContainer}>
          <Feather
            name="user"
            size={20}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            onChangeText={(text) => {
              if (text.length > 50) {
                setNameErrorText('Tên không được quá 50 ký tự')
                return
              }
              setName(text)
              if (nameErrorText !== '') {
                setNameErrorText('')
              }
            }}
            value={name}
            placeholder="Tên"
            style={st.input}
          />
        </View>

        {/* thông báo lỗi tên */}
        <View style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={{ color: 'red' }}>{nameErrorText}</Text>
          <Text style={{ color: name.length > 50 ? 'red' : 'gray' }}>{name.length}/50</Text>
        </View>

        {/* nhập email */}
        <View style={st.inputContainer}>
          <Entypo
            name="email"
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
            style={st.input}
          />
        </View>

        {/* thông báo lỗi email */}
        <View style={{
          width: '90%'
        }}>
          <Text style={{ color: 'red' }}>{emailErrorText}</Text>
        </View>

        {/* nhập ngày sinh */}
        <View style={st.inputContainer}>
          <Feather
            name="calendar"
            size={20}
            style={{ marginLeft: 10 }}
          />
          <TextInput
            onChangeText={(text) => {
              setBirthDay(text)
              if (birthDayErrorText !== '') {
                setBirthDayErrorText('')
              }
            }}
            value={birthDay}
            placeholder="Ngày sinh"
            style={st.input}
          />
        </View>

        {/* thông báo lỗi ngày sinh */}
        <View style={{
          width: '90%'
        }}>
          <Text style={{ color: 'red' }}>{birthDayErrorText}</Text>
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
    fontSize: 30,
    color: 'black',
  },
  input: {
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