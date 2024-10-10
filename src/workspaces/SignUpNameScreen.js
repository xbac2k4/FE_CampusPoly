import { FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import TwoButtonBottom from '../components/TwoButtonBottom';
import CustomInput from '../components/CustomInput';
import ErrorMessage from '../components/ErrorMessage';



const SignUpNameScreen = () => {
  const [username, setUsername] = useState('')
  const [usernameErrorText, setUsernameErrorText] = useState('')

  // Hàm xử lý khi người dùng ấn nút đăng nhập
  const handleName = () => {
    if (username === '') {
      setUsernameErrorText('Vui lòng nhập tên người dùng')
      return
    }

    alert('tiếp theo')
  }

  const abandon = () => {
    alert('Bỏ qua bây giờ')
  }

  const suggestedNames = [
    { id: 1, name: 'Huy', onPress: () => alert('Huy') },
    { id: 2, name: '@vet', onPress: () => alert('22') },
    { id: 3, name: '@duy', onPress: () => alert('H33uy') },
  ]

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

      {/* form nhập mã OTP */}
      <View style={st.form}>

        {/* tiêu đề */}
        <View
          style={{ width: '90%' }}>
          <Text
            style={st.title}>
            Chúng tôi nên gọi bạn là gì
          </Text>
          <Text
            style={st.description}>
            @tên người dùng phải độc nhất. Sau này bạn có thể thay đổi nó.
          </Text>
        </View>

        {/* nhập tên người dùng */}
        <CustomInput
          name={username}
          leadIcon={() => (
            <Feather
              name="user"
              size={20}
              style={{ marginLeft: 10 }}
            />
          )}
          onChangeText={(text) => {
            setUsername(text)
            if (usernameErrorText !== '') {
              setUsernameErrorText('')
            }
          }}
          placeholder={'Tên người dùng'}
        />

        {/* thông báo lỗi tên người dùng */}
        <ErrorMessage message={usernameErrorText} />

        {/* danh sách gợi ý tên và hiển thị thêm  */}

        <View style={{
          width: '90%',
          height: 50,
          justifyContent: 'space-between',
        }}>

          <FlatList
            data={suggestedNames}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Text
                onPress={() => setUsername(item.name)}
                style={st.suggestedName}>
                {item.name}
              </Text>
            )}
            horizontal
          />

          <Text
            onPress={() => alert('Hiển thị thêm')}
            style={{
              color: '#57B5F4',
              fontSize: 15
            }}>
            Hiện thị thêm
          </Text>
        </View>
      </View>

      {/* nút tiếp theo */}
      <View style={st.bottomContainer}>
        <TwoButtonBottom
          text2="Tiếp theo"
          text1="Bỏ qua bây giờ"
          onPress2={handleName}
          onPress1={abandon}
        />
      </View>

    </View>
  )
}

export default SignUpNameScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo: { width: 180, height: 50 },
  form: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  description: {
    color: '#71767B',
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
  suggestedName: {
    color: '#57B5F4',
    fontSize: 15,
    marginRight: 10
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  }
})