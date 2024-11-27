import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import React, { useContext, useState } from 'react';
import UserComponent from '../../components/Menu/UserComponent';
import SettingItem from '../../components/Menu/SettingItem';
import { UserContext } from '../../services/provider/UseContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import NotificationModal from '../../components/Notification/NotificationModal';
import { SocketContext } from '../../services/provider/SocketContext';
const { width, height } = Dimensions.get('window'); // Get device dimensions

const MenuScreen = () => {
  const navigation = useNavigation(); // Hook for navigation
  const { user, GoogleSignin } = useContext(UserContext);
  const { disconnectSocket, socket } = useContext(SocketContext);

  const [modalVisible, setModalVisible] = useState(false); // State to control modal
  const handleLogoutPress = () => {
    setModalVisible(true); // Show modal
  };
  const handleConfirm = async () => {
    setModalVisible(false);
    await GoogleSignin.signOut();
    disconnectSocket();
    navigation.navigate(Screens.MenuAuth); // Navigate to LoginScreen
  };

  const handleCancel = () => {
    setModalVisible(false); // Hide modal
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.headContainer}>
          <Text style={styles.headerText}>Menu</Text>

        </View>

        <View style={styles.userContainer}>
          <UserComponent
            avatar={user.avatar}
            full_name={user.full_name}
          />
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <TouchableOpacity style={styles.navItem} onPress={() => {
              navigation.navigate(Screens.FriendListScreen)
            }}>
              <Image
                source={require('../../assets/images/friend.png')}
                style={styles.imgGrid}
              />
              <Text style={styles.navText}>Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => {
              navigation.navigate(Screens.Message)
            }}>
              <AntDesign name="message1" size={width * 0.06} color="#ff7d97" />
              <Text style={styles.navText}>Tin nhắn</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <SettingItem
          title="Trợ giúp & hỗ trợ"
          icon={require('../../assets/images/hoi.png')}
          subItems={['Trung tâm trợ giúp', 'Báo cáo sự cố', 'Điều khoản & chính sách']}
          onPress={(subItem) => {
            if (subItem === 'Trung tâm trợ giúp') {
              navigation.navigate(Screens.HelpCenter); // Điều hướng đến Trung tâm trợ giúp
            } else if (subItem === 'Báo cáo sự cố') {
              navigation.navigate(Screens.ReportIssue); // Điều hướng đến Báo cáo sự cố
            } else if (subItem === 'Điều khoản & chính sách') {
              navigation.navigate(Screens.TermsAndPolic); // Điều hướng đến Điều khoản & chính sách
            }
          }}
        />




        <SettingItem
          title="Quyền riêng tư"
          icon={require('../../assets/images/setting.png')}
          subItems={['Trung tâm quyền riêng tư', 'Cài đặt']}
          onPress={() => { /* Handle onPress here */ }}
        />
      </ScrollView>

      {/* Logout button at the bottom */}
      <TouchableOpacity style={styles.buttonExit} onPress={handleLogoutPress}>
        <Text style={styles.buttonExitText}>Đăng Xuất</Text>
      </TouchableOpacity>
      {/* Notification Modal */}
      <NotificationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message="Bạn có chắc muốn đăng xuất?"
      />
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
  scrollContent: {
    flex: 1,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.05, // 5% of screen height
    marginBottom: height * 0.025, // 2.5% of screen height
    paddingHorizontal: width * 0.06, // 6% of screen width
  },
  headerText: {
    fontSize: width * 0.05, // Responsive font size
    color: '#fff',
    fontWeight: '600',
  },
  settingIcon: {
    width: width * 0.05, // Adjust icon size
    height: width * 0.05,
  },
  userContainer: {
    paddingHorizontal: width * 0.05, // 5% of screen width
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
    width: width * 0.06, // 6% of screen width
    height: width * 0.06,
    marginBottom: height * 0.01, // Adjust margin for height
  },
  navText: {
    color: '#fff',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: height * 0.01, // 1% of screen height
    marginHorizontal: width * 0.04, // 4% of screen width
    marginBottom: height * 0.01, // 1% of screen height
  },
  buttonExit: {
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.07, // Adjust height based on screen size
    marginHorizontal: width * 0.05, // 5% of screen width
    borderRadius: 10,
    marginBottom: height * 0.08, // 3% of screen height
  },
  buttonExitText: {
    fontWeight: '500',
    color: '#fff',
    fontSize: width * 0.045, // Responsive font size
  },
});
