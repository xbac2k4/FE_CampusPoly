import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AuthenticationHeader from '../../components/AuthHeader';
import OneButtonBottom from '../../components/OneButtonBottom';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';


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

      {/* form thông tin */}
      <View style={st.form}>

        {/* tiêu đề */}
        <Text
          style={st.title}>
          Tạo tài khoản của bạn
        </Text>

        {/* nhập tên */}
        <CustomInput
          name={name}
          placeholder='Tên'
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
          leadIcon={() => (
            <Feather
              name="user"
              size={20}
              style={{ marginLeft: 10 }}
            />
          )}
        />

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
        <CustomInput
          name={email}
          placeholder='Email'
          onChangeText={(text) => {
            setEmail(text)
            if (emailErrorText !== '') {
              setEmailErrorText('')
            }
          }}
          leadIcon={() => (
            <Entypo
              name="email"
              size={20}
              style={{ marginLeft: 10 }}
            />
          )}
        />

        {/* thông báo lỗi email */}
        <ErrorMessage
          message={emailErrorText}
        />

        {/* nhập ngày sinh */}
        <CustomInput
          name={birthDay}
          placeholder='Ngày sinh'
          onChangeText={(text) => {
            setBirthDay(text)
            if (birthDayErrorText !== '') {
              setBirthDayErrorText('')
            }
          }}
          leadIcon={() => (
            <Feather
              name="calendar"
              size={20}
              style={{ marginLeft: 10 }}
            />
          )} />

        {/* thông báo lỗi ngày sinh */}
        <ErrorMessage
          message={birthDayErrorText}
        />
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
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})