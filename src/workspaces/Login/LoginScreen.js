import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import AuthenticationHeader from '../../components/AuthHeader';
import TwoButtonBottom from '../../components/TwoButtonBottom';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';
import Screens from '../../navigation/Screens';
import { BlurView } from '@react-native-community/blur';
import Colors from '../../constants/Color';
import { login } from '../../services/Login';

const LoginScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState(route?.params?.email ?? '')
  const [password, setPassword] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passErrorText, setPassErrorText] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleLogin = async () => {
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

    // const result = await login(email, password)

    // Kiểm tra tài khoản có bị block không
    // const blockCheck = result?.data?.user_status_id?.status_name

    // if (blockCheck === 'Bị chặn') {
    //   toggleShowDialog()
    //   return
    // }

    navigation.navigate(Screens.BottomTab)
  }

  // Hàm hiển thị dialog block
  const toggleShowDialog = useCallback(() => {
    setIsShowDialog(prevState => !prevState);
  }, []);

  return (
    <View style={st.container}>

      <AuthenticationHeader navigation={navigation} />

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
              color="white"
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
              color="white"
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
              <Feather name={showPassword ? 'eye' : 'eye-off'} color="white" size={20} />
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


      {/* thông báo block */}
      

    </View>
  )
}

export default LoginScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  loginForm: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
  },
  iconContainer: {
    paddingRight: 15,
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  
  
  
  
  
  
})