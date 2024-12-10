import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import heartFilled from '../../assets/images/hear2.png';
import grayComment from '../../assets/images/gray_comment.png';
import commentIcon from '../../assets/images/comment.png';
import heart from '../../assets/images/heart.png';
import styles from '../../assets/style/CommentStyle';
import CommentComponent from '../../components/Comment/CommentComponent';
import CommentInputComponent from '../../components/Comment/CommentInputComponent';
import { PostCommentLoading } from '../../components/Loading/LoadingTimeline';
import SkeletonShimmer from '../../components/Loading/SkeletonShimmer';
import ReportComponent from '../../components/Report/ReportComponent';
import { GET_POST_ID, INTERACTION_SCORE, LIKE_POST, UNLIKE_POST } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';
import { timeAgo } from '../../utils/formatTime';
import { SocketContext } from '../../services/provider/SocketContext';
import { TYPE_COMMENT_POST, TYPE_LIKE_POST } from '../../services/TypeNotify';
import Screens from '../../navigation/Screens';
import RenderImage from '../../components/Post/RenderImage';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';
import grayHeart from '../../assets/images/gray_heart.png';
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const CommentScreen = ({ navigation, route }) => {

  const { postId } = route.params;/// ID của  bài viết
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState();
  const [likedPosts, setLikedPosts] = useState(); // Lưu trạng thái các bài viết đã thích
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh
  // const [selectedPostId, setSelectedPostId] = useState(null); // ID bài viết được chọn để báo cáo
  const { sendNotifySocket, socket } = useContext(SocketContext);


  const { theme } = useContext(ThemeContext);

  // console.log(user);

  {/** Sử lí cái thông báo  */ }
  // const handleReportSuccess = () => {
  //   refRBSheet.current.close(); // Close the RBSheet when the report is successful
  // };
  const { user } = useContext(UserContext);
  const fetchPostById = async () => {
    try {
      const response = await fetch(`${GET_POST_ID}${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // nếu API yêu cầu JSON
        }
      });


      const data = await response.json();


      setPost(data.data);
      if (data?.data?.likeData.some((like) => like.user_id_like._id === user._id)) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }


      setComment(data?.data?.commentData);
      setLoading(false);


    } catch (error) {
      console.error('Error fetching post data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchInteractionScore = async (user_id, hashtag_id, score) => {
    const response = await fetch(INTERACTION_SCORE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, hashtag_id, score }),
    });
    const result = await response.json();
    // if (response.ok) {
    //   if (result.status === 200) {
    //     // console.log('okok');
    //   }
    // }
  };
  // State để theo dõi số lượng lượt thích
  useEffect(() => {
    fetchPostById();
    socket.emit('join_post', postId);
    // fetchCommentsByPostId();
  }, [postId, user._id]);

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

  useFocusEffect(
    useCallback(() => {
      // fetchNotifications();
      if (socket) {
        socket.on('get_user_comment_post', (newComment) => {
          // console.log(newComment);
          fetchPostById();
        })
      }
      return () => {
        socket.off('get_user_comment_post');
      };
    }, [socket, user._id, post])
  );
  const handleProfileClick = (userId) => {
    // console.log(userId);
    if (userId._id === user._id) {
      // Nếu ID của người dùng hiện tại trùng khớp, chuyển đến màn hình Profile
      navigation.navigate(Screens.Profile);
    } else {
      // Nếu không, chuyển đến màn hình Profile với tham số ID
      navigation.navigate(Screens.Profile, { id: userId._id });
    }
  };

  const toggleLike = async (item) => {
    console.log(item);
    const userId = user._id;

    try {
      let response;
      if (isLiked) { // Kiểm tra nếu bài viết đã được like
        response = await fetch(UNLIKE_POST, { // Gửi request unlike
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, post_id: postId }),
        });
      } else {
        response = await fetch(LIKE_POST, { // Gửi request like
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, post_id: postId }),
        });
        if (user._id !== post?.postData?.user_id?._id) {
          await sendNotifySocket(user.full_name, user._id, 'đã thích bài viết của bạn', post?.postData?.user_id?._id, TYPE_LIKE_POST, post?.postData?._id);
        }
        fetchInteractionScore(user._id, item?.postData?.hashtag?._id, 1);
      }

      const result = await response.json(); // Parse kết quả từ response
      if (response.ok) { // Nếu request thành công
        // setLikedPosts((prevLikedPosts) =>
        //   likedPosts.includes(postId) // Cập nhật danh sách bài viết đã thích
        //     ? prevLikedPosts.filter((id) => id !== postId) // Bỏ bài viết khỏi danh sách
        //     : [...prevLikedPosts, postId] // Thêm bài viết vào danh sách
        // );
        if (isLiked) {
          setLikedPosts(true)
        } else {
          setLikedPosts(false)
        }
        // console.log(likedPosts);
        setPost((prevPost) => ({
          ...prevPost,
          likeData: isLiked
            ? // Nếu isLiked là true, xóa người dùng khỏi danh sách like
            prevPost.likeData.filter(
              (like) => like.user_id_like._id !== userId // Thay userId thích vào đây
            )
            : // Nếu isLiked là false, thêm người dùng vào danh sách like
            [
              ...prevPost.likeData,
              {
                user_id_like: {
                  _id: userId, // Thay userId thích vào đây
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          postData: {
            ...prevPost.postData,
            like_count: isLiked
              ? prevPost.postData.like_count - 1 // Giảm số lượng like khi xóa
              : prevPost.postData.like_count + 1, // Tăng số lượng like khi thêm
          },
        }));

        setIsLiked((prevIsLiked) => !prevIsLiked);
        socket.emit('user_comment_post', { postId: post?.postData?._id });
      } else {
        console.error(
          likedPosts.includes(postId)
            ? 'Error while unliking the post'
            : 'Error while liking the post',
          result
        );
      }
    } catch (error) {
      console.error('Error toggling like/unlike:', error); // Xử lý lỗi khi like/unlike
    }
  };

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
  //   // return <CommentLoading/>
  // }

  if (error) {
    return <Text style={styles.errorText}>Error loading post: {error.message}</Text>;
  }

  // if (!post) {
  //   return <Text style={styles.errorText}>No post found</Text>;
  // }

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


  const NoData = () => {
    setTimeout(() => {
      navigation.navigate(Screens.Home, { from: Screens.Comment });
    }, 2000);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bài viết không tồn tại</Text>
      </View>
    );
  }

  if (post === null) {
    return <NoData />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme ? '#181A1C' : '#fff' }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.circleIcon, {
          backgroundColor: theme ? '#181A1C' : '#fff'
        }]}
      >
        <Image
          source={theme ? require('../../assets/images/arowleft.png') :
            require('../../assets/images/light_arowleft.png')
          }
          resizeMode="contain"
          style={{ width: 15, hteight: 15 }}
        />
      </TouchableOpacity>
      <View style={styles.barHeader}>
        <Text style={[styles.textHeader, {
          color: theme ? '#ECEBED' : '#000'
        }]}>Comment</Text>
      </View>
      <ScrollView contentContainerStyle={[styles.container, {
        backgroundColor: theme ? '#181A1C' : '#fff'
      }]}>
        <View style={{ height: 1, backgroundColor: '#323436', marginBottom: 15 }} />
        {loading ? <PostCommentLoading /> : (
          <>
            <View style={styles.headerContent}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleProfileClick(post?.postData?.user_id)}>
                  <Image source={{ uri: post?.postData?.user_id?.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }}
                    style={styles.imageavatar} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleProfileClick(post?.postData?.user_id)}>
                  <View style={{ marginLeft: 6, marginTop: -5 }}>

                    <Text style={{ fontWeight: 'semibold', fontSize: 14, fontFamily: "HankenGrotesk-Regular", color: theme ? '#fff' : Colors.background }}>{post?.postData?.user_id?.full_name}</Text>

                    <Text style={{ fontSize: 12, fontFamily: 'HankenGrotesk-Regular', fontWeight: "medium", color: '#727477' }}>{timeAgo(post?.postData?.createdAt)}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity onPress={() => { console.log('post:', post); openBottomSheet(post?.postData?._id) }}>
                <Image source={require('../../assets/images/dot.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
              </TouchableOpacity> */}
            </View>
            <View style={styles.bodyContent}>
              <Text style={{ fontFamily: 'rgl1', fontSize: 20, fontWeight: 'bold', color: theme ? '#fff' : Colors.background, paddingHorizontal: 10, }}>
                {post?.postData?.title}
              </Text>
              <Text style={{ fontFamily: 'rgl1', fontSize: 17, fontWeight: '600', color: theme ? '#fff' : Colors.background, paddingHorizontal: 10, marginTop: 10 }}>
                {post?.postData?.content}
              </Text>
              {post?.postData?.hashtag?.hashtag_name ? (
                <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '700', color: "#0078D4", marginTop: 10, paddingHorizontal: 10, }}>
                  {post.postData.hashtag.hashtag_name}
                </Text>
              ) : null}

              {post?.postData?.image && <RenderImage images={post?.postData?.image} subStyle={
                {
                  bottom: -33
                }
              } />}
            </View>

            <View style={styles.interactContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.iconLike}>
                  <TouchableOpacity onPress={() => toggleLike(post)}>
                    <Image
                      source={
                        isLiked === true &&
                          post.likeData.some(like => like.user_id_like._id === user._id)
                          ? heartFilled
                          : theme ? heart : grayHeart}
                      resizeMode="contain"
                      style={{ width: 20, height: 20, marginLeft: 3 }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.textInteract, {
                    color: theme ? '#fff' : Colors.background
                  }]}>{post?.postData?.like_count}</Text>
                </View>
                <View style={styles.iconLike}>
                  <TouchableOpacity onPress={() => { /* Xử lý nút comment */ }}>
                    <Image source={theme ? commentIcon : grayComment} resizeMode='contain' style={{ width: 20, height: 20, marginLeft: 3 }} />
                  </TouchableOpacity>
                  <Text style={[styles.textInteract, {
                    color: theme ? '#fff' : Colors.background
                  }]}>{post?.postData?.comment_count}</Text>
                </View>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#323436', marginTop: 15 }} />
            {/** Sử lí phần comment */}
            <View style={styles.barComment}>
              {loading ? <SkeletonShimmer width={100} height={20} borderRadius={10} />
                : <Text style={[styles.commentTitle, {
                  color: theme ? '#ECEBED' : '#000'
                }]}>
                  COMMENTS (<Text>{comment?.length}</Text>)
                </Text>
              }

              <View style={{ flexDirection: 'row', alignItems: 'center', display: 'none' }}>
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

            <View style={{
              paddingHorizontal: 10
            }} >
              {comment
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sắp xếp bình luận mới nhất lên đầu
                .map((comment) => (
                  <CommentComponent
                    key={comment?._id}
                    avatar={comment?.user_id_comment?.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg'}
                    name={comment?.user_id_comment?.full_name}
                    content={comment?.comment_content}
                    time={timeAgo(comment?.createdAt)} // Format thời gian nếu cần
                    likes={0} // Bạn có thể chỉnh sửa nếu cần thêm thông tin về lượt thích
                    user_id_comment={comment?.user_id_comment}
                    navigation={navigation}
                  />
                ))}
            </View>
          </>
        )}
      </ScrollView>
      <CommentInputComponent postId={postId}
        onSend={async (newComment) => {
          // console.log(post);
          if (user._id !== post?.postData?.user_id?._id) {
            await sendNotifySocket(user.full_name, user._id, 'đã bình luận bài viết của bạn', post?.postData?.user_id?._id, TYPE_COMMENT_POST, post?.postData?._id);
          }
          socket.emit('user_comment_post', { postId: post?.postData?._id });
          fetchInteractionScore(user._id, post?.postData?.hashtag._id, 2);
        }} style={styles.commentInput} />
    </View>


  );
};



export default CommentScreen;