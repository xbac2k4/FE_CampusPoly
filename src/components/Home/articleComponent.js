import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh

const ArticleComponent = ({
  id,
  imgavatar,
  username,
  time,
  content,
  imgcontent,
  likecount,
  commentcount,
}) => {
  // Trạng thái để theo dõi có thích hay không
  const [isLiked, setIsLiked] = useState(false);
  //Trạng thái để theo dõi bookmark
  const [isBookmark, setIsBookmark] = useState(false);
  // State để theo dõi số lượng lượt thích
  const [likes, setLikes] = useState(likecount);

  // Hàm xử lý khi nhấn nút thích
  const handleLikePress = () => {
    setIsLiked(!isLiked); // Đảo trạng thái thích
    setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1)); // Cập nhật số lượng lượt thích
  };

  return (
    <View style={styles.container}>
      
      <View style={{ height: 1, backgroundColor: '#323436', marginBottom: 15 }} />
      
      <View style={styles.headerContent}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { /* Xử lý avatar */ }}>
            <Image source={imgavatar} style={styles.imageavatar} />
          </TouchableOpacity>
          <View style={{ marginLeft: 6, marginTop: -5 }}>
            <Text style={{ color: '#fff', fontWeight: 'semibold', fontSize: 14, fontFamily: "HankenGrotesk-Regular" }}>{username}</Text>
            <Text style={{ fontSize: 12, fontFamily: 'HankenGrotesk-Regular', fontWeight: "medium", color: '#727477' }}>{time}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => { /* Xử lý nút menu */ }}>
          <Image source={require('../../assets/images/dot.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContent}>
        {content ? (
          <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '500', color: "#fff" }}>
            {content}
          </Text>
        ) : null}
        
        {imgcontent ? (
          <TouchableOpacity>
            <Image source={imgcontent} style={styles.imgContent} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      <View style={styles.interactContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconLike}>
            <TouchableOpacity onPress={handleLikePress}>
              <Image
                source={isLiked
                  ? require('../../assets/images/hear2.png') 
                  : require('../../assets/images/heart.png')}
                resizeMode='contain'
                style={{ width: 20, height: 20, marginLeft: 3 }}
              />
            </TouchableOpacity>
            <Text style={styles.textInteract}>{likes}</Text>
          </View>
          <View style={styles.iconLike}>
            <TouchableOpacity onPress={() => { /* Xử lý nút comment */ }}>
              <Image source={require("../../assets/images/comment.png")} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 3 }} />
            </TouchableOpacity>
            <Text style={styles.textInteract}>{commentcount}</Text>
          </View>
          <TouchableOpacity onPress={() => { /* Xử lý nút share */ }} style={[styles.iconLike, { marginLeft: 4 }]}>
            <Image source={require('../../assets/images/share.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsBookmark(!isBookmark)}  style={{ marginTop: 5 }}>
        <Image
                source={isBookmark
                  ? require('../../assets/images/bookmark2.png') 
                  : require('../../assets/images/bookmark.png')}
                resizeMode='contain'
                style={{ width: 20, height: 20}}
              />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, backgroundColor: '#323436', marginTop: 15 }} />
    </View>
  );
};

export default ArticleComponent;

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageavatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  bodyContent: {
    marginTop: 10,
  },
  imgContent: {
    width: screenWidth - 50,
    height: 200,
    borderRadius: 16,
    marginTop: 10,
  },
  interactContainer: {
    flexDirection: 'row',
    marginTop: 17,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  iconLike: {
    marginLeft: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 9,
  },
  textInteract: {
    fontFamily: 'rgl1',
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});
