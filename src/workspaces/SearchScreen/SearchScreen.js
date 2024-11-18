import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

// Dữ liệu giả lập cho các bài viết
const DATA = [
  {
    id: '1',
    name: 'Michelle Ogilvy',
    time: '1h ago',
    image: require('../../assets/images/dongthoigian.png'),
    likes: '18.6k',
    comments: '4.7k',
  },
  {
    id: '2',
    name: 'Brandon Loia',
    time: '1h ago',
    image: require('../../assets/images/dongthoigian2.png'),
    likes: '4.7k',
    comments: '186',
  },
];

const SearchScreen = () => {
  // State để lưu trữ trạng thái bài viết đã thích
  const [likedPosts, setLikedPosts] = useState({});
  // State để lưu trữ trạng thái bài viết yêu thích
  const [favoritePosts, setFavoritePosts] = useState({});
  // State để lưu trữ nút filter đang được chọn
  const [activeFilter, setActiveFilter] = useState('All');

  // Hàm để bật/tắt trạng thái like của bài đăng
  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

  // Hàm để bật/tắt trạng thái yêu thích của bài đăng
  const toggleFavorite = (postId) => {
    setFavoritePosts((prevFavoritePosts) => ({
      ...prevFavoritePosts,
      [postId]: !prevFavoritePosts[postId],
    }));
  };

  // Hàm để xử lý khi nhấn nút filter
  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };

  // Hàm xử lý khi nhấn nút comment
  const handleCommentPress = (postId) => {
    console.log(`Comment button pressed for post ${postId}`);
    // Thực hiện các hành động khác khi nhấn nút comment
  };

  // Hàm xử lý khi nhấn nút share
  const handleSharePress = (postId) => {
    console.log(`Share button pressed for post ${postId}`);
    // Thực hiện các hành động khác khi nhấn nút share
  };

  // Thêm hàm xử lý cho sự kiện ấn vào ảnh
  const handleImagePress = (postId) => {
    console.log(`Image pressed for post ${postId}`);
    // Thực hiện các hành động khác khi ảnh được nhấn
  };

  // Hàm render từng bài viết
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={item.image} style={styles.avatar} />
        <View>
          <Text style={styles.postName}>{item.name}</Text>
          <Text style={styles.postTime}>{item.time}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleImagePress(item.id)}>
        <Image source={item.image} style={styles.postImage} />
      </TouchableOpacity>
      <View style={styles.postStats}>
        <TouchableOpacity
          style={styles.statContainer}
          onPress={() => toggleLike(item.id)}
        >
          <AntDesign
            name={likedPosts[item.id] ? "like1" : "like2"}
            size={20}
            color="white"
          />
          <Text style={styles.postStatText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCommentPress(item.id)} style={styles.statContainer}>
          <FontAwesome name="commenting-o" size={20} color="white" />
          <Text style={styles.postStatText}>{item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSharePress(item.id)} style={styles.statContainer}>
          <Entypo name="share-alternative" size={20} color="white" />
          <Text style={styles.postStatText}>{item.shares}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoritesContainer}>
          <Image
            style={{ width: 20, height: 20 }}
            source={favoritePosts[item.id] ? require('../../assets/images/fav2.png') : require('../../assets/images/fav1.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );

  // Hàm render giao diện chính của màn hình tìm kiếm
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="#FFFFFF" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm người, bài viết, thẻ..."
            placeholderTextColor="#ECEBED"
          />
        </View>
        <Text style={styles.popularText}>Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {['All', 'Profiles', 'Photos', 'Videos', 'Text', 'Links'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeButton, // Thay đổi màu khi được chọn
              ]}
              onPress={() => handleFilterPress(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={DATA}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      </View>
    </KeyboardAvoidingView>

  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: '#323436',
    borderRadius: 32,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 44,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#ECEBED',
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterContainer: {
    marginTop: 12,
    marginBottom: 32,
    paddingVertical: 15
  },
  filterButton: {
    backgroundColor: '#323436',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    color: '#ECEBED',
    fontSize: 14,
  },
  activeButton: {
    backgroundColor: '#0066FF',
  },
  list: {
    height: '78%',
  },
  postContainer: {
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    color: '#888888',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center', // Đảm bảo các biểu tượng căn giữa theo chiều dọc
    marginTop: 8,
  },
  postStat: {
    color: '#888888',
    fontSize: 14,
    marginRight: 16,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, // Khoảng cách giữa các nhóm (lượt thích, bình luận, chia sẻ)
  },
  postStatText: {
    color: '#FFFFFF',
    marginLeft: 8,  // Khoảng cách giữa icon và chữ số
    fontSize: 14,
  },
  divider: {
    height: 1, // Độ dày của đường kẻ
    backgroundColor: '#888', // Màu sắc của đường kẻ
    marginTop: 12, // Khoảng cách giữa đường kẻ và nội dung trên
    marginBottom: 20, // Khoảng cách giữa đường kẻ và bài viết tiếp theo
    width: '100%', // Làm cho đường kẻ trải dài toàn bộ chiều rộng
  },
  favoritesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // Pushes it to the right
  },
});
