import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, FlatList, Alert, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
        "timestamp": "2024-10-23T09:30:00Z",
        "likes": 0 // Thêm trường likes
      },
      {
        "message_id": "msg_002",
        "sender_id": "user_002",
        "content": "Chào bạn, mình khỏe. Còn bạn thế nào?",
        "timestamp": "2024-10-23T09:31:00Z",
        "likes": 0 // Thêm trường likes
      },
      {
        "message_id": "msg_003",
        "sender_id": "user_001",
        "content": "Mình cũng khỏe, cảm ơn nhé!",
        "timestamp": "2024-10-23T09:32:00Z",
        "likes": 0 // Thêm trường likes
      }
    ]
  }
];

// Component ChatScreen dùng để hiển thị giao diện chat
const ChatScreen = () => {
  // Khai báo state để lưu trữ nội dung tin nhắn nhập vào
  const [inputText, setInputText] = useState('');
  const [isShowOption, setIsShowOption] = useState(false);

  // Lấy dữ liệu tin nhắn và người dùng từ DATA
  const [selectedImages, setSelectedImages] = useState([]);
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
          marginVertical: 1,
        }}
      >
        {!isCurrentUser && <Image source={user.avatar} style={styles.avatar} />}
        <View style={isCurrentUser ? styles.messageRight : styles.messageLeft}>
          <Text style={styles.messageText}>{item.content}</Text>
        </View>
      </View>
    );
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        message_id: `msg_${messages.length + 1}`,
        sender_id: currentUser,
        content: inputText,
        // timestamp: new Date().toISOString(),
        likes: 0, // Khởi tạo số lượng like là 0
      };
      DATA[0].messages.push(newMessage); // Thêm tin nhắn mới vào DATA
      setInputText(''); // Đặt lại giá trị của TextInput
    }
  };

  const handleCamera = () => {
    setIsShowOption(false);
    const options = {
      mediaType: 'photo',
      cameraType: 'front',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const newMessage = {
          message_id: `msg_${messages.length + 1}`,
          sender_id: currentUser,
          content: `Image: ${uri}`,
          // timestamp: new Date().toISOString(),
          // likes: 0,
        };
        DATA[0].messages.push(newMessage);
        setInputText('');
      }
    });
  };

  const handlePlus = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error);
      } else {
        const uris = response.assets.map(asset => asset.uri);
        setSelectedImages(uris);
      }
    });
  };

  const handleArrowLeft = () => {
    Alert.alert("Thông báo", "Ok");
  };

  return (
    // KeyboardAvoidingView vẫn không đẩy được container
    <KeyboardAvoidingView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* View trống để đẩy ảnh vào giữa */}
        <View style={{ flex: 1 }}>
          {/* Icon quay lại */}
          <TouchableOpacity style={styles.iconContainer} onPress={handleArrowLeft}  >
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
          <TouchableOpacity style={styles.iconContainer} onPress={() => setIsShowOption(!isShowOption)}>
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
          <TouchableOpacity style={{ padding: 3 }} onPress={handleCamera} >
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
          <TouchableOpacity style={{ marginRight: 8 }} onPress={handlePlus}>
            <AntDesign name="plus" size={24} color="#727477" />
          </TouchableOpacity>
          {/* Nút gửi tin nhắn hoặc nút thích */}
          <TouchableOpacity style={{ padding: 6 }} onPress={handleSend}>
            {inputText ? (
              <MaterialIcons name="send" size={24} color="#FA7F26" />
            ) : (
              <AntDesign name="like1" size={24} color="#FA7F26" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {selectedImages.length > 0 && (
        <ScrollView horizontal>
          {selectedImages.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
          ))}
        </ScrollView>
      )}
      <Modal
        transparent={true}
        visible={isShowOption}>
        <Pressable style={{ flex: 1, flexDirection: 'row-reverse' }} onPress={() => setIsShowOption(false)} >
          <View style={{ backgroundColor: "#252B30", width: 180, height: 270, borderTopStartRadius: 20, borderBottomStartRadius: 20, alignItems: 'center', paddingVertical: 20 , marginTop : 80 }}>
            <TouchableOpacity style={{ marginBottom: 20 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Xem Trang Cá Nhân
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Tạo Nhóm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Tắt Thông Báo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Hạn Chế
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 20 }} >
              <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Báo Cáo</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }}>Xóa đoạn chat
              </Text>
            </TouchableOpacity>

          </View>
        </Pressable>
      </Modal>
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
