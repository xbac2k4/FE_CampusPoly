import React, { useState, useContext, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../../services/provider/UseContext';
import { ADD_COMMENT } from '../../services/ApiConfig';

const CommentInputComponent = ({ postId, onSend }) => {
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext); // Lấy user từ Context
  const animationValue = useRef(new Animated.Value(0)).current;

  // console.log('User từ Context:', user);
  const handleSendComment = async () => {
    // console.log('User từ Context:', user._id);
    // console.log('User từ Context:', postId);
    // if (!comment.trim()) {
    //   Alert.alert('Lỗi', 'Nội dung comment không được để trống.');
    //   return;
    // }

    // if (!user?._id) {
    //   console.log('Lỗi: Không có User ID');
    //   Alert.alert('Lỗi', 'Bạn cần đăng nhập để gửi comment.');
    //   return;
    // }
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
      // console.log('Response data:', data);
      if (data.status === 200) {
        onSend(data.data); // Callback khi gửi comment thành công
        // console.log();    
      } else {
        // Alert.alert('Lỗi', data.message || 'Không thể gửi comment.');
      }
    } catch (error) {
      console.error('Error sending comment:', error);
      // Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi comment.');
    } finally {
      Keyboard.dismiss();
      setComment(''); // Xóa input sau khi gửi
    }
  };
  useEffect(() => {
    // Khi có nội dung trong comment, trigger animation
    if (comment.trim()) {
      Animated.timing(animationValue, {
        toValue: 1, // Hiển thị nút
        duration: 30,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 0, // Ẩn nút
        duration: 30,
        useNativeDriver: true,
      }).start();
    }
  }, [comment]);
  // Tạo hiệu ứng trượt vào từ phải
  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Trượt từ 50px sang 0px
  });
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
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/add.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {/* Nút gửi với Gradient */}
      {
        !comment.trim() ? (
          <View />
        ) : (
          <Animated.View
            style={[
              { transform: [{ translateX }] }, // Thêm hiệu ứng trượt
              { opacity: animationValue }, // Thêm hiệu ứng mờ dần
            ]}
          >
            <LinearGradient
              colors={['#F7B733', '#FC4A1A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.sendButtonWrapper}
            >
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => handleSendComment()}
              >
                <Image
                  source={require('../../assets/images/Vector.png')}
                  resizeMode="contain"
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )
      }
    </View >
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
    transform: [{ rotate: '90deg' }]
  },
});
