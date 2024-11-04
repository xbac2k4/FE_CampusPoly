import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import PostComponent from '../../components/Post/PostComponent';
import styles from '../../assets/style/CreatePostStyle';

const CreatePostScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [gif, setGif] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/users/get-user-by-id/670ca3898cfc1be4b41b183b');
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
  const handleContentChange = (newTitle, newContent, newImage, newGif) => {
    setTitle(newTitle);
    setContent(newContent);
    setImage(newImage);
    setGif(newGif);
  };

  const handlePublish = async () => {
    const postData = {
      title: title || "",
      content: content || "",
      image: image || null,
      gif: gif || null,
      userId: user?.data?.id,
    };

    console.log('Dữ liệu bài đăng:', postData);

    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/posts', { // Địa chỉ API cập nhật tại đây
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Đăng bài thất bại!');
      }

      Alert.alert("Thông báo", "Bài viết đã được đăng thành công!");
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi đăng bài:', error);
      Alert.alert('Lỗi', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Text style={[styles.textHeader, { color: "#2E8AF6", fontSize: 16 }]}>Discard</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>CREATE</Text>
        <TouchableOpacity onPress={handlePublish} style={styles.buttonContainer}>
          <Text style={[styles.textHeader, { fontSize: 16 }]}>Publish</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.createContainer}>
        <PostComponent
          title={title} 
          content={content}
          image={image}
          gif={gif}
          onContentChange={handleContentChange} // Truyền hàm vào PostComponent
          user={user}
        />
      </View>
    </View>
  );
};

export default CreatePostScreen;
