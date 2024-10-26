import {StyleSheet} from 'react-native';

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
    height: 100,
    backgroundColor: '#2c2f33',
  },
  backgroundImage: {
    width: '100%',
    height: 160,
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
    marginTop: -50,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 35,
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
});
