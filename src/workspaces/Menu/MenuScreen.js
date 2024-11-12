import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import UserComponent from '../../components/Menu/UserComponent';
import SettingItem from '../../components/Menu/SettingItem';

const { width, height } = Dimensions.get('window'); // Get device dimensions

const MenuScreen = () => {
  const fakeUser = {
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    full_name: 'Đỗ Quang Giáp',
    notification: 1,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.headContainer}>
          <Text style={styles.headerText}>Menu</Text>
          <TouchableOpacity onPress={() => { /* Handle navigation to settings here */ }}>
            <Image
              source={require('../../assets/images/setting.png')}
              style={styles.settingIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.userContainer}>
          <UserComponent
            avatar={fakeUser.avatar}
            full_name={fakeUser.full_name}
            notification={fakeUser.notification}
          />
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <TouchableOpacity style={styles.navItem}>
              <Image
                source={require('../../assets/images/friend.png')}
                style={styles.imgGrid}
              />
              <Text style={styles.navText}>Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
              <Image
                source={require('../../assets/images/book.png')}
                style={styles.imgGrid}
              />
              <Text style={styles.navText}>Đã Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <SettingItem
          title="Trợ giúp & hỗ trợ"
          icon={require('../../assets/images/hoi.png')}
          subItems={['Trung tâm trợ giúp', 'Báo cáo sự cố', 'Điều khoản & chính sách']}
          onPress={() => { /* Handle onPress here */ }}
        />
        <SettingItem
          title="Quyền riêng tư"
          icon={require('../../assets/images/setting.png')}
          subItems={['Trung tâm quyền riêng tư', 'Cài đặt']}
          onPress={() => { /* Handle onPress here */ }}
        />
      </ScrollView>

      {/* Logout button at the bottom */}
      <TouchableOpacity style={styles.buttonExit}>
        <Text style={styles.buttonExitText}>Đăng Xuất</Text>
      </TouchableOpacity>
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
