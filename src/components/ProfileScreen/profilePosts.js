import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
const { width: screenWidth } = Dimensions.get('window');
import styles from '../../assets/style/PostStyle';
import RBSheet from 'react-native-raw-bottom-sheet';
import { LIKE_POST, UNLIKE_POST } from '../../services/ApiConfig';
import ToastModal from '../../components/Notification/NotificationModal'
// Import các hình ảnh
import avt from '../../assets/images/avt.png';
import bookmark from '../../assets/images/bookmark.png';
import bookmarkFilled from '../../assets/images/bookmark2.png';
import comment from '../../assets/images/comment.png';
import heart from '../../assets/images/heart.png';
import heartFilled from '../../assets/images/hear2.png';
import share from '../../assets/images/share.png';
import report from '../../assets/images/report.png'
import violet from '../../assets/images/violet.png'
import racsim from '../../assets/images/racsim.png'
import untrue from '../../assets/images/untrue.png'
import rectionary from '../../assets/images/rectionary.png'
import NotificationModal from '../../components/Notification/NotificationModal';
import ShareButton from '../Sheet/ShareButton ';
import { UserContext } from '../../services/provider/UseContext';
const ProfilePosts = ({ navigation, data }) => {
  const [userAll, setUserAll] = useState(data); // Chứa các bài viết
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý lỗi
  const [likedPosts, setLikedPosts] = useState([]); // Lưu trạng thái các bài viết đã thích
  const [savedPosts, setSavedPosts] = useState([]); // Lưu trạng thái các bài viết đã lưu
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh
  // const navigation = useNavigation(); // Hook to access navigation

  const refRBSheet = useRef();

  const openBottomSheet = () => {
    refRBSheet.current.open();
  };
  // console.log(user);

  {/** Sử lí cái thông báo  */ }
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    setModalVisible(false);
    setTimeout(() => setModalVisible(false), 2000); // Ẩn thông báo sau 2 giây
    console.log("Confirmed");
  };

  const handleCancel = () => {
    setModalVisible(false);
    console.log("Cancelled");
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
      userAll.forEach((post) => {
        if (post.post.image && post.post.image.length > 1) {
          initialIndices[post.post._id] = 0; // Thiết lập chỉ mục đầu tiên cho các bài có nhiều ảnh
        }
      });
      setActiveImageIndex(initialIndices);
    }
  }, [userAll]);
  {/** Sử lí nút like  */ }
  const toggleLike = async (item) => {
    const userId = user._id;
    const isLiked = item.likeData.some((like) => like.user_id_like === user._id);

    try {
      let response;
      if (isLiked) {
        // Bỏ like (DELETE)
        response = await fetch(UNLIKE_POST, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, post_id: item.post._id }),
        });
      } else {
        // Thích bài viết (POST)
        response = await fetch(LIKE_POST, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, post_id: item.post._id }),
        });
      }

      const result = await response.json();
      if (response.ok) {
        if (isLiked) {
          // Cập nhật trạng thái khi bỏ like
          setLikedPosts((prevPosts) => prevPosts.filter((id) => id !== item.post._id));
          setUserAll((prevPosts) =>
            prevPosts.map((post) =>
              post.post._id === item.post._id
                ? {
                  ...post,
                  likeData: post.likeData.filter((like) => like.user_id_like !== userId), // Xóa like của user
                  post: {
                    ...post.post,
                    like_count: post.post.like_count - 1, // Giảm số lượng like
                  },
                }
                : post
            )
          );
        } else {
          // Cập nhật trạng thái khi thích bài viết
          setLikedPosts((prevPosts) => [...prevPosts, item.post._id]);
          setUserAll((prevPosts) =>
            prevPosts.map((post) =>
              post.post._id === item.post._id
                ? {
                  ...post,
                  likeData: [...post.likeData, result.data], // Thêm lượt thích mới vào likeData
                  post: {
                    ...post.post,
                    like_count: post.post.like_count + 1, // Tăng số lượng like
                  },
                }
                : post
            )
          );
          console.log({ message: 'Thích thành công', type: 'success' });
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
    if (days < 30) return `${days} ngày trước`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} tháng trước`;
    const years = Math.floor(months / 12);
    return `${years} năm trước`;
  };


  // Hiển thị dữ liệu các bài viết
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.flatListContent}>
        {userAll && userAll.length > 0 ? (
          userAll.map((item) => {
            // console.log(item);

            return (
              <View key={item.post._id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <TouchableOpacity onPress={() => handleProfileClick(item.post.user_id._id)}>
                    <Image source={{ uri: item.post.user_id.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.profileImage} />
                  </TouchableOpacity>
                  <View style={styles.headerText}>
                    <TouchableOpacity onPress={() => handleProfileClick(item.post.user_id._id)}>
                      <Text style={styles.profileName}>{item.post.user_id.full_name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.postTime}>{timeAgo(item.post.createdAt)}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={openBottomSheet}
                    style={styles.moreIcon}>
                    <Text style={styles.moreText}>⋮</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.postText}>{item.post.title}</Text>
                {item.post.image && renderImages(item.post.image, item.post._id)}
                <View style={styles.postMeta}>
                  <View style={styles.leftMetaIcons}>
                    {/**Suwr lis chức năng like */}
                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => toggleLike(item)}>
                        <Image
                          source={
                            likedPosts.includes(item.post._id) ||
                              item.likeData.some(like => like.user_id_like === user._id)
                              ? heartFilled
                              : heart
                          }
                          style={styles.iconImage}
                        />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item.post.like_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => navigation.navigate(Screens.Comment, { postId: item.post._id })}>
                        <Image source={comment} style={styles.iconImage} />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item.post.comment_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => {
                        // share
                      }}>
                        <Image source={share} style={styles.iconImage} />
                      </TouchableOpacity>

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

        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          draggableIcon: {
            backgroundColor: '#ffff',
          },

        }}
      >
        <View style={styles.inner}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}

            style={styles.reporttextcontainer}>
            <NotificationModal
              visible={modalVisible}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              message={'Bạn có chắc muốn báo cáo?'}
            />
            <Image source={report} style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }} />
            <Text style={styles.textOne}>Bài viết xúc phạm người dùng khác</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reporttextcontainer}>
            <Image source={untrue} style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }} />
            <Text style={styles.textOne}>Bài viết sai sự thật</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reporttextcontainer}>
            <Image source={violet} style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }} />
            <Text style={styles.textOne}>Bài viết mang tính bạo lực - kích động</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reporttextcontainer}>
            <Image source={rectionary} style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }} />
            <Text style={styles.textOne}>Bài viết mang tính phản động</Text>
          </TouchableOpacity><TouchableOpacity style={styles.reporttextcontainer}>
            <Image source={racsim} style={{ marginTop: '5.5%', width: 20, height: 20, marginRight: 4 }} />
            <Text style={styles.textOne}>Bài viết mang tính phân biệt</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

    </View>
  );
};

export default ProfilePosts;