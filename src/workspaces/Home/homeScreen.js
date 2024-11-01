import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoryComponent from '../../components/Home/storyComponent';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';

const HomeScreen = () => {
  const [userName, setUserName] = useState(''); // State to store the user's name
  const [greeting, setGreeting] = useState(''); // State to store the greeting message
  const [stories, setStories] = useState([]); // State to store the list of stories
  const navigation = useNavigation(); // Hook to access navigation
  const [data, setData] = useState([]); // State to store the list of stories
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading

  // Simulate fetching the user's name from an API
  const fetchUserName = async () => {
    const fakeApiResponse = { name: 'Viet Anh' }; // Mock response
    setUserName(fakeApiResponse.name); // Update user's name
  };

  // Determine the greeting message based on the current time
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

  // Simulate fetching the list of stories from an API
  const fetchStories = async () => {
    const fakeStories = [
      {
        id: '1',
        imgStory: require('../../assets/images/test3.jpg'),
        imgUser: require('../../assets/images/test2.jpg'),
        userId: '1',
      },
      {
        id: '2',
        imgStory: require('../../assets/images/test3.jpg'),
        imgUser: require('../../assets/images/test2.jpg'),
        userId: '2',
      },
      {
        id: '3',
        imgStory: require('../../assets/images/test3.jpg'),
        imgUser: require('../../assets/images/test2.jpg'),
        userId: '3',
      },
    ];
    setStories(fakeStories);
  };

  // useEffect(() => {
  //   fetchUserName();
  //   setGreeting(getGreeting());
  //   fetchStories(); // Fetch stories on mount
  // }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch(process.env.GET_ALL_POST)
        const data = await response.json();
        // console.log(data.data);
        setData(data.data); // Lưu bài viết vào state (giả sử data.data chứa danh sách bài viết)
        // setLoading(false); // Tắt loading
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error); // Lưu lỗi vào state
        // setLoading(false); // Tắt loading
      } finally {
        setLoading(false); // Tắt loading
      }
    };
    
    fetchStories()
    fetchUserData();
  }, []);
  // console.log(data);

  // Handle user avatar press
  const handleUserPress = userId => {
    navigation.navigate('Profile', { userId });
  };

  // Render a single story item
  const renderStoryItem = ({ item }) => (
    <StoryComponent
      imgStory={item.imgStory}
      onStoryPress={() => { }} // Define what happens when the story is pressed
      onUserPress={() => handleUserPress(item.userId)} // Pass user data on press
      imgUser={item.imgUser}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContent}>
            <Text
              style={{
                color: '#ffff',
                fontSize: 18,
                fontFamily: 'HankenGrotesk-Regular',
                fontWeight: '500',
              }}>
              {greeting}, {userName || 'User'}
            </Text>
            <TouchableOpacity
              style={styles.circleIcon}
              onPress={() => navigation.navigate(Screens.Message)}>
              <Icon name="mail-outline" size={15} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* FlatList for stories */}
          <FlatList
            data={stories}
            renderItem={renderStoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            style={styles.storyContainer}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
        ) : (
          <ProfilePosts data={data} />
        )}
      </View>
    </ScrollView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
  headerContent: {
    justifyContent: 'space-between',
    marginTop: 40,
    flexDirection: 'row',
    paddingHorizontal: 24,
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
});
