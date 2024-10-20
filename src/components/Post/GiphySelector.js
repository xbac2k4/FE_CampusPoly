import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const GiphySelector = ({ onGifSelect }) => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  // Hàm gọi API Giphy để lấy GIF trending
  const fetchTrendingGifs = async () => {
    const API_KEY = '9lZOMGOUQGjfGHB55q3gao4wZqXuzaWK';
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10`;

    try {
      const response = await axios.get(url);
      setGifs(response.data.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải GIFs. Vui lòng kiểm tra API key hoặc kết nối mạng.');
      console.error(error);
    }
  };

  // Gọi hàm fetchTrendingGifs khi component được mount
  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  // Hàm gọi API Giphy khi tìm kiếm
  const fetchGifs = async (searchQuery) => {
    const API_KEY = '9lZOMGOUQGjfGHB55q3gao4wZqXuzaWK';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchQuery}&limit=10`;

    try {
      const response = await axios.get(url);
      setGifs(response.data.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải GIFs. Vui lòng kiểm tra API key hoặc kết nối mạng.');
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) fetchGifs(text);
  };

  const renderGif = ({ item }) => (
    <TouchableOpacity onPress={() => onGifSelect(item.images.fixed_height.url)}>
      <Image source={{ uri: item.images.fixed_height.url }} style={styles.gif} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm GIF..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={gifs}
        keyExtractor={(item) => item.id}
        renderItem={renderGif}
        numColumns={2}
      />
    </View>
  );
};

export default GiphySelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  gif: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 8,
  },
});
