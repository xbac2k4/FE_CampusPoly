import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window'); // Get device dimensions
const ReportStyle = StyleSheet.create({
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
      },
      descriptionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
        fontWeight:'700',
        marginTop:15
      },
      formContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
      },
      label: {
        color: '#ECEBED',
        fontSize: 16,
        marginBottom: 5,
      },
      input: {
        backgroundColor: '#323436',
        color: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
      },
      multilineInput: {
        height: 100,
        textAlignVertical: 'top',
      },
      submitButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
      },
      submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      
  });
  
  export default ReportStyle;