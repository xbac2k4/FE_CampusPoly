
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingTimeline from '../../components/Loading/LoadingTimeline';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import Screens from '../../navigation/Screens';
import { GET_ALL_POST } from '../../services/ApiConfig';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Color';
import { UserContext } from '../../services/provider/UseContext';
const HomeScreen = ({ navigation }) => {
  const [greeting, setGreeting] = useState('');
  // const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Dành cho bạn'); // Trạng thái cho tab hiện tại
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext);

  const getGreeting = () => {
    // const currentHour = new Date().getHours();
    // if (currentHour >= 7 && currentHour < 10) {
    //   return 'Chào buổi sáng🌞';
    // } else if (currentHour >= 10 && currentHour < 18) {
    //   return 'Chào buổi chiều😎';
    // } else {
    //   return 'Chào buổi tối🌚';
    // }
    // console.log(user);
    
    return `Xin chào, ${user.full_name}`; // Example greeting
  };

  const fetchUserData = async () => {
    setRefreshing(false); // Stop the refresh animation
    try {
      setLoading(true); // Đặt lại loading trước khi gọi API
      const response = await fetch(GET_ALL_POST);
      const responseData = await response.json();
      const sortedData = responseData.data.sort((a, b) => new Date(b.postData.createdAt) - new Date(a.postData.createdAt));
      setData(sortedData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const handleUserData = async () => {
        await fetchUserData();
      }
      handleUserData();
    }, [])
  );

  useEffect(() => {
    setGreeting(getGreeting());
    fetchUserData();
  }, []);

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

            {loading ? (
              // <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
              <LoadingTimeline quantity={3} />
            ) : selectedTab === 'Dành cho bạn' ? (
              <ProfilePosts navigation={navigation} data={data} />
            ) : null}

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
