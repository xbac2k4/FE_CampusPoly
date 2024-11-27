import { StyleSheet, Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window'); // Lấy chiều rộng màn hình để điều chỉnh kích thước hình ảnh
const supportlist = StyleSheet.create({
    container: {
        paddingVertical: 20,
        backgroundColor: '#181A1C',
        flexGrow: 1,
      },
      barHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
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
  });
  
  export default supportlist;