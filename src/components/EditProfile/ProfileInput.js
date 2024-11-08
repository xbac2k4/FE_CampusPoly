import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ProfileInput = ({
  label,
  value = '', // Set default value to empty string
  onChangeText,
  clearText,
  maxLength,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWithButton}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor="#ccc"
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={clearText} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✖</Text>
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
          <Text style={styles.characterCounter}>
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
    color: '#ffff',
    fontSize: 16,
    marginBottom: 5,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: '#323436',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  characterCounter: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'right',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
});

export default ProfileInput;
