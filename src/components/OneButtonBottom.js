import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

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
        borderTopColor: 'black',
        borderTopWidth: 2,
        paddingHorizontal: 20,
    },
    bottomBtn: {
        padding: 15,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'black',
        height: 55,
        elevation: 5,
        backgroundColor: '#D9D9D9'
    },
    btnText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }
})