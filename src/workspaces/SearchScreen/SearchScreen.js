import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const DATA = [
    {
      id: '1',
      name: 'Michelle Ogilvy',
      time: '1h ago',
      image: require('../../assets/dongthoigian.png'),
      likes: '18.6k',
      comments: '4.7k',
      shares: '12.4k',
    },
    {
      id: '2',
      name: 'Brandon Loia',
      time: '1h ago',
      image: require('../../assets/dongthoigian2.png'),
      likes: '4.7k',
      comments: '186',
      shares: '2.9k',
    },
    // Thêm nhiều phần tử khác
  ];

const SearchScreen = () => {
    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image source={item.image} style={styles.avatar} />
            <View>
              <Text style={styles.postName}>{item.name}</Text>
              <Text style={styles.postTime}>{item.time}</Text>
            </View>
          </View>
          <Image source={item.image} style={styles.postImage} />
          <View style={styles.postStats}>
            <Text style={styles.postStat}> 👍  {item.likes}</Text>
            <Text style={styles.postStat}> 💬  {item.comments} </Text>
            <Text style={styles.postStat}> 🔁  {item.shares}</Text>
          </View>
        </View>
      );
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#FFFFFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search for people, posts, tags..."
          placeholderTextColor="#ECEBED"
        />
      </View>
      <Text style={styles.popularText}>Popular</Text>
      {/* Hàng ngang các nút */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeButton]}>
          <Text style={[styles.filterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Profiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Links</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={DATA}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
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
    marginBottom: 20,  // Khoảng cách từ thanh tìm kiếm tới nội dung bên dưới
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
    marginBottom: 12,  // Khoảng cách từ tiêu đề "Popular" tới các nút lọc
  },
  filterContainer: {
    marginTop: 12, // Khoảng cách giữa "Popular" và hàng nút
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
    
  },
  postStat: {
    color: '#888888',
    fontSize: 14,
    marginRight: 16,
  },
});
