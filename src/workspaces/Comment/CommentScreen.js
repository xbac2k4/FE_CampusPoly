import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommentComponent from '../../components/Comment/CommentComponent';
import CommentInputComponent from '../../components/Comment/CommentInputComponent';
import {GET_POST_ID} from '../../services/ApiConfig'
import styles from '../../assets/style/CommentStyle'
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const CommentScreen = () => {
  const route = useRoute();
  const { postId } = route.params;
  const navigation = useNavigation();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh

  // State để theo dõi số lượng lượt thích
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/api/v1/posts/get-post-by-id/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // nếu API yêu cầu JSON
          }
        });

      
        const data = await response.json();
        setPost(data.data);
        setComment(data.data.commentData);
        setLoading(false);
        // console.log(data.data.commentData);


      } catch (error) {
        console.error('Error fetching post data:', error);
        setError(error);
        setLoading(false);
      }
    };
    const fetchCommentsByPostId = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/api/v1/comments/get-comment-by-post?post_id=${postId}`);
        const data = await response.json();
        // console.log(data);

        setComment(data.data); // Giả sử API trả về dữ liệu trong `data.data`
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError(error);
      }
    };

    fetchPostById();
    // fetchCommentsByPostId();
  }, [postId]);

  // Đặt chỉ mục hình ảnh đầu tiên cho các bài viết có nhiều hình ảnh
  useEffect(() => {
    if (post) {
      // console.log(post);
      const initialIndices = {};
      if (post.postData.image && post.postData.image.length > 1) {
        initialIndices[post.postData._id] = 0; // Thiết lập chỉ mục đầu tiên cho các bài có nhiều ảnh
      }
      setActiveImageIndex(initialIndices);
    }
  }, [post]);
  // console.log(post);


 

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading post: {error.message}</Text>;
  }

  if (!post) {
    return <Text style={styles.errorText}>No post found</Text>;
  }

  const renderImages = (images, postId) => {
    // console.log(images);

    if (!images || images.length === 0) return null; // Handle cases where image is missing

    if (images.length === 1) {
      const imageUrl = images[0].replace('localhost', '10.0.2.2');
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
            <Image key={index} source={{ uri: image.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.postImage} />
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

  // hàm format thời gian
  const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = Math.floor((now - postDate) / 1000); // Chênh lệch thời gian tính bằng giây

    if (diff < 60) return `${diff} giây trước`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.barHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.circleIcon}
          >
            <Image
              source={require('../../assets/images/arowleft.png')}
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Comment</Text>
          <Text style={[styles.textHeader, { color: '#181A1C' }]}>Post</Text>
        </View>



        <View style={{ height: 1, backgroundColor: '#323436', marginBottom: 15 }} />

        <View style={styles.headerContent}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { /* Xử lý avatar */ }}>
              <Image source={{ uri: post?.postData?.user_id?.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }}
                style={styles.imageavatar} />
            </TouchableOpacity>
            <View style={{ marginLeft: 6, marginTop: -5 }}>
              <Text style={{ color: '#fff', fontWeight: 'semibold', fontSize: 14, fontFamily: "HankenGrotesk-Regular" }}>{post?.postData?.user_id?.full_name}</Text>
              <Text style={{ fontSize: 12, fontFamily: 'HankenGrotesk-Regular', fontWeight: "medium", color: '#727477' }}>{timeAgo(post.postData.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => { /* Xử lý nút menu */ }}>
            <Image source={require('../../assets/images/dot.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContent}>

          <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '500', color: "#fff" }}>
            {post?.postData?.title}
          </Text>
          <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '500', color: "#fff" }}>
            {post?.postData?.content}
          </Text>
          {post?.postData?.image && renderImages(post?.postData?.image, post?.postData?._id)}
        </View>

        <View style={styles.interactContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconLike}>
              <TouchableOpacity>
                <Image
                  source={isLiked
                    ? require('../../assets/images/hear2.png')
                    : require('../../assets/images/heart.png')}
                  resizeMode='contain'
                  style={{ width: 20, height: 20, marginLeft: 3 }}
                />
              </TouchableOpacity>
              <Text style={styles.textInteract}>{post?.postData?.like_count}</Text>
            </View>
            <View style={styles.iconLike}>
              <TouchableOpacity onPress={() => { /* Xử lý nút comment */ }}>
                <Image source={require("../../assets/images/comment.png")} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 3 }} />
              </TouchableOpacity>
              <Text style={styles.textInteract}>{post?.postData?.comment_count}</Text>
            </View>
            <TouchableOpacity onPress={() => { /* Xử lý nút share */ }} style={[styles.iconLike, { marginLeft: 4 }]}>
              <Image source={require('../../assets/images/share.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsBookmark(!isBookmark)} style={{ marginTop: 5 }}>
            <Image
              source={isBookmark
                ? require('../../assets/images/bookmark2.png')
                : require('../../assets/images/bookmark.png')}
              resizeMode='contain'
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 1, backgroundColor: '#323436', marginTop: 15 }} />
        {/** Sử lí phầm comment */}
        <View style={styles.barComment}>
          <Text style={styles.commentTitle}>
            COMMENTS (<Text>{comment.length}</Text>)
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.recentText}>Mới nhất</Text>
            <TouchableOpacity onPress={() => {
              // Handle action when click on Recent
            }}>
              <Image
                source={require("../../assets/images/arrowbottom.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {comment.map((comment) => (
          <CommentComponent
            key={comment._id}
            avatar={comment.user_id_comment.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg'}
            name={comment.user_id_comment.full_name}
            content={comment.comment_content}
            time={timeAgo(comment.createdAt)} // Format thời gian nếu cần
            likes={0} // Bạn có thể chỉnh sửa nếu cần thêm thông tin về lượt thích
          />
        ))}
      </ScrollView>
      <CommentInputComponent style={styles.commentInput} />
    </View>
  );
};



export default CommentScreen;