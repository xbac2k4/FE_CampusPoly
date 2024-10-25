import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
const { width: screenWidth } = Dimensions.get('window');

// Import các hình ảnh
import avt from '../../assets/images/avt.png';
import bookmark from '../../assets/images/bookmark.png';
import bookmarkFilled from '../../assets/images/bookmark2.png';
import comment from '../../assets/images/comment.png';
import heart from '../../assets/images/heart.png';
import heartFilled from '../../assets/images/hear2.png';
import share from '../../assets/images/share.png';

const ProfilePosts = ({ post }) => {
  const [user, setUser] = useState([]); // Chứa các bài viết
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý lỗi
  const [likedPosts, setLikedPosts] = useState([]); // Lưu trạng thái các bài viết đã thích
  const [savedPosts, setSavedPosts] = useState([]); // Lưu trạng thái các bài viết đã lưu
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh
  const navigation = useNavigation(); // Hook to access navigation


  
  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch("http://192.168.1.101:3000/api/v1/posts/get-all-post");
        const data = await response.json();
        setUser(data.data); // Lưu bài viết vào state (giả sử data.data chứa danh sách bài viết)
        setLoading(false); // Tắt loading
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error); // Lưu lỗi vào state
        setLoading(false); // Tắt loading
      }
    };

    fetchUserData();
  }, []);

  // Đặt chỉ mục hình ảnh đầu tiên cho các bài viết có nhiều hình ảnh
  useEffect(() => {
    if (user && user.length > 0) {
      const initialIndices = {};
      user.forEach((post) => {
        if (post.image && post.image.length > 1) {
          initialIndices[post._id] = 0; // Thiết lập chỉ mục đầu tiên cho các bài có nhiều ảnh
        }
      });
      setActiveImageIndex(initialIndices);
    }
  }, [user]);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) =>
      prevLikedPosts.includes(postId)
        ? prevLikedPosts.filter((id) => id !== postId)
        : [...prevLikedPosts, postId]
    );
  };

  const toggleSave = (postId) => {
    setSavedPosts((prevSavedPosts) =>
      prevSavedPosts.includes(postId)
        ? prevSavedPosts.filter((id) => id !== postId)
        : [...prevSavedPosts, postId]
    );
  };

  // Hiển thị hình ảnh của bài viết
  const renderImages = (images, postId) => {
    if (!images || images.length === 0) return null; // Handle cases where image is missing
  
    if (images.length === 1) {
      const imageUrl = images[0];
      return imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.postImage} />
      ) : null;
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
            <Image key={index} source={{ uri: image || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.postImage} />
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

  // Xử lý khi đang tải dữ liệu
  if (loading) {
    return <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />;
  }

  // Xử lý lỗi
  if (error) {
    return <Text style={{ color: 'red', marginTop: 20 }}>Error loading data: {error.message}</Text>;
  }

  // Hiển thị dữ liệu các bài viết
  return (
    <ScrollView contentContainerStyle={styles.flatListContent}>
      {user && user.length > 0 ? (
        user.map((item) => (
          <View key={item._id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.user_id.avatar || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.profileImage} />
              <View style={styles.headerText}>
                <Text style={styles.profileName}>{item.user_id.full_name}</Text>
                <Text style={styles.postTime}>{new Date(item.createdAt).toLocaleString()}</Text>
              </View>
              <TouchableOpacity style={styles.moreIcon}>
                <Text style={styles.moreText}>⋮</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.postText}>{item.title}</Text>
            {item.image && renderImages(item.image, item._id)}
            <View style={styles.postMeta}>
              <View style={styles.leftMetaIcons}>
                <View style={styles.iconLike}>
                  <TouchableOpacity onPress={() => toggleLike(item._id)}>
                    <Image
                      source={likedPosts.includes(item._id) ? heartFilled : heart}
                      style={styles.iconImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.metaText}>{item.like_count}</Text>
                </View>

                <View style={styles.iconLike}>
                  <TouchableOpacity onPress={() => navigation.navigate(Screens.Comment, { postId: item._id })}
                  
                    >
                    
                    <Image source={comment} style={styles.iconImage} />
                  </TouchableOpacity>
                  <Text style={styles.metaText}>{item.comment_count}</Text>
                </View>

                <View style={styles.iconLike}>
                  <TouchableOpacity>
                    <Image source={share} style={styles.iconImage} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.iconLike}>
                <TouchableOpacity style={styles.iconButton} onPress={() => toggleSave(item._id)}>
                  <Image
                    source={savedPosts.includes(item._id) ? bookmarkFilled : bookmark}
                    style={styles.iconImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        ))
      ) : (
        <Text style={{ color: 'gray', marginTop: 20 }}>No posts available</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: '#181A1C',
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
  iconLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default ProfilePosts;
