import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { BlurView } from '@react-native-community/blur'
import Feather from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';



const BlockDialog = ({ isShowDialog, toggleShowDialog }) => {
  const { theme } = useContext(ThemeContext);

    return (
        <Modal animationType='fade'
            transparent={true}
            visible={isShowDialog}
            onRequestClose={toggleShowDialog}
        >

            {/* nền xung quanh dialog */}
            <View style={st.modalContainer}>

                {/* dialog */}
                <View style={[st.modalContent,{
                    backgroundColor : theme? Colors.background : Colors.light,
                    borderColor : theme? Colors.light : Colors.background
                }]}>

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Feather name='alert-triangle' size={30} color='red' />
                        <Text style={st.modalHeader}>Tạm thời tài khoản của bạn bị vô hiệu hóa</Text>
                    </View>
                    <Text style={[st.modalTitle,{
                        color: theme? '#fff' : Colors.background
                    }]}>
                        Cần hỗ trợ vui lòng liên hệ qua địa chỉ: campuspoly.vn@gmail.com
                    </Text>

                    <TouchableOpacity
                        onPress={toggleShowDialog}
                        style={[st.modalButton,{
                            backgroundColor : theme? Colors.background : Colors.light , 
                            borderColor : theme? Colors.light : Colors.background, elevation : theme?0:5
                        }]}>
                        <Text style={[st.modalBtnText,{
                            color: theme? '#fff' : Colors.background
                        }]}>
                            Tôi hiểu
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </Modal>
    )
}

export default BlockDialog

const st = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '70%',
        borderRadius: 20,
        borderWidth: 1,
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
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 20,
        width: '50%',
        alignItems: 'center',
    },
    modalBtnText: {
        fontSize: 16
    }
})