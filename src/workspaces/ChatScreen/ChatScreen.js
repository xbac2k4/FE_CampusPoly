import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';



// Dữ liệu giả lập cho chatView
const DATA = [
  {
    "conversation_id": "conv_12345",
    "users": [
      {
        "user_id": "user_001",
        "full_name": "Nguyen Van A",
        "avatar": require('../../assets/anhchatview.png'),
      },
      {
        "user_id": "user_002",
        "full_name": "Tran Thi B",
        "avatar": require('../../assets/anhchatview.png'),
      }
    ],
    "messages": [
      {
        "message_id": "msg_001",
        "sender_id": "user_001",
        "content": "Xin chào, bạn có khỏe không?",
        "timestamp": "2024-10-23T09:30:00Z"
      },
      {
        "message_id": "msg_002",
        "sender_id": "user_002",
        "content": "Chào bạn, mình khỏe. Còn bạn thế nào?",
        "timestamp": "2024-10-23T09:31:00Z"
      },
      {
        "message_id": "msg_003",
        "sender_id": "user_001",
        "content": "Mình cũng khỏe, cảm ơn nhé!",
        "timestamp": "2024-10-23T09:32:00Z"
      }
    ]
  }
];

// Component ChatScreen dùng để hiển thị giao diện chat
const ChatScreen = () => {
  // Khai báo state để lưu trữ nội dung tin nhắn nhập vào
  const [inputText, setInputText] = useState('');

  // Lấy dữ liệu tin nhắn và người dùng từ DATA
  const messages = DATA[0].messages;
  const currentUser = DATA[0].users[0].user_id; // Giả định người dùng hiện tại là user_001

  // Render mỗi tin nhắn
  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender_id === currentUser;
    const user = DATA[0].users.find(user => user.user_id === item.sender_id);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
          marginVertical: 10,
        }}
      >
        {!isCurrentUser && <Image source={user.avatar} style={styles.avatar} />}
        <View style={isCurrentUser ? styles.messageRight : styles.messageLeft}>
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      </View>

    );
  };


  return (
    // KeyboardAvoidingView vẫn không đẩy được container
    <KeyboardAvoidingView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* View trống để đẩy ảnh vào giữa */}
        <View style={{ flex: 1 }}>
          {/* Icon quay lại */}
          <TouchableOpacity style={styles.iconContainer}  >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Phần chứa ảnh và tên người chat */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/anhchatview.png')} // Đảm bảo đường dẫn đến ảnh là chính xác
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Jessica Thompson</Text>
        </View>

        {/* View trống để đẩy ảnh vào giữa */}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {/* Icon thêm chức năng */}
          <TouchableOpacity style={styles.iconContainer} >
            <MaterialIcons name="more-vert" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Đường kẻ ngang ngăn cách header và nội dung chat */}
      <View style={styles.divider} />

      {/* Danh sách tin nhắn */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.message_id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        keyboardShouldPersistTaps="handled" // Đảm bảo người dùng có thể nhấn vào các mục trong danh sách mà không bị mất tiêu điểm nhập liệu
      />

      {/* Thanh nhập tin nhắn */}
      <View style={styles.blackBar}>
        <View style={styles.Textting}>
          {/* Nút thêm camera */}
          <TouchableOpacity style={{ padding: 3 }}>
            <Feather name="camera" size={24} color="#727477" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            placeholderTextColor="#ECEBED"
            value={inputText}
            onChangeText={setInputText}
          />
          {/* Nút thêm file */}
          <TouchableOpacity style={{ marginRight: 8 }}>
            <AntDesign name="plus" size={24} color="#727477" />
          </TouchableOpacity>
          {/* Nút gửi tin nhắn hoặc nút thích */}
          <TouchableOpacity style={{ padding: 6 }}>
            {inputText ? (
              <MaterialIcons name="send" size={24} color="#FA7F26" />
            ) : (
              <AntDesign name="like1" size={24} color="#FA7F26" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>

  );
};
// Định dạng CSS cho các thành phần của màn hình chat
export default ChatScreen;

const styles = StyleSheet.create({
  // Toàn bộ màn hình
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
  // Header chứa thông tin người dùng và các icon
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#181A1C',
    marginTop: 12,
  },
  // Phần hiển thị ảnh và tên người chat
  profileContainer: {
    flexDirection: 'column', // Sắp xếp các phần tử theo cột
    alignItems: 'center', // Căn giữa theo chiều ngang
    justifyContent: 'center', // Căn giữa theo chiều dọc

  },
  profileName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10, // Thêm khoảng cách giữa ảnh và tên
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 16,
    marginBottom: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#323436',
    borderRadius: 30,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',

  },
  divider: {
    height: 1, // Độ dày của đường kẻ
    backgroundColor: '#323436', // Mu sắc của đường kẻ
    width: '100%', // Độ rộng của đường kẻ
    marginTop: 16, // Khoảng cách phía trên đường kẻ
  },
  messageLeft: {
    flexDirection: 'row', // Căn ảnh và văn bản cùng hàng
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#323436',
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-start',

  },
  messageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#2E8AF6',
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-end', // Đẩy sang bên phải
  },
  messageText: {
    fontSize: 16, // Thay đổi kích thước chữ thành 20
    color: '#fff', // Màu chữ (có thể thay đổi theo ý muốn)
  },
  messageTime: {
    fontSize: 13,
    color: '#727477',
    alignSelf: 'flex-end',
    marginHorizontal: 8,
  },
  // Thanh nhập tin nhắn
  blackBar: {
    position: 'absolute',
    paddingBottom: 10,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopColor: '#727477',
    borderTopWidth: 1,
  },
  Textting: {
    flexDirection: 'row',
    backgroundColor: '#323436',
    borderRadius: 32,
    paddingHorizontal: 8, // Giảm giá trị này để thu nhỏ chiều dài
    alignItems: 'center',
    height: 44,
    marginTop: 10,
    width: '96%', // Thêm thuộc tính này để điều chỉnh chiều dài
    alignSelf: 'center', // Căn giữa trong blackBar
  },
  input: {
    marginLeft: 3,
    flex: 1,
    fontSize: 16,
    color: '#ECEBED',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 15,
    marginRight: 5,
  },
});
