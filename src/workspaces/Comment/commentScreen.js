import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CommentComponent from '../../components/Comment/CommentComponent';
import CommentInputComponent from '../../components/Comment/CommentInputComponent';
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const CommentScreen = () => {
  const route = useRoute();
  const { postId } = route.params;
  const navigation = useNavigation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  // State để theo dõi số lượng lượt thích
  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/api/v1/posts/get-post-by-id/${postId}`);
        const data = await response.json();
        setPost(data.data);
        setLoading(false);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching post data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPostById();
  }, [postId]);

  const fakeComments = [
    {
      id: '1',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Nguyễn Minh',
      content: 'Bài viết rất thú vị!',
      time: '2m',
      likes: 10,
    },
  ];

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading post: {error.message}</Text>;
  }

  if (!post) {
    return <Text style={styles.errorText}>No post found</Text>;
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
          <Text style={styles.textHeader}>POST</Text>
          <Text style={[styles.textHeader, { color: '#181A1C' }]}>Post</Text>
        </View>



        <View style={{ height: 1, backgroundColor: '#323436', marginBottom: 15 }} />

        <View style={styles.headerContent}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { /* Xử lý avatar */ }}>
              <Image source={{ uri: post.postData.user_id.avatar || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }}
                style={styles.imageavatar} />
            </TouchableOpacity>
            <View style={{ marginLeft: 6, marginTop: -5 }}>
              <Text style={{ color: '#fff', fontWeight: 'semibold', fontSize: 14, fontFamily: "HankenGrotesk-Regular" }}>{post.postData.user_id.full_name}</Text>
              <Text style={{ fontSize: 12, fontFamily: 'HankenGrotesk-Regular', fontWeight: "medium", color: '#727477' }}>{new Date(post.createdAt).toLocaleString()}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => { /* Xử lý nút menu */ }}>
            <Image source={require('../../assets/images/dot.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContent}>

            <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '500', color: "#fff" }}>
             {post.postData.title}
            </Text>
            <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '500', color: "#fff" }}>
             {post.postData.content}
            </Text>


{post.postData.image && post.postData.image.length > 0 && (
          <Image source={{ uri: post.postData.image[0] }} style={styles.postImage} />
        )}
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
              <Text style={styles.textInteract}>{post.postData.like_count}</Text>
            </View>
            <View style={styles.iconLike}>
              <TouchableOpacity onPress={() => { /* Xử lý nút comment */ }}>
                <Image source={require("../../assets/images/comment.png")} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 3 }} />
              </TouchableOpacity>
              <Text style={styles.textInteract}>{post.postData.comment_count}</Text>
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
            COMMENTS (<Text>{fakeComments.length}</Text>)
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.recentText}>Recent</Text>
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

        {fakeComments.map(comment => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </ScrollView>
      <CommentInputComponent style={styles.commentInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#181A1C',
    flexGrow: 1,
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
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
  },
  postContent: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#323436',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    color: '#ECEBED',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'rgl1',
  },
  barComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentTitle: {
    fontFamily: 'rgl1',
    fontSize: 14,
    fontWeight: 'regular',
    color: '#ECEBED',
  },
  recentText: {
    fontFamily: 'rgl1',
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#ECEBED',
    marginRight: 3,
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#181A1C', // Set background color for visibility
    padding: 10,
  },
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

export default CommentScreen;
