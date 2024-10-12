import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const WelcomeScreen = () => {

    // hàm xử lý tự đông động chuyển màn hình
    useEffect(() => {
        const timer = setTimeout(() => {
        //   alert('Thông báo', 'Chuyển màn hình')
        }, 3000)
    
        return () => clearTimeout(timer)
      }, [])

    return (
        <View style={st.container}>
            <Image source={require('../assets/images/landinglogo.png')}/>
        </View>
    )
}

export default WelcomeScreen

const st = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
})