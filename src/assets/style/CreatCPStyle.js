import { StyleSheet, Dimensions } from 'react-native';
const CreateCpStyle = StyleSheet.create({
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
      inputContainer: {
        flex: 1,
      },
      textInput: {
        color: '#ECEBED',
        fontSize: 16,
        padding: 0,
        margin: 0,
        textAlignVertical: 'top',
        backgroundColor: 'transparent',
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
  });
  
  export default CreateCpStyle;