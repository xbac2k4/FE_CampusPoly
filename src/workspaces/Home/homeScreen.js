import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StoryComponent from '../../components/Home/storyComponent';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';

const HomeScreen = () => {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Dành cho bạn'); // Trạng thái cho tab hiện tại

  const fetchUserName = async () => {
    const fakeApiResponse = { name: 'Viet Anh' };
    setUserName(fakeApiResponse.name);
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 10) {
      return 'Chào buổi sáng🌞';
    } else if (currentHour >= 10 && currentHour < 18) {
      return 'Chào buổi chiều😎';
    } else {
      return 'Chào buổi tối🌚';
    }
  };

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(process.env.GET_ALL_POST);
        const responseData = await response.json();
        const sortedData = responseData.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      } finally {
        setLoading(false);
      }
    };

   
    fetchUserName();
    setGreeting(getGreeting());
    fetchUserData();
  }, []);

  const handleUserPress = (userId) => {
    navigation.navigate('Profile', { userId });
  };

  const renderStoryItem = ({ item }) => (
    <StoryComponent
      imgStory={item.imgStory}
      onStoryPress={() => {}}
      onUserPress={() => handleUserPress(item.userId)}
      imgUser={item.imgUser}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContent}>
            <Text style={styles.greetingText}>
              {greeting}, {userName || 'User'}
            </Text>
            <TouchableOpacity
              style={styles.circleIcon}
              onPress={() => navigation.navigate(Screens.Message)}
            >
              <Icon name="mail-outline" size={15} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Tab điều hướng */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Dành cho bạn' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('Dành cho bạn')}
            >
              <Text style={styles.tabText}>Dành cho bạn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Đang theo dõi' && styles.activeTab,
              ]}
              onPress={() => {
                setSelectedTab('Đang theo dõi');
                // navigation.navigate(Screens.Alert);
              }}
            >
              <Text style={styles.tabText}>Đang theo dõi</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
          ) : selectedTab === 'Dành cho bạn' ? (
            <ProfilePosts data={data} />
          ) : null}
        </View>
      </View>
    </ScrollView>
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
    paddingHorizontal: 24,
  },
  greetingText: {
    color: '#ffff',
    fontSize: 18,
    fontFamily: 'HankenGrotesk-Regular',
    fontWeight: '500',
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: '#2E8AF6',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
