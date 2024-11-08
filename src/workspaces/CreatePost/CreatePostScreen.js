import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import PostComponent from '../../components/Post/PostComponent';
import styles from '../../assets/style/CreatePostStyle';

const CreatePostScreen = ({ navigation }) => {

  const [user, setUser] = useState(null);
  const [id, setID] = useState('670ca3898cfc1be4b41b183b');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [gif, setGif] = useState(null);

  const fetchUserData = async () => {
    try {
      console.log(`${process.env.GET_USER_ID}${id}`);

      const response = await fetch(`${process.env.GET_USER_ID}${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      Alert.alert('Lỗi', 'Không thể lấy dữ liệu người dùng.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Hàm để cập nhật dữ liệu từ PostComponent
  const handleContentChange = (newTitle, newContent, newImages, newGif) => {
    setTitle(newTitle);
    setContent(newContent);
    setImages(newImages);
    setGif(newGif);
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('user_id', '670ca3898cfc1be4b41b183b'); // Gia dinh khi chua co user_id
    formData.append('title', title || "");
    formData.append('content', content || "");
    formData.append('post_type', 'text'); 
  
    // Thêm hình ảnh vào formData
    images.forEach((imgUri, index) => {
      if (imgUri) {
        formData.append('image', {
          uri: imgUri,
          type: 'image/jpeg', // Đảm bảo điều này phù hợp với loại hình ảnh của bạn
          name: `image_${index}.jpg`, // Tên cho mỗi ảnh
        });
      }
    });
  
    if (gif) {
      formData.append('gif', {
        uri: gif,
        name: 'gif.gif',
        type: 'image/gif', 
      });
    }
  
    try {
      const response = await fetch(`${process.env.ADD_POST}`, {
        method: 'POST',
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error('Failed to publish post!');
      }
      const post = await response.json();
      console.log('API response:', post);
  
      Alert.alert("Success", "Your post has been published!");
      navigation.goBack();
    } catch (error) {
      console.error('Error while publishing post:', error);
      Alert.alert('Error', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.barHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Text style={[styles.textHeader, { color: "#2E8AF6", fontSize: 16 }]}>Hủy</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Tạo Bài Viết</Text>
        <TouchableOpacity onPress={handlePublish} style={styles.buttonContainer}>
          <Text style={[styles.textHeader, { fontSize: 16 }]}>Đăng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createContainer}>
        <PostComponent
          title={title}
          content={content}
          image={images}
          gif={gif}
          onContentChange={handleContentChange} // Truyền hàm vào PostComponent
          user={user}
        />
      </View>
    </View>
  );
};

export default CreatePostScreen;
