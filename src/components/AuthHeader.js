import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';

const AuthenticationHeader = ({ navigation }) => {

    return (
        <View style={st.container}>
            {/* thanh statusbar */}
            <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />


            <Text style={st.name}>CAMPUSPOLY</Text>

            {/* nút trở lại */}
            <View
                style={{
                    width: '90%',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthenticationHeader

const st = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    name: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'rubik',
    }
})