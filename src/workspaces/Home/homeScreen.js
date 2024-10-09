import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoryComponent from '../../components/Home/storyComponent';
import ArticleComponent from '../../components/Home/articleComponent';



const HomeScreen = () => {
  const [userName, setUserName] = useState(''); // State để lưu tên người dùng
  const [greeting, setGreeting] = useState(''); // State để lưu lời chào
  const [stories, setStories] = useState([]); // State để lưu danh sách stories

  // Hàm giả lập để lấy tên người dùng từ API
  const fetchUserName = async () => {
    // Giả lập gọi API
    const fakeApiResponse = { name: 'Viet Anh' }; // Đáp ứng giả lập
    setUserName(fakeApiResponse.name); // Cập nhật tên người dùng
  };

  // Hàm để xác định lời chào dựa trên thời gian hiện tại
  const getGreeting = () => {
    const currentHour = new Date().getHours(); // Lấy giờ hiện tại
    if (currentHour >= 7 && currentHour < 10) {
      return 'Good Morning'; // Buổi sáng
    } else if (currentHour >= 10 && currentHour < 18) {
      return 'Good Afternoon'; // Buổi chiều
    } else {
      return 'Good Evening'; // Buổi tối
    }
  };

  // Hàm giả lập để lấy danh sách stories từ API
  const fetchStories = async () => {
    // Giả lập dữ liệu từ API
    const fakeStories = [
      { id: '1', imgStory: require('../../assets/image/test3.jpg'), imgUser: require('../../assets/image/test2.jpg') },
      { id: '2', imgStory: require('../../assets/image/test3.jpg'), imgUser: require('../../assets/image/test2.jpg') },
      { id: '3', imgStory: require('../../assets/image/test3.jpg'), imgUser: require('../../assets/image/test2.jpg') },
      { id: '4', imgStory: require('../../assets/image/test3.jpg'), imgUser: require('../../assets/image/test2.jpg') },
      { id: '5', imgStory: require('../../assets/image/test3.jpg'), imgUser: require('../../assets/image/test2.jpg') },
      { id: '6', imgStory: require('../../assets/image/test3.jpg'), imgUser: require('../../assets/image/test2.jpg') },
    ];
    setStories(fakeStories); // Cập nhật stories
  };

  // Gọi hàm fetchUserName và fetchStories khi component được mount
  useEffect(() => {
    fetchUserName();
    setGreeting(getGreeting()); // Cập nhật lời chào
    fetchStories(); // Gọi API giả lập để lấy danh sách stories
  }, []);

  // Hàm render từng story item
  const renderStoryItem = ({ item }) => (
    <StoryComponent
      imgStory={item.imgStory}
      onStoryPress={() => {}} // Thêm hành động khi nhấn vào story
      onUserPress={() => {}} // Thêm hành động khi nhấn vào user
      imgUser={item.imgUser}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={{ color: "#ffff", fontSize: 18, fontFamily: 'HankenGrotesk-Regular', fontWeight: '500' }}>
          {greeting}, <Text>{userName || 'User'}</Text>
        </Text>
        <TouchableOpacity style={styles.circleIcon}
          onPress={() => {
            { /**Sử lý chuyển màn hình sang màn hình tin nhắn */ }
          }}>
          <Icon name="mail-outline" size={15} color="#fff" />
        </TouchableOpacity>
      </View>

      {/** Story container dùng FlatList để hiển thị scroll ngang */}
      <FlatList
        data={stories} // Dữ liệu là danh sách stories
        renderItem={renderStoryItem} // Hàm render từng item
        keyExtractor={item => item.id} // Khóa duy nhất cho mỗi item
        horizontal // Bật chế độ scroll ngang
        showsHorizontalScrollIndicator={false} // Ẩn thanh scroll ngang
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Thêm khoảng cách giữa các item
        style={styles.storyContainer}
      />
      {/**Aticle  */}
      <View style={styles.articleContainer}>
        <ArticleComponent />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#181A1C'
  },
  headerContent: {
    justifyContent: 'space-between',
    marginTop: 60,
    flexDirection: 'row'
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16, // Tạo hình tròn
    borderWidth: 1,   // Kích thước viền
    borderColor: '#fff', // Màu viền
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  storyContainer: {
    marginTop: 20, // Khoảng cách giữa header và story container
  },
  articleContainer:{
    flex:20
  }
});
