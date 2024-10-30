import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth } = Dimensions.get('window');

// Import các hình ảnh
import avt from '../../assets/images/avt.png';
import bookmark from '../../assets/images/bookmark.png';
import bookmarkFilled from '../../assets/images/bookmark2.png';
import comment from '../../assets/images/comment.png';
import heart from '../../assets/images/heart.png';
import heartFilled from '../../assets/images/hear2.png';
import share from '../../assets/images/share.png';

const CommentArticle = ({ user }) => {
  const [likedPosts, setLikedPosts] = useState([]); 
  const [savedPosts, setSavedPosts] = useState([]); 
  const [activeImageIndex, setActiveImageIndex] = useState({}); 

  if (!user) {
    return null; 
  }

  useEffect(() => {
    const initialIndices = {};
    user.posts.forEach((post) => {
      if (post.images && post.images.length > 1) {
        initialIndices[post.id] = 0; // Thiết lập chỉ mục đầu tiên cho các bài có nhiều ảnh
      }
    });
    setActiveImageIndex(initialIndices);
  }, [user.posts]);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => 
      prevLikedPosts.includes(postId)
        ? prevLikedPosts.filter((id) => id !== postId)
        : [...prevLikedPosts, postId]
    ); // Chuyển đổi trạng thái thích của bài đăng
  };

  const toggleSave = (postId) => {
    setSavedPosts((prevSavedPosts) => 
      prevSavedPosts.includes(postId)
        ? prevSavedPosts.filter((id) => id !== postId)
        : [...prevSavedPosts, postId]
    ); // Chuyển đổi trạng thái lưu của bài đăng
  };

  const renderImages = (images, postId) => {
    if (images.length === 1) {
      return <Image source={images[0]} style={styles.postImage} />;
    }

    return (
      <>
        <ScrollView
          horizontal
          pagingEnabled
          style={styles.imageList}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
            setActiveImageIndex((prevState) => ({
              ...prevState,
              [postId]: index,
            }));
          }}
        >
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.postImage} />
          ))}
        </ScrollView>
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeImageIndex[postId] === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.flatListContent}>
      {user.posts.map((item) => (
        <View key={item.id} style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image source={user.profileImage} style={styles.profileImage} />
            <View style={styles.headerText}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.moreIcon}>
              <Text style={styles.moreText}>⋮</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.postText}>{item.text}</Text>
          {item.images && renderImages(item.images, item.id)}
          <View style={styles.postMeta}>
            <View style={styles.leftMetaIcons}>
              <TouchableOpacity style={styles.iconButton} onPress={() => toggleLike(item.id)}>
                <Image
                  source={likedPosts.includes(item.id) ? heartFilled : heart}
                  style={styles.iconImage}
                />
                <Text style={styles.metaText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={comment} style={styles.iconImage} />
                <Text style={styles.metaText}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={share} style={styles.iconImage} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={() => toggleSave(item.id)}>
              <Image
                source={savedPosts.includes(item.id) ? bookmarkFilled : bookmark}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  postTime: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  moreIcon: {
    paddingLeft: 10,
  },
  moreText: {
    fontSize: 20,
    color: '#B3B3B3',
  },
  postText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: screenWidth - 50,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  leftMetaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  metaText: {
    color: '#B3B3B3',
    fontSize: 14,
    marginLeft: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#B3B3B3',
    marginTop: 15,
    marginBottom: 10,
  },
  imageList: {
    marginBottom: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF0000',
  },
  inactiveDot: {
    backgroundColor: '#B3B3B3',
  },
});

export default CommentArticle;