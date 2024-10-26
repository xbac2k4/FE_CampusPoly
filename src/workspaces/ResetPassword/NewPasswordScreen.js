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
import OneButtonBottom from '../../components/OneButtonBottom';

const NewPasswordScreen = ({ navigation }) => {

    const [password, setPassword] = useState('')
    const [passErrorText, setPassErrorText] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [confirm, setConfirm] = useState('')
    const [confirmErrorText, setConfirmErrorText] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)

    // Hàm xử lý khi người dùng ấn nút đăng nhập
    const handleResetPass = () => {
        if (password === '' && confirm === '') {
            setPassErrorText('Vui lòng nhập mật khẩu')
            setConfirmErrorText('Vui lòng xác nhận mật khẩu')
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
            setPassErrorText('Mật khẩu phải chứa ít nhất 8 ký tự')
            return
        }

        if (password !== confirm) {
            setConfirmErrorText('Mật khẩu không trùng khớp')
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
                        Đặt lại mật khẩu
                    </Text>
                </View>

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

                {/* thông báo lỗi email */}
                <ErrorMessage message={passErrorText} />

                {/* xác nhận mật khẩu */}
                <CustomInput
                    leadIcon={() => (
                        <Feather
                            name="lock"
                            size={20}
                            color="white"
                            style={{ marginLeft: 10 }}
                        />
                    )}
                    name={confirm}
                    onChangeText={(text) => {
                        setConfirm(text)
                        if (confirmErrorText !== '') {
                            setConfirmErrorText('')
                        }
                    }}
                    placeholder={'Xác nhận mật khẩu'}
                    trailingIcon={() => (
                        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={st.iconContainer}>
                            <Feather name={showConfirm ? 'eye' : 'eye-off'} color="white" size={20} />
                        </TouchableOpacity>
                    )}
                    secureTextEntry={!showConfirm}
                />

                {/* thông báo lỗi mật khẩu */}
                <ErrorMessage message={confirmErrorText} />
            </View>

            {/* nút quên mật khẩu và đăng nhập */}
            <View style={st.bottomContainer}>
                <OneButtonBottom
                    text="Tiếp tục"
                    onPress={handleResetPass}
                />
            </View>

        </View>
    )
}

export default NewPasswordScreen

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