import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../../assets/style/ReportStyle';
import LinearGradient from 'react-native-linear-gradient';

const ReportIssueScreen = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [currentText, setCurrentText] = useState(0); // Index của text hiện tại
  const textOpacity = useRef(new Animated.Value(1)).current; // Giá trị opacity của text

  // Các text cần hiển thị
  const textArray = [
    'Xin chào, đây là ứng dụng Campuspoly!',
    'Bạn đang gặp vấn đề hoặc khiếu nại ư?',
    'Nếu bạn muốn khiếu nại hoặc báo cáo .',
    'Hãy nhập vào biểu mẫu trên chúng tôi sẽ sử lí'
  ];

  // Animation cho text
  const startTextAnimation = () => {
    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 0, // Ẩn text hiện tại
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1, // Hiển thị text mới
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentText((prev) => (prev + 1) % textArray.length); // Chuyển sang text tiếp theo
    });
  };

  // Vòng lặp hiển thị text
  useEffect(() => {
    const interval = setInterval(() => {
      startTextAnimation();
    }, 7000); // Chạy hiệu ứng mỗi 3 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.circleIcon}
          >
            <Image
              source={require('../../assets/images/arowleft.png')}
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <View style={styles.barHeader}>
            <Text style={styles.textHeader}>Gửi yêu cầu hỗ trợ</Text>
          </View>
        </View>
        <Text style={styles.descriptionText}>
          Bạn đang gặp sự cố? Vậy hãy nhắn tin cho chúng tôi.
        </Text>

        {/* Form nhập liệu */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email của bạn</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email của bạn"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Sự cố bạn gặp</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Mô tả sự cố của bạn"
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
          />
          <LinearGradient
            colors={['#F7B733', '#FC4A1A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}>
              <Text style={styles.submitButtonText}>Gửi</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Bong bóng kéo thả */}
      {isVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#FFD700',
            borderRadius: 20, // Giảm kích thước và bo góc nhiều hơn
            elevation: 5,
            padding: 10, // Căn chỉnh padding
            maxWidth: 200, // Giới hạn chiều rộng để tự động xuống dòng
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Text + Ảnh đại diện */}
          <Animated.Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              marginRight: 10,
              opacity: textOpacity, // Chỉ áp dụng animation cho text
              flex: 1, // Text sẽ chiếm hết không gian còn lại
              flexWrap: 'wrap', // Đảm bảo text xuống dòng
            }}
          >
            {textArray[currentText]} {/* Hiển thị text hiện tại */}
          </Animated.Text>
          <Image
            source={require('../../assets/images/phungvanduy.png')}
            style={{
              width: 50, // Giảm kích thước ảnh
              height: 50,
              borderRadius: 25,
            }}
            resizeMode="cover"
          />

          {/* Nút đóng */}
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              width: 20,
              height: 20,
              backgroundColor: '#FF0000',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 2,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 12 }}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReportIssueScreen;
