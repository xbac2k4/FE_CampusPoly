import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchComponents from '../../components/Search/SearchComponents'; // Import SearchComponents
import { GET_SEARCH } from '../../services/ApiConfig'; // Đường dẫn API để lấy bài viết
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../../services/provider/ThemeContext';
import { useContext } from 'react';
import Colors from '../../constants/Color';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Trạng thái tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]); // Trạng thái người dùng sau khi lọc
  const [filteredHashtags, setFilteredHashtags] = useState([]); // Trạng thái hashtag sau khi lọc
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Trạng thái để lưu trữ setTimeout
  const { theme } = useContext(ThemeContext);

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setSearchQuery("");
        setFilteredUsers([]);
        setFilteredHashtags([]);
      };
    }, [])
  );

  // Hàm gọi API tìm kiếm người dùng và hashtag
  const fetchSearchResults = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await fetch(`${GET_SEARCH}?searchTerm=${encodeURIComponent(searchTerm)}`);
      const responseData = await response.json();

      if (responseData && Array.isArray(responseData.data.users) && Array.isArray(responseData.data.hashtags)) {
        const flatUsers = responseData.data.users.flat();
        handleSearch(searchTerm, { users: flatUsers, hashtags: responseData.data.hashtags });
      } else {
        // console.error("Dữ liệu trả về không hợp lệ", responseData);
        setFilteredUsers([]);
        setFilteredHashtags([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text, data) => {
    const normalizedText = removeVietnameseTones(text);
    setSearchQuery(normalizedText);

    if (normalizedText === "") {
      setFilteredUsers(data.users);
      setFilteredHashtags(data.hashtags);
    } else {
      const filteredUsers = data.users.filter((user) => {
        const normalizedFullName = removeVietnameseTones(user?.full_name || "");
        return normalizedFullName.includes(normalizedText);
      });

      const filteredHashtags = data.hashtags.filter((hashtag) => {
        const normalizedHashtag = removeVietnameseTones(hashtag?.hashtag_name || "");
        return normalizedHashtag.includes(normalizedText);
      });

      setFilteredUsers(filteredUsers);
      setFilteredHashtags(filteredHashtags);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") return;
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500);

    setDebounceTimeout(timeout);
  }, [searchQuery]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, {
        backgroundColor: theme ? '#181A1C' : '#f3f4f8',
      }]}>
        <View style={[styles.searchContainer, {
          backgroundColor: theme ? '#3B3B3B' : '#ECEBED',
        }]}>
          <AntDesign name="search1" size={20} color={theme ? '#fff' : Colors.background} style={styles.icon} />
          <TextInput
            style={[styles.input, {
              color: theme ? '#ECEBED' : Colors.background,
            }]}
            placeholder="Tìm kiếm bài viết hoặc loại bài..."
            placeholderTextColor={theme ? '#ECEBED' : Colors.background}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFF" />
        ) : (
          <SearchComponents filteredHashtags={filteredHashtags} filteredUsers={filteredUsers} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 32,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 44,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
});

export default SearchScreen;
