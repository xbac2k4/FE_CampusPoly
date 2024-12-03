import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
// Component nhận dữ liệu từ props
const CommentComponent = ({
  avatar, name, content, time, likes, initialLiked = false
}) => {
  // State để lưu trạng thái "đã thích" (liked)
  const [isLiked, setIsLiked] = useState(initialLiked);
  // Hàm xử lý khi nhấn vào biểu tượng heart
  const toggleHeart = () => setIsLiked(!isLiked);
  return (
    <View style={styles.commentContainer}>
      <View style={styles.userContainer}>
        {/* Hiển thị avatar */}
        <Image
          source={{ uri: avatar }}
          resizeMode="cover"
          style={styles.imgAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          {/* Hiển thị tên và nội dung bình luận */}
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.textContent}>{content}</Text>
          {/* Thời gian và số lượt thích */}
          <View style={styles.timeLikeContainer}>
            <Text style={styles.textTime}>{time}</Text>
            {/* <Text style={styles.textTime}> · </Text> */}
            <TouchableOpacity >
              <Text style={{...styles.textTime, marginLeft: 15}}><Text>Thích</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Biểu tượng heart có thể nhấn */}
      <TouchableOpacity onPress={toggleHeart} style={{display: 'none'}}>
        <Image
          source={
            isLiked
              ? require('../../assets/images/hear2.png')
              : require('../../assets/images/heart.png')
          }
          resizeMode="contain"
          style={styles.iconHeart}
        />
      </TouchableOpacity>
    </View>
  );
};
export default CommentComponent;
const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  userContainer: {
    maxWidth: '75%',
    flexDirection: 'row',
    alignItems: 'start',
  },
  imgAvatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  textName: {
    color: '#ECEBED',
    fontWeight: 'bold',
    fontSize: 13,
  },
  textContent: {
    color: '#FFFFFF',
    fontSize: 13,
  },
  timeLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTime: {
    color: '#727477',
    fontSize: 13,
  },
  iconHeart: {
    height: 20,
    width: 20,
  },
});
