import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

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
  const [likedPosts, setLikedPosts] = useState({});
  const [isfavorite, setIsFavorite] = useState(false);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

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
        <View style={styles.statContainer}>
          <FontAwesome name="commenting-o" size={20} color="white" />
          <Text style={styles.postStatText}>{item.comments}</Text>
        </View>
        <View style={styles.statContainer}>
          <Entypo name="share-alternative" size={20} color="white" />
          <Text style={styles.postStatText}>{item.shares}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsFavorite(!isfavorite)} style={styles.favoritesContainer}>
          <Image
            style={{ width: 20, height: 20 }}
            source={isfavorite ? require('../../assets/fav2.png') : require('../../assets/fav1.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#FFFFFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search for people, posts, tags..."
          placeholderTextColor="#ECEBED"
        />
      </View>
      <Text style={styles.popularText}>Popular</Text>
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