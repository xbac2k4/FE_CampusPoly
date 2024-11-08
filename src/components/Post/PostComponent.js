import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated, Alert, Modal } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import GiphySelector from './GiphySelector';

const PostComponent = ({ onContentChange }) => {
  const [inputHeight, setInputHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isGifModalVisible, setGifModalVisible] = useState(false);
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [content, setContent] = useState(''); // State để lưu nội dung bài viết

 

  // Hàm để gọi API lấy thông tin người dùng
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/v1/users/get-user-by-id/670ca3898cfc1be4b41b183b');
      const data = await response.json();
      
      // Log toàn bộ dữ liệu để kiểm tra
      console.log('Dữ liệu người dùng:', data);
  
      setUser(data); // Cập nhật state với thông tin người dùng
      
      // Log thông tin avatar nếu có
      if (data && data.avatar) {
        console.log('Avatar:', data.avatar);
      } else {
        console.log('Không tìm thấy avatar trong dữ liệu.');
      }
  
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      Alert.alert('Lỗi', 'Không thể lấy dữ liệu người dùng.');
    }
  };
  
  useEffect(() => {
    fetchUserData(); // Gọi hàm lấy dữ liệu khi component mount
  }, []);

  const handleGifSelect = (gifUrl) => {
    setSelectedGif(gifUrl);
    setGifModalVisible(false);
  };

  const toggleImages = () => {
    setIsVisible(!isVisible);
    Animated.spring(animation, {
      toValue: isVisible ? 0 : 1,
      friction: 5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [10, 0],
        }),
      },
    ],
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      Alert.alert('Bạn đã hủy chọn ảnh');
    } else if (response.errorMessage) {
      console.error(response.errorMessage); // Ghi lại lỗi
      Alert.alert('Lỗi', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      setSelectedImage(response.assets[0].uri);
      Alert.alert('Thành công', 'Ảnh đã được chọn!');
    }
  };

  const openImageLibrary = () => {
    const options = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(options, handleImageResponse);
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', saveToPhotos: true };
    launchCamera(options, handleImageResponse);
  };

  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      Alert.alert('File đã được chọn!', `Tên file: ${res.name}`);
      // Thực hiện hành động với file đã chọn, chẳng hạn như upload lên server
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Bạn đã hủy chọn file');
      } else {
        Alert.alert('Lỗi', err.message);
      }
    }
  };

  // Hàm xóa ảnh đã chọn
  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  // Hàm xóa GIF đã chọn
  const clearSelectedGif = () => {
    setSelectedGif(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.postRow}>
        {user && user.avatar ? ( // Kiểm tra nếu user và avatar không null
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
            placeholder="What’s on your mind?"
            placeholderTextColor="#888"
            multiline
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      {/** Chỗ chứa ảnh và gif khi đẩy lên */}
      <View style={styles.imageContent}>
        {selectedImage && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            <TouchableOpacity style={styles.removeImageButton} onPress={clearSelectedImage}>
              <Image source={require('../../assets/images/x.png')} style={styles.removeImageIcon} />
            </TouchableOpacity>
          </View>
        )}
        {selectedGif && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: selectedGif }} style={styles.selectedGif} />
            <TouchableOpacity style={styles.removeImageButton} onPress={clearSelectedGif}>
              <Image source={require('../../assets/images/x.png')} style={styles.removeImageIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/** Thanh công cụ lựa chọn chức năng */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.addButton} onPress={toggleImages}>
          <Image
            source={require('../../assets/images/add.png')}
            resizeMode="contain"
            style={{ width: 12, height: 12 }}
          />
        </TouchableOpacity>

        {isVisible && (
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <View style={styles.imageRow}>
              <TouchableOpacity onPress={openImageLibrary}>
                <Image
                  source={require('../../assets/images/image.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setGifModalVisible(true)}>
                <Image
                  source={require('../../assets/images/GIF.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <Modal visible={isGifModalVisible} animationType="slide">
                <GiphySelector onGifSelect={handleGifSelect} />
              </Modal>

              <TouchableOpacity onPress={openCamera}>
                <Image
                  source={require('../../assets/images/Camera.png')}
                  style={styles.image}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={openFilePicker}>
                <Image
                  source={require('../../assets/images/Attachment.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: '#888', // Màu nền placeholder
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    color: '#ECEBED',
    fontSize: 16,
    padding: 0,
    margin: 0,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#323436',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 160,
    height: 32,
    borderRadius: 32,
    overflow: 'hidden',
    marginLeft: 10,
    backgroundColor: '#323436',
    justifyContent: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  selectedImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  selectedGif: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 2,
  },
  removeImageIcon: {
    width: 14,
    height: 14,
  },
});
