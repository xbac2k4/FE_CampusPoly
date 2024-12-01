import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../assets/style/support'; // Import file style bạn đã tạo

const Loginproblem = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{ flex: 1, backgroundColor: '#181A1C' }}>
      <ScrollView style={styles.container}>
        {/* Back button */}
      <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Image
            source={require('../../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.barHeader}>
          <Text style={styles.textHeader}>Cài đặt mật khẩu</Text>
        </View>
      </View>

      <View style={{paddingHorizontal:24,marginTop:10}}>
          {/* Description */}
          <Text style={[styles.texth1,{fontSize:20}]}>
        Nếu có vấn đề gì về mật khẩu bạn có thể liên hệ với chúng tôi qua emai:phamvietanh19218@gmail.com .
        </Text>

        <Text style={styles.texthp}>
        Nếu gặp sự cố , hãy tìm hiểu cách <Text style={{ color: '#2D88FF' }}>nhận trợ giúp về đăng nhập và mật khẩu</Text>
        </Text>

        {/* Options */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navText,{alignSelf:'flex-start'}]}>Đăng nhập tài khoản của bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, { marginTop: 10 }]}>
            <Text style={[styles.navText,{alignSelf:'flex-start'}]}>Khắc phục sự cố mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer,{flexDirection:'row',justifyContent:"space-between"}]}>
        <Text style={styles.footerText}>From CampusPoly</Text>
        <Text style={styles.footerCopyright}>© 2024</Text>
      </View>
    </View>
  );
};

export default Loginproblem;
