import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, TextInput, View } from 'react-native'


const CustomInput = ({ name, placeholder, leadIcon, onChangeText, trailingIcon, secureTextEntry }) => {
    const [isFocused, setIsFocused] = useState(false)
    const animatedPlaceholder = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(animatedPlaceholder, {
            toValue: isFocused || name ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start()
    }, [isFocused, name])

    const placeholderStyle = {
        position: 'absolute',
        left: leadIcon ? 40 : 10,
        top: animatedPlaceholder.interpolate({
            inputRange: [0, 1],
            outputRange: [25, -10],
        }),
        fontSize: animatedPlaceholder.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: 'white',
        backgroundColor: '#181a1c',
        paddingHorizontal: 5,
        fontWeight: 'bold',

    };

    return (
        <View style={st.inputContainer}>
            <Animated.Text style={placeholderStyle}>
                {placeholder}
            </Animated.Text>
            {leadIcon && leadIcon()}
            <TextInput
                onChangeText={onChangeText}
                value={name}
                style={st.input}
                secureTextEntry={secureTextEntry == null ? false : secureTextEntry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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