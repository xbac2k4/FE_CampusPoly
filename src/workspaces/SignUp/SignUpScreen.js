import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AuthenticationHeader from '../../components/AuthHeader';
import OneButtonBottom from '../../components/OneButtonBottom';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';
import Screens from '../../navigation/Screens';
import Colors from '../../constants/Color';
import DatePicker from 'react-native-date-picker';



const SignUpScreen = ({ navigation }) => {

  const [name, setName] = useState('')
  const [nameErrorText, setNameErrorText] = useState('')

  const [email, setEmail] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')

  const [birthDay, setBirthDay] = useState(new Date()) // ngày mặc định là ngày hiện tại
  const [birthDayErrorText, setBirthDayErrorText] = useState('')

  const [isShowDate, setIsShowDate] = useState(false) // Trạng thái hiển thị date picker



  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleSignUp = () => {

    if (email === '' && name === '' && birthDay === '') {
      setEmailErrorText('Vui lòng nhập email')
      setNameErrorText('Vui lòng nhập tên')
      setBirthDayErrorText('Vui lòng nhập ngày sinh')
      return
    }

    if (name === '' && email === '') {
      setNameErrorText('Vui lòng nhập tên')
      setEmailErrorText('Vui lòng nhập email')
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


  return (
    <View style={st.container}>
      <AuthenticationHeader navigation={navigation} />

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
      </View>

      {/* nút tiếp theo */}
      <View style={st.bottomContainer}>
        <OneButtonBottom
          text='Tiếp theo'
          onPress={handleSignUp}
        />

      </View>

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
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})