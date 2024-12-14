import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageIndicator } from 'react-native-page-indicator';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingTimeline from '../../components/Loading/LoadingTimeline';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import Colors from '../../constants/Color';
import Screens from '../../navigation/Screens';
import { GET_POST_BY_FRIENDS, GET_POST_BY_USER_INTERACTION, CHECK_POST } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';
import { ThemeContext } from '../../services/provider/ThemeContext';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
const HomeScreen = ({ navigation, route }) => {
  const [greeting, setGreeting] = useState('');
  const [data, setData] = useState([]);
  // const [dataAdmin, setDataAdmin] = useState([]);
  const [pages, setPages] = useState([]);
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
        fetchPostByFriends();
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
      // const sortedData = responseData.data.sort((a, b) => new Date(b.postData.createdAt) - new Date(a.postData.createdAt));
      const filteredData = responseData.data.filter(item => item.postData.is_pinned !== true && item.postData.is_blocked !== true);
      setData(filteredData);
      const filteredDataAdmin = responseData.data.filter(item => item.postData.is_pinned === true && item.postData.is_blocked !== true);
      const sortedDataAdmin = filteredDataAdmin.sort((a, b) => new Date(b.postData.createdAt) - new Date(a.postData.createdAt));
      // if (sortedDataAdmin.length === 0) {
      //   console.log("Không có bài viết admin nào.");
      // }
      // Cập nhật slider
      const adminPages = sortedDataAdmin.map(item => ({
        image: item?.postData?.image[0] || 'https://i.ytimg.com/vi/eETwsp0_HkA/sddefault.jpg', // Lấy ảnh đầu tiên trong mảng image, nếu không có thì dùng ảnh mặc định
        title: item?.postData.title || 'Tiêu đề không xác định', // Nếu không có title thì dùng tiêu đề mặc định
        content: item?.postData.content || 'Nội dung không xác định', // Nếu không có content thì dùng nội dung mặc định
        _id: item?.postData._id, // Lấy _id của bài viết
      }));
      // console.log("adminPages:", adminPages); // Kiểm tra dữ liệu adminPages
      setPages([...adminPages]); // Cập nhật dữ liệu cho slider
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
      setDataPost(responseData.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  const handdleComment = async (postData) => {

    const result = await axios.post(CHECK_POST, {
      _id: postData
    })

    if (!result.data.success) {
      ToastAndroid.show(result.data.message, ToastAndroid.SHORT);
      return
    }

    if (result.data.isBlocked) {
      ToastAndroid.show(result.data.message, ToastAndroid.SHORT);
      return
    }

    navigation.navigate(Screens.Comment, { postId: postData })
  }

  useEffect(() => {
    setGreeting(getGreeting());
    fetchUserData();
    fetchPostByFriends();
  }, []);


  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;
  // slider

  const renderHeaderTabs = () => (
    <View
      style={[styles.tabContainer]}>
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

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

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

  return (
    <View style={[styles.container, {
      backgroundColor: theme ? Colors.background : '#fff',
    }]}>
      <ScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderIndices={[2]}
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
                <TouchableOpacity onPress={() => handdleComment(page?._id)}>
                  <Image source={{ uri: page?.image.replace('localhost', '10.0.2.2') }} width={width * 0.9} height={height * 0.25} style={{
                    borderRadius: 10,
                  }} />
                </TouchableOpacity>

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
                  <Text style={{ color: 'white', marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}
                    numberOfLines={1}  // Giới hạn số dòng hiển thị là 1
                    ellipsizeMode="tail"  // Hiển thị ba chấm ở cuối nếu văn bản vượt quá
                  >{page.title}</Text>
                  <Text style={{ color: 'white', marginLeft: 10, fontWeight: '500', fontSize: 16 }}
                    numberOfLines={1}  // Giới hạn số dòng hiển thị là 1
                    ellipsizeMode="tail"  // Hiển thị ba chấm ở cuối nếu văn bản vượt quá
                  >{page.content}</Text>
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
            <PageIndicator count={pages.length > 1 ? pages.length : 0} current={animatedCurrent} color={Colors.second} />

          </View>
          {/* slider */}
        </View>
        {/* Tab điều hướng */}
        <>
          {renderHeaderTabs()}
        </>
        {/* slider */}
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
