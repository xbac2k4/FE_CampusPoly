import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AuthenticationHeader = () => { 
    
    return (
        <View style={{
            alignItems: 'center',
            width: '100%' 
            

            // comemt
        }}>
            {/* thanh statusbar */}
            <StatusBar backgroundColor="transparent" barStyle={'dark-content'} />

            {/* logo 123*/}
            <Image
                source={require('../assets/images/logo.png')}
                style={st.logo}
                resizeMode="contain"
            />

            {/* nút trở lại */}
            <View
                style={{
                    width: '90%',
                }}>
                <TouchableOpacity>
                    <Image
                        source={require('../assets/images/left-arrow.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthenticationHeader

const st = StyleSheet.create({
    logo: { width: 180, height: 50 },
})