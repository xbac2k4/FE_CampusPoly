import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
const { width: screenWidth } = Dimensions.get('window');
import styles from '../../assets/style/PostStyle';
import ReportComponent from '../../components/Report/ReportComponent';
import RBSheet from 'react-native-raw-bottom-sheet';
import NotificationModal from '../../components/Notification/NotificationModal'; // Import NotificationModal

import ToastModal from '../../components/Notification/NotificationModal'
// Import các hình ảnh
import avt from '../../assets/images/avt.png';
import bookmark from '../../assets/images/bookmark.png';
import bookmarkFilled from '../../assets/images/bookmark2.png';
import comment from '../../assets/images/comment.png';
import heart from '../../assets/images/heart.png';
import heartFilled from '../../assets/images/hear2.png';
import share from '../../assets/images/share.png';

const ProfilePosts = (props) => {
  // const [user, setUser] = useState(props.data); // Chứa các bài viết
  const [user, setUser] = useState(props.data.map((item) => item?.post));
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý lỗi
  const [likedPosts, setLikedPosts] = useState([]); // Lưu trạng thái các bài viết đã thích
  const [savedPosts, setSavedPosts] = useState([]); // Lưu trạng thái các bài viết đã lưu
  const [activeImageIndex, setActiveImageIndex] = useState({}); // Quản lý chỉ số ảnh đang hiển thị cho mỗi bài có nhiều ảnh
  const navigation = useNavigation(); // Hook to access navigation
  const [selectedPostId, setSelectedPostId] = useState(null); // ID bài viết được chọn để báo cáo
  const [reportSuccess, setReportSuccess] = useState(false);

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
    if (user && user.length > 0) {
      const initialIndices = {};
      user.forEach((post) => {
        if (post?.image && post?.image.length > 1) {
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
        {user && user.length > 0 ? (
          user.map((item) => {
            // console.log(item);
            return (
              <View key={item?._id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <TouchableOpacity onPress={() => handleProfileClick(item?.user_id._id)}>
                    <Image
                      source={{
                        uri: item?.user_id
                          ? item?.user_id.avatar.replace('localhost', '10.0.2.2')
                          : 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg'
                      }}
                      style={styles.profileImage}
                    />
                  </TouchableOpacity>
                  <View style={styles.headerText}>
                    <TouchableOpacity onPress={() => handleProfileClick(item?.user_id._id)}>
                      <Text style={styles.profileName}>{
                        item?.user_id ? item?.user_id.full_name : 'Unknown'
                      }</Text>
                    </TouchableOpacity>
                    <Text style={styles.postTime}>{timeAgo(item?.createdAt)}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {console.log('item:', item);openBottomSheet(item?._id)}}
                    style={styles.moreIcon}>
                    <Text style={styles.moreText}>⋮</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.postText}>{item?.title}</Text>
                {item?.image && renderImages(item?.image, item?._id)}
                <View style={styles.postMeta}>
                  <View style={styles.leftMetaIcons}>
                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => toggleLike(item?._id)}>
                        <Image
                          source={likedPosts.includes(item?._id) ? heartFilled : heart}
                          style={styles.iconImage}
                        />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item?.like_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => navigation.navigate(Screens.Comment, { postId: item?._id })}>
                        <Image source={comment} style={styles.iconImage} />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item?.comment_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <TouchableOpacity>
                        <Image source={share} style={styles.iconImage} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.iconLike}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => toggleSave(item?._id)}>
                      <Image
                        source={savedPosts.includes(item?._id) ? bookmarkFilled : bookmark}
                        style={styles.iconImage}
                      />
                    </TouchableOpacity>
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

      </RBSheet>
      <NotificationModal
        visible={modalVisible}
        onConfirm={() => setModalVisible(false)}
        success={reportSuccess}
      />

    </View>
  );
};

export default ProfilePosts;