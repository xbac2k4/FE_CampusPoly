import { StyleSheet, Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const CommentStyle = StyleSheet.create({
    container: {
        paddingBottom: 20,
        backgroundColor: '#181A1C',
        flexGrow: 1,
      },
      postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      headerText: {
        flex: 1,
      },
      profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
      },
      postTime: {
        fontSize: 12,
        color: '#B3B3B3',
      },
      postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginVertical: 10,
      },
      postContent: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 10,
      },
      paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      paginationDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
      },
      activeDot: {
        backgroundColor: '#FF0000',
      },
      inactiveDot: {
        backgroundColor: '#B3B3B3',
      },
      postImage: {
        width: screenWidth - 50, // Giữ nguyên độ rộng
        height: undefined, // Không gán chiều cao cố định
        aspectRatio: 1, // Giữ tỷ lệ gốc của ảnh (tỷ lệ rộng/cao)
        borderRadius: 8,
        marginRight: 10,
        marginTop: 5,
      },
      
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
      },
      barHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
      },
      circleIcon: {
        width: "8%",
        height: '4%',
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
      barComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingHorizontal: 10,
      },
      commentTitle: {
        fontFamily: 'rgl1',
        fontSize: 14,
        fontWeight: 'regular',
        color: '#ECEBED',
      },
      recentText: {
        fontFamily: 'rgl1',
        fontSize: 14,
        fontWeight: 'semibold',
        color: '#ECEBED',
        marginRight: 3,
      },
      commentInput: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#181A1C', // Set background color for visibility
        padding: 10,
      },
      headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      imageavatar: {
        width: 32,
        height: 32,
        borderRadius: 100,
      },
      bodyContent: {
        marginTop: 10,
        paddingHorizontal: 10,
      },
      imgContent: {
        width: screenWidth - 50,
        height: 200,
        borderRadius: 16,
        marginTop: 10,
      },
      interactContainer: {
        flexDirection: 'row',
        marginTop: 17,
        paddingHorizontal: 5,
        justifyContent: 'space-between',
      },
      iconLike: {
        marginLeft: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 9,
      },
      textInteract: {
        fontFamily: 'rgl1',
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
        fontWeight: 'bold',
      },
  });
  
  export default CommentStyle;