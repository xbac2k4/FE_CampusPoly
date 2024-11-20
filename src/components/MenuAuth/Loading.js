import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'

const Loading = ({ isLoading }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isLoading}
        >

            <View style={st.modalContainer}>

                <ActivityIndicator size={50} color={'white'} animating={isLoading} />
            </View>
        </Modal>
    )
}

export default Loading

const st = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
})