import { StyleSheet, Text, View, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatviewScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* View trống để đẩy ảnh vào giữa */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.iconContainer}  >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Phần chứa ảnh và tên */}
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/anhchatview.png')} // Đảm bảo đường dẫn đến ảnh là chính xác
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Jessica Thompson</Text>
        </View>

        {/* View trống để đẩy ảnh vào giữa */}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity style={styles.iconContainer} >
            <MaterialIcons name="more-vert" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>SEP 14, 2021</Text>
        </View>

        <View>
          <View style={styles.messageLeft}>
            <Text style={styles.messageText}>Alex, let’s meet this weekend. I’ll check with Dave too 😎</Text>
          </View>
          <View style={styles.messageTimeContainerLeft}>
            <Text style={styles.messageTime}>8:27 PM</Text>
          </View>
        </View>

        <View style={styles.messageRight}>
          <Text style={styles.messageText}>Sure. Let’s aim for saturday</Text>
        </View>
        <View style={styles.messageRight}>
          <Text style={styles.messageText}>I’m visiting mom this Sunday 👻</Text>
        </View>
        <View style={styles.messageTimeContainerRight}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>

        <View style={styles.messageLeft}>
          <Text style={styles.messageText}>Alrighty! Will give you a call shortly 🤗</Text>
        </View>
        <View style={styles.messageTimeContainerLeft1}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>

        <View style={styles.messageRight}>
          <Text>❤️</Text>
        </View>
        <View style={styles.messageTimeContainerRight}>
          <Text style={styles.messageTime}>8:56 PM</Text>
        </View>

        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>TODAY</Text>
        </View>

        <View style={styles.messageLeft}>
          <Text style={styles.messageText}>Hey you! Are you there?</Text>
        </View>
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


      <View style={styles.dividerAboveBlackBar} />
      <View style={styles.blackBar}>
        <View style={styles.Textting}>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            placeholderTextColor="#ECEBED"
          />
        </View>
      </View>
    </View>

  );
};

export default ChatviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#181A1C',
    marginTop: 16,
  },
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
    fontSize: 14,
    color: '#727477',
  },
  messageLeft: {
    position: 'relative', // Add this line
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
  messageTimeContainerRight: {
    alignItems: 'flex-end',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 4, // Add this line to create space below the time
  },
  messageText: {
    fontSize: 14, // Thay đổi kích thước chữ thành 20
    color: '#fff', // Màu chữ (có thể thay đổi theo ý muốn)
  },
  messageTime: {
    fontSize: 16,
    color: '#727477',
  },
  messageTimeContainerLeft: {
    position: 'relative', // Add this line
    left: 270,
    fontSize: 16,
    color: '#727477',
  },
  messageTimeContainerLeft1: {
    position: 'relative', // Add this line
    left: 198,
    fontSize: 16,
    color: '#727477',
  },
  messageTimeContainerLeft2: {
    position: 'relative', // Add this line
    left: 106,
    fontSize: 16,
    color: '#727477',
  },
  chatContainer: {

  },
  blackBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 82,
    backgroundColor: 'black',
  },
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
    paddingHorizontal: 15, // Giảm giá trị này để thu nhỏ chiều dài
    alignItems: 'center',
    height: 44,
    marginTop: 10,
    width: '90%', // Thêm thuộc tính này để điều chỉnh chiều dài
    alignSelf: 'center', // Căn giữa trong blackBar
  },
  input:{
    flex: 1,
    fontSize: 16,
    color: '#ECEBED',
  }
});
