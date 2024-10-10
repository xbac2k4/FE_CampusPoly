import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const OneButtonBottom = (props) => {
    return (
        <View style={st.bottomBar}>

            <TouchableOpacity
                onPress={props.onPress}
                style={st.bottomBtn}>
                <Text
                    style={st.btnText}>
                    {props.text}
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