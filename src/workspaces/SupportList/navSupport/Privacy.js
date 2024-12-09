import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/style/support'; // Import file style đã tạo

const Privacy = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#181A1C' }}>
      <ScrollView style={[styles.container, {
        backgroundColor: theme ? Colors.background : Colors.light
      }]}>
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
            <Text style={styles.textHeader}>Trung tâm quyền riêng tư</Text>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
          {/* Introduction */}
          <Text style={[styles.texth1, { fontSize: 18, marginBottom: 15 }]}>
            Đưa ra lựa chọn về quyền riêng tư phù hợp với bạn. Tìm hiểu cách quản lý cũng như kiểm soát quyền riêng tư trên CampusPoly APP, tin nhắn của Campuspoly và các sản phẩm khác của CampusPoly.
          </Text>

          <Text style={[styles.texth1, { fontSize: 16, fontWeight: 'bold', marginBottom: 10 }]}>
            Chúng tôi xây dựng quyền riêng tư trong sản phẩm của mình
          </Text>

          {/* Private Messaging Section */}
          <View style={[styles.navItem, { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }]}>
            <Image
              source={require('../../../assets/images/avt.png')} // Đổi thành icon chat của bạn
              style={[styles.imgGrid, { marginRight: 10 }]}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.navText, { fontSize: 16, fontWeight: 'bold' }]}>
                Nhắn tin riêng tư
              </Text>
              <Text style={[styles.texthp, { flexWrap: 'wrap', overflow: 'hidden' }]}>
                Sản phẩm nhắn tin của chúng tôi có tính năng mã hóa để cuộc trò chuyện của bạn luôn an toàn và bảo mật.
              </Text>
            </View>

          </View>
          <View style={[styles.navItem, { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, marginTop: 15 }]}>
            <Image
              source={require('../../../assets/images/avt.png')} // Đổi thành icon chat của bạn
              style={[styles.imgGrid, { marginRight: 10 }]}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.navText, { fontSize: 16, fontWeight: 'bold' }]}>
                Đăng nhập bảo mật
              </Text>
              <Text style={[styles.texthp, { flexWrap: 'wrap', overflow: 'hidden' }]}>
                Sản phẩm của chúng tôi được kết hợp bảo với với google, đảm bảo tính an toàn cao
              </Text>
            </View>

          </View>
          {/* Privacy Control Section */}
          <Text style={[styles.texth1, { fontSize: 16, fontWeight: 'bold', marginTop: 20 }]}>
            Cài đặt kiểm soát quyền riêng tư
          </Text>
          <Text style={styles.texthp}>
            Chúng tôi thiết kế sử dụng để bạn có thể chọn  quyền riêng tư phù hợp với mình.
          </Text>

          {/* Illustration */}
          <Image
            source={require('../../../assets/images/privacy.jpg')} // Thay bằng hình minh họa của bạn
            style={{ width: '100%', height: 200, resizeMode: 'contain', marginTop: 10 }}
          />
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

export default Privacy;
