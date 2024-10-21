import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';


// Component ChatScreen dùng để hiển thị giao diện chat
const ChatScreen = () => {
  // Khai báo state để lưu trữ nội dung tin nhắn nhập vào
  const [inputText, setInputText] = useState('');

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
      {/* Nội dung các tin nhắn */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
         {/* Dòng phân cách ngày tháng */}
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>SEP 14, 2021</Text>
        </View>
         {/* Tin nhắn bên trái (người khác gửi) */}
        <View style={styles.messageLeftContainer}>
          <Image
            source={require('../../assets/anhchatview.png')}
            style={styles.messageImage}
          />
          <View style={styles.messageLeft}>
            <Text style={styles.messageText}>Alex, let’s meet this weekend. I’ll check with Dave too 😎</Text>
          </View>
        </View>
        <View style={styles.messageTimeContainerLeft}>
          <Text style={styles.messageTime}>8:27 PM</Text>
        </View>
        {/* Tin nhắn bên phải (người dùng gửi) */}
        <View style={styles.messageRight}>
          <Text style={styles.messageText}>Sure. Let’s aim for saturday</Text>
        </View>
        <View style={styles.messageRight}>
          <Text style={styles.messageText}>I’m visiting mom this Sunday 👻</Text>
        </View>
        <View style={styles.messageTimeContainerRight}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>
        {/* Tin nhắn bên trái */}
        <View style={styles.messageLeftContainer}>
          <Image
            source={require('../../assets/anhchatview.png')}
            style={styles.messageImage}
          />
          <View style={styles.messageLeft}>
            <Text style={styles.messageText}>Alrighty! Will give you a call shortly 🤗</Text>
          </View>
        </View>
        <View style={styles.messageTimeContainerLeft1}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>

        {/* Tin nhắn dạng emoji bên phải */}
        <View style={styles.messageRight}>
          <Text>❤️</Text>
        </View>
        <View style={styles.messageTimeContainerRight}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>
        {/* Dòng phân cách ngày tháng */}
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>TODAY</Text>
        </View>
        {/* Tin nhắn bên trái */}
        <View style={styles.messageLeftContainer}>
          <Image
            source={require('../../assets/anhchatview.png')}
            style={styles.messageImage}
          />
          <View style={styles.messageLeft}>
            <Text style={styles.messageText}>Hey you! Are you there?</Text>
          </View>
        </View>
        {/* Tin nhắn bên phải */}
        <View style={styles.messageTimeContainerLeft2}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>

        <View style={styles.messageRight}>
          <Text style={styles.messageText}>👋 Hi Jess! What’s up?</Text>
        </View>
        <View style={styles.messageTimeContainerRight}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>
      </ScrollView>

      {/* Đường kẻ ngang trên thanh nhập tin nhắn */}
      <View style={styles.dividerAboveBlackBar} />
      {/* Thanh nhập tin nhắn */}
      <View style={styles.blackBar}>
        <View style={styles.Textting}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            placeholderTextColor="#ECEBED"
            value={inputText}
            onChangeText={setInputText}
          />
           {/* Nút thêm file */}
          <TouchableOpacity style={{ marginRight: 16 }}>
            <AntDesign name="plus" size={24} color="#727477" />
          </TouchableOpacity>
          {/* Nút gửi tin nhắn hoặc nút thích */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#F62E8E', '#AC1AF0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 32, padding: 6 }}
            >
              {inputText ? (
                <MaterialIcons name="send" size={24} color="white" />
              ) : (
                <AntDesign name="like1" size={24} color="white" />
              )}
            </LinearGradient>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#181A1C',
    marginTop: 16,
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
  dateSeparator: {
    alignItems: 'center', // Căn giữa nội dung theo chiều ngang
    marginVertical: 10, // Khoảng cách trên và dưới
    marginTop: 24,
  },
  dateText: {
    top : 'auto',
    fontSize: 14,
    color: '#727477',
  },
  // Định dạng cho các tin nhắn bên trái (tin nhắn từ người khác)
  messageLeft: {
    flexDirection: 'row', // Căn ảnh và văn bản cùng hàng
    position: 'relative', 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#323436',
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 1,
  },
  messageRight: {
    top : -12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#2E8AF6',
    borderRadius: 15,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginBottom: -3,
  },
  // Container thời gian hiển thị bên phải
  messageTimeContainerRight: {
    alignItems: 'flex-end',
    marginRight: 5,
    marginTop: 5,
    marginBottom: 4, 
  },
  messageText: {
    fontSize: 14, // Thay đổi kích thước chữ thành 20
    color: '#fff', // Màu chữ (có thể thay đổi theo ý muốn)
  },
  messageTime: {
    top : -13,
    fontSize: 16,
    color: '#727477',
  },
  // Container thời gian hiển thị bên trái
  messageTimeContainerLeft: {
    position: 'relative', // Sử dụng 'absolute' để có thể điều chỉnh vị trí
    top: -1, // Điều chỉnh giá trị này để đẩy lên hoặc xuống
    left: 308,
    fontSize: 16,
    color: '#727477',
  },
  messageTimeContainerLeft1: {
    position: 'relative',
    top : -10,
    left: 238,
    fontSize: 16,
    color: '#727477',
  },
  messageTimeContainerLeft2: {
    position: 'relative', 
    top : -10,
    left: 145,
    fontSize: 16,
    color: '#727477',
  },
  chatContainer: {

  },
  // Thanh nhập tin nhắn
  blackBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 82,
    backgroundColor: 'black',
  },
  // Đường kẻ ngang phía trên thanh nhập tin nhắn
  dividerAboveBlackBar: {
    height: 1,
    backgroundColor: '#323436',
    width: '100%',
    position: 'absolute',
    bottom: 82,
  },
  Textting: {
    flexDirection: 'row',
    backgroundColor: '#323436',
    borderRadius: 32,
    paddingHorizontal: 7, // Giảm giá trị này để thu nhỏ chiều dài
    alignItems: 'center',
    height: 44,
    marginTop: 10,
    width: '96%', // Thêm thuộc tính này để điều chỉnh chiều dài
    alignSelf: 'center', // Căn giữa trong blackBar
  },
  input: {
    marginLeft: 7,
    flex: 1,
    fontSize: 16,
    color: '#ECEBED',
  },
  messageImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 4, // Thêm khoảng cách giữa ảnh và văn bản
  },
  messageLeftContainer: {
    flexDirection: 'row', // Căn ảnh và khung tin nhắn cùng hàng
    alignItems: 'baseline', // Đảm bảo ảnh và tin nhắn đều căn trên cùng
  },
});
