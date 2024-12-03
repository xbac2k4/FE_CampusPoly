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
  crudContainer: {
    flexDirection: 'row',
    marginTop: 15, alignItems: "center"
  },
  crudText: {
    color: '#fff',
    fontSize: 16,

  },
  imgCrud: {
    width: 25,
    height: 25, marginRight: 10
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  dialog: {
    width: '100%',
    height:'100%',
    backgroundColor: '#181A1C',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#C0C0C0',
  },
  input: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 10,

    color:'#fff',
  },
  dialogActions: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', // Đảm bảo hai nút cân đều
    width: '100%', 
    marginBottom: 10,
   
  },
  dialogTitleContainer: {
    position: 'absolute', 
    left: 0,
    right: 0,
    alignItems: 'center', // Đảm bảo tiêu đề luôn ở giữa
  },
    
  updateButtonActive: {
    backgroundColor: '#2E8AF6', // Màu xanh khi có thay đổi
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  updateButtonInactive: {
    backgroundColor: '#ccc', // Màu xám khi không có thay đổi
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  
  actionButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent', // Màu trong suốt
  },
  updateButton: {
    width: 100, // Chiều rộng cố định
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  imgcontainer: {
    alignSelf:'flex-start',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
   
    flexDirection: 'row', 
    justifyContent:'space-around'
  },
  container: {
    padding: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 12,
    
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: '#888', // Màu nền placeholder
  },
  textInput: {
    color: '#ECEBED',
    fontSize: 16,
    padding: 0,
    margin: 0,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flex: 1,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#323436',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 160,
    height: 32,
    borderRadius: 32,
    overflow: 'hidden',
    marginLeft: 10,
    backgroundColor: '#323436',
    justifyContent: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  selectedImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  selectedGif: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 2,
  },
  removeImageIcon: {
    width: 14,
    height: 14,
  },
  imageWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: -5, // Đặt vị trí bên trên
    right: -5, // Đặt vị trí bên phải
    backgroundColor: '#fff', // Nền trắng để nút nổi bật
    borderRadius: 8,
    padding: 2,
    elevation: 5, // Đổ bóng cho nút "X"
  },
});

export default PostStyle;
