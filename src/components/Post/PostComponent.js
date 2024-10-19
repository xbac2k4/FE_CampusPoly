import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated } from 'react-native';

const PostComponent = () => {
  const [inputHeight, setInputHeight] = useState(40); // Chiều cao mặc định ban đầu
  const [isVisible, setIsVisible] = useState(false); // Trạng thái hiển thị của view chứa hình ảnh
  const [animation] = useState(new Animated.Value(0)); // Giá trị animation
  const toggleImages = () => {
    setIsVisible(!isVisible);

    if (!isVisible) {
      // Khi hiển thị, nảy ra
      Animated.spring(animation, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }).start();
    } else {
      // Khi ẩn, quay về vị trí ban đầu
      Animated.spring(animation, {
        toValue: 0,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0], // Hiệu ứng nảy lên
        }),
      },
    ],
  };
  return (
    <View style={styles.container}>
      {/* View chứa Avatar và Post Content */}
      <View style={styles.postRow}>
        <Image
          source={require('../../assets/images/venice1.png')} // Placeholder cho avatar
          style={styles.avatar}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
            placeholder="What’s on your mind?"
            placeholderTextColor="#888"
            multiline
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            } // Tăng chiều cao theo nội dung
            // Thêm các thuộc tính để bỏ khung
            underlineColorAndroid="transparent" // Ẩn đường gạch dưới trên Android
          />
        </View>
      </View>
            <View style={{flexDirection:"row",alignItems:'center'}}>
      {/* Nút Add */}
      <TouchableOpacity style={styles.addButton} onPress={toggleImages}>
       <Image source={require("../../assets/images/add.png")} resizeMode='contain' style={{width:12,height:12}} />
      </TouchableOpacity>
      {/* View chứa các hình ảnh */}
      {isVisible && (
        <Animated.View style={[styles.imageContainer, animatedStyle]}>
          <View style={styles.imageRow}>
          <TouchableOpacity>
              <Image source={require("../../assets/images/image.png")} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/images/GIF.png")} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/images/Camera.png")} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/images/Attachment.png")} style={styles.image} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  postRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Để avatar cố định ở trên cùng
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32, // Hình tròn
    marginRight: 12,
  },
  inputContainer: {
    flex: 1, // Để TextInput chiếm toàn bộ không gian còn lại
    justifyContent: 'flex-start', // Căn chỉnh các phần tử bên trong
  },
  textInput: {
    color: '#ECEBED',
    fontSize: 16,
    padding: 0, // Không có padding nếu bạn muốn không gian xung quanh văn bản
    margin: 0,
    textAlignVertical: 'top', // Đảm bảo văn bản căn đều từ trên
    borderWidth: 0, // Bỏ khung
    backgroundColor: 'transparent', // Thay đổi màu nền thành trong suốt
    // Hoặc có thể để màu khác nếu bạn muốn
  },
  addButton: {
    width:32,
    height:32,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth:1,
    borderColor:"#323436",
    justifyContent:'center'
  },
  imageContainer: {
     width:160,
     height:32,
    borderRadius: 32,
    overflow: 'hidden',
    marginLeft:10,
    backgroundColor:'#323436',
    justifyContent:'center'
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
   
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
