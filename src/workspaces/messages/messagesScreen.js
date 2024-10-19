import React from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const users = [
  { id: '1', name: 'Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: true, isPinned: true },
  { id: '2', name: 'Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: true, isPinned: true },
  { id: '3', name: 'Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: true, isPinned: true },
  { id: '4', name: 'Vũ Quang Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: true, message: 'CampusPoly.....', time: '4h ago', isPinned: true },
  { id: '5', name: 'Vũ Quang Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: false, message: 'CampusPoly.....', time: '5h ago', isPinned: true },
  { id: '6', name: 'Vũ Quang Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: false, message: 'CampusPoly.....', time: '20/9/2024', isPinned: true },
  { id: '7', name: 'Vũ Quang Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: false, message: 'CampusPoly.....', time: '20/9/2024', isPinned: true },
  { id: '8', name: 'Vũ Quang Huy', avatar: 'https://ispacedanang.edu.vn/wp-content/uploads/2024/05/hinh-anh-dep-ve-hoc-sinh-cap-3-1.jpg', online: false, message: 'CampusPoly.....', time: '20/9/2024' },
];

const MessengerScreen = () => {
  // Hiển thị người dùng theo trạng thái hoạt động (online trước, offline sau)
  const renderPinnedUsers = () => (
    <FlatList
      data={users
        .filter(user => user.isPinned) // Chỉ hiển thị người dùng đã được ghim
        .sort((a, b) => b.online - a.online) // Sắp xếp theo trạng thái online (online trước, offline sau)
      }
      renderItem={renderPinnedUser}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.pinnedList}
    />
  );

  const renderPinnedUser = ({ item }) => (
    <View style={styles.pinnedUserContainer}>
      <Image source={{ uri: item.avatar }} style={styles.pinnedUserAvatar} />
      {item.online && <View style={styles.onlineDot} />}
      <Text style={styles.pinnedUserName}>{item.name}</Text>
    </View>
  );

  // Hiển thị người dùng có tin nhắn
  const renderMessage = ({ item }) => (
    <TouchableOpacity style={styles.messageContainer}>
      <Image source={{ uri: item.avatar }} style={styles.messageAvatar}  />

      <View style={styles.messageContent}>
        <Text style={styles.messageName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  // Lọc và hiển thị người dùng có tin nhắn
  const renderItem = ({ item }) => {
    if (!item.message) {
      return null; // Không hiển thị người dùng nếu họ không có tin nhắn
    }
    return renderMessage({ item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MESSAGES</Text>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Who do you want to chat with?"
          placeholderTextColor="#999"
        />
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
      </View>
      <Text style={styles.pinnedTitle}>PINNED</Text>

      {/* Phần Pinned có chiều cao giới hạn */}
      <View style={styles.pinnedContainer}>
        {renderPinnedUsers()}
      </View>

      {/* Đường viền ngăn cách */}
      <View style={styles.divider} />

      {/* Phần danh sách tin nhắn */}
      <FlatList
        data={users.filter(user => user.message)} // Chỉ hiển thị những người có tin nhắn
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.messageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginHorizontal:15,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  pinnedTitle: {
    margin: 20,
    fontSize: 14,
    color: 'gray',
  },
  pinnedContainer: {
    maxHeight: 100, 
  },
  pinnedList: {
    paddingHorizontal: 20, 
  },
  pinnedUserContainer: {
    alignItems: 'center',
    marginRight: 20,
    width: 60, 
    position: 'relative', 
  },
  onlineDot: {
    width: 12,
    height: 12,
    backgroundColor: '#00FF00',
    borderRadius: 6,
    position: 'absolute',
    bottom: 35,
    right: 6,
    borderWidth: 2,
    borderColor: '#121212',
  },
  pinnedUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  pinnedUserName: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center', 
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  messageName: {
    fontWeight: 'bold',
    color: '#fff',
  },
  messageText: {
    color: '#fff',
    marginTop: 10,
  },
  messageTime: {
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#444', 
    marginVertical: 10,
  },
  messageList: {
    flex: 1, 
  },
});

export default MessengerScreen;
