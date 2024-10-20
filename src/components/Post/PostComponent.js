import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated, Alert, Modal } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'; // Nhập thư viện
import GiphySelector from './GiphySelector';

const PostComponent = () => {
  const [inputHeight, setInputHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isGifModalVisible, setGifModalVisible] = useState(false);

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

  const openImageLibrary = () => {
    const options = { mediaType: 'photo', selectionLimit: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Bạn đã hủy chọn ảnh');
      } else if (response.errorMessage) {
        Alert.alert('Lỗi', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
        Alert.alert('Thành công', 'Ảnh đã được chọn!');
      }
    });
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', saveToPhotos: true };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Bạn đã hủy chụp ảnh');
      } else if (response.errorMessage) {
        Alert.alert('Lỗi', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
        Alert.alert('Thành công', 'Ảnh đã được chụp!');
      }
    });
  };

  const openFilePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Cho phép chọn tất cả các loại file
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

  return (
    <View style={styles.container}>
      <View style={styles.postRow}>
        <Image
          source={require('../../assets/images/venice1.png')}
          style={styles.avatar}
        />
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

              {selectedGif && (
                <Image source={{ uri: selectedGif }} style={styles.selectedGif} />
              )}

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
  selectedGif: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
