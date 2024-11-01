import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PostComponent from '../../components/Post/PostComponent';

const CreatePostScreen = ({ navigation }) => {

  const handlePublish = async (content, selectedImage, selectedGif) => {
    // Kiểm tra nội dung và hình ảnh/GIF
    if (!content && !selectedImage && !selectedGif) {
      alert("Vui lòng nhập nội dung hoặc chọn ảnh/GIF!");
      return;
    }

    // Chuẩn bị dữ liệu để gửi lên API
    const postData = {
      content,
      image: selectedImage, // Xử lý lại hình ảnh nếu cần
      gif: selectedGif, // Tương tự như trên
    };

    try {
      // Gửi yêu cầu POST lên API
      const response = await fetch('http://192.168.1.101:3000/api/v1/posts/add-post', { // Thay đổi endpoint ở đây
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      // Kiểm tra phản hồi từ API
      if (!response.ok) {
        throw new Error('Đăng bài thất bại!');
      }

      const data = await response.json(); // Nếu cần, xử lý dữ liệu trả về từ API

      // Thông báo thành công
      alert("Bài viết đã được đăng thành công!");

      // Quay lại màn hình trước
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Sử dụng navigation.goBack()
          style={styles.circleIcon}>
          <Text style={[styles.textHeader, { color: "#2E8AF6", fontSize: 16, }]}>Discard</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>CREATE</Text>
        <TouchableOpacity
          onPress={() => {
            // Gọi hàm publish từ PostComponent
            // Bạn không cần phải gọi hàm handlePublish ở đây nữa vì nó sẽ được gọi từ PostComponent
          }}
          style={styles.buttonContainer}>
          <Text style={[styles.textHeader, { fontSize: 16, }]}>Publish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createContainer}>
        <PostComponent onPublish={handlePublish} />
      </View>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#181A1C',
  },
  barHeader: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textHeader: {
    color: '#ECEBED',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: "#F62E8E",
    borderRadius: 24,
    width: 70,
    height: 24,
    alignItems: 'center',
  },
  createContainer: {
    flex: 1,
  },
});
