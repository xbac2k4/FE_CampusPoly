import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import PostComponent from '../../components/Post/PostComponent';
import { UserContext } from '../../services/provider/UseContext';
import { ADD_POST, GET_FRIEND_BY_USERID } from '../../services/ApiConfig';
import Colors from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import { SocketContext } from '../../services/provider/SocketContext';
import { TYPE_CREATE_POST } from '../../services/TypeNotify';
import Loading from '../../components/MenuAuth/Loading';
import Snackbar from 'react-native-snackbar';
import Screens from '../../navigation/Screens';
// import containsForbiddenWords from '../../assets/ban/forbiddenWords';


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
  const [loading, setLoading] = useState(false);
  const { sendNotificationToMultipleSocket } = useContext(SocketContext);

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
    "du",
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
    "dm"
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
      // console.log('API response:', post.data);
      if (post.status === 200) {
        navigation.navigate(Screens.Home)
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
        Alert.alert('Cảnh báo', 'Bài đăng chứa từ ngữ vi phạm. Vui lòng chỉnh sửa trước khi đăng.');
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
            onPress={() => {
              setLoading(true);
              handlePublish();
            }}
            disabled={!isPost} // Disable nếu isPost === false
            style={{
              alignItems: 'center'
            }}>
            <Text style={[{ ...styles.textHeader, color: isPost ? '#ECEBED' : '#C0C0C0' }, { fontSize: 16 }]}>Đăng</Text>
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
    backgroundColor: '#181A1C',
  },
  barHeader: {
    flexDirection: 'row',
    marginTop: 20,
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
