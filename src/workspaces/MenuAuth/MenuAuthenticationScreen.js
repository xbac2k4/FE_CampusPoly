import React, { useCallback, useState, useContext } from 'react'
import Screens from '../../navigation/Screens'
import Colors from '../../constants/Color'
import BlockDialog from '../../components/MenuAuth/BlockDialog'
import { CommonActions } from '@react-navigation/native'
import { UserContext } from '../../services/provider/UseContext';
import { SocketContext } from '../../services/provider/SocketContext';
import messaging from '@react-native-firebase/messaging'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Loading from '../../components/MenuAuth/Loading'
import { LOGIN_WITH_GOOGLE } from '../../services/ApiConfig'



const MenuAuthenticationScreen = ({ navigation }) => {
  const { setUser, GoogleSignin } = useContext(UserContext);
  const { connectSocket, socket, disconnectSocket } = useContext(SocketContext);


  const [isShowDialog, setIsShowDialog] = useState(false)
  // const [listUserOnline, setListUserOnline] = useState(false)
  // const { setUser } = useContext(UserContext);
  // const { connectSocket } = useContext(SocketContext);
  // const [isShowDialog, setIsShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleShowDialog = useCallback(() => {
    setIsShowDialog(prevState => !prevState);
  }, []);

  const SignInWithGoogle = async () => {
    setIsLoading(true); // Hiển thị loading

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setIsShowDialog(false); // Tắt dialog
      console.log('Quá trình đăng nhập quá lâu, đã dừng lại.');
    }, 5000); // Thời gian chờ tối đa là 5 giây

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })

      // await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const accessToken = (await GoogleSignin.getTokens()).accessToken;

      const deviceToken = await messaging().getToken();
      console.log('Device token:', deviceToken);

      const data = userInfo.data.user;
      const user = {
        email: data.email,
        full_name: data.name,
        avatar: data.photo,
        accessToken,
        device_token: deviceToken,
      };

      const response = await fetch(LOGIN_WITH_GOOGLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log('Login response:', responseData);
      // Kết nối với socket server

      if (responseData.status === 200) {
        setUser(responseData.data);
        connectSocket(responseData.data)
        clearTimeout(timeoutId); // Xóa thời gian chờ nếu đăng nhập thành công
        setTimeout(() => {
          setIsLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Screens.BottomTab }],
            })
          );
        }, 1000);
      } else if (responseData.status === 400) {
        toggleShowDialog();
        await GoogleSignin.signOut();
      }
    } catch (error) {
      clearTimeout(timeoutId); // Xóa thời gian chờ nếu có lỗi
      setIsLoading(false);
      setIsShowDialog(false); // Tắt dialog nếu có lỗi
      console.log(error);
    }
  }

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
            onPress={SignInWithGoogle}
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
      <Loading isLoading={isLoading} />
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