import React, { useState } from 'react';
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
  const handleContentChange = (text) => {
    setContent(text);
    onContentChange(text); // Gọi hàm truyền từ màn hình cha
  };
  const user = {
    id: "1",
    name: "Linh Nguyễn",
    location: "Hà Nội, Việt Nam",
    bio: "Nhà văn yêu thích thiên nhiên.",
    profileImage: "https://unsplash.com/photos/NRQV-hBF10M/download?force=true",
    backgroundImage: "https://images.unsplash.com/photo-1726768619030-9eafbc5788b2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    friends: 1500,
    posts: [
      {
        id: 1,
        text: "Hoàng hôn đẹp quá!",
        likes: 300,
        comments: 20,
        images: [
          "https://unsplash.com/photos/NRQV-hBF10M/download?force=true"
        ],
        time: "1h ago"
      }
    ]
  };
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
        <Image
          source={{ uri: user.profileImage }}
          style={styles.avatar}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
            placeholder="What’s on your mind?"
            placeholderTextColor="#888"
            multiline
            onChangeText={handleContentChange} // Cập nhật nội dung
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
    marginLeft: 5,
  },
  imageContent: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  imageWrapper: {
    position: 'relative', // Để có thể đặt icon x lên góc của ảnh
    marginRight: 5, // Khoảng cách giữa các ảnh
  },
  removeImageButton: {
    position: 'absolute',
    top: -3.5,
    right: -8,
    
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  removeImageIcon: {
    width: 20,
    height: 20,
    
  },
});
