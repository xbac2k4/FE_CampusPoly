import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, FlatList, Alert, Modal, Pressable } from 'react-native';
import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ADD_MESSAGE, GET_MESSAGE_BY_CONVERSATION, UPDATE_MESSAGE } from '../../services/ApiConfig';
import { UserContext } from '../../services/provider/UseContext';
import { SocketContext } from '../../services/provider/SocketContext';
import { useFocusEffect } from '@react-navigation/native';

// Dữ liệu giả lập cho chatView

// Component ChatScreen dùng để hiển thị giao diện chat
const ChatScreen = ({ navigation, route }) => {
  // Khai báo state để lưu trữ nội dung tin nhắn nhập vào
  const { sendMessageSocket, getNotifySocket, socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [isShowOption, setIsShowOption] = useState(false);
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState([]);
  const [conversation, setConversation] = useState();

  const [notify, setNotify] = useState(false);

  // Lấy dữ liệu tin nhắn và người dùng từ DATA
  const [selectedImages, setSelectedImages] = useState([]);
  const FetchMessge = async (conversation_id) => {
    try {
      const response = await fetch(`${GET_MESSAGE_BY_CONVERSATION}${conversation_id}?limit=50&page=${page}`, {
        method: 'GET',  // Đảm bảo rằng phương thức là GET
        headers: {
          'Content-Type': 'application/json',  // Header cho loại nội dung
          'Cache-Control': 'no-store',         // Tắt cache
        }
      });
      const data = await response.json();
      setConversation(data.data);
      setMessage(data.data.messages);
      // console.log(conversation);


    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      // console.log(message);
    }
  }
  useFocusEffect(
    useCallback(() => {
      FetchMessge(route?.params?.conversation_id);
    }, [route?.params?.conversation_id])
  );
  useEffect(() => {
    FetchMessge(route?.params?.conversation_id);
  }, [route?.params?.conversation_id]);

  const memberWithDifferentUserId = conversation?.conversation_id?.members.filter(member => member._id !== user._id)[0]
  const avatarUrl = memberWithDifferentUserId ? memberWithDifferentUserId.avatar : "https://placehold.co/50x50";
  const sender_name = conversation?.conversation_id?.members.filter(member => member._id === user._id)[0].full_name
  // console.log(sender_name);

  // Render mỗi tin nhắn
  const MessageItem = React.memo(({ item, isCurrentUser, memberWithDifferentUserId }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isCurrentUser ? 'flex-start' : 'flex-end',
        }}
      >
        {item.content === 'emoji::like::' ? (
          <AntDesign name="like1" size={24} color="#FA7F26" />
        ) : (
          <>
            {isCurrentUser && <Image source={{ uri: memberWithDifferentUserId.avatar }} style={styles.avatar} />}
            <View style={isCurrentUser ? styles.messageLeft : styles.messageRight}>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          </>
        )}
      </View>
    );
  });

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.sender_id._id !== user._id;
    // console.log(isCurrentUser);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isCurrentUser ? 'flex-start' : 'flex-end',
          // marginVertical: 1,
        }}>
        {isCurrentUser && <Image source={{ uri: memberWithDifferentUserId.avatar }} style={styles.avatar} />}
        {item.content === 'emoji::like::' ? (
          <AntDesign name="like1" size={24} color="#FA7F26" /> // Hiển thị biểu tượng like nếu item.content là 'emoji::like::'
        ) : (
          <>
            <View style={isCurrentUser ? styles.messageLeft : styles.messageRight}>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          </>
        )}
      </View>
    );
    // return (
    //   <MessageItem
    //     item={item}
    //     isCurrentUser={isCurrentUser}
    //     memberWithDifferentUserId={memberWithDifferentUserId}
    //   />
    // );
  };

  const handleSend = async () => {
    let newMessage = {
      conversation_id: route?.params?.conversation_id,
      sender_id: user._id,
    };
    if (inputText.trim()) {
      // const newMessage = {
      //   message_id: `msg_${messages.length + 1}`,
      //   sender_id: currentUser,
      //   content: inputText,
      //   // timestamp: new Date().toISOString(),
      //   likes: 0, // Khởi tạo số lượng like là 0
      // };
      // DATA[0].messages.push(newMessage); // Thêm tin nhắn mới vào DATA
      // console.log(inputText);
      newMessage = {
        ...newMessage,
        content: inputText,
      }
      // console.log(newMessage);
    } else {
      newMessage = {
        ...newMessage,
        content: 'emoji::like::',
      }
      // console.log(newMessage);
    }
    await FetchAddMessage(newMessage);
    setInputText(''); // Đặt lại giá trị của TextInput
    setNotify(!notify);  // Update notify for UI re-render if needed
  };
  useFocusEffect(
    useCallback(() => {
      if (socket) {
        socket.on('new_message', (data) => {
          // console.log(data);
          console.log('Nhận được tin nhắn mới từ:', data.sender_id);
          console.log('Nội dung tin nhắn:', data.content);
          FetchMessge(route?.params?.conversation_id);
          UpdateMessge(route?.params?.conversation_id);
          // setMessage(prevMessages => [...prevMessages, data]);
        });

        return () => {
          socket.off('new_message');
        };
      }
    }, [socket, user._id])
  );

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('new_message', (data) => {
  //       // console.log(data);
  //       console.log('Nhận được tin nhắn mới từ:', data.sender_id);
  //       console.log('Nội dung tin nhắn:', data.content);
  //       FetchMessge(route?.params?.conversation_id);
  //       UpdateMessge(route?.params?.conversation_id);
  //       // setMessage(prevMessages => [...prevMessages, data]);
  //     });

  //     return () => {
  //       socket.off('new_message');
  //     };
  //   }
  // }, [socket]);
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

  const FetchAddMessage = async (data) => {
    // console.log(data);
    let newMessage;
    try {
      const response = await fetch(`${ADD_MESSAGE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // chuyển đổi đối tượng thành JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to add message');
      }
      newMessage = await response.json();
      // setMessage((prevMessages) => {
      //   const newMessages = [...prevMessages, newMessage.data];
      //   console.log('After setMessage:', newMessages);
      //   return newMessages;
      // });
      // console.log(newMessage);
    } catch (error) {
      console.error('Error adding message:', error);
    } finally {
      // setMessage(prevMessages => [...prevMessages, data]);
      await FetchMessge(route?.params?.conversation_id);
      sendMessageSocket({ ...newMessage.data, receiver_id: memberWithDifferentUserId._id, sender_name });
      console.log(newMessage.data);
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

  // Hàm getItemLayout khi các mục có chiều cao cố định
  const getItemLayout = (data, index) => ({
    length: 50,  // Chiều cao cố định của mỗi mục
    offset: 50 * index,  // Vị trí của mục
    index
  });

  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    if (flatListRef.current && message.length > 0) {
      const index = message.length - 1;
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  useEffect(() => {
    // Kiểm tra số lượng phần tử và cuộn đến phần tử cuối cùng
    if (message.length > 0) {
      scrollToBottom();
    }
  }, [message]);


  const handleArrowLeft = () => {
    navigation.goBack();
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
            source={{ uri: avatarUrl }} // Đảm bảo đường dẫn đến ảnh là chính xác
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{memberWithDifferentUserId?.full_name}</Text>
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
        ref={flatListRef}
        data={message}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}  // Đảm bảo key duy nhất
        contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10, paddingBottom: 75 }}
        initialNumToRender={20}  // Số lượng item render ban đầu
        maxToRenderPerBatch={20}  // Số lượng item render trong mỗi batch
        keyboardShouldPersistTaps="handled"
        initialScrollIndex={message.length > 0 ? message.length - 1 : 0} // Sử dụng messages.length - 1 để cuộn tới cuối
        getItemLayout={getItemLayout}  // Cung cấp thông tin về layout
        onContentSizeChange={() => scrollToBottom()}
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
            placeholder="Nhập tin nhắn của bạn ở đây..."
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
          <View style={{ backgroundColor: "#252B30", width: 180, height: 270, borderTopStartRadius: 20, borderBottomStartRadius: 20, alignItems: 'center', paddingVertical: 20, marginTop: '15%' }}>
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
    marginVertical: 2,
    padding: 10,
    backgroundColor: '#323436',
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
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
