import React, { useContext } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../assets/style/support'; // Import file style đã tạo
import { ThemeContext } from '../../../services/provider/ThemeContext';
import Colors from '../../../constants/Color';

const Page = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: theme ? Colors.background : Colors.light }}>
      <ScrollView style={[styles.container, {
        backgroundColor: theme ? Colors.background : Colors.light
      }]}>
        {/* Back button */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
            <Image
              source={theme
                ? require('../../../assets/images/arowleft.png')
                : require('../../../assets/images/light_arowleft.png')
              }
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.barHeader}>
            <Text style={[styles.textHeader, {
              color: theme ? '#ECEBED' : Colors.background,
            }]}>Trung tâm hỗ trợ bài viết</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
          {/* Description */}
          <Text style={[styles.texth1, {
            fontSize: 20,
            color: theme ? '#ECEBED' : Colors.background,
          }]}>
            Bạn có thể tìm thấy câu trả lời và các hướng dẫn chi tiết về cách quản lý bài viết trên CampusPoly. Hãy xem qua các tùy chọn hỗ trợ bên dưới để tìm thông tin phù hợp với nhu cầu của bạn.
          </Text>

          <Text style={[styles.texthp, {
            color: theme ? '#fff' : Colors.background

          }]}>
            Nếu cần thêm thông tin, hãy truy cập vào <Text style={{ color: '#2D88FF' }}>trung tâm trợ giúp CampusPoly</Text>.
          </Text>

          {/* Options */}
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={[styles.navText, {
                alignSelf: 'flex-start',
                color: theme ? '#fff' : Colors.background
              }]}>Cách chỉnh sửa bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
              <Text style={[styles.navText, {
                alignSelf: 'flex-start',
                color: theme ? '#fff' : Colors.background
              }]}>Xóa bài viết đã đăng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
              <Text style={[styles.navText, {
                alignSelf: 'flex-start',
                color: theme ? '#fff' : Colors.background
              }]}>Quản lý quyền riêng tư bài viết</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={styles.footerText}>CampusPoly Hỗ trợ</Text>
        <Text style={styles.footerCopyright}>© 2024</Text>
      </View>
    </View>
  );
};

export default Page;
