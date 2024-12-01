import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window'); // Get device dimensions
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
      texth1:{
        fontSize:25,fontWeight:'500',color:'#fff'
      },
      gridContainer: {
        marginTop: height * 0.03, // 3% of screen height
        paddingHorizontal: width * 0.02,
      },
      gridItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.01, // 1% of screen height
      },
      navItem: {
        flex: 1,
        backgroundColor: '#333333',
        borderRadius: 10,
        paddingVertical: height * 0.02, // Adjust padding for height
        paddingHorizontal: width * 0.02, // Adjust padding for width
        alignItems: 'center',
        marginHorizontal: width * 0.01, // Adjust margin for width
      },
      imgGrid: {
        width: width * 0.1, // 6% of screen width
        height: width * 0.1,
        marginBottom: height * 0.01, // Adjust margin for height
      },
      navText: {
        color: '#fff',
        fontSize: width * 0.04, // Responsive font size
        fontWeight: '500',
        
      },
      footer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
      },
      footerTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      footerItems: {
        width: '100%',
        
      },
      footerText: {
        color: '#cccccc',
        fontSize: 14,
        marginBottom: 4,
      },
      footerCopyright: {
        color: '#888888',
        fontSize: 15,
        marginBottom:10,
        backgroundColor:'#181A1C'

      },
      texthp:{
        fontSize:15,fontWeight:'400',color:'#fff',
        marginTop:10
      },
      
  });
  
  export default supportlist;