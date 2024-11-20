import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import Feather from 'react-native-vector-icons/Feather';

const BlockDialog = ({ isShowDialog, toggleShowDialog }) => {
    return (
        <Modal animationType='fade'
            transparent={true}
            visible={isShowDialog}
            onRequestClose={toggleShowDialog}
        >

            {/* nền xung quanh dialog */}
            <View style={st.modalContainer}>

                {/* dialog */}
                <View style={st.modalContent}>

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Feather name='alert-triangle' size={30} color='red' />
                        <Text style={st.modalHeader}>Tạm thời tài khoản của bạn bị vô hiệu hóa</Text>
                    </View>
                    <Text style={st.modalTitle}>
                        Cần hỗ trợ vui lòng liên hệ qua địa chỉ: campuspoly.vn@gmail.com
                    </Text>

                    <TouchableOpacity
                        onPress={toggleShowDialog}
                        style={st.modalButton}>
                        <Text style={st.modalBtnText}>
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