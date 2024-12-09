import messaging from '@react-native-firebase/messaging'
import { CommonActions } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import BlockDialog from '../../components/MenuAuth/BlockDialog'
import Loading from '../../components/MenuAuth/Loading'
import NotificationModal from '../../components/Notification/NotificationModal'
import Colors from '../../constants/Color'
import Screens from '../../navigation/Screens'
import { LOGIN_WITH_GOOGLE } from '../../services/ApiConfig'
import { SocketContext } from '../../services/provider/SocketContext'
import { UserContext } from '../../services/provider/UseContext'
import { ThemeContext } from '../../services/provider/ThemeContext'



const MenuAuthenticationScreen = ({ navigation }) => {
  const { setUser, GoogleSignin } = useContext(UserContext);
  const { connectSocket, disconnectSocket } = useContext(SocketContext);
  const { theme } = useContext(ThemeContext);



  const [isShowDialog, setIsShowDialog] = useState(false)
  const [modalVisible, setModalVisible] = useState(false); // State to control modal
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
        // console.log(responseData.data);
        // console.log(usersOnline);
        // const isUserOnline = usersOnline.some(user => user._id === responseData.data._id);
        // // console.log(isUserOnline); // Kết quả: true

        // if (isUserOnline === true) {
        //   setModalVisible(true);
        //   return;
        // }
        clearTimeout(timeoutId); // Xóa thời gian chờ nếu đăng nhập thành công
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: Screens.BottomTab }],
            })
          );
          setIsLoading(false);
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
  const handleConfirm = async () => {
    setModalVisible(false); // Hide modal
    GoogleSignin.signOut();
    disconnectSocket();
  };

  const handleCancel = () => {
    setModalVisible(false); // Hide modal
  };
  return (
    <View style={[st.container, {
      backgroundColor: theme ? Colors.background : '#fff',
    }]}>

      {/* làm cho thanh statusbar trong suốt */}
      <StatusBar translucent backgroundColor="transparent" barStyle={theme ? 'light-content' : 'dark-content'} />

      {/* phần nội dung */}
      <View style={st.content}>

        {/* tên ứng dụng */}
        <Text style={[st.name, {
          color: theme ? '#fff' : Colors.background,
        }]}>CAMPUSPOLY</Text>

        {/* tiêu đề */}
        <Text style={[st.title, {
          color: theme ? '#fff' : Colors.background,
        }]}>Cùng xem điều gì đang diễn ra ngay bây giờ</Text>

        {/* phần nút */}
        <View
          style={st.buttonContainer}
        >

          {/* nút đăng nhập với google */}
          <TouchableOpacity
            style={[st.btn, {
              borderColor: theme ? '#fff' : Colors.background,
            }]}
            onPress={SignInWithGoogle}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../assets/images/GoogleLogo.png')} />
            <Text
              style={[st.btnText, {
                color: theme ? '#fff' : Colors.background,
              }]}
            >Đăng nhập với Google</Text>
          </TouchableOpacity>


        </View>

        {/* Điều khoản */}
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            marginBottom: 100,
            color: theme ? '#fff' : Colors.background,
          }}>
          <Text>Bằng cách đăng ký bạn đồng ý với </Text>
          <Text style={{ color: '#57B5F4' }}>Điều khoản, Chính sách riêng tư và Sử dụng cookie </Text>
          <Text>của chúng tôi</Text>
        </Text>
      </View>

      <BlockDialog isShowDialog={isShowDialog} toggleShowDialog={toggleShowDialog} />
      <Loading isLoading={isLoading} />
      <NotificationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Tài khoản của bạn đang được đăng nhập ở nơi khác"
      />
    </View>
  )
}

export default MenuAuthenticationScreen

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 45,
    fontFamily: 'rubik',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
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
    borderWidth: 1,
    minHeight: 60,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10
  }
})