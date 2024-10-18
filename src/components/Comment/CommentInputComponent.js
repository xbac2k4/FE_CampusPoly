import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CommentInputComponent = ({ onSend }) => {
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your comment here..."
          placeholderTextColor="#ECEBED"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={{marginRight:10}}>
          <Image
            source={require('../../assets/images/add.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* Nút gửi với Gradient */}
      <LinearGradient
        colors={['#F62E8E', '#AC1AF0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.sendButtonWrapper}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            onSend(comment);
            setComment(''); // Clear input sau khi gửi
          }}>
          <Image
            source={require('../../assets/images/Vector.png')}
            resizeMode="contain"
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </LinearGradient>
      </View>

      
    </View>
  );
};

export default CommentInputComponent;

const styles = StyleSheet.create({
  container: {
    height: 88,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    height: 40,
    backgroundColor: '#323436',
    borderRadius: 20,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8, // Giãn cách khỏi nút gửi
  },
  textInput: {
    flex: 1,
    color: '#ECEBED',
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  sendButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16, // Đảm bảo Gradient cũng bo tròn
    overflow: 'hidden', // Ẩn mọi thứ tràn ra ngoài
  },
  sendButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 15,
    height: 15,
    tintColor: '#FFFFFF',
    alignItems:"center"
  },
});
