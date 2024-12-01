import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
const { width: screenWidth } = Dimensions.get('window');
import styles from '../../assets/style/PostStyle';
import ReportComponent from '../../components/Report/ReportComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import { LIKE_POST, UNLIKE_POST } from '../../services/ApiConfig';
import ToastModal from '../../components/Notification/NotificationModal'
// Import các hình ảnh
import comment from '../../assets/images/comment.png';
import heart from '../../assets/images/heart.png';
import heartFilled from '../../assets/images/hear2.png';
import share from '../../assets/images/share.png';
import { UserContext } from '../../services/provider/UseContext';
import ShareComponent from '../Sheet/ShareButton ';
import { SocketContext } from '../../services/provider/SocketContext';
import { TYPE_LIKE_POST } from '../../services/TypeNotify';
import { timeAgo } from '../../utils/formatTime';
import CrudPost from '../CrudPost/CrudPost';
const ProfilePosts = ({ navigation, data }) => {
  const [userAll, setUserAll] = useState(data); // Chứa các bài viết
  const { user } = useContext(UserContext);
  //   const [user, setUser] = useState(props.data.map((item) => item?.post));
  const refEditDeleteSheet = useRef(); // Dùng cho showEditDeleteSheet
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý lỗi
  const [likedPosts, setLikedPosts] = useState([]); // Lưu trạng thái các bài viết đã thích
  const [savedPosts, setSavedPosts] = useState([]); // Lưu trạng thái các bài viết đã lưu
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh
  //   const navigation = useNavigation(); // Hook to access navigation
  const [selectedPostId, setSelectedPostId] = useState(null); // ID bài viết được chọn để báo cáo
  const [reportSuccess, setReportSuccess] = useState(false);
  const { sendNotifySocket } = useContext(SocketContext);
  // const navigation = useNavigation(); // Hook to access navigation

  const refRBSheet = useRef();

  // const openBottomSheet = (postId) => {
  //   if (postId) {
  //     setSelectedPostId(postId);
  //     refRBSheet.current.open();
  //   } else {
  //     console.error('No post ID provided');
  //   }
  // };
  const openBottomSheet = (postId, postOwnerId) => {
    if (postId) {
      setSelectedPostId(postId);
      if (postOwnerId === user._id) {
        // Nếu bài viết của người dùng hiện tại, mở sheet chỉnh sửa/xóa
        refEditDeleteSheet.current.open();
      } else {
        // Nếu không phải bài viết của người dùng hiện tại, mở sheet báo cáo
        refRBSheet.current.open();
      }
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
  // Xử lý khi bấm vào avatar và tên người dùng
  const handleProfileClick = (userId) => {
    if (userId === user._id) {
      // Nếu ID của người dùng hiện tại trùng khớp, chuyển đến màn hình Profile
      navigation.navigate(Screens.Profile);
    } else {
      // Nếu không, chuyển đến màn hình Profile với tham số ID
      navigation.navigate(Screens.Profile, { id: userId });
    }
  };

  {/** Close thông báo */ }

  // Đặt chỉ mục hình ảnh đầu tiên cho các bài viết có nhiều hình ảnh
  useEffect(() => {
    if (userAll && userAll.length > 0) {
      const initialIndices = {};
      userAll.forEach((postData) => {
        if (postData.postData.image && postData.postData.image.length > 1) {
          initialIndices[postData.postData._id] = 0; // Thiết lập chỉ mục đầu tiên cho các bài có nhiều ảnh
        }
      });
      setActiveImageIndex(initialIndices);
    }
  }, [userAll]);
  {/** Sử lí nút like  */ }
  const toggleLike = async (item) => {
    const userId = user._id;
    const isLiked = item.likeData.some((like) => like.user_id_like === user._id);
    // console.log(item);

    try {
      let response;
      if (isLiked) {
        // Bỏ like (DELETE)
        response = await fetch(UNLIKE_POST, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, post_id: item.postData._id }),
        });
      } else {
        // Thích bài viết (POST)
        response = await fetch(LIKE_POST, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, post_id: item.postData._id }),
        });
      }

      const result = await response.json();
      if (response.ok) {
        if (isLiked) {
          // Cập nhật trạng thái khi bỏ like
          setLikedPosts((prevPosts) => prevPosts.filter((id) => id !== item.postData._id));
          setUserAll((prevPosts) =>
            prevPosts.map((postData) =>
              postData.postData._id === item.postData._id
                ? {
                  ...postData,
                  likeData: postData.likeData.filter((like) => like.user_id_like !== userId), // Xóa like của user
                  postData: {
                    ...postData.postData,
                    like_count: postData.postData.like_count - 1, // Giảm số lượng like
                  },
                }
                : postData
            )
          );
        } else {
          // Cập nhật trạng thái khi thích bài viết
          setLikedPosts((prevPosts) => [...prevPosts, item.postData._id]);
          setUserAll((prevPosts) =>
            prevPosts.map((postData) =>
              postData.postData._id === item.postData._id
                ? {
                  ...postData,
                  likeData: [...postData.likeData, result.data], // Thêm lượt thích mới vào likeData
                  postData: {
                    ...postData.postData,
                    like_count: postData.postData.like_count + 1, // Tăng số lượng like
                  },
                }
                : postData
            )
          );
          console.log({ message: 'Thích thành công', type: 'success' });
          // console.log(item);

          if (item?.postData?.user_id?._id !== user._id) {
            await sendNotifySocket(user.full_name, user._id, 'đã thích bài viết của bạn', item?.postData?.user_id?._id, TYPE_LIKE_POST, item?.postData?._id);
          }
        }
      } else {
        console.error(isLiked ? 'Lỗi khi bỏ like' : 'Lỗi khi thích bài viết', result);
        ToastModal({ message: isLiked ? 'Có lỗi khi bỏ like' : 'Có lỗi khi thích bài viết', type: 'error' });
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện toggle like/unlike:', error);
      ToastModal({ message: 'Có lỗi xảy ra. Vui lòng thử lại.', type: 'error' });
    }
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
  // hàm format thời gian
  // const timeAgo = (date) => {
  //   const now = new Date();
  //   const postDate = new Date(date);
  //   const diff = Math.floor((now - postDate) / 1000); // Chênh lệch thời gian tính bằng giây

  //   if (diff < 60) return `${diff} giây trước`;
  //   const minutes = Math.floor(diff / 60);
  //   if (minutes < 60) return `${minutes} phút trước`;
  //   const hours = Math.floor(minutes / 60);
  //   if (hours < 24) return `${hours} giờ trước`;
  //   const days = Math.floor(hours / 24);
  //   if (days < 30) return `${days} ngày trước`;
  //   const months = Math.floor(days / 30);
  //   if (months < 12) return `${months} tháng trước`;
  //   const years = Math.floor(months / 12);
  //   return `${years} năm trước`;
  // };

  const getExistingPost = (postId) => {
    const post = userAll.find((item) => item.postData._id === postId);
  
    if (post) {
      // // Log dữ liệu title và content của bài viết
      // console.log('Title:', post.postData.title);
      // console.log('Content:', post.postData.content);
      // console.log('img:', post.postData.image);
    console.log('hagtag:', post.postData.hashtag.hashtag_name);
      return {
        title: post.postData.title,
        content: post.postData.content,
        image: post.postData.image,
        hashtag:post.postData.hashtag.hashtag_name
      };
    }
  
    return null; // Trả về null nếu không tìm thấy bài viết
  };
  



  // Hiển thị dữ liệu các bài viết
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.flatListContent}>
        {userAll && userAll.length > 0 ? (
          userAll.map((item) => {
            // console.log(item);
            return (
              <View key={item.postData._id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <TouchableOpacity onPress={() => handleProfileClick(item.postData.user_id._id)}>
                    <Image source={{ uri: item.postData.user_id.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.profileImage} />
                  </TouchableOpacity>
                  <View style={styles.headerText}>
                    <TouchableOpacity onPress={() => handleProfileClick(item.postData.user_id._id)}>
                      <Text style={styles.profileName}>{item.postData.user_id.full_name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.postTime}>{timeAgo(item.postData.createdAt)}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => openBottomSheet(item?.postData?._id, item?.postData?.user_id?._id)} // Truyền cả postId và postOwnerId
                    style={styles.moreIcon}>
                    <Text style={styles.moreText}>⋮</Text>
                  </TouchableOpacity>

                </View>
                <Text style={styles.postText}>{item.postData.title}</Text>
                {item.postData.hashtag?.hashtag_name ? (
                  <Text style={styles.postHashtag}>{item.postData.hashtag.hashtag_name}</Text>
                ) : null}
                {item.postData.image && renderImages(item.postData.image, item.postData._id)}
                <View style={styles.postMeta}>
                  <View style={styles.leftMetaIcons}>
                    {/**Suwr lis chức năng like */}
                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => toggleLike(item)}>
                        <Image
                          source={
                            likedPosts.includes(item.postData._id) ||
                              item.likeData.some(like => like.user_id_like === user._id)
                              ? heartFilled
                              : heart
                          }
                          style={styles.iconImage}
                        />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item.postData.like_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => navigation.navigate(Screens.Comment, { postId: item.postData._id })}>
                        <Image source={comment} style={styles.iconImage} />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item.postData.comment_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <ShareComponent post={{
                        title: item.postData.title,
                        url: item.postData.link, // Link bài viết
                        image: item.postData.image?.[0]?.replace('localhost', '10.0.2.2') || null, // Hình ảnh đầu tiên của bài viết
                      }} />


                    </View>
                  </View>

                </View>
                <View style={styles.separator} />
              </View>
            )
          })
        ) : (
          <Text style={{ color: 'gray', marginTop: 20 }}>No posts available</Text>
        )}
      </ScrollView>

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
      </RBSheet >
      {/* Màn hình Bottom Sheet cho Profile (showEditDeleteSheet) */}
      <RBSheet
        ref={refEditDeleteSheet}
        height={250}
        openDuration={300}
        closeDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: '#ffff',
          },
        }}
      >
        <CrudPost
          postId={selectedPostId}
          onDeleteSuccess={() => {
            setUserAll((prevPosts) =>
              prevPosts.filter((post) => post?.postData?._id !== selectedPostId)
            );
            setSelectedPostId(null);
            refEditDeleteSheet.current.close(); // Đóng sheet khi xóa thành công
          }}
          onUpdateSuccess={() => {
            refEditDeleteSheet.current.close(); // Đóng sheet khi sửa thành công
          }}
          existingPost={getExistingPost(selectedPostId)} // Gọi hàm để lấy dữ liệu bài viết
        />
      </RBSheet>
    </View >
  );
};

export default ProfilePosts;