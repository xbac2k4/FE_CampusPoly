import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/style/support'; // Import file style bạn đã tạo
import { ThemeContext } from '../../../services/provider/ThemeContext';
import Colors from '../../../constants/Color';

const Accountinformation = () => {
  const navigation = useNavigation();
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
            }]}>Cài đặt tài khoản</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
          {/* Description */}
          <Text style={[styles.texth1, {
            fontSize: 20,
            color: theme ? '#fff' : Colors.background
          }]}>
            Bạn có thể quản lý phần cài đặt cho tài khoản CampusPoly bất cứ lúc nào. Bạn có thể cập nhật thông tin liên hệ,
            <Text style={{ color: '#2D88FF' }}> điều chỉnh phần cài đặt CampusPoly</Text>, thay đổi tên người dùng hoặc chọn người liên hệ thừa kế cho tài khoản.
          </Text>

          <Text style={[styles.texthp, {
            color: theme ? '#fff' : Colors.background,
          }]}>
            Tìm hiểu cách <Text style={{ color: '#2D88FF' }}>điều chỉnh thông tin trên trang cá nhân CampusPoly.</Text>
          </Text>

          {/* Options */}
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={[styles.navText, { alignSelf: 'flex-start', color: theme ? '#fff' : Colors.background }]}>Bạn có thể điều chỉnh phần cài đặt tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
              <Text style={[styles.navText, { alignSelf: 'flex-start', color: theme ? '#fff' : Colors.background }]}> Sửa tên người dùng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { flexDirection: 'row', justifyContent: "space-between" }]}>
        <Text style={[styles.footerText, {
          color: theme ? '#ccc' : '#888',
        }]}>From CampusPoly</Text>
        <Text style={styles.footerCopyright}>© 2024</Text>
      </View>
    </View>
  );
};

export default Accountinformation;
