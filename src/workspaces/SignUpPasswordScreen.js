import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AuthenticationHeader from '../components/authenticationHeader';
import Feather from 'react-native-vector-icons/Feather';



const SignUpPasswordScreen = () => {
  const [password, setPassword] = useState('')
  const [passErrorText, setPassErrorText] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleSignUp = () => {
    if (password === '') {
      setPassErrorText('Vui lòng nhập mật khẩu')
      return
    }

    if (password.length < 8) {
      setPassErrorText('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    alert('Đăng ký thành công')
  }

  const openTermsOfService = () => {
    alert('Điều khoản dịch vụ')
  }

  const openPrivacyPolicy = () => {
    alert('Chính sách riêng tư')
  }

  const openUseOfCookies = () => {
    alert('Hoạt động sử dụng cookie')
  }

  const openLearnMore = () => {
    alert('Tìm hiểu thêm')
  }

  const opentHere = () => {
    alert('Tại đây')
  }

  return (
    <View style={st.container}>

      <AuthenticationHeader />

      {/* form nhập mã OTP */}
      <View style={st.loginForm}>

        {/* tiêu đề */}
        <View
          style={{ width: '80%' }}>
          <Text
            style={st.title}>
            Bạn sẽ cần có mật khẩu
          </Text>
          <Text
            style={st.description}>
            Đảm bảo mật khẩu có từ 8 ký tự trở lên
          </Text>
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
            style={st.input}
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

          {/* Chính sách */}

        <View style={{
          width: '90%'
        }}>

          <Text style={{ color: 'black', fontSize: 15 }}>Khi đăng kí nghĩa là bạn đồng ý với
            <Text onPress={openTermsOfService} style={st.policyText}> Điều khoản dịch vụ</Text> và
            <Text onPress={openPrivacyPolicy} style={st.policyText}> Chính sách riêng tư</Text> , bao gồm cả
            <Text onPress={openUseOfCookies} style={st.policyText}> Hoạt động sử dụng Cookie</Text>. Chúng tôi có thể sử dụng thông tin liên hệ của bạn , bao gồm email và số điện thoại nhằm các mục đích nêu trong Chính sách riêng tư , như giữ an toàn cho tài khoản của bạn và làm cho các dịch vụ của chúng tôi phù hợp hơn với bạn , bao gồm quảng cáo.
            <Text onPress={openLearnMore} style={st.policyText}> Tìm hiểu thêm</Text>. Những người khác sẽ có thể tìm thấy bạn qua email hoặc số điện thoại khi được cung cấp , trừ phi bạn chọn các khác
            <Text onPress={opentHere} style={st.policyText}> tại đây</Text>.</Text>
        </View>
      </View>

      {/* nút tiếp theo */}
      <View style={st.bottomContainer}>
        <View style={st.bottomBar}>
          <TouchableOpacity
            onPress={handleSignUp}
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

export default SignUpPasswordScreen

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
  description: {
    color: 'black',
    fontSize: 15,
    marginTop: 10,
  },
  input: {
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
  policyText: {
    color: '#57B5F4'
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