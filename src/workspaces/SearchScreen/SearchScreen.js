import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GET_SEARCH } from '../../services/ApiConfig'; // Đường dẫn API để lấy bài viết
import AntDesign from 'react-native-vector-icons/AntDesign';
import PostItem from '../../components/Search/SearchComponents'; // Import PostItem component

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái tìm kiếm
  const [posts, setPosts] = useState([]); // Trạng thái bài viết
  const [filteredPosts, setFilteredPosts] = useState([]); // Trạng thái bài viết sau khi lọc
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Trạng thái để lưu trữ setTimeout

  // Hàm gọi API để lấy bài viết theo từ khóa tìm kiếm
  const fetchPosts = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await fetch(`${GET_SEARCH}?searchTerm=${encodeURIComponent(searchTerm)}`);
      const responseData = await response.json();

      // console.log('Response Data:', responseData); // Kiểm tra dữ liệu trả về

      if (responseData.success && Array.isArray(responseData.posts)) {
        const postsData = responseData.posts;  
        const sortedData = postsData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedData);
        handleSearch(searchTerm, sortedData); // Cập nhật filteredPosts sau khi lấy dữ liệu
      } else {
        setPosts([]);
        setFilteredPosts([]);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  // Xử lý tìm kiếm bài viết theo tiêu đề và post_type
  const handleSearch = (text, data = posts) => {
    const normalizedText = removeVietnameseTones(text);
    setSearchQuery(normalizedText);
    if (normalizedText === '') {
      setFilteredPosts(data);
    } else {
      // console.log('Filtering posts with:', normalizedText);
      const filtered = data.filter(
        (post) =>
          removeVietnameseTones(post.title.toLowerCase()).includes(normalizedText.toLowerCase()) ||
          removeVietnameseTones(post.post_type.toLowerCase()).includes(normalizedText.toLowerCase())
      );
      // console.log('Filtered posts:', filtered);
      setFilteredPosts(filtered);
    }
  };

  // Hàm xử lý debounce (chờ 1-2s trước khi gọi API)
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Hủy timeout cũ nếu người dùng tiếp tục nhập
    }

    // Đặt timeout mới khi người dùng nhập xong
    const timeout = setTimeout(() => {
      if (searchQuery) {
        fetchPosts(searchQuery); // Gọi API khi có từ khóa tìm kiếm
      } else {
        setFilteredPosts(posts); // Nếu không có tìm kiếm, hiển thị tất cả bài viết
      }
    }, 800); // Thời gian trễ 1 giây

    setDebounceTimeout(timeout); // Lưu trữ ID của timeout

    return () => {
      clearTimeout(timeout); // Dọn dẹp khi component bị unmount
    };
  }, [searchQuery]); // Khi searchQuery thay đổi, gọi lại effect

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
            placeholder="Tìm kiếm bài viết hoặc loại bài..."
            placeholderTextColor="#ECEBED"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)} // Cập nhật truy vấn tìm kiếm khi người dùng nhập
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <FlatList
            data={filteredPosts}
            renderItem={({ item }) => <PostItem post={item} />} // Sử dụng PostItem để hiển thị bài viết
            keyExtractor={(item) => item._id ? item._id.toString() : item.id ? item.id.toString() : Math.random().toString()}
            // Kiểm tra lại _id
            style={styles.list}
            ListEmptyComponent={<Text style={styles.noResultsText}>Không có bài viết nào</Text>}
          />
        )}

        <View style={{ height: 50 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
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
  list: {
    flex: 1,
  },
  noResultsText: {
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;
