import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Button } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import styles from '../../assets/style/PostStyle';
import { UserContext } from '../../services/provider/UseContext';
import { Screen } from 'react-native-screens';
import Screens from '../../navigation/Screens';
import { launchImageLibrary } from 'react-native-image-picker';
import NotificationModal from '../Notification/NotificationModal';

const CrudPost = ({ postId, onDeleteSuccess, navigation, existingPost }) => {
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái modal
  const [title, setTitle] = useState(''); // Trạng thái tiêu đề bài viết
  const [content, setContent] = useState(''); // Trạng thái nội dung bài viết
  const [selectedImage, setSelectedImage] = useState(null); // State để lưu ảnh đã chọn
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // State cho modal xác nhận xóa
  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title || ''); // Update title if existingPost is updated
      setContent(existingPost.content || ''); // Update content if existingPost is updated
    }
  }, [existingPost]); // Re-run when existingPost chan



  const handleDeletePost = async () => {
    setIsDeleteModalVisible(true); // Hiển thị modal xác nhận xóa
  };
  // Hàm xử lý xóa bài viết
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/api/v1/posts/delete-post/${postId}?user_id=${user._id}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        setIsDeleteModalVisible(false); // Đóng modal
        Alert.alert('Thành công', 'Bài viết đã được xóa.');
        onDeleteSuccess?.(); // Cập nhật giao diện sau khi xóa
      } else {
        Alert.alert('Thất bại', 'Không thể xóa bài viết. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi xóa bài viết:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa bài viết.');
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal khi hủy
  };

  // Hàm xử lý thay đổi ảnh
  const handleChangeImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        // Lưu ảnh đã chọn vào state
        const source = { uri: response.assets[0].uri };
        setSelectedImage(source); // Cập nhật ảnh mới
      }
    });
  };


  // Hàm xử lý cập nhật bài viết
  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      // Chỉ gửi ảnh nếu có ảnh mới
      if (selectedImage) {
        const file = {
          uri: selectedImage.uri,
          type: 'image/jpeg', // Thay đổi kiểu tệp nếu cần
          name: 'image.jpg', // Đặt tên cho tệp ảnh
        };
        formData.append('image', file);
      }

      const response = await fetch(
        `http://10.0.2.2:3000/api/v1/posts/update-post/${postId}?user_id=${user._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        Alert.alert('Thành công', 'Bài viết đã được cập nhật.');
        setIsModalVisible(false); // Đóng modal sau khi cập nhật thành công
      } else {
        Alert.alert('Thất bại', 'Không thể cập nhật bài viết. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật bài viết:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật bài viết.');
    }
  };

  return (
    <View style={styles.inner}>
      <TouchableOpacity style={styles.crudContainer} onPress={() => setIsModalVisible(true)}>
        <Image
          source={require('../../assets/images/update.png')}
          style={styles.imgCrud}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.crudText}>Chỉnh sửa bài viết</Text>
          <Text style={{ fontSize: 9, color: '#ccc', opacity: 0.4 }}>
            Bài viết này sẽ thay đổi sau khi bạn chỉnh sửa
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.crudContainer} onPress={handleDeletePost}>
        <Image
          source={require('../../assets/images/delete.png')}
          style={styles.imgCrud}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.crudText}>Xóa bài viết khỏi trang cá nhân</Text>
          <Text style={{ fontSize: 9, color: '#ccc', opacity: 0.4 }}>
            Bài viết này sẽ biến mất khỏi trang cá nhân của bạn
          </Text>
        </View>
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
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Chỉnh sửa bài viết</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, alignSelf: 'flex-start' }}>
              <Image source={{ uri: user.avatar.replace('localhost', '10.0.2.2') }} style={{ width: 30, height: 30, borderRadius: 32 }} resizeMode='contain' />
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 10 }}>{user.full_name}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Tiêu đề bài viết"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, { height: 100 }]} // Cho nội dung lớn hơn
              placeholder="Nội dung bài viết"
              value={content}
              onChangeText={setContent}
              multiline
            />
            <View style={styles.imgcontainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Hiển thị ảnh dữ liệu cũ nếu không có ảnh mới từ thư viện */}
                {selectedImage ? (
                  <Image
                    source={selectedImage} // Hiển thị ảnh đã chọn từ thư viện
                    style={{ width: 150, height: 100, borderRadius: 8, marginLeft: 3 }}
                    resizeMode="contain"
                  />
                ) : existingPost && existingPost.image && existingPost.image[0] ? (
                  <Image
                    source={{ uri: existingPost.image[0] }} // Truy cập phần tử đầu tiên trong mảng ảnh
                    style={{ width: 150, height: 100, borderRadius: 8 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/no_iamge.png')}
                    style={{ width: 100, height: 100 }}
                    resizeMode="contain"
                  />
                )}

                {/* Nút đổi ảnh bên phải */}
                <TouchableOpacity style={{ marginLeft: '25%' }} onPress={handleChangeImage}>
                  <Image
                    source={require('../../assets/images/changeimg.png')}
                    style={{ width: 50, height: 50 }} // Chỉnh kích thước nút đổi ảnh
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>




            {/** Button container */}
            <View style={styles.dialogActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleUpdatePost}
              >
                <Text style={styles.actionText}>Cập nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.actionText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default CrudPost;