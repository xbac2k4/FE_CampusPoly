import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const ProfileInput = ({
  label,
  value = '', // Set default value to empty string
  onChangeText,
  clearText,
  maxLength,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useContext(ThemeContext);


  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label,{
        color : theme? '#fff' : '#000'
      }]}>{label}</Text>
      <View style={[styles.inputWithButton,{
        backgroundColor : theme? '#000' : Colors.light
      }]}>
        <TextInput
          style={[styles.input,{
            color : theme? '#fff' : '#000'
          }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor={theme? '#CCC' : Colors.background}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={clearText} style={styles.clearButton}>
            <Text style={[styles.clearButtonText,{
              color : theme? '#fff' : Colors.background
            }]}>✖</Text>
          </TouchableOpacity>
        )}
      </View>
      {(isFocused || errorMessage) && (
        <View style={styles.infoContainer}>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : (
            <View style={{flex: 1}} />
          )}
          <Text style={[styles.characterCounter,{
            color : theme? '#ccc' : '#000'
          }]}>
            {value.length}/{maxLength}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#323436',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearButtonText: {
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  characterCounter: {
    fontSize: 12,
    textAlign: 'right',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
});

export default ProfileInput;
