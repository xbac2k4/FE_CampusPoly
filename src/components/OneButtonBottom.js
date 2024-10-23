import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Color'

const OneButtonBottom = ({onPress,text}) => {
    return (
        <View style={st.bottomBar}>

            <TouchableOpacity
                onPress={onPress}
                style={st.bottomBtn}>
                <Text
                    style={st.btnText}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default OneButtonBottom

const st = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 20,
        borderTopColor: 'white',
        borderTopWidth: 2,
        paddingHorizontal: 20,
    },
    bottomBtn: {
        padding: 15,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        height: 55,
        elevation: 5,
        backgroundColor: Colors.background
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
})