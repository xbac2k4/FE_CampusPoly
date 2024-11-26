import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../../services/provider/UseContext';
import { ADD_COMMENT } from '../../services/ApiConfig';

const CommentInputComponent = ({ postId, onSend }) => {
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);

  const handleSendComment = async () => {
    if (!comment.trim()) {
      Alert.alert('Lỗi', 'Nội dung comment không được để trống.');
      return;
    }
  
    if (!user?._id) {
      Alert.alert('Lỗi', 'Bạn cần đăng nhập để gửi comment.');
      return;
    }
  
    try {
      const response = await fetch(ADD_COMMENT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user._id,
          post_id: postId,
          comment_content: comment.trim(),
        }),
      });
  
      const data = await response.json();
      if (data.success) {
        onSend?.(data.data); // Gọi callback để thêm comment mới vào danh sách
        setComment(''); // Làm trống nội dung TextInput
      } else {
        // Alert.alert('Lỗi', data.message || 'Không thể gửi comment.');
      }
    } catch (error) {
      console.error('Error sending comment:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi comment.');
    } finally {
      Keyboard.dismiss(); // Đóng bàn phím bất kể thành công hay thất bại
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập comment tại đây..."
          placeholderTextColor="#ECEBED"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Image
            source={require('../../assets/images/add.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <LinearGradient
          colors={['#F62E8E', '#AC1AF0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sendButtonWrapper}
        >
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendComment}
          >
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
    marginRight: 8,
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
    borderRadius: 16,
    overflow: 'hidden',
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
    alignItems: 'center',
  },
});
