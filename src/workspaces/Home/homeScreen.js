import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl, useWindowDimensions, Animated, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingTimeline from '../../components/Loading/LoadingTimeline';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import Screens from '../../navigation/Screens';
import { GET_ALL_POST, GET_POST_BY_FRIENDS, GET_POST_BY_USER_INTERACTION } from '../../services/ApiConfig';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Color';
import { UserContext } from '../../services/provider/UseContext';
import { SocketContext } from '../../services/provider/SocketContext';
import { PageIndicator } from 'react-native-page-indicator';
const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  // const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [dataPost, setDataPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Dành cho bạn'); // Trạng thái cho tab hiện tại
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);

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
      setData(responseData.data);
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
  // useFocusEffect(
  //   useCallback(() => {
  //     const handleUserData = async () => {
  //       await fetchUserData();
  //     }
  //     handleUserData();
  //   }, [])
  // );

  useEffect(() => {
    setGreeting(getGreeting());
    fetchUserData();
    fetchPostByFriends();
  }, []);

  // slider
  const pages = [
    {
      image: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg',
      title: 'Admin1',
      content: 'okccccccccccccccccccccccccccccc',
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

  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
  // slider

  const renderHeaderTabs = () => (
    <View
      style={[styles.tabContainer]}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setSelectedTab('Dành cho bạn')}
      >
        <LinearGradient
          colors={selectedTab == 'Dành cho bạn' ? [Colors.first, Colors.second] : [Colors.background, Colors.background]}
          style={styles.tab}
        >
          <Text style={styles.tabText}>Dành cho bạn</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setSelectedTab('Bạn bè')}
      >
        <LinearGradient
          colors={selectedTab == 'Bạn bè' ? [Colors.first, Colors.second] : [Colors.background, Colors.background]}
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

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <View style={styles.headerContent}>
              <Text style={styles.greetingText}>
                <Text>{greeting}</Text>
              </Text>
              <TouchableOpacity
                style={styles.circleIcon}
                onPress={() => navigation.navigate(Screens.Message)}
              >
                <AntDesign name="message1" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
            {/* Tab điều hướng */}
            {renderHeaderTabs()}

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
                      left : 0,
                      right: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      padding : 20,
                      bottom: 20,
                      position: 'absolute',
                    }}>
                      <Text style={{ color: 'white',marginLeft: 10 }}>{page.title}</Text>
                      <Text style={{ color: 'white',marginLeft: 10 }}>{page.content}</Text>
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
              <ProfilePosts navigation={navigation} data={data} />
            ) : (
              <ProfilePosts navigation={navigation} data={dataPost} />
            )}

            {/* Thêm khoảng trống ở cuối danh sách bài post */}
            <View style={{ height: 60 }} />
          </View>
        </View>
      </ScrollView>
    </View>
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
