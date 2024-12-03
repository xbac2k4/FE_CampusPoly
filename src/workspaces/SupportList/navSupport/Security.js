import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/style/support'; // Import file style đã tạo

const Security = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#181A1C' }}>
      <ScrollView style={styles.container}>
        {/* Back button */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
            <Image
              source={require('../../../assets/images/arowleft.png')}
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.barHeader}>
            <Text style={styles.textHeader}>Quyền riêng tư và bảo mật</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
          {/* Description */}
          <Text style={[styles.texth1, { fontSize: 20 }]}>
            Các cài đặt **quyền riêng tư và bảo mật** giúp bạn bảo vệ tài khoản và dữ liệu của mình. Bạn có thể kiểm soát ai có thể xem thông tin cá nhân, 
            <Text style={{ color: '#2D88FF' }}> tùy chỉnh quyền truy cập vào tài khoản CampusPoly</Text>, hoặc kích hoạt các phương thức bảo mật nâng cao.
          </Text>

          <Text style={styles.texthp}>
            Tìm hiểu thêm về <Text style={{ color: '#2D88FF' }}>quyền riêng tư và cài đặt bảo mật</Text> của bạn trên CampusPoly.
          </Text>

          {/* Options */}
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.navItem}>
              <Text style={[styles.navText, { alignSelf: 'flex-start' }]}>
                Quản lý ai có thể xem thông tin cá nhân
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
              <Text style={[styles.navText, { alignSelf: 'flex-start' }]}>
                Kích hoạt xác thực hai yếu tố
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
              <Text style={[styles.navText, { alignSelf: 'flex-start' }]}>
                Xem lại và quản lý quyền truy cập ứng dụng
              </Text>
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

export default Security;
