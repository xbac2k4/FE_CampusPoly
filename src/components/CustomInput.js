import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'


const CustomInput = ({ name, placeholder, leadIcon, onChangeText, trailingIcon, secureTextEntry }) => {
    return (
        <View style={st.inputContainer}>
            {name && (
                <Text style={st.label}>
                    {placeholder}
                </Text>
            )}
            {leadIcon && leadIcon()}
            <TextInput
                onChangeText={onChangeText}
                value={name}
                placeholder={placeholder}
                placeholderTextColor="white"
                style={st.input}
                secureTextEntry={secureTextEntry == null ? false : secureTextEntry}
            />
            {trailingIcon && trailingIcon()}
        </View>
    )
}

export default CustomInput

const st = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 10,
        borderRadius: 10,
    },
    label: {
        color: 'white',
        position: 'absolute',
        left: 50,
        top: -10,
        backgroundColor: '#181a1c',
        fontSize: 15,
        paddingHorizontal: 5,
    },
    input: {
        flex: 1,
        padding: 20,
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    iconContainer: {
        padding: 10,
    },
})