import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, PanResponder } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import { UserContext } from '../../services/provider/UseContext';
import { GET_ALL_POST } from '../../services/ApiConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const [greeting, setGreeting] = useState('');
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Dành cho bạn');
  
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyTopRefresh = useSharedValue(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const insets = useSafeAreaInsets();

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
        const response = await fetch(GET_ALL_POST);
        const responseData = await response.json();
        const sortedData = responseData.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      } finally {
        setLoading(false);
      }
    };

    setGreeting(getGreeting());
    fetchUserData();
  }, []);

  const handleUserPress = (userId) => {
    navigation.navigate('Profile', { userId });
  };

  // Pull-to-refresh logic
  const onRefresh = (done) => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      done();
    }, 2000);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const pullDownStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pullDownPosition.value }],
    backgroundColor: pullDownPosition.value > 50 ? '#181A1C' : '#181A1C',
  }));

  const refreshContainerStyle = useAnimatedStyle(() => ({
    height: pullDownPosition.value,
    opacity: pullDownPosition.value > 0 ? 1 : 0,
  }));

  const onPanRelease = () => {
    // Kiểm tra nếu kéo xuống đủ xa mới refresh
    pullDownPosition.value = withTiming(isReadyTopRefresh.value ? 120 : 0, {
      duration: 180, // Tốc độ thả tay
    });
    
    if (isReadyTopRefresh.value) {
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, { duration: 180 });
      };
      onRefresh(onRefreshComplete); // Gọi hàm refresh khi kéo xuống đủ xa
    }
  };
  
  const panResponderRef = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy > 100, // Điều kiện kéo nhẹ
      onPanResponderMove: (event, gestureState) => {
        const maxDistance = 120; // Khoảng cách tối đa có thể kéo xuống (giảm từ 150 xuống 120)
        const pullDistance = Math.max(Math.min(maxDistance, gestureState.dy), 0); // Giới hạn kéo xuống
  
        pullDownPosition.value = pullDistance; // Cập nhật vị trí kéo xuống
        isReadyTopRefresh.value = pullDistance >= 60; // Kiểm tra kéo đủ xa (60px)
      },
      onPanResponderRelease: onPanRelease, // Xử lý khi thả tay
      onPanResponderTerminate: onPanRelease, // Xử lý khi hủy kéo
    })
  );
  
  

  const renderItem = ({ item }) => (
    <View style={styles.itemCardView}>
      <Image source={item.image} style={styles.itemCardImage} />
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { backgroundColor: refreshing ? '#181A1C' : '#181A1C' }]}>
      <Animated.View style={[refreshContainerStyle, styles.loaderContainer]}>
        <LottieView
          source={require('../../assets/lottie/loader.json')}
          autoPlay
          loop
          style={styles.animationStyle}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        style={[pullDownStyle, styles.pullDownStyles, { backgroundColor:'#181A1C',paddingTop: Math.max(Number(insets.top), 15) }]}
        {...panResponderRef.current.panHandlers}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greetingText}>{greeting}</Text>
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
            style={[styles.tab, selectedTab === 'Dành cho bạn' && styles.activeTab]}
            onPress={() => setSelectedTab('Dành cho bạn')}
          >
            <Text style={styles.tabText}>Dành cho bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Đang theo dõi' && styles.activeTab]}
            onPress={() => {
              setSelectedTab('Đang theo dõi');
            }}
          >
            <Text style={styles.tabText}>Đang theo dõi</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
        ) : selectedTab === 'Dành cho bạn' ? (
          <ProfilePosts navigation={navigation} data={data} />
        ) : null}
      </Animated.View>
    </Animated.View>
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
  itemCardView: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCardImage: {
    height: 30,
    width: 30,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
  },
  loaderContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: 0,
  },
  pullDownStyles: {
     flex:1,
     
  },
  animationStyle: {
    width: '100%',
    height: 150,
  },
});
