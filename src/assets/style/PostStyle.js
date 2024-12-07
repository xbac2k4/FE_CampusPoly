// PostStyle.js
import { StyleSheet } from 'react-native';

const PostStyle = StyleSheet.create({
  textHeader: {
    color: '#ECEBED',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderRadius: 24,
    width: 80,
    height: 25,
    alignItems: 'center',
  },
  postContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  horizontalScrollContainer: {
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
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  postHashtag: {
    color: '#0078D4',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
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
  iconImage: {
    width: 20,
    height: 20,
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
  crudContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: "center"
  },
  crudText: {
    color: '#ECEBED',
    fontSize: 18,
    fontWeight: 'bold',
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
    height: '100%',
    backgroundColor: '#181A1C',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C0C0C0',
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

  actionButton: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent', // Màu trong suốt
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
  textInput1: {
    color: '#ECEBED',
    fontSize: 16,
    padding: 0,
    margin: 0,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    flex: 1,
    // backgroundColor: '#fff', // Màu nền placeholder
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
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  imageWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 2,
  },
});

export default PostStyle;
