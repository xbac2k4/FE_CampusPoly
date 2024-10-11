import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
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
    const fakeApiResponse = { name: 'Viet Anh' }; // Đáp ứng giả lập
    setUserName(fakeApiResponse.name); // Cập nhật tên người dùng
  };

  // Hàm để xác định lời chào dựa trên thời gian hiện tại
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 10) {
      return 'Good Morning';
    } else if (currentHour >= 10 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // Hàm giả lập để lấy danh sách stories từ API
  const fetchStories = async () => {
    const fakeStories = [
      { id: '1', imgStory: require('../../assets/images/test3.jpg'), imgUser: require('../../assets/images/test2.jpg') },
      { id: '2', imgStory: require('../../assets/images/test3.jpg'), imgUser: require('../../assets/images/test2.jpg') },
      { id: '3', imgStory: require('../../assets/images/test3.jpg'), imgUser: require('../../assets/images/test2.jpg') },
      { id: '4', imgStory: require('../../assets/images/test3.jpg'), imgUser: require('../../assets/images/test2.jpg') },
      { id: '5', imgStory: require('../../assets/images/test3.jpg'), imgUser: require('../../assets/images/test2.jpg') },
      { id: '6', imgStory: require('../../assets/images/test3.jpg'), imgUser: require('../../assets/images/test2.jpg') },
    ];
    setStories(fakeStories);
  };

  const fakeArticles = [
    {
      id: '1',
      imgavatar: require('../../assets/images/car1.jpg'),
      username: 'Đào Việt Anh',
      time: '2h ago',
      content: 'This is the first article content.',
      imgcontent: require('../../assets/images/car2.jpg'),
      likecount: 150,
      commentcount: 20,
    },
    {
      id: '2',
      imgavatar: require('../../assets/images/car2.jpg'),
      username: 'Phạm Việt Anh',
      time: '3m ago',
      content: null,
      imgcontent: require('../../assets/images/car2.jpg'),
      likecount: 250,
      commentcount: 45,
    },
    {
      id: '3',
      imgavatar: require('../../assets/images/car3.jpg'),
      username: 'Đào Thúy Liên',
      time: '5h ago',
      content: 'This is the third article content.',
      imgcontent: null,
      likecount: 300,
      commentcount: 30,
    },
  ];

  useEffect(() => {
    fetchUserName();
    setGreeting(getGreeting());
    fetchStories();
  }, []);

  const renderStoryItem = ({ item }) => (
    <StoryComponent
      imgStory={item.imgStory}
      onStoryPress={() => { }}
      onUserPress={() => { }}
      imgUser={item.imgUser}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={{ color: "#ffff", fontSize: 18, fontFamily: 'HankenGrotesk-Regular', fontWeight: '500' }}>
          {greeting}, {userName || 'User'}
        </Text>

        {/* Thêm icon vào text 🚀🚀🚀🚀🚀🛠️🛠️🛠️🛠️🛠️🛠️🛠️🛠️💕💕💕 */}
        <TouchableOpacity style={styles.circleIcon}
          onPress={() => {
          }}>
        <Text><Icon name="mail-outline" size={15} color="#fff" /></Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={stories}
        renderItem={renderStoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        style={styles.storyContainer}
      />
      <View style={styles.articleContainer}> {/**Dang xảy ra cảnh báo flastlist và scrolView xung đột với 🆘🆘🆘🆘 */}
        <FlatList
          data={fakeArticles}
        nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <ArticleComponent
              id={item.id}
              imgavatar={item.imgavatar}
              username={item.username}
              time={item.time}
              content={item.content}
              imgcontent={item.imgcontent}
              likecount={item.likecount}
              commentcount={item.commentcount}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
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
    marginTop: 40,
    flexDirection: 'row'
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    marginTop: 20,
  },
  articleContainer: {
    marginTop:20
  }
});
