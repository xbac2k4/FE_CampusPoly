import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageIndicator } from 'react-native-page-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingTimeline from '../../components/Loading/LoadingTimeline';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import Colors from '../../constants/Color';
import Screens from '../../navigation/Screens';
import { GET_POST_BY_FRIENDS, GET_POST_BY_USER_INTERACTION } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';
import { ThemeContext } from '../../services/provider/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
const HomeScreen = ({ navigation, route }) => {
  const [greeting, setGreeting] = useState('');
  const [data, setData] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Dành cho bạn'); // Trạng thái cho tab hiện tại
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const scrollViewRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      // console.log(route.params?.from);
      if (route.params?.from === Screens.CreatePost || route.params?.from === Screens.Comment) {
        fetchUserData();
        // fetchPostByFriends();
      }
    }, [route.params?.from])
  )

  const getGreeting = () => {

    return `Xin chào, ${user.full_name}`; // Example greeting
  };

  const fetchUserData = async () => {
    setRefreshing(false); // Stop the refresh animation
    try {
      setLoading(true); // Đặt lại loading trước khi gọi API
      const response = await fetch(`${GET_POST_BY_USER_INTERACTION}?user_id=${user._id}`);
      const responseData = await response.json();
      // console.log(responseData);
      // const sortedData = responseData.data.sort((a, b) => new Date(b.postData.createdAt) - new Date(a.postData.createdAt));
      const filteredData = responseData.data.filter(item => item.postData.is_pinned !== true && item.postData.is_blocked !== true);
      setData(filteredData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async () => {
    setRefreshing(false); // Stop the refresh animation
    try {
      setLoading(true); // Đặt lại loading trước khi gọi API
      const response = await fetch(`${GET_POST_BY_USER_INTERACTION}?user_id=${user._id}`);
      const responseData = await response.json();
      // console.log(responseData);
      // const sortedData = responseData.data.sort((a, b) => new Date(b.postData.createdAt) - new Date(a.postData.createdAt));
      const filteredData = responseData.data.filter(item => item.postData.is_pinned === true);
      setData(filteredData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostByFriends = async () => {
    setRefreshing(false); // Stop the refresh animation
    try {
      setLoading(true); // Đặt lại loading trước khi gọi API
      const response = await fetch(`${GET_POST_BY_FRIENDS}?user_id=${user._id}`);
      const responseData = await response.json();
      // console.log(responseData);

      // const sortedData = responseData.data.sort((a, b) => new Date(b.postData.createdAt) - new Date(a.postData.createdAt));
      setDataPost(responseData.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setGreeting(getGreeting());
    fetchUserData();
    // fetchPostByFriends();
  }, []);

  // slider
  const pages = [
    {
      image: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg',
      title: 'Điều khoản mới',
      content: 'Các bạn chú ý',
    },
    {
      image: 'https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg',
      title: 'Admim2',
      content: 'okccccccccccccccccccccccccccccc',
    },
    {
      image: 'https://hoinhabaobacgiang.vn/Includes/NewsImg/1_2024/29736_7-1-1626444923.jpg',
      title: 'Admim3',
      content: 'okccccccccccccccccccccccccccccc',
    },
  ];

  const forYou = async () => {
    scrollToTop();
    setSelectedTab('Dành cho bạn')
    fetchUserData()
  }

  const forFriends = async () => {
    scrollToTop();
    setSelectedTab('Bạn bè')
    fetchPostByFriends()
  }
  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
  // slider

  const renderHeaderTabs = () => (
    <View
      style={styles.tabContainer}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={forYou}
      >
        <LinearGradient
          colors={selectedTab == 'Dành cho bạn' ? [Colors.first, Colors.second] : theme ? [Colors.background, Colors.background] : ['#ccc', '#ccc']}
          style={styles.tab}
        >
          <Text style={styles.tabText}>Dành cho bạn</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={forFriends}
      >
        <LinearGradient
          colors={selectedTab == 'Bạn bè' ? [Colors.first, Colors.second] : theme ? [Colors.background, Colors.background] : ['#ccc', '#ccc']}
          style={styles.tab}
        >
          <Text style={styles.tabText}>Bạn bè</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request or data update
    fetchUserData();
    fetchPostByFriends();
  };

  handlePullRefresh = () => {
    // refreshing, you can return promise here.
  };

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={[styles.container, {
      backgroundColor: theme ? Colors.background : '#fff',
    }]}>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderIndices={[1]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.greetingText, {
            color: theme ? '#fff' : Colors.second,
          }]}>
            <Text>{greeting}</Text>
          </Text>
          <TouchableOpacity
            style={[styles.circleIcon, {
              borderColor: theme ? '#fff' : Colors.second
            }]}
            onPress={() => navigation.navigate(Screens.Message)}
          >
            <AntDesign name="message1" size={15} color={theme ? '#fff' : Colors.second} />
          </TouchableOpacity>
        </View>
        {/* Tab điều hướng */}
        <>
          {renderHeaderTabs()}
        </>

        {/* slider */}
        <View>
          <Animated.ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true,
            })}
          >
            {pages.map((page, index) => (
              <View key={index} style={[{

                alignItems: 'center',
                justifyContent: 'center',
              }, { width, height: height * 0.3 }]}>
                <Image source={{ uri: page.image }} width={width * 0.9} height={height * 0.25} style={{
                  borderRadius: 10,
                }}
                />
                <View style={{
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  paddingVertical: 20,
                  marginHorizontal: 20,
                  bottom: 20,
                  position: 'absolute',
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                }}>
                  <Text style={{ color: 'white', marginLeft: 10 }}>{page.title}</Text>
                  <Text style={{ color: 'white', marginLeft: 10 }}>{page.content}</Text>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
          <View style={{
            left: 20,
            right: 20,
            bottom: 0,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',

          }}>
            <PageIndicator count={pages.length} current={animatedCurrent} color='white' />

          </View>
          {/* slider */}
        </View>

        {loading ? (
          // <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
          <LoadingTimeline quantity={3} />
        ) : selectedTab === 'Dành cho bạn' ? (
          <ProfilePosts data={data} />
        ) : (
          <ProfilePosts data={dataPost} />
        )}

        {/* Thêm khoảng trống ở cuối danh sách bài post */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    justifyContent: 'space-between',
    marginTop: 40,
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  greetingText: {
    fontSize: 18,
    fontFamily: 'HankenGrotesk-Regular',
    fontWeight: '500',
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    textAlign: 'center',
  },
});
