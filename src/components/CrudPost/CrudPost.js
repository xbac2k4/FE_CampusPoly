import React, { useContext, useEffect, useState } from 'react';
import { Animated, Image, Modal, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../assets/style/PostStyle';
import Colors from '../../constants/Color';
import { DELETE_POST, UPDATE_POST } from '../../services/ApiConfig';
import { ThemeContext } from '../../services/provider/ThemeContext';
import { UserContext } from '../../services/provider/UseContext';
import NotificationModal from '../Notification/NotificationModal';
import { isEmpty } from '../../utils/isEmpty';
import Loading from '../MenuAuth/Loading';
import { SocketContext } from '../../services/provider/SocketContext';

const CrudPost = ({ postId, onDeleteSuccess, onUpdateSuccess, existingPost }) => {
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
  const [title, setTitle] = useState(''); // Trạng thái tiêu đề bài viết
  const [content, setContent] = useState(''); // Trạng thái nội dung bài viết
  const [hagtag, setHagtag] = useState(''); // Trạng thái nội dung bài viết
  const [selectedImages, setSelectedImages] = useState([]); // Chứa danh sách ảnh đã chọn
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State cho modal xác nhận xóa
  const [inputHeight, setInputHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [isChanged, setIsChanged] = useState(false); // Trạng thái kiểm tra thay đổi
  const [oldTitle, setOldTitle] = useState();
  const [oldContent, setOldContent] = useState();
  const [oldImage, setOldImages] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (existingPost) {
      setOldTitle(existingPost.title || '');
      setOldContent(existingPost.content || '');
      setTitle(existingPost.title || '');
      setContent(existingPost.content || '');
      setHagtag(existingPost.hagtag || '');

      if (existingPost.image && existingPost.image.length > 0) {
        const oldImages = existingPost.image.map(uri => ({ uri: uri.replace('localhost', '10.0.2.2') }));
        setSelectedImages(oldImages); // Thêm ảnh cũ vào state
        setOldImages(oldImages);
      }
    }
  }, [existingPost]);

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  };

  useEffect(() => {
    if (title === oldTitle && content === oldContent && arraysEqual(selectedImages, oldImage)) {
      setIsChanged(false);
      return;
    }
    if (isEmpty(title) || isEmpty(content)) {
      setIsChanged(false);
      return;
    }
    setIsChanged(true);
  }, [title, content, hagtag, selectedImages]);

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };
  const toggleImages = () => {
    setIsVisible(!isVisible);
    Animated.spring(animation, {
      toValue: isVisible ? 0 : 1,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const openImageLibrary = () => {
    handleChangeImage(); // Gọi hàm handleChangeImage để mở thư viện ảnh
  };

  const handleDeletePost = async () => {
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
  };
  // Hàm xử lý xóa bài viết
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${DELETE_POST}/${postId}?user_id=${user._id}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        setIsDeleteModalVisible(false); // Đóng modal
        onDeleteSuccess?.(); // Cập nhật giao diện sau khi xóa
        ToastAndroid.show("Xóa thành công", ToastAndroid.SHORT);

        // Hiển thị Snackbar thành công
        // Snackbar.show({
        //   text: 'Bài viết đã được xóa thành công!',
        //   duration: Snackbar.LENGTH_SHORT,
        //   backgroundColor: '#4CAF50', // Màu nền cho thành công
        //   textColor: 'white', // Màu chữ
        // });
      } else {
        ToastAndroid.show("Không thể xóa bài viết. Vui lòng thử lại!", ToastAndroid.SHORT);
        // Snackbar.show({
        //   text: 'Không thể xóa bài viết. Vui lòng thử lại!',
        //   duration: Snackbar.LENGTH_SHORT,
        //   backgroundColor: '#f44336', // Màu nền cho lỗi
        //   textColor: 'white',
        // });
      }
    } catch (error) {
      console.error('Lỗi xóa bài viết:', error);
      ToastAndroid.show("Đã xảy ra lỗi khi xóa bài viết!", ToastAndroid.SHORT);
      // Snackbar.show({
      //   text: 'Đã xảy ra lỗi khi xóa bài viết!',
      //   duration: Snackbar.LENGTH_SHORT,
      //   backgroundColor: '#f44336',
      //   textColor: 'white',
      // });
    }
  };


  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal khi hủy
  };

  // Hàm xử lý thay đổi ảnh
  const handleChangeImage = () => {
    if (selectedImages.length >= 10) {
      ToastAndroid.show('Chỉ được chọn tối đa 10 ảnh!', ToastAndroid.SHORT);
      return; // Dừng nếu vượt quá giới hạn
    }
    launchImageLibrary({ mediaType: 'photo', quality: 0.5, selectionLimit: 0 }, (response) => {
      handleImageSelection(response);
    });
  };

  const handleCaptureImage = () => {
    if (selectedImages.length >= 10) {
      ToastAndroid.show('Chỉ được chọn tối đa 10 ảnh!', ToastAndroid.SHORT);
      return; // Dừng nếu vượt quá giới hạn
    }
    launchCamera({ mediaType: 'photo', quality: 0.5, saveToPhotos: true }, (response) => {
      handleImageSelection(response);
    });
  };

  const handleImageSelection = (response) => {

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorCode);
    } else if (response.assets) {
      const newImages = response.assets.map(asset => ({ uri: asset.uri }));
      if (selectedImages.length + newImages.length > 10) {
        ToastAndroid.show('Chỉ được chọn tối đa 10 ảnh!', ToastAndroid.SHORT);
        return; // Dừng nếu vượt quá giới hạn
      }
      setSelectedImages([...selectedImages, ...newImages]); // Thêm ảnh mới vào mảng
    }
  }

  // Hàm xử lý cập nhật bài viết
  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('hagtag', hagtag);

      // Kiểm tra nếu không có ảnh nào, gửi mảng rỗng
      if (selectedImages.length > 0) {
        selectedImages.forEach((image, index) => {
          if (image.uri) { // Đảm bảo URI không bị null
            formData.append('image', {
              uri: image.uri,
              type: 'image/jpeg', // Kiểm tra MIME type
              name: `image_${index}.jpg`,
            });
          }
        });
      } else {
        formData.append('image', []); // Gửi mảng rỗng nếu không có ảnh
      }

      setTimeout(async () => {
        await fetchUpdate(formData)
      }, 2000);

    } catch (error) {
      console.error('Lỗi khi cập nhật bài viết:', error);
      ToastAndroid.show("Đã xảy ra lỗi khi cập nhật bài viết!", ToastAndroid.SHORT);
    }
  };
  const fetchUpdate = async (formData) => {
    try {
      const response = await fetch(`${UPDATE_POST}/${postId}?user_id=${user._id}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data.data);        
        setLoading(false)
        ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
        onUpdateSuccess?.(data.data);
      } else {
        const errorResponse = await response.json();
        console.error('Response Error:', errorResponse);
        ToastAndroid.show("Không thể cập nhật bài viết. Vui lòng thử lại!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={[styles.inner, {
      backgroundColor: theme ? Colors.background : '#f3f4f8'
    }]}>
      <TouchableOpacity style={styles.crudContainer} onPress={() => setIsModalVisible(true)}>
        <Image
          source={theme ? require('../../assets/images/update.png') :
            require('../../assets/images/light_update.png')
          }
          style={styles.imgCrud}
          resizeMode="contain"
        />
        <Text style={[styles.crudText, {
          color: theme ? '#ECEBED' : Colors.background,
        }]}>Chỉnh sửa bài viết</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.crudContainer} onPress={handleDeletePost}>
        <Image
          source={theme ? require('../../assets/images/delete.png') :
            require('../../assets/images/light_delete.png')
          }
          style={styles.imgCrud}
          resizeMode="contain"
        />
        <Text style={[styles.crudText, {
          color: theme ? '#ECEBED' : Colors.background,
        }]}>Xóa bài viết khỏi trang cá nhân</Text>
      </TouchableOpacity>
      {/* Modal xác nhận xóa */}
      <NotificationModal
        visible={isDeleteModalVisible}
        message="Bạn có chắc chắn muốn xóa bài viết này không?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {/* Modal sửa bài viết */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={[styles.dialog, {
            backgroundColor: theme ? Colors.background : '#f3f4f8',
          }]}>
            {/** Button container */}
            <View style={styles.dialogActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.actionText}>Hủy</Text>
              </TouchableOpacity>

              <View style={styles.dialogTitleContainer}>
                <Text style={[styles.dialogTitle, {
                  color: theme ? '#C0C0C0' : '#000'
                }]}>Chỉnh sửa bài viết</Text>
              </View>
              <LinearGradient
                colors={isChanged ? [Colors.first, Colors.second] : [Colors.background, Colors.background]}
                style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true)
                    handleUpdatePost()
                  }}
                  disabled={!isChanged} // Disable nếu === false
                  style={{
                    alignItems: 'center'
                  }}>
                  <Text style={[{ ...styles.textHeader, color: isChanged ? '#ECEBED' : '#C0C0C0' }, { fontSize: 16 }]}>Cập nhật</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View style={[styles.container, {
              backgroundColor: theme ? '#2B2B2B' : '#f3f4f8',
              elevation: theme ? 0 : 5
            }]}>
              <View style={styles.postRow}>
                <View style={{ flexDirection: 'row', marginBottom: 10, alignSelf: 'flex-start' }}>
                  <View>
                    {user && user?.avatar ? (
                      <Image source={{ uri: user?.avatar.replace('localhost', '10.0.2.2') }} style={styles.avatar} />
                    ) : (
                      <View style={styles.avatarPlaceholder} />
                    )}
                  </View>
                  {/** Input */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[styles.textInput, {
                        color: theme ? '#ECEBED' : '#000',
                      }]}
                      placeholder="Tiêu đề bài viết?"
                      placeholderTextColor="#888"
                      multiline
                      value={title}
                      onChangeText={setTitle}
                      underlineColorAndroid="transparent"
                    // onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
                    />
                    <TextInput
                      style={[styles.textInput1, {
                        height: Math.max(40, inputHeight),
                        color: theme ? '#ECEBED' : '#000',
                      }]}
                      placeholder="Bạn đang nghĩ gì?"
                      placeholderTextColor="#888"
                      multiline
                      value={content}
                      onChangeText={setContent}
                      onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
                      underlineColorAndroid="transparent"
                    />

                    <View style={styles.horizontalScrollContainer}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        {selectedImages.map((image, index) => (
                          <View key={index} style={{
                            position: 'relative',
                            marginRight: 10,
                          }}>
                            <Image
                              source={{ uri: image.uri }}
                              style={{ width: 60, height: 60, borderRadius: 10 }}
                              resizeMode="cover"
                            />
                            {/* Nút xóa từng ảnh */}
                            <TouchableOpacity
                              style={styles.deleteIcon}
                              onPress={() => {
                                const updatedImages = selectedImages.filter((_, i) => i !== index);
                                setSelectedImages(updatedImages);
                              }}
                            >
                              <Image
                                source={require('../../assets/images/x.png')}
                                style={{ width: 14, height: 14 }}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                  </View>

                </View>

              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10 }}>
                <TouchableOpacity style={styles.addButton}
                  onPress={toggleImages}
                >
                  <Image source={theme ? require('../../assets/images/add.png') :
                    require('../../assets/images/light_add.png')
                  } resizeMode="contain" style={{ width: 12, height: 12 }} />
                </TouchableOpacity>

                {isVisible && (
                  <Animated.View style={[styles.imageContainer, animatedStyle, {
                    backgroundColor: theme ? '#323436' : '#ECEBED',
                  }]}>
                    <View style={styles.imageRow}>
                      <TouchableOpacity onPress={openImageLibrary}>
                        <Image source={require('../../assets/images/light_image.png')} style={styles.image} />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={handleCaptureImage}>
                        <Image source={require('../../assets/images/light_camera.png')} style={styles.image} />
                      </TouchableOpacity>

                    </View>
                  </Animated.View>
                )}
              </View>

            </View>

          </View>

        </View>
        <Loading isLoading={loading} />
      </Modal>

    </View>
  );
};

export default CrudPost;
