import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthenticationHeader from '../../components/AuthHeader';
import OneButtonBottom from '../../components/OneButtonBottom';
import CustomInput from '../../components/CustomInput';
import ErrorMessage from '../../components/ErrorMessage';
import Screens from '../../navigation/Screens';
import Colors from '../../constants/Color';


const ResetPasswordScreen = ({ route, navigation }) => {
    const email = route?.params?.email ?? '12@gmail.com'
    const [OTP, setOTP] = useState('')
    const [OTPErrorText, setOTPErrorText] = useState('')

    // Hàm xử lý khi người dùng ấn nút đăng nhập
    const handleSend = () => {
        if (OTP === '') {
            setOTPErrorText('Vui lòng nhập OTP')
            return
        }

        alert('Xử lý hành động gửi mã OTP')

        navigation.navigate(Screens.MenuAuth)
    }

    const handleForgetPassword = () => {
        alert('Xử lý hành động không nhận được email')
    }
    return (
        <View style={st.container}>

            <AuthenticationHeader navigation={navigation} />

            {/* form nhập mã OTP */}
            <View style={st.form}>

                {/* tiêu đề */}
                <View
                    style={{ width: '80%' }}>
                    <Text
                        style={st.title}>
                        Chúng tôi đã gửi mã cho bạn
                    </Text>
                    <Text
                        style={st.description}>
                        Nhập vào bên dưới để xác thực {email}
                    </Text>
                </View>

                {/* nhập mã OTP */}
                <View style={{
                    marginTop: 20
                }}>
                    <CustomInput
                        name={OTP}
                        placeholder='Mã xác nhận'
                        leadIcon={() => (
                            <MaterialCommunityIcons
                                name="onepassword"
                                size={20}
                                color="white"
                                style={{ marginLeft: 10 }}
                            />
                        )}
                        onChangeText={(text) => {
                            setOTP(text)
                            if (OTPErrorText !== '') {
                                setOTPErrorText('')
                            }
                        }}
                    />

                    {/* thông báo lỗi mã OTP */}
                    <ErrorMessage message={OTPErrorText} />

                    {/* không nhận được email */}
                    <TouchableOpacity onPress={handleForgetPassword}>
                        <Text style={{ color: '#57B5F4', fontWeight: 'bold' }}>Bạn không nhận được email?</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* nút tiếp theo */}
            <View style={st.bottomContainer}>
                <OneButtonBottom
                    text='Gửi'
                    onPress={handleSend}
                />

            </View>




        </View>
    )
}

export default ResetPasswordScreen

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
        fontSize: 15,
        marginTop: 10,
    },
    bottomContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    }
})