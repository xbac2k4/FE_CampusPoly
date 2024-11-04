import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated, Alert, Modal } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import GiphySelector from './GiphySelector';
import styles from '../../assets/style/CreatCPStyle';

const PostComponent = ({ title: initialTitle, content: initialContent, image, gif, onContentChange, user }) => {
  const [inputHeight, setInputHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedImage, setSelectedImage] = useState(image || null);
  const [selectedGif, setSelectedGif] = useState(gif || null);
  const [isGifModalVisible, setGifModalVisible] = useState(false);
  const [content, setContent] = useState(initialContent || ''); // State cho Content
  const [title, setTitle] = useState(initialTitle || ''); // State cho Title

  // Cập nhật giá trị props vào state khi props thay đổi
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setSelectedImage(image);
    setSelectedGif(gif);
  }, [initialTitle, initialContent, image, gif]);

  // Xử lý sự thay đổi nội dung
  const handleTitleChange = (text) => {
    setTitle(text);
    onContentChange(text, content, selectedImage, selectedGif);
  };

  const handleContentChange = (text) => {
    setContent(text);
    onContentChange(title, text, selectedImage, selectedGif);
  };

  const handleGifSelect = (gifUrl) => {
    setSelectedGif(gifUrl);
    setGifModalVisible(false);
    onContentChange(content, selectedImage, gifUrl);
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
      console.error(response.errorMessage);
      Alert.alert('Lỗi', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      setSelectedImage(response.assets[0].uri);
      Alert.alert('Thành công', 'Ảnh đã được chọn!');
      onContentChange(title, content, response.assets[0].uri, selectedGif); // Cập nhật ảnh
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
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Bạn đã hủy chọn file');
      } else {
        Alert.alert('Lỗi', err.message);
      }
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };

  const clearSelectedGif = () => {
    setSelectedGif(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.postRow}>
        {user && user.data.avatar ? (
          <Image source={{ uri: user.data.avatar.replace('localhost', '10.0.2.2') }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
            placeholder="Title?"
            placeholderTextColor="#888"
            multiline
            value={title} // Sử dụng giá trị từ state
            onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
            onChangeText={handleTitleChange}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
            placeholder="What’s on your mind?"
            placeholderTextColor="#888"
            multiline
            value={content} // Sử dụng giá trị từ state
            onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
            onChangeText={handleContentChange}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

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

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.addButton} onPress={toggleImages}>
          <Image source={require('../../assets/images/add.png')} resizeMode="contain" style={{ width: 12, height: 12 }} />
        </TouchableOpacity>

        {isVisible && (
          <Animated.View style={[styles.imageContainer, animatedStyle]}>
            <View style={styles.imageRow}>
              <TouchableOpacity onPress={openImageLibrary}>
                <Image source={require('../../assets/images/image.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setGifModalVisible(true)}>
                <Image source={require('../../assets/images/GIF.png')} style={styles.image} />
              </TouchableOpacity>

              <Modal visible={isGifModalVisible} animationType="slide">
                <GiphySelector onGifSelect={handleGifSelect} />
              </Modal>

              <TouchableOpacity onPress={openCamera}>
                <Image source={require('../../assets/images/Camera.png')} style={styles.image} />
              </TouchableOpacity>

              <TouchableOpacity onPress={openFilePicker}>
                <Image source={require('../../assets/images/Attachment.png')} style={styles.image} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default PostComponent;
