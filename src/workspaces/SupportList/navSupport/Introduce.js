import React, { useRef, useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';  // Import thư viện Video
const { width } = Dimensions.get('window');
const slideWidth = width * 0.8; // Chiều rộng mỗi slide
const slidePadding = (width - slideWidth) / 2; // Khoảng padding để căn giữa

const slideData = [
  require('../../../assets/images/anhs1.png'),
  require('../../../assets/images/anhs2.jpg'),
  require('../../../assets/images/anhs3.jpg'),
];

const Introduce = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Hiệu ứng mờ dần text
  const translateYAnim = useRef(new Animated.Value(50)).current; // Hiệu ứng trượt từ dưới lên
  const [currentVideo, setCurrentVideo] = useState(require('../../../assets/video/videos3.mp4'));
  const videoFadeAnim = useRef(new Animated.Value(1)).current; // Hiệu ứng mờ video

  const slideTexts = [
    "Xây dựng tương lai kết nối của con người",
    "Xây dựng trải nghiệm cho mọi người",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
    }, 6000); // Chuyển slide mỗi 6 giây

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: currentIndex * slideWidth,
        animated: true,
      });
    }

    // Tạo hiệu ứng chữ mờ dần và trượt từ dưới lên
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0, // Mờ đi
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1, // Hiện lại
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0, // Trượt lên vị trí ban đầu
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={{ width: slideWidth }}>
      <Image source={item} style={styles.imgSlide} resizeMode="cover" />
    </View>
  );
  const changeVideo = (direction) => {
    const nextVideo =
      direction === 'right' ? require('../../../assets/video/videos2.mp4') : require('../../../assets/video/videos3.mp4');

    // Áp dụng hiệu ứng mờ dần khi đổi video
    Animated.timing(videoFadeAnim, {
      toValue: 0, // Mờ đi
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentVideo(nextVideo); // Cập nhật video
      Animated.timing(videoFadeAnim, {
        toValue: 1, // Hiện lại
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };


  return (
    <ScrollView style={styles.container}>
      {/* Bar */}
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.circleIcon}
        >
          <Image
            source={require('../../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <View style={styles.barHeader}>
          <Text style={styles.textHeader}>CampusPoly giới thiệu</Text>
          <View style={{ height: 2, backgroundColor: '#fff' }} />
        </View>
      </View>

      {/* Thông tin giới thiệu */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Image
          source={require('../../../assets/images/white_bee.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />

        {/* Slide */}
        <View style={styles.slideWrapper}>
          <FlatList
            data={slideData}
            horizontal
            pagingEnabled
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: slidePadding, // Thêm padding ở hai bên
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
        </View>

        {/* Hiển thị dòng chữ */}
        <View style={styles.textheadercontainer}>
          <Animated.Text
            style={[
              styles.textHeader,
              {
                fontSize: 25,
                opacity: fadeAnim, // Áp dụng hiệu ứng mờ
                transform: [{ translateY: translateYAnim }], // Áp dụng hiệu ứng trượt
              },
            ]}
          >
            {slideTexts[currentIndex % slideTexts.length]}
          </Animated.Text>
        </View>

        {/* Nút "Tìm hiểu thêm" */}
        <TouchableOpacity>
          <LinearGradient
            colors={['#F7B733', '#FC4A1A']} // Màu gradient
            start={{ x: 0, y: 0 }} // Điểm bắt đầu
            end={{ x: 1, y: 0 }} // Điểm kết thúc
            style={styles.gradientButton}
          >
            <Text style={styles.learnMoreText}>Tìm hiểu thêm</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Thanh ngang */}
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressIndicator,
              {
                width: scrollX.interpolate({
                  inputRange: [0, slideWidth * (slideData.length - 1)],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: scrollX.interpolate({
                  inputRange: [0, slideWidth / 2, slideWidth],
                  outputRange: ["#ccc", "#007bff", "#ccc"], // Đổi màu theo trạng thái
                }),
              },
            ]}
          />
        </View>

        {/* Đoạn body */}
        <View style={styles.bodyContainer}>
          <LinearGradient
            colors={['#F7B733', '#FC4A1A']} // Đổi màu gradient tùy ý
            start={{ x: 0, y: 0 }} // Điểm bắt đầu gradient
            end={{ x: 1, y: 1 }} // Điểm kết thúc gradient
            style={styles.gradientBackground} // Áp dụng style
          >
            <Text style={[styles.descriptionText, { textAlign: 'center' }]}>
              Xây dựng tương lai về kết nối của con người và công nghệ giúp điều đó trở nên khả thi.
            </Text>
            {/* Video */}
            <Video
              source={require('../../../assets/video/video1.mp4')} // Đường dẫn tới video
              style={styles.videoStyle} // Áp dụng kích thước
              resizeMode="cover" // Chế độ video
              repeat={true} // Lặp lại video
              onLoad={() => console.log('Video loaded!')} // Gọi khi video được tải
            />
            <Text style={[styles.descriptionText, { textAlign: 'center' }]}>
              Giúp mọi người gắn kết cùng nhau , làm được nhiều việc hơn
            </Text>
            <Text style={[styles.descriptionText, { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }]}>
              4 Tháng với 7+
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <TouchableOpacity style={styles.circleIcon2}
                onPress={() => changeVideo('left')} // Đổi về videos3
              >
                <Image source={require('../../../assets/images/left.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleIcon2} onPress={() => changeVideo('right')}  >
                <Image source={require('../../../assets/images/right.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
            <Animated.View style={{ opacity: videoFadeAnim }}>
              <Video
                source={currentVideo} // Video hiện tại
                style={[styles.videoStyle, { alignSelf: 'flex-end' }]} // Áp dụng kích thước
                resizeMode="cover" // Chế độ video
                repeat={true} // Lặp lại video
                onLoad={() => console.log('Video loaded!')} // Gọi khi video được tải
              />
            </Animated.View>


          </LinearGradient>
        </View>
        {/**footer */}
        <Image source={require('../../../assets/images/anhs3.jpg')} style={[styles.imgSlide, { marginTop: 25 }]} />
        <View style={{ marginTop: 25,paddingHorizontal:24 }}>
          <Text style={[styles.descriptionText,{alignContent:'center',fontSize:20,fontWeight:'bold'}]}>Ưu tiên quyền riêng tư và bảo mật</Text>
          <Text style={[styles.descriptionText]}>
            Chúng tôi đang xây dựng các trải nghiệm xã hội giúp bảo mật tài khoản của bạn và cung cấp cho bạn quyền đưa ra các lựa chọn về cách sử dụng dữ liệu của mình.
          </Text>
        </View>
        <View style={[styles.bodyContainer,{width:'100%'}]}>
          <LinearGradient
            colors={['#F7B733', '#FC4A1A']} // Đổi màu gradient tùy ý
            start={{ x: 0, y: 0 }} // Điểm bắt đầu gradient
            end={{ x: 1, y: 1 }} // Điểm kết thúc gradient
            style={styles.gradientBackground} // Áp dụng style
          >
          <View style={{flexDirection:'row'}}>
            <Image source={require('../../../assets/images/white_bee.png')} style={{width:30,height:30,marginRight:15}} />
            <Text style={[styles.descriptionText,{fontWeight:'900'}]}>Form CampusPoly</Text>
            </View>  
              <Text style={[styles.descriptionText,{fontSize:15}]}>Theo dõi chúng tôi </Text>
              <Image source={require('../../../assets/images/socail.png')} style={{width:250,height:40}} />
              <Text style={[styles.descriptionText,{fontSize:15}]}>Điều khoản | Cookie policy</Text>
              <Text style={[styles.descriptionText,{fontSize:15}]}>Tiêu chuẩn cộng đồng | Chính sách bảo mật</Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <Text style={[styles.descriptionText,{fontSize:13,fontWeight:'bold'}]}>© 2024 Campuspoly</Text>
             <Text style={[styles.descriptionText,{fontSize:13,fontWeight:'bold'}]}>Tiếng Việt</Text>
             </View>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

export default Introduce;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#181A1C',
    flexGrow: 1,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  circleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#323436',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '5%',
    top: '2%',
  },
  textHeader: {
    color: '#ECEBED',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'rgl1',
  },
  slideWrapper: {
    width: width,
    alignItems: 'center',
  },
  imgSlide: {
    width: slideWidth,
    height: 300,
    borderRadius: 22,
    marginHorizontal: 10,
  },
  textheadercontainer: {
    paddingHorizontal: 24,
    marginTop: 15,
  },
  gradientButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: 'flex-start', // Căn trái
    marginLeft: 10, // Khoảng cách từ trái
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    width: '80%',
    marginTop: 20,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: 4,
    borderRadius: 2,
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10, // Làm bo góc
    overflow: 'hidden', // Ẩn phần thừa nếu có
  },
  gradientBackground: {
    padding: 15, // Khoảng cách nội dung
    borderRadius: 10, // Bo góc giống View bên ngoài
  },
  descriptionText: {
    fontSize: 18,
    color: '#ECEBED', // Màu chữ

    lineHeight: 26,
    fontWeight: 'semibold'
  },
  videoStyle: {
    width: 200, // Chiều rộng video
    height: 100, // Chiều cao video
    borderRadius: 10, // Bo góc video
    marginBottom: 10, // Khoảng cách với Text
    marginTop: 50
  },
  circleIcon2: {
    width: 50,
    height: 50,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

});
