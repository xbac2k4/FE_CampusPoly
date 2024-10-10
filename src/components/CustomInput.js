import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';


const CustomInput = (props) => {
    return (
        <View style={st.inputContainer}>
            {props.name && (
                <Text style={{
                    position: 'absolute',
                    left: 50,
                    top: -10,
                    backgroundColor: 'white',
                    fontSize: 15,
                    paddingHorizontal: 5,
                }}>
                    {props.placeholder}
                </Text>
            )}
            {props.leadIcon()}
            <TextInput
                onChangeText={props.onChangeText}
                value={props.name}
                placeholder={props.placeholder}
                style={st.input}
            />
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
        borderColor: 'black',
        marginTop: 10,
        borderRadius: 10,
    },
    input: {
        width: '90%',
        padding: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
})