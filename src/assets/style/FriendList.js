import { StyleSheet, Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const FriendList = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#181A1C',
        flexGrow: 1,
      },
      barHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      },
      circleIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#323436',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '5%',
        top: '2%',
      },
      textHeader: {
        color: '#ECEBED',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'rgl1',
      },
      tabContainer: {
        flexDirection: 'row', // Hiển thị ngang
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        padding: 5,
        borderRadius: 20, // Làm mềm các góc
        // backgroundColor: '#f0f0f0', // Màu nền chung cho thanh tab
      },
      tab: {
        flex: 1, // Để chia đều khoảng cách cho các tab
        paddingVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        borderRadius: 15, // Làm mềm các góc của tab
      },
      activeTab: {
        backgroundColor: '#007AFF', // Màu nền cho tab đang chọn
        borderRadius: 15, // Làm mềm các góc
      },
      tabText: {
        color: '#fff',
      },
      activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      
     
  });
  
  export default FriendList;