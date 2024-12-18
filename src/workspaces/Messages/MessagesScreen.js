import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Screens from '../../navigation/Screens';
import { UserContext } from '../../services/provider/UseContext';
import { GET_CONVERSATION_BY_USER, GET_USER_ID, POST_CONVERSATION, UPDATE_MESSAGE } from '../../services/ApiConfig';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SocketContext } from '../../services/provider/SocketContext';
import { timeAgo } from '../../utils/formatTime';
import FriendLoading from '../../components/Loading/Message/FriendLoading';
import UserLoading from '../../components/Loading/Message/UserLoading';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const MessageScreen = ({ navigation }) => {
  const { socket, usersOnline } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState();
  const [friends, setFriends] = useState();
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friends);

  const FetchConversation = async (id) => {
    try {
      const response = await fetch(`${GET_CONVERSATION_BY_USER}${id}`);
      const data = await response.json();
      // console.log(data.data);
      const conversation = data.data.sort((a, b) => {
        if (!a.last_message_time) return 1; // Đẩy các giá trị null xuống cuối
        if (!b.last_message_time) return -1;
        return new Date(b.last_message_time) - new Date(a.last_message_time);
      });
      setUsers(conversation);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      const handleUserData = async () => {
        setLoading(true);
        FetchConversation(user._id);
        FetchFriends(user._id);
        setLoading(false);
        socket.emit('get_users_online');
      }
      handleUserData();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      if (socket) {
        socket.on('load_conversation', (data) => {
          FetchConversation(user._id);
          FetchFriends(user._id);
        });

        return () => {
          socket.off('load_conversation');
        };
      }
    }, [socket, user._id])
  );
  useEffect(() => {
    setLoading(true);
    FetchConversation(user._id);
    FetchFriends(user._id);
    setLoading(false);
    // console.log(usersOnline);
  }, [])

  const postConversation = async (user_id, friend_id) => {
    let newConversation;
    try {
      const response = await fetch(`${POST_CONVERSATION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id,
          friend_id
        }), // chuyển đổi đối tượng thành JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to add');
      }
      newConversation = await response.json();
      // console.log(newConversation.data._id);

    } catch (error) {
      console.error('Error adding:', error);
    } finally {
      if (newConversation?.status === 400) {
        navigation.navigate(Screens.ChatView, { conversation_id: newConversation.data._id })
      } else {
        navigation.navigate(Screens.ChatView, { conversation_id: newConversation.data.newConversation._id })
      }
    }
  };

  const FetchFriends = async (userID) => {
    try {
      const response = await fetch(`${GET_USER_ID}${userID}`);
      const data = await response.json();
      // console.log(data.data.friends);
      setFriends(data.data.friends);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderPinnedUser = ({ item }) => {
    const currentUserId = user._id;

    const filteredUsers =
      item?.status_id?.status_name === "Chấp nhận"
        ? item?.user_id?.filter(user => user._id !== currentUserId)
        : [];

    const firstFilteredUser = filteredUsers.length > 0 ? filteredUsers[0] : null;

    const isUserOnline = firstFilteredUser
      ? usersOnline.some((onlineUser) => onlineUser._id === firstFilteredUser._id)
      : false;

    // Trường hợp không có người dùng để hiển thị
    if (!firstFilteredUser) {
      return null; // Hoặc hiển thị một component thay thế nếu cần
    }

    return (
      <TouchableOpacity
        style={styles.pinnedUserContainer}
        onPress={() => {
          handlePinnedUsers(currentUserId, firstFilteredUser._id);
        }}>
        <Image
          source={{ uri: firstFilteredUser.avatar }}
          style={styles.pinnedUserAvatar}
        />
        {isUserOnline && <View style={styles.onlineDot} />}
        <Text style={[styles.pinnedUserName, {
          color: theme ? '#fff' : Colors.background
        }]} numberOfLines={1}>
          {firstFilteredUser.full_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handlePinnedUsers = async (user_id, friend_id) => {
    // console.log(user_id + ' - ' + friend_id);
    await postConversation(user_id, friend_id);
  };

  // const timeAgo = (date) => {
  //   if (!date || isNaN(new Date(date).getTime())) {
  //     return ""; // Trả về giá trị mặc định nếu `date` không hợp lệ
  //   }

  //   const now = new Date();
  //   const postDate = new Date(date);
  //   const diff = Math.floor((now - postDate) / 1000); // Chênh lệch thời gian tính bằng giây

  //   if (diff < 60) return "Vừa xong"; // Đề phòng chênh lệch âm

  //   // if (diff < 60) return `${diff} giây`;
  //   const minutes = Math.floor(diff / 60);
  //   if (minutes < 60) return `${minutes} phút`;
  //   const hours = Math.floor(minutes / 60);
  //   if (hours < 24) return `${hours} giờ`;
  //   const days = Math.floor(hours / 24);
  //   if (days < 7) return `${days} ngày`;
  //   const weeks = Math.floor(days / 7);
  //   return `${weeks} tuần`;
  // };


  // Hiển thị người dùng có tin nhắn
  const renderMessage = ({ item }) => {
    // console.log(item);
    const memberWithDifferentUserId = item?.members.filter(member => member.user_id !== user._id)[0]
    const avatarUrl = memberWithDifferentUserId ? memberWithDifferentUserId.avatar : "https://placehold.co/50x50";
    const last_message = item?.sender?._id !== user._id
      ? (item?.last_message === 'emoji::like::'
        ? <AntDesign name="like1" size={24} color="#FA7F26" />
        : item?.last_message)
      : (item?.last_message === 'emoji::like::'
        ? <Text>Bạn: <AntDesign name="like1" size={24} color="#FA7F26" /></Text>
        : `Bạn: ${item?.last_message}`);
    const isUserOnline = usersOnline.some((onlineUser) => onlineUser._id === memberWithDifferentUserId.user_id);
    // console.log(item?.viewed);


    return (
      <TouchableOpacity style={styles.messageContainer} onPress={() => {
        if (item?.sender?._id !== user._id) {
          UpdateMessge(item?.conversation_id);
        }
        navigation.navigate(Screens.ChatView, { conversation_id: item?.conversation_id })
      }}>
        <Image source={{ uri: avatarUrl }} style={styles.messageAvatar} />
        {isUserOnline && <View style={styles.onlineDotConversation} />}
        <View style={styles.messageContent}>
          <Text style={[styles.messageName, {
            color: theme ? '#fff' : Colors.background
          }]}>{memberWithDifferentUserId.full_name}</Text>
          {
            item?.sender?._id !== user._id ? (
              <Text style={{
                ...styles.messageText,
                fontWeight: item?.viewed ? 'normal' : 'bold',
                color: item?.viewed ? '#888' : theme ? '#fff' : Colors.background
              }} numberOfLines={1}
                ellipsizeMode="tail">{last_message}</Text>
            ) : (
              <Text style={{
                ...styles.messageText,
                fontWeight: 'normal',
                color: '#888',
              }} numberOfLines={1}
                ellipsizeMode="tail">{last_message}</Text>
            )
          }
        </View>
        {/* <Text style={{
          fontWeight: item?.sender?._id === user._id && item?.viewed === false ? 'normal' : 'bold',
          color: item?.sender?._id === user._id && item?.viewed === false ? '#888' : '#fff',
        }}>{timeAgo(item?.last_message_time)}</Text> */}
        <View style={styles.rightSection}>
          {
            item?.sender?._id !== user._id ? (
              <Text style={{
                fontWeight: item?.viewed ? 'normal' : 'bold',
                color: item?.viewed ? '#888' : theme ? '#fff' : Colors.background,
              }}>{timeAgo(item?.last_message_time)}</Text>
            ) : (
              <Text style={{
                fontWeight: 'normal',
                color: '#888',
              }}>{timeAgo(item?.last_message_time)}</Text>
            )
          }
          {item?.sender?._id !== user._id && item?.unview > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item?.unview}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity >
    )
  };
  const UpdateMessge = async (conversation_id) => {
    try {
      const response = await fetch(`${UPDATE_MESSAGE}`, {
        method: 'PUT',  // Đảm bảo rằng phương thức là GET
        headers: {
          'Content-Type': 'application/json',  // Header cho loại nội dung
        },
        body: JSON.stringify({ conversation_id }),  // Dữ liệu đưa vào request
      });
      const data = await response.json();
      // console.log(data);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  // Lọc và hiển thị người dùng có tin nhắn
  // const renderItem = ({ item }) => {
  //   if (!item.message) {
  //     return null; // Không hiển thị người dùng nếu họ không có tin nhắn
  //   }
  //   return renderMessage({ item });
  // };

  return (
    <View style={[styles.container, {
      backgroundColor: theme ? Colors.background : Colors.light,
    }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <Icon name="arrow-back" size={24} color={theme ? '#fff' : Colors.background} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {
          color: theme ? '#fff' : Colors.background
        }]}>Tin nhắn</Text>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color={theme ? '#fff' : Colors.background} />
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View style={[styles.searchContainer, {
        backgroundColor: theme ? '#3B3B3B' : '#ECEBED',
      }]} onPress={() => navigation.navigate('MessageSearch')}>
        <TextInput
          style={[styles.searchInput, {
            color: theme ? '#ECEBED' : Colors.background,
          }]}
          placeholder="Tìm kiếm"
          placeholderTextColor="#999"
          editable={false}
        />
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
      </View>

      {loading ? <FriendLoading /> :
        <FlatList
          style={{ flexGrow: 0, padding: 10 }}
          data={friends}
          renderItem={renderPinnedUser}
          keyExtractor={item => item?._id}
          horizontal
          showsHorizontalScrollIndicator={true}
        />}

      <View style={[styles.divider]} />

      {/* Phần danh sách tin nhắn */}
      {loading ?
        <UserLoading />
        : <FlatList
          data={users} // Chỉ hiển thị những người có tin nhắn
          renderItem={renderMessage}
          keyExtractor={item => item?.conversation_id}
          showsVerticalScrollIndicator={false}
          style={styles.messageList}
        />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  rightSection: {
    alignItems: 'center', // Canh phải
    justifyContent: 'start', // Giữa theo chiều dọc
    marginLeft: 10, // Khoảng cách từ nội dung bên trái
  },
  unreadBadge: {
    backgroundColor: '#FF3D00', // Màu đỏ
    borderRadius: 10,
    // paddingHorizontal: 3,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    minWidth: 15,
    maxWidth: 50,
    height: 20,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  pinnedUserContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 60,
    position: 'relative',
  },
  onlineDotConversation: {
    width: 20,
    height: 20,
    backgroundColor: '#00FF00',
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    left: 50,
    borderBlockColor: '#000000',
    borderWidth: 4,
  },
  onlineDot: {
    width: 20,
    height: 20,
    backgroundColor: '#00FF00',
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    right: 5,
    borderBlockColor: '#000000',
    borderWidth: 4,
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
    fontSize: 12,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#333',
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
  },
  messageText: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#B3B3B3',
  },
  messageList: {
    flex: 1,
  },
});

export default MessageScreen;
