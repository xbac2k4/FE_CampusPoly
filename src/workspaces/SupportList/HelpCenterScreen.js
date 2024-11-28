import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import styles from '../../assets/style/support';
import Screens from '../../navigation/Screens';
const HelpCenterScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
          <Image
            source={require('../../assets/images/arowleft.png')}
            resizeMode="contain"
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <View style={styles.barHeader}>
          <Text style={styles.textHeader}>CampusPoly Trung tâm hộ trợ</Text>
          <View style={{ height: 2, backgroundColor: '#fff' }} />
        </View>
        <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
          <Text style={styles.texth1}>Chúng tôi có thể giúp gì cho bạn?</Text>

          <Text style={[styles.texth1, { fontSize: 18, marginTop: 16 }]} >Chủ đề phổ biến</Text>
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.navItem} onPress={() => {
                navigation.navigate(Screens.Accountinformation)
              }}>
                <Image
                  source={require('../../assets/images/friend.png')}
                  style={styles.imgGrid}
                />
                <Text style={styles.navText}>Về thông tin tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={() => {
                navigation.navigate(Screens.Loginproblem)
              }}>
                <Image
                  source={require('../../assets/images/key.png')}
                  style={styles.imgGrid}
                />
                <Text style={styles.navText}>Về vấn đề đăng nhập</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={styles.navItem} onPress={() => {
                navigation.navigate(Screens.Security)
              }}>
                <Image
                  source={require('../../assets/images/baomat.png')}
                  style={styles.imgGrid}
                />
                <Text style={styles.navText}>Quyền riêng tư và bảo mật</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={() => {
                navigation.navigate(Screens.Page)
              }}>
                <Image
                  source={require('../../assets/images/article.png')}
                  style={styles.imgGrid}
                />
                <Text style={styles.navText}>Trang</Text>
              </TouchableOpacity>

            </View>
          </View>
          {/** footer */}
          <View style={styles.footer}>
            <View style={styles.footerItems}>
              <TouchableOpacity 
              onPress={()=>{
                {/**Sử lí chuyển màn sang màn giới thiệu */}
               navigation.navigate(Screens.Introduce) 
              }}
              >
              <Text style={styles.footerText}>Giới thiệu</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}>Quyền riêng tư</Text>
              <Text style={styles.footerText}>Điều khoản và chính sách</Text>
            </View>


          </View >

        </View>
      </ScrollView>
      <View style={{height:1,backgroundColor:'#fff'}}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:24,backgroundColor:'#181A1C', }}>
        <Text style={styles.footerCopyright}>From CampusPoly</Text>
        <Text style={styles.footerCopyright}>© 2024 CampusPoly</Text>
      </View>
    </View>
  )
}

export default HelpCenterScreen
