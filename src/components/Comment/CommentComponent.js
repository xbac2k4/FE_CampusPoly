import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../services/provider/UseContext';
import Screens from '../../navigation/Screens';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';
// Component nhận dữ liệu từ props
const CommentComponent = ({
  avatar, name, content, time, likes, initialLiked = false, user_id_comment, navigation
}) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  // State để lưu trạng thái "đã thích" (liked)
  const [isLiked, setIsLiked] = useState(initialLiked);
  // Hàm xử lý khi nhấn vào biểu tượng heart
  const toggleHeart = () => setIsLiked(!isLiked);
  // Xử lý khi bấm vào avatar và tên người dùng
  const handleProfileClick = (user_id_comment) => {
    // console.log(user_id_comment);
    if (user_id_comment._id === user._id) {
      // Nếu ID của người dùng hiện tại trùng khớp, chuyển đến màn hình Profile
      navigation.navigate(Screens.Profile);
    } else {
      // Nếu không, chuyển đến màn hình Profile với tham số ID
      navigation.navigate(Screens.Profile, { id: user_id_comment._id });
    }
  };
  return (
    <View style={styles.commentContainer}>
      <View style={styles.userContainer}>
        {/* Hiển thị avatar */}
        <TouchableOpacity onPress={() => handleProfileClick(user_id_comment)}>
        <Image
          source={{ uri: avatar }}
          resizeMode="cover"
          style={styles.imgAvatar}
        />
          </TouchableOpacity>
        <View style={{ marginLeft: 10,  }}>
          {/* Hiển thị tên và nội dung bình luận */}
           <TouchableOpacity onPress={() => handleProfileClick(user_id_comment)}>
          <Text style={[styles.textName,{
            color : theme? '#ECEBED' : Colors.background 
          }]}>{name}</Text>
          </TouchableOpacity>
          <Text style={[styles.textContent,{
            color : theme? '#ECEBED' : Colors.background 
          }]}>{content}</Text>
          {/* Thời gian và số lượt thích */}
          <View style={styles.timeLikeContainer}>
            <Text style={styles.textTime}>{time}</Text>
            {/* <Text style={styles.textTime}> · </Text> */}
            <TouchableOpacity >
              <Text style={{ ...styles.textTime, marginLeft: 15 }}><Text>Thích</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Biểu tượng heart có thể nhấn */}
      <TouchableOpacity onPress={toggleHeart} style={{ display: 'none' }}>
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
