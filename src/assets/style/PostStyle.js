// PostStyle.js
import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const PostStyle = StyleSheet.create({
  postContainer: {
    width: '100%',
    backgroundColor: '#181A1C',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  moreIcon: {
    paddingLeft: 10,
  },
  moreText: {
    fontSize: 20,
    color: '#B3B3B3',
  },
  postText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500'
  },
  postHashtag: {
    color: '#0078D4',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '700'
  },
  // postImage: {
  //   width: screenWidth - 50, // Giữ nguyên độ rộng
  //   height: undefined, // Không gán chiều cao cố định
  //   aspectRatio: 1, // Giữ tỷ lệ gốc của ảnh (tỷ lệ rộng/cao)
  //   borderRadius: 8,
  //   marginRight: 10,
  //   marginTop: 5,
  // },
  postImage: {
    width: screenWidth - 50,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  leftMetaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  metaText: {
    color: '#B3B3B3',
    fontSize: 14,
    marginLeft: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#B3B3B3',
    marginTop: 15,
    marginBottom: 10,
  },
  imageList: {
    marginBottom: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
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
  // Các style cho Bottom Sheet
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reportOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  reportText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#007BFF',
  },
  inner: {
    flex: 1,
    backgroundColor: '#181A1C',
    paddingHorizontal: 24
  },
  textOne: {
    color: '#fff', fontWeight: "semibold", fontSize: 16,
    marginTop: '5%'
  },
  reporttextcontainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
  },
  lottieIcon: {
    width: 50,
    height: 50,
  },
  crudContainer:{
    flexDirection:'row',
    marginTop:15,alignItems:"center"
},
crudText:{
    color: '#fff',
    fontSize: 18,
   
  },
  imgCrud:{
    width:25,
    height:25, marginRight:10
  }
});

export default PostStyle;
