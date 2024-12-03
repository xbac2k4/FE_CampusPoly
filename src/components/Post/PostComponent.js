import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated, Alert, Modal, FlatList, ScrollView, ActivityIndicator, TouchableWithoutFeedback, ToastAndroid } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import GiphySelector from './GiphySelector';
// import styles from '../../assets/style/CreatCPStyle';
import { GET_HASHTAG } from '../../services/ApiConfig';

const PostComponent = ({ title: initialTitle, content: initialContent, hashtag: initialHashtag, image, gif, onContentChange, user }) => {
  const [inputHeight, setInputHeight] = useState(40);
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedImages, setSelectedImages] = useState(image || []);
  const [selectedGif, setSelectedGif] = useState(gif || null);
  const [isGifModalVisible, setGifModalVisible] = useState(false);
  const [content, setContent] = useState(initialContent || ''); // State cho Content
  const [hashtag, setHashtag] = useState(initialHashtag || ''); // State cho hashtag
  const [title, setTitle] = useState(initialTitle || ''); // State cho Title
  const [loadImage, setLoadImage] = useState(false);
  const [lengthImage, setLengthImage] = useState(0);

  const [suggestedHashtags, setSuggestedHashtags] = useState([]); // Gợi ý hashtag từ DB
  const [selectedHashtags, setSelectedHashtags] = useState([]); // Danh sách hashtag đã chọn

  // Cập nhật giá trị props vào state khi props thay đổi
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setHashtag(initialHashtag);
    setSelectedImages(image);
    setSelectedGif(gif);
  }, [initialTitle, initialContent, initialHashtag, image, gif]);

  // Xử lý sự thay đổi nội dung
  const handleTitleChange = (text) => {
    setTitle(text);
    onContentChange(text, content, hashtag, selectedImages, selectedGif);
  };

  const handleContentChange = (text) => {
    setContent(text);
    onContentChange(title, text, hashtag, selectedImages, selectedGif);
  };

  const handleHashtagChange = async (text) => {
    let hashtagText = text.trim();
    // Kiểm tra nếu người dùng không nhập # ở đầu, tự động thêm
    if (hashtagText && !hashtagText.startsWith('#')) {
      hashtagText = '#' + hashtagText; // Thêm dấu # vào đầu
    }
    setHashtag(hashtagText);
    if (hashtagText !== '') {
      try {
        // Gọi API với từ khóa tìm kiếm
        const response = await fetch(`${GET_HASHTAG}?searchTerm=${encodeURIComponent(hashtagText)}`);
        const data = await response.json();
        if (Array.isArray(data.hashtags)) {
          const hashtagNames = data.hashtags.map((hashtag) => hashtag?.hashtag_name);
          // Nếu không có hashtag nào trả về, coi như người dùng đang tạo mới một hashtag
          if (!hashtagNames.includes(hashtagText)) {
            setSuggestedHashtags([hashtagText, ...hashtagNames]);  // Hiển thị gợi ý hashtag mới
          } else {
            setSuggestedHashtags(hashtagNames);
          }
        } else {
          setSuggestedHashtags([]);
        }
      } catch (err) {
        setSuggestedHashtags([]);
      }
    } else {
      setSuggestedHashtags([]);
    }

    // Gửi dữ liệu cập nhật
    onContentChange(title, content, hashtagText, selectedImages, selectedGif);
  };


  // Xử lý chọn hashtag
  const handleSelectHashtag = (hashtag) => {
    setSelectedHashtags([hashtag]);  // Giới hạn chỉ một hashtag đã chọn
    setSuggestedHashtags([]);  // Ẩn danh sách gợi ý ngay khi chọn hashtag
    setHashtag(hashtag); // Đặt lại TextInput thành hashtag đã chọn
    onContentChange(title, content, hashtag, selectedImages, selectedGif);  // Gửi dữ liệu cập nhật
  };

  // Xử lý xóa hashtag đã chọn
  const handleRemoveHashtag = (hashtag) => {
    setSelectedHashtags((prev) => prev.filter((item) => item !== hashtag));
    setSuggestedHashtags([]); // Ẩn danh sách gợi ý khi xóa hashtag
    setHashtag(''); // Reset TextInput
    onContentChange(title, content, '', selectedImages, selectedGif);  // Gửi dữ liệu cập nhật khi không còn hashtag
  };

  const handleGifSelect = (gifUrl) => {
    setSelectedGif(gifUrl);
    setGifModalVisible(false);
    onContentChange(content, hashtag, selectedImages, gifUrl);
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

  const handleImageResponse = async (response) => {
    try {
      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets.map(asset => asset.uri);

        // Kiểm tra tổng số ảnh
        if (selectedImages.length + newImages.length > 10) {
          ToastAndroid.show('Chỉ được chọn tối đa 10 ảnh!', ToastAndroid.SHORT);
          return; // Dừng nếu vượt quá giới hạn
        }

        setLengthImage(prevLength => prevLength + newImages.length);
        await uploadImage(newImages); // Giả lập việc tải ảnh lên
        setSelectedImages([...selectedImages, ...newImages]);
        onContentChange(title, content, hashtag, [...selectedImages, ...newImages], selectedGif);
      }
    } catch (error) {
      console.warn("Error uploading images: ", error);
    }
  };

  const uploadImage = async (images) => {
    // Giả lập việc tải ảnh lên trong 2 giây
    setLoadImage(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Images load successfully!");
        setLoadImage(false);
        // setLengthImage(0);
        resolve();
      }, 2000); // Giả lập thời gian tải lên
    });
  };

  const openImageLibrary = () => {
    const options = { mediaType: 'photo', selectionLimit: 10 }; // Allow multiple images
    launchImageLibrary(options, handleImageResponse);
  };
  const openCamera = () => {
    const options = { mediaType: 'photo', saveToPhotos: true };
    launchCamera(options, handleImageResponse);
  };


  const clearSelectedImage = () => {
    setSelectedImages(null);
  };

  const clearSelectedGif = () => {
    setSelectedGif(null);
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {
      setSuggestedHashtags([])
      handleSelectHashtag(hashtag)
    }}>
      <View style={styles.container}>
        <View style={styles.postRow}>
          {user && user?.avatar ? (
            <Image source={{ uri: user?.avatar.replace('localhost', '10.0.2.2') }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder} />
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput]}
              placeholder="Tiêu đề bài viết?"
              placeholderTextColor="#888"
              multiline
              value={title} // Sử dụng giá trị từ state
              // onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
              onChangeText={handleTitleChange}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
              placeholder="Bạn đang nghĩ gì?"
              placeholderTextColor="#888"
              multiline
              value={content} // Sử dụng giá trị từ state
              onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
              onChangeText={handleContentChange}
              underlineColorAndroid="transparent"
            />
            {/* TextInput để nhập hashtag */}
            <TextInput
              style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
              placeholder="#Hashtag!"
              placeholderTextColor="#888"
              multiline
              value={hashtag}
              onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
              onChangeText={handleHashtagChange}
              underlineColorAndroid="transparent"
            />

            {/* FlatList gợi ý hashtag sẽ xổ xuống ngay dưới TextInput */}
            {suggestedHashtags.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={suggestedHashtags}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.suggestionsList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.suggestionItem}
                      onPress={() => handleSelectHashtag(item)}
                    >
                      <Text style={styles.suggestionText}>{`${item}`}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}

            <View style={styles.imageContent}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  loadImage ? (
                    Array.from({ length: lengthImage }).map((_, index) => (
                      <View key={index} style={[styles.selectedImage, styles.loadingContainer]}>
                        <ActivityIndicator size="small" color="#0000ff" />
                      </View>
                    ))
                  ) : (
                    selectedImages.map((img, index) => (
                      <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri: img }} style={styles.selectedImage} />
                        <TouchableOpacity style={styles.removeImageButton} onPress={() => {
                          const newImages = selectedImages.filter((_, i) => i !== index);
                          setSelectedImages(newImages);
                          setLengthImage(prevLength => prevLength - 1);
                          onContentChange(title, content, hashtag, newImages, selectedGif);
                        }}>
                          <Image source={require('../../assets/images/x.png')} style={styles.removeImageIcon} />
                        </TouchableOpacity>
                      </View>
                    ))
                  )
                }
                {/* {selectedGif && (
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: selectedGif }} style={styles.selectedGif} />
                    <TouchableOpacity style={styles.removeImageButton} onPress={clearSelectedGif}>
                      <Image source={require('../../assets/images/x.png')} style={styles.removeImageIcon} />
                    </TouchableOpacity>
                  </View>
                )} */}
              </ScrollView>
            </View>

          </View>
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

                {/* <TouchableOpacity onPress={() => setGifModalVisible(true)}>
                  <Image source={require('../../assets/images/GIF.png')} style={styles.image} />
                </TouchableOpacity> */}

                <Modal visible={isGifModalVisible} animationType="slide">
                  <GiphySelector onGifSelect={handleGifSelect} />
                </Modal>

                <TouchableOpacity onPress={openCamera}>
                  <Image source={require('../../assets/images/Camera.png')} style={styles.image} />
                </TouchableOpacity>

              </View>
            </Animated.View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PostComponent;

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Màu nền cho khung vuông
    borderRadius: 8,
    marginRight: 10
  },
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
  suggestionItem: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  suggestionText: {
    fontSize: 14,
    color: 'white',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 105, // Khoảng cách từ trên xuống, điều chỉnh để phù hợp với chiều cao của các TextInput
    left: 0,
    right: 0,
    backgroundColor: '#545454',
    maxHeight: 200, // Giới hạn chiều cao của FlatList nếu có nhiều mục
    maxWidth: 200,
    zIndex: 1000, // Đảm bảo nó xuất hiện trên các phần tử khác
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  suggestionsList: {
    padding: 5,
    maxHeight: 200, // Đảm bảo danh sách không quá dài
  },

});
