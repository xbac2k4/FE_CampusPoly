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
  const [isShowDialog, setIsShowDialog] = useState(false)

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

    const result = await login(email, password)

    // Kiểm tra tài khoản có bị block không
    const blockCheck = result?.data?.user_status_id?.status_name

    if (blockCheck === 'Bị chặn') {
      toggleShowDialog()
      return
    }

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
      <Modal animationType='fade'
        transparent={true}
        visible={isShowDialog}
        onRequestClose={toggleShowDialog}
      >

        {/* làm mờ màn hình */}
        <BlurView
          style={st.blur}
          blurType="dark"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.5)"
        />

        {/* nền xung quanh dialog */}
        <View style={st.modalContainer}>

          {/* dialog */}
          <View style={st.modalContent}>

            <View style={{
              flexDirection: 'row',
            }}>
              <Feather name='alert-triangle' size={30} color='red' />
              <Text style={st.modalHeader}>Tạm thời tài khoản của bạn bị vô hiệu hóa</Text>
            </View>
            <Text style={st.modalTitle}>
              Cần hỗ trợ vui lòng liên hệ qua địa chỉ: email@gmail.com
            </Text>

            <TouchableOpacity
              onPress={toggleShowDialog}
              style={st.modalButton}>
              <Text style={st.modalBtnText}>
                Tôi hiểu
              </Text>
            </TouchableOpacity>
          </View>
        </View>


      </Modal>

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
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#181a1c',
    width: '70%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    padding: 20,
    alignItems: 'center'
  },
  modalHeader: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    width: '90%'
  },
  modalTitle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10
  },
  modalButton: {
    backgroundColor: '#181a1c',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  modalBtnText: {
    color: 'white',
    fontSize: 16
  }
})