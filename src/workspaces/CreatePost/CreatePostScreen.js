import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../components/MenuAuth/Loading';
import PostComponent from '../../components/Post/PostComponent';
import Colors from '../../constants/Color';
import Screens from '../../navigation/Screens';
import { ADD_POST, GET_FRIEND_BY_USERID } from '../../services/ApiConfig';
import { SocketContext } from '../../services/provider/SocketContext';
import { UserContext } from '../../services/provider/UseContext';
import { TYPE_CREATE_POST } from '../../services/TypeNotify';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Snackbar from 'react-native-snackbar';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [images, setImages] = useState([]);
  const [gif, setGif] = useState(null);
  const { user } = useContext(UserContext);
  const [isPost, setIsPost] = useState(false);
  const [userFriend, setUserFriend] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendNotificationToMultipleSocket } = useContext(SocketContext);
  const { theme } = useContext(ThemeContext);
  const uploadImage = async (images) => {
    // Thực hiện công việc bất đồng bộ, ví dụ gọi API hoặc tải ảnh lên
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Images uploaded');
        resolve();
      }, 2000); // Giả lập tác vụ mất 2 giây
    });
  };
  const forbiddenWords = [
    "địt",
    "dit",
    "đụ",
    "đéo",
    "deo",
    "đcm",
    "dcm",
    "đmm",
    "dmm",
    "đml",
    "dml",
    "mẹ mày",
    "me may",
    "cái lồn",
    "cai lon",
    "lồn",
    "lon",
    "buồi",
    "buoi",
    "cặc",
    "cak",
    "cac",
    "chó chết",
    "cho chet",
    "đĩ",
    "di",
    "điếm",
    "diem",
    "mẹ kiếp",
    "me kiep",
    "vãi lồn",
    "vai lon",
    "như cặc",
    "nhu cac",
    "nhu cak",
    "đầu buồi",
    "dau buoi",
    "thằng ngu",
    "thang ngu",
    "đần độn",
    "dan don",
    "óc chó",
    "oc cho",
    "não phẳng",
    "nao phang",
    "khốn nạn",
    "khon nan",
    "hãm lồn",
    "ham lon",
    "bố láo",
    "bo lao",
    "đồ rác rưởi",
    "do rac ruoi",
    "thằng chó",
    "thang cho",
    "con điên",
    "con dien",
    "con khùng",
    "con khung",
    "đồ ngu",
    "do ngu",
    "mất dạy",
    "mat day",
    "mày hả",
    "may ha",
    "đm",
    "dm",
    'parky',
    'parkyvn',
    'namki',
    'namkiki',
  ];

  const containsForbiddenWords = (title, content) => {
    const lowerCasedTitle = title.toLowerCase();
    const lowerCasedContent = content.toLowerCase();

    return forbiddenWords.some((word) =>
      lowerCasedTitle.includes(word) || lowerCasedContent.includes(word)
    );
  };
  // Hàm để cập nhật dữ liệu từ PostComponent
  const handleContentChange = async (newTitle, newContent, newHashtag, newImages, newGif) => {
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
      // console.log(data.data);
      // const listFriends = data.data.filter(friend => friend)
      setUserFriend(data.data);
    } catch (error) {
      console.error('Error fetching user friends:', error);
    }
  }

  useEffect(() => {
    fetchUserFriends();
  }, []);

  const fetchCreatePost = async (formData) => {
    try {
      // ToastAndroid.show("Đang đăng bài viết...", ToastAndroid.SHORT);
      const response = await fetch(ADD_POST, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to publish post!');
      }
      const post = await response.json();
      if (post.status === 200) {
        navigation.navigate(Screens.Home, { from: Screens.CreatePost });
        await sendNotificationToMultipleSocket(user.full_name, user._id, 'đã đăng bài viết mới', userFriend, TYPE_CREATE_POST, post?.data?._id);
      }
      ToastAndroid.show("Đăng thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error while publishing post:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePublish = async () => {
    try {
      // Kiểm tra từ cấm trong title và content
      if (containsForbiddenWords(title, content)) {
        setLoading(false);
        Snackbar.show({
          text: 'Bài đăng chứa từ ngữ vi phạm. Vui lòng chỉnh sửa trước khi đăng.',
          duration: Snackbar.LENGTH_INDEFINITE, // Snackbar sẽ không tự động tắt
          action: {
            text: 'OK',
            textColor: '#FF6347',
            onPress: () => {
              // Hành động khi nhấn OK
              console.log('Snackbar dismissed');
            },
          },
        });
        return;
      }

      const formData = new FormData();
      formData.append('user_id', user._id);
      formData.append('title', title || "");
      formData.append('content', content || "");
      formData.append('hashtag', hashtag || "");

      images?.forEach((imgUri, index) => {
        if (imgUri) {
          formData.append('image', {
            uri: imgUri,
            type: 'image/jpeg',
            name: `image_${index}.jpg`,
          });
        }
      });

      setTimeout(async () => {
        await fetchCreatePost(formData);
      }, 2000); // Delay 2 giây
    } catch (error) {
      console.error('Error publishing post:', error);
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
    <View style={[styles.container, {
      backgroundColor: theme ? '#181A1C' : '#f3f4f8',
    }]}>
      <View style={styles.barHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Text style={[styles.textHeader, { color: Colors.second, fontSize: 16 }]}>Hủy</Text>
        </TouchableOpacity>
        <Text style={[styles.textHeader, {
          color: theme ? '#ECEBED' : Colors.background,
        }]}>Tạo Bài Viết</Text>
        <LinearGradient
          colors={isPost ? [Colors.first, Colors.second] : theme ? [Colors.background, Colors.background] : ['#ccc', '#ccc']}
          style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              handlePublish();
            }}
            disabled={!isPost} // Disable nếu isPost === false
            style={{
              alignItems: 'center'
            }}>
            <Text style={[{ ...styles.textHeader, color: isPost ? '#ECEBED' : theme ? '#C0C0C0' : '#f3f4f8' }, { fontSize: 16 }]}>Đăng</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Loading isLoading={loading} />
      <View style={styles.createContainer}>
        <PostComponent
          title={title}
          content={content}
          hashtag={hashtag}
          image={images}
          // gif={gif}
          onContentChange={handleContentChange}
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
  },
  barHeader: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textHeader: {
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