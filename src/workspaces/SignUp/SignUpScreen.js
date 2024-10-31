import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthenticationHeader from '../../components/AuthHeader';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';
import OneButtonBottom from '../../components/OneButtonBottom';
import Colors from '../../constants/Color';
import Screens from '../../navigation/Screens';



const SignUpScreen = ({ navigation }) => {

  const [name, setName] = useState('')
  const [nameErrorText, setNameErrorText] = useState('')

  const [email, setEmail] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')

  const [birthDay, setBirthDay] = useState(new Date()) // ngày mặc định là ngày hiện tại
  const [birthDayErrorText, setBirthDayErrorText] = useState('')

  const [isShowDate, setIsShowDate] = useState(false) // Trạng thái hiển thị date picker

  const [gender, setGender] = useState('')
  const [genderErrorText, setGenderErrorText] = useState('')

  const [password, setPassword] = useState('')
  const [passErrorText, setPassErrorText] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [confirm, setConfirm] = useState('')
  const [confirmErrorText, setConfirmErrorText] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)




  const [keyboardVisible, setKeyboardVisible] = useState(false); // Trạng thái bàn phím hiển thị hay ẩn

  // Lắng nghe sự kiện hiển thị hoặc ẩn bàn phím
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleSignUp = () => {

    if (name === '' && email === '' && gender === '' && password === '' && confirm === '') {
      setNameErrorText('Vui lòng nhập tên')
      setEmailErrorText('Vui lòng nhập email')
      setGenderErrorText('Vui lòng chọn giới tính')
      setPassErrorText('Vui lòng nhập mật khẩu')
      setConfirmErrorText('Vui lòng xác nhận mật khẩu')
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

    if (gender === '') {
      setGenderErrorText('Vui lòng chọn giới tính')
      return
    }

    if (password === '') {
      setPassErrorText('Vui lòng nhập mật khẩu')
      return
    }

    if (confirm === '') {
      setConfirmErrorText('Vui lòng xác nhận mật khẩu')
      return
    }

    if (password.length < 8) {
      setPassErrorText('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    if (password !== confirm) {
      setConfirmErrorText('Mật khẩu không khớp')
      return
    }

    // Kiểm tra email có đúng định dạng không (chỉ lấy email có dạng đuôi là fpt.edu.vn hoặc fe.edu.vn)
    const emailPattern = /^[a-zA-Z0-9._-]+@(fpt|fe)\.edu\.vn$/;
    if (!emailPattern.test(email)) {
      setEmailErrorText('Email không hợp lệ')
      return
    }


    // chuyển màn hình và truyền email
    navigation.navigate(Screens.OTP, { email: email })
  }

  // Hàm hiển thị hoặc ẩn date picker
  const togggleDatePicker = () => {
    setIsShowDate(!isShowDate)
  }

  // Hàm xử lý khi người dùng xác nhận ngày sinh
  const handleConfirmDate = (date) => {
    setBirthDay(date)
    setIsShowDate(false)
  }

  // Hàm xử lý nhập tên
  const inputName = (text) => {
    if (text.length > 50) {
      setNameErrorText('Tên không được quá 50 ký tự')
      return
    }
    setName(text)
    if (nameErrorText !== '') {
      setNameErrorText('')
    }
  }

  // Hàm xử lý nhập email
  const inputEmail = (text) => {
    setEmail(text)
    if (emailErrorText !== '') {
      setEmailErrorText('')
    }
  }

  // chọn giới tính
  const changeGender = (text) => {
    setGender(text)
    setGenderErrorText('')
  }


  // Hàm chuyển đổi ngày tháng năm thành dạng dd/mm/yyyy
  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Thêm số 0 vào trước ngày và tháng nếu cần
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return `${day}/${month}/${year}`;
  };

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

      <AuthenticationHeader navigation={navigation} />

      <ScrollView style={{
        width: '100%',
        height: '67%'
      }}>
        {/* form thông tin */}
        <View style={st.form}>

          {/* tiêu đề */}
          <Text
            style={st.title}>
            Tạo tài khoản của bạn
          </Text>

          <Text style={st.description}>Nhanh chóng và dễ dàng</Text>

          {/* nhập tên */}
          <CustomInput
            name={name}
            placeholder='Tên'
            onChangeText={inputName}
            leadIcon={() => (
              <Feather
                name="user"
                size={20}
                color='white'
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
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{nameErrorText}</Text>
            <Text style={{ color: name.length >= 50 ? 'red' : 'gray' }}>{name.length}/50</Text>
          </View>

          {/* nhập ngày sinh */}
          <Pressable onPress={togggleDatePicker}>
            <CustomInput
              name={formatDate(birthDay)}
              editable={false}
              placeholder='Ngày sinh'
              leadIcon={() => (
                <Feather
                  name="calendar"
                  size={20}
                  color='white'
                  style={{ marginLeft: 10 }}
                />
              )} />
          </Pressable>


          {/* thông báo lỗi ngày sinh */}
          <ErrorMessage
            message={birthDayErrorText}
          />

          {/* nhập email */}
          <CustomInput
            name={email}
            placeholder='Email'
            onChangeText={inputEmail}
            leadIcon={() => (
              <Entypo
                name="email"
                size={20}
                color='white'
                style={{ marginLeft: 10 }}
              />
            )}
          />

          {/* thông báo lỗi email */}
          <ErrorMessage
            message={emailErrorText}
          />

          {/* chọn giới tính */}
          <View style={{
            width: '90%',
            marginTop: 10,
          }}>
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>Giới tính</Text>

            <View style={{
              flexDirection: 'row',
              marginTop: 10
            }}>
              <TouchableOpacity
                onPress={() => changeGender('nam')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <MaterialIcons name={gender == 'nam' ? 'radio-button-on' : 'radio-button-unchecked'} size={25} color='white' />
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>Nam</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => changeGender('nu')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20
                }}>
                <MaterialIcons name={gender == 'nu' ? 'radio-button-on' : 'radio-button-unchecked'} size={25} color='white' />
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>Nữ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => changeGender('khac')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20
                }}>
                <MaterialIcons name={gender == 'khac' ? 'radio-button-on' : 'radio-button-unchecked'} size={25} color='white' />
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>Khác</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* thông báo lỗi giới tính */}
          <ErrorMessage
            message={genderErrorText}
          />

          <CustomInput
            name={password}
            placeholder='Mật khẩu'
            leadIcon={() => (
              <Feather
                name="lock"
                color='white'
                size={20}
                style={{ marginLeft: 10 }}
              />
            )}
            onChangeText={(text) => {
              setPassword(text)
              if (passErrorText !== '') {
                setPassErrorText('')
              }
            }}
            trailingIcon={() => (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={st.iconContainer}>
                <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color='white' />
              </TouchableOpacity>
            )}
            secureTextEntry={!showPassword}
          />

          {/* thông báo lỗi mật khẩu */}
          <ErrorMessage message={passErrorText} />

          <CustomInput
            name={confirm}
            placeholder='Xác nhận mật khẩu'
            leadIcon={() => (
              <Feather
                name="lock"
                color='white'
                size={20}
                style={{ marginLeft: 10 }}
              />
            )}
            onChangeText={(text) => {
              setConfirm(text)
              if (confirmErrorText !== '') {
                setConfirmErrorText('')
              }
            }}
            trailingIcon={() => (
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={st.iconContainer}>
                <Feather name={showConfirm ? 'eye' : 'eye-off'} size={20} color='white' />
              </TouchableOpacity>
            )}
            secureTextEntry={!showConfirm}
          />

          {/* thông báo lỗi mật khẩu */}
          <ErrorMessage message={confirmErrorText} />

          {/* Chính sách */}

          <View style={{
            width: '90%'
          }}>

            <Text style={{ color: 'white', fontSize: 15 }}>Khi đăng kí nghĩa là bạn đồng ý với
              <Text onPress={openTermsOfService} style={st.policyText}> Điều khoản dịch vụ</Text> và
              <Text onPress={openPrivacyPolicy} style={st.policyText}> Chính sách riêng tư</Text> , bao gồm cả
              <Text onPress={openUseOfCookies} style={st.policyText}> Hoạt động sử dụng Cookie</Text>. Chúng tôi có thể sử dụng thông tin liên hệ của bạn , bao gồm email và số điện thoại nhằm các mục đích nêu trong Chính sách riêng tư , như giữ an toàn cho tài khoản của bạn và làm cho các dịch vụ của chúng tôi phù hợp hơn với bạn , bao gồm quảng cáo.
              <Text onPress={openLearnMore} style={st.policyText}> Tìm hiểu thêm</Text>. Những người khác sẽ có thể tìm thấy bạn qua email hoặc số điện thoại khi được cung cấp , trừ phi bạn chọn các khác
              <Text onPress={opentHere} style={st.policyText}> tại đây</Text>.</Text>
          </View>



        </View>
      </ScrollView>


      {/* nút tiếp theo */}
      {!keyboardVisible && (
        <View style={st.bottomContainer}>
          <OneButtonBottom
            text='Tiếp theo'
            onPress={handleSignUp}
          />
        </View>
      )}

      <DatePicker
        modal
        title={'Chọn ngày sinh'}
        open={isShowDate}
        date={birthDay}
        mode='date'
        theme='dark'
        onConfirm={handleConfirmDate}
        onCancel={togggleDatePicker}
        locale='vi'
        confirmText='Xác nhận'
        cancelText='Hủy'
        maximumDate={new Date()}
      />

    </View>
  )
}

export default SignUpScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconContainer: {
    paddingRight: 15,
  },
  policyText: {
    color: '#57B5F4'
  },
})