import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import Screens from '../../navigation/Screens'
import Colors from '../../constants/Color'
import BlockDialog from '../../components/MenuAuth/BlockDialog'
import { CommonActions } from '@react-navigation/native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { UserContext } from '../../services/provider/UseContext';
import { SocketContext } from '../../services/provider/SocketContext';
import { Google_Client_ID } from '@env';
import { LOGIN_WITH_GOOGLE } from '../../services/ApiConfig'
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
  webClientId: Google_Client_ID,
  scopes: [
    'profile',
    'email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/user.birthday.read',
    'https://www.googleapis.com/auth/user.gender.read',
  ],
})

const MenuAuthenticationScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { connectSocket } = useContext(SocketContext);


  const [isShowDialog, setIsShowDialog] = useState(false)

  const toggleShowDialog = useCallback(() => {
    setIsShowDialog(prevState => !prevState);
  }, []);

  const SignInWithGoogle = async () => {


    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
      await GoogleSignin.signOut();
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
      }

      const response = await fetch(LOGIN_WITH_GOOGLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Định dạng JSON
        },
        body: JSON.stringify(user), // Chuyển `user` thành chuỗi JSON để gửi lên server
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log('Login response:', responseData);
      setUser(responseData.data);
      connectSocket(responseData.data); // Kết nối với socket server

      // chuyển màn hình và xóa các màn cũ khỏi ngăn xếp
      if (responseData.status === 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: Screens.BottomTab }],
          })
        );
      }

    } catch (error) {
      if (JSON.stringify(error) == {}) {
        console.log('Không có thông tin người dùng');
      } else {
        console.log(error);
      }
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