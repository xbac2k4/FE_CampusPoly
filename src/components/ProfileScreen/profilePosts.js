import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../../assets/style/PostStyle';
import ToastModal from '../../components/Notification/NotificationModal';
import ReportComponent from '../../components/Report/ReportComponent';
import Screens from '../../navigation/Screens';
import { INTERACTION_SCORE, LIKE_POST, UNLIKE_POST } from '../../services/ApiConfig';
// Import các hình ảnh
import comment from '../../assets/images/comment.png';
import grayComment from '../../assets/images/gray_comment.png';
import grayHeart from '../../assets/images/gray_heart.png';
import heartFilled from '../../assets/images/hear2.png';
import heart from '../../assets/images/heart.png';
import Colors from '../../constants/Color';
import { SocketContext } from '../../services/provider/SocketContext';
import { ThemeContext } from '../../services/provider/ThemeContext';
import { UserContext } from '../../services/provider/UseContext';
import { TYPE_LIKE_POST } from '../../services/TypeNotify';
import { timeAgo } from '../../utils/formatTime';
import CrudPost from '../CrudPost/CrudPost';
import RenderImage from '../Post/RenderImage';
const ProfilePosts = ({ data }) => {
  const navigation = useNavigation();
  const [userAll, setUserAll] = useState(data); // Chứa các bài viết
  useEffect(() => { setUserAll(data) }, [data]);
  const { user } = useContext(UserContext);
  const refEditDeleteSheet = useRef(); // Dùng cho showEditDeleteSheet
  const [likedPosts, setLikedPosts] = useState([]); // Lưu trạng thái các bài viết đã thích
  const [selectedPostId, setSelectedPostId] = useState(null); // ID bài viết được chọn để báo cáo
  const { sendNotifySocket } = useContext(SocketContext);
  const { theme } = useContext(ThemeContext);

  const refRBSheet = useRef();
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
  const fetchInteractionScore = async (user_id, hashtag_id, score) => {
    const response = await fetch(INTERACTION_SCORE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, hashtag_id, score }),
    });
    const result = await response.json();

  };

  const handleReportSuccess = () => {
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
      // console.log(result);
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
          setUserAll((prevPosts) => {
            return prevPosts.map((postData) => {
              if (postData.postData._id === item.postData._id) {
                // Lấy hashtag từ bài viết
                const hashtags = postData.postData.hashtag;

                // Gọi hàm fetchInteractionScore với hashtag
                fetchInteractionScore(user._id, hashtags._id, 1);

                return {
                  ...postData,
                  likeData: [...postData.likeData, result.data], // Thêm lượt thích mới vào likeData
                  postData: {
                    ...postData.postData,
                    like_count: postData.postData.like_count + 1, // Tăng số lượng like
                  },
                };
              }
              return postData;
            });
          });
          // console.log(userAll);

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


  const getExistingPost = (postId) => {
    const post = userAll.find((item) => item.postData._id === postId);

    if (post) {

      console.log('hagtag:', post.postData.hashtag.hashtag_name);
      return {
        title: post.postData.title,
        content: post.postData.content,
        image: post.postData.image,
        hashtag: post.postData.hashtag.hashtag_name
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
            // console.log("moinhat", item);
            return (
              <View key={item.postData._id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <TouchableOpacity onPress={() => handleProfileClick(item.postData.user_id._id)}>
                    <Image source={{ uri: item.postData.user_id.avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.profileImage} />
                  </TouchableOpacity>
                  <View style={styles.headerText}>
                    <TouchableOpacity onPress={() => handleProfileClick(item.postData.user_id._id)}>
                      <Text style={[styles.profileName, {
                        color: theme ? '#fff' : Colors.background
                      }]}>{item.postData.user_id.full_name}</Text>
                    </TouchableOpacity>
                    <View style={{
                      flexDirection: 'row',
                      gap: 15,
                    }}>
                      <Text style={{
                        ...styles.postTime,
                        fontSize: 12,
                        fontWeight: 'bold'
                      }}>{item.postData?.user_id?.role[0]?.role_name}</Text>
                      <Text style={styles.postTime}>{timeAgo(item.postData.createdAt)}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => openBottomSheet(item?.postData?._id, item?.postData?.user_id?._id)} // Truyền cả postId và postOwnerId
                    style={styles.moreIcon}>
                    <Text style={styles.moreText}>⋮</Text>
                  </TouchableOpacity>

                </View>
                <Text style={[styles.postText, {
                  color: theme ? '#fff' : Colors.background
                }]}>{item.postData.title}</Text>
                {item.postData.hashtag?.hashtag_name ? (
                  <Text style={styles.postHashtag}>{item.postData.hashtag.hashtag_name}</Text>
                ) : null}
                {item.postData.image && <RenderImage images={item.postData.image} />}
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
                              : theme ? heart : grayHeart
                          }
                          style={styles.iconImage}
                        />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item.postData.like_count}</Text>
                    </View>

                    <View style={styles.iconLike}>
                      <TouchableOpacity onPress={() => {
                        navigation.navigate(Screens.Comment, { postId: item.postData._id })
                      }}>
                        <Image source={theme ? comment : grayComment} style={styles.iconImage} />
                      </TouchableOpacity>
                      <Text style={styles.metaText}>{item.postData.comment_count}</Text>
                    </View>
                  </View>

                </View>
                <View style={styles.separator} />
              </View>
            )
          })
        ) : (
          null
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
        height={150}
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