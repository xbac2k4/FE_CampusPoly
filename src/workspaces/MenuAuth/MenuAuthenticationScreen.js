import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import Screens from '../../navigation/Screens'
import Colors from '../../constants/Color'
import BlockDialog from '../../components/MenuAuth/BlockDialog'

const MenuAuthenticationScreen = ({ navigation }) => {

  const [isShowDialog, setIsShowDialog] = useState(false)

  const toggleShowDialog = useCallback(() => {
    setIsShowDialog(prevState => !prevState);
  }, []);

  return (
    <View style={st.container}>

      {/* làm cho thanh statusbar trong suốt */}
      <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />

      {/* phần nội dung */}
      <View style={st.content}>

        {/* tên ứng dụng */}
        <Text style={st.name}>CAMPUSPOLY</Text>

        {/* tiêu đề */}
        <Text style={st.title}>Cùng xem điều gì đang diễn ra ngay bây giờ</Text>

        {/* phần nút */}
        <View
          style={st.buttonContainer}
        >

          {/* nút đăng nhập với google */}
          <TouchableOpacity
            style={st.btn}
            onPress={toggleShowDialog}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/images/GoogleLogo.png')} />
            <Text
              style={st.btnText}
            >Đăng nhập với Google</Text>
          </TouchableOpacity>


        </View>

        {/* Điều khoản */}
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            marginBottom: 100,
          }}>
          <Text style={{ color: 'white' }}>Bằng cách đăng ký bạn đồng ý với </Text>
          <Text style={{ color: '#57B5F4', }}>Điều khoản, Chính sách riêng tư và Sử dụng cookie </Text>
          <Text style={{ color: 'white' }}>của chúng tôi</Text>
        </Text>
      </View>

      <BlockDialog isShowDialog={isShowDialog} toggleShowDialog={toggleShowDialog} />
    </View>
  )
}

export default MenuAuthenticationScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 50,
    fontFamily: 'rubik',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    marginHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    minHeight: 60,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10
  }
})