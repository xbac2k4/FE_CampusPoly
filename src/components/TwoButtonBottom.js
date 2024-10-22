import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const TwoButtonBottom = ({ onPress1, text1, onPress2, text2 }) => {
    return (
        <View style={st.bottomBar}>
            <TouchableOpacity
                onPress={onPress1}
                style={[st.bottomBtn, { backgroundColor: '#181a1c' }]}>
                <Text
                    style={st.btnText}>
                    {text1}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onPress2}
                style={[st.bottomBtn, { backgroundColor: '#D9D9D9' }]}>
                <Text
                    style={st.btnRightText}>
                    {text2}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TwoButtonBottom

const st = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        elevation: 5
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },

    btnRightText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }
})