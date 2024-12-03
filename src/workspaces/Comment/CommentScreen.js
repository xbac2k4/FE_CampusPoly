import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import heartFilled from '../../assets/images/hear2.png';
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
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const CommentScreen = () => {
  const route = useRoute();

  const { postId } = route.params;/// ID của  bài viết
  const navigation = useNavigation();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState();
  const [isBookmark, setIsBookmark] = useState(false);
  const [likedPosts, setLikedPosts] = useState(); // Lưu trạng thái các bài viết đã thích
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh
  const [selectedPostId, setSelectedPostId] = useState(null); // ID bài viết được chọn để báo cáo
  const [reportSuccess, setReportSuccess] = useState(false);
  const { sendNotifySocket, socket } = useContext(SocketContext);

  const refRBSheet = useRef();

  const openBottomSheet = (postId) => {
    if (postId) {
      setSelectedPostId(postId);
      refRBSheet.current.open();
    } else {
      console.error('No post ID provided');
    }
  };

  // console.log(user);

  {/** Sử lí cái thông báo  */ }
  const [modalVisible, setModalVisible] = useState(false);
  const handleReportSuccess = () => {
    setReportSuccess(true); // Set report success
    refRBSheet.current.close(); // Close the RBSheet when the report is successful
  };
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
      setComment(data.data.commentData);
      setLoading(false);
      // console.log(data.data.commentData);
      // console.log(data.data.likeData);


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
  // useEffect(() => {
  //   if (socket) {
  //     socket.on('get_user_comment_post', (newComment) => {
  //       console.log('123: ' + newComment);
  //       // fetchPostById();
  //       setPost({
  //         ...post,
  //         postData: {
  //           ...post.postData,
  //           comment_count: post.postData.comment_count + 1,
  //         },
  //       })
  //       setComment([newComment, ...comment])
  //     })
  //   }
  //   return () => {
  //     socket.off('new_message');
  //   };
  // }, [newComment])
  // console.log(post);
  // sử lí nút like 
  // Toggle like/unlike functionality
  // Xử lý like/unlike bài viết
  const toggleLike = async (item) => {
    console.log(item);
    const userId = user._id; // Lấy ID người dùng từ context
    // console.log(user._id);
    // console.log(item.likeData);
    // isLiked = item.likeData.some((like) => like.user_id_like._id === user._id);
    // console.log(isLiked);

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

  return (
    <View style={{ flex: 1, backgroundColor: '#181A1C', }}>
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
      <View style={styles.barHeader}>
        <Text style={styles.textHeader}>Comment</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ height: 1, backgroundColor: '#323436', marginBottom: 15 }} />
        {loading ? <PostCommentLoading /> : (
          <>
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
              {/* <TouchableOpacity onPress={() => { console.log('post:', post); openBottomSheet(post?.postData?._id) }}>
                <Image source={require('../../assets/images/dot.png')} resizeMode='contain' style={{ width: 20, height: 20 }} />
              </TouchableOpacity> */}
            </View>
            <View style={styles.bodyContent}>
              <Text style={{ fontFamily: 'rgl1', fontSize: 20, fontWeight: 'bold', color: "#fff" }}>
                {post?.postData?.title}
              </Text>
              <Text style={{ fontFamily: 'rgl1', fontSize: 17, fontWeight: '600', color: "#fff", marginTop: 10 }}>
                {post?.postData?.content}
              </Text>
              {post?.postData?.hashtag?.hashtag_name ? (
                <Text style={{ fontFamily: 'rgl1', fontSize: 16, fontWeight: '700', color: "#0078D4", marginTop: 10 }}>
                  {post.postData.hashtag.hashtag_name}
                </Text>
              ) : null}

              {post?.postData?.image && renderImages(post?.postData?.image, post?.postData?._id)}
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
                          : heart}
                      resizeMode="contain"
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
              <TouchableOpacity onPress={() => setIsBookmark(!isBookmark)} style={{ marginTop: 5, display: 'none' }}>
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
              {loading ? <SkeletonShimmer width={100} height={20} borderRadius={10} />
                : <Text style={styles.commentTitle}>
                  COMMENTS (<Text>{comment.length}</Text>)
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
            {/* {
              !loading && (
                comment.map((comment) => (
                  <CommentComponent
                    key={comment._id}
                    avatar={comment.user_id_comment.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg'}
                    name={comment.user_id_comment.full_name}
                    content={comment.comment_content}
                    time={timeAgo(comment.createdAt)} // Format thời gian nếu cần
                    likes={0} // Bạn có thể chỉnh sửa nếu cần thêm thông tin về lượt thích
                  />
                ))
              )
            } */}

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
      {/* Bottom Sheet */}
      <RBSheet
        ref={refRBSheet}
        height={250}
        openDuration={300}
        closeDuration={250}
        closeOnDragDown={true} // Cho phép kéo xuống để đóng
        closeOnPressMask={true} // Cho phép đóng khi bấm ra ngoài

        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: '#ffff',
          },

        }}
      >
        <ReportComponent
          postId={selectedPostId}  // Pass selectedPostId here
          onReportSuccess={handleReportSuccess}
        />

      </RBSheet>
    </View>


  );
};



export default CommentScreen;