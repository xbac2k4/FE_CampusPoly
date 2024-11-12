import { StyleSheet, Dimensions } from 'react-native';
const CreatePostStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#181A1C',
      },
      barHeader: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
      },
      textHeader: {
        color: '#ECEBED',
        fontSize: 18,
        fontWeight: 'bold',
      },
      buttonContainer: {
        backgroundColor: "#F62E8E",
        borderRadius: 24,
        width: 70,
        height: 24,
        alignItems: 'center',
      },
      createContainer: {
        flex: 1,
      },
  });
  
  export default CreatePostStyle;