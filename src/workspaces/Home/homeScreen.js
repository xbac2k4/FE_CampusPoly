import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
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
  const [users, setUsers] = useState([]); // State to store the list of users
  const navigation = useNavigation(); // Hook to access navigation

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

  // Simulate fetching the list of users from an API
  const fetchUsers = async () => {
    const fakeUsers = [
      {
        id: '1',
        name: 'Alex Tsimikas',
        location: 'Brooklyn, NY',
        bio: 'Writer by Profession. Artist by Passion!',
        profileImage: require('../../assets/images/avt.png'),
        backgroundImage: require('../../assets/images/background.png'),
        friends: 4056,
        posts: [
          {
            id: 1,
            text: 'Exploring the canals of Venice!',
            likes: 8998,
            comments: 145,
            images: [
              require('../../assets/images/car2.jpg'),
              require('../../assets/images/venice2.png'),
              require('../../assets/images/venice3.png'),
            ],
            time: '1h ago',
          },
        ],
      },
      {
        id: '2',
        name: 'Đào Việt Anh',
        location: 'Hanoi, Vietnam',
        bio: 'Software Developer and Music Lover',
        profileImage: require('../../assets/images/avt.png'),
        backgroundImage: require('../../assets/images/background.png'),
        friends: 1200,
        posts: [
          {
            id: 2,
            text: 'Coding and coffee, my perfect combo!',
            likes: 500,
            comments: 60,
            images: [require('../../assets/images/background.png')],
            time: '2h ago',
          },
        ],
      },
      {
        id: '3',
        name: 'Nguyễn Anh Tuấn',
        location: 'Ho Chi Minh City, Vietnam',
        bio: 'Traveler and Photographer',
        profileImage: require('../../assets/images/avt.png'),
        backgroundImage: require('../../assets/images/background.png'),
        friends: 3000,
        posts: [
          {
            id: 3,
            text: 'Sunset at the beach is breathtaking!',
            likes: 1000,
            comments: 100,
            images: [require('../../assets/images/venice1.png')],
            time: '1d ago',
          },
        ],
      },
    ];
    setUsers(fakeUsers);
  };

  useEffect(() => {
    fetchUserName();
    setGreeting(getGreeting());
    fetchStories();
    fetchUsers(); // Fetch users on mount
  }, []);

  // Handle user avatar press
  const handleUserPress = userId => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      navigation.navigate('Profile', { user: selectedUser });
    }
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
    <FlatList
      style={styles.container}
      data={users} // Data for the main FlatList (users list)
      keyExtractor={item => item.id}
      nestedScrollEnabled={true}
      ListHeaderComponent={
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
            <TouchableOpacity style={styles.circleIcon} onPress={() => navigation.navigate(Screens.Message)}>
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
      }
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate(Screens.Comment)}>
          <ProfilePosts user={item} />
        </TouchableOpacity>
      )}
    />
  );
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
