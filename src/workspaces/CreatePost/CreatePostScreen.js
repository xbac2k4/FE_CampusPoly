import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ToastAndroid } from 'react-native';
import PostComponent from '../../components/Post/PostComponent';
import { UserContext } from '../../services/provider/UseContext';
import { ADD_POST, GET_FRIEND_BY_USERID } from '../../services/ApiConfig';
import Colors from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import { SocketContext } from '../../services/provider/SocketContext';
import { TYPE_CREATE_POST } from '../../services/TypeNotify';

const CreatePostScreen = ({ navigation }) => {
  // const [user, setUser] = useState(null);
  // const [id, setID] = useState('670ca3898cfc1be4b41b183b');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [images, setImages] = useState([]);
  const [gif, setGif] = useState(null);
  const { user } = useContext(UserContext);
  const [isPost, setIsPost] = useState(false);
  const [userFriend, setUserFriend] = useState([]);
  const { sendNotificationToMultipleSocket } = useContext(SocketContext);

  // Hàm để cập nhật dữ liệu từ PostComponent
  const handleContentChange = (newTitle, newContent, newHashtag, newImages, newGif) => {
    setTitle(newTitle);
    setContent(newContent);
    setHashtag(newHashtag);
    setImages(newImages);
    setGif(newGif);
  };

  const fetchUserFriends = async () => {
    try {
      const response = await fetch(`${GET_FRIEND_BY_USERID}?user_id=${user._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user friends!');
      }
      const data = await response.json();
      console.log(data.data);
      // const listFriends = data.data.filter(friend => friend)
      setUserFriend(data.data);
    } catch (error) {
      console.error('Error fetching user friends:', error);
    }
  }

  useEffect(() => {
    fetchUserFriends();
  }, []);

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('user_id', user._id); // Gia dinh khi chua co user_id
    formData.append('title', title || "");
    formData.append('content', content || "");
    formData.append('hashtag', hashtag || "");

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

    // if (gif) {
    //   formData.append('gif', {
    //     uri: gif,
    //     name: 'gif.gif',
    //     type: 'image/gif',
    //   });
    // }

    try {
      const response = await fetch(ADD_POST, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to publish post!');
      }
      const post = await response.json();
      // console.log('API response:', post.data);
      if (post.status === 200) {
        navigation.goBack();
        await sendNotificationToMultipleSocket(user.full_name, user._id, 'đã đăng bài viết mới', userFriend, TYPE_CREATE_POST, post?.data?._id);
      }
      ToastAndroid.show('Đăng bài viết thành công', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error while publishing post:', error);
      Alert.alert('Error', error.message);
    }
  };
  useEffect(() => {
    if (title.trim() && content.trim() && hashtag.trim()) {
      setIsPost(true);
    } else {
      setIsPost(false);
    }
  }, [title, content, hashtag])

  return (
    <View style={styles.container}>
      <View style={styles.barHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Text style={[styles.textHeader, { color: "#2E8AF6", fontSize: 16 }]}>Hủy</Text>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Tạo Bài Viết</Text>
        <LinearGradient
          colors={isPost ? [Colors.first, Colors.second] : [Colors.background, Colors.background]}
          style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePublish}
            disabled={!isPost} // Disable nếu isPost === false
            style={{
              alignItems: 'center'
            }}>
            <Text style={[{ ...styles.textHeader, color: isPost ? '#ECEBED' : '#C0C0C0' }, { fontSize: 16 }]}>Đăng</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.createContainer}>
        <PostComponent
          title={title}
          content={content}
          hashtag={hashtag}
          image={images}
          // gif={gif}
          onContentChange={handleContentChange} // Truyền hàm vào PostComponent
          user={user}
        />
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
    height: 25,
    alignItems: 'center',
  },
  createContainer: {
    flex: 1,
  },
});
