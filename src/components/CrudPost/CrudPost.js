import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import styles from '../../assets/style/PostStyle'
import { UserContext } from '../../services/provider/UseContext';
const CrudPost = ({ postId, onDeleteSuccess }) => {
  const { user } = useContext(UserContext);

  const handleDeletePost = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa bài viết này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              const response = await fetch(
                `http://10.0.2.2:3000/api/v1/posts/delete-post/${postId}?user_id=${user._id}`,
                { method: 'DELETE' }
              );

              if (response.ok) {
                Alert.alert('Thành công', 'Bài viết đã được xóa.');
                onDeleteSuccess?.(); // Gọi callback để cập nhật giao diện
              } else {
                Alert.alert('Thất bại', 'Không thể xóa bài viết. Vui lòng thử lại.');
              }
            } catch (error) {
              console.error('Lỗi xóa bài viết:', error);
              Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xóa bài viết.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.inner}>
      <TouchableOpacity style={styles.crudContainer}>
        <Image
          source={require('../../assets/images/update.png')}
          style={styles.imgCrud}
          resizeMode="contain"
        />
        <Text style={styles.crudText}>Chỉnh sửa bài viết</Text>
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
    </View>
  );
};

export default CrudPost;

