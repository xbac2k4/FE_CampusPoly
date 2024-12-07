import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1f23',
    marginTop: 12,
  },
  headerButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtonActive: {
    color: 'orange',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backgroundContainer: {
    height: height * 0.2, // 20% of screen height
    backgroundColor: '#2c2f33',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  iconEditBackground: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#323436',
    borderRadius: 20,
  },
  profileImageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: -height * 0.07,
  },
  profileImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: (width * 0.35) / 2,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: -10,
    marginBottom: 12,
  },
  iconEditProfile: {
    position: 'absolute',
    top: '79%',
    right: '38%',
    padding: 5,
    backgroundColor: '#323436',
    borderRadius: 20,
  },
  inputWrapper: {
    backgroundColor: '#000000',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  
});
