import React, { useContext } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from '../../assets/style/support';
import Screens from '../../navigation/Screens';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';
const HelpCenterScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, {
        backgroundColor: theme ? Colors.background : Colors.light
      }]}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleIcon}>
            <Image
              source={theme
                ? require('../../assets/images/arowleft.png')
                : require('../../assets/images/light_arowleft.png')
              }
              resizeMode="contain"
              style={{ width: 15, height: 15 }}
            />
          </TouchableOpacity>

          {/* Tiêu đề */}
          <View style={styles.barHeader}>
            <Text style={[styles.textHeader, {
              color: theme ? '#ECEBED' : Colors.background,
            }]}>CampusPoly Trung tâm hộ trợ</Text>
            <View style={{ height: 2, backgroundColor: '#fff' }} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
          <Text style={[styles.texth1, {
            color: theme ? '#fff' : Colors.background
          }]}>Chúng tôi có thể giúp gì cho bạn?</Text>

          <Text style={[styles.texth1, {
            fontSize: 18, marginTop: 16,
            color: theme ? '#fff' : Colors.background
          }]} >Chủ đề phổ biến</Text>
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <TouchableOpacity style={[styles.navItem, {
                backgroundColor: theme ? '#333333' : '#ccc'
              }]} onPress={() => {
                navigation.navigate(Screens.Accountinformation)
              }}>
                <Image
                  source={require('../../assets/images/friend.png')}
                  style={styles.imgGrid}
                />
                <Text style={[styles.navText, {
                  color: theme ? '#fff' : Colors.background
                }]}>Về thông tin tài khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navItem, {
                backgroundColor: theme ? '#333333' : '#ccc'
              }]} onPress={() => {
                navigation.navigate(Screens.Loginproblem)
              }}>
                <Image
                  source={require('../../assets/images/key.png')}
                  style={styles.imgGrid}
                />
                <Text style={[styles.navText, {
                  color: theme ? '#fff' : Colors.background
                }]}>Về vấn đề đăng nhập</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.gridItem}>
              <TouchableOpacity style={[styles.navItem, {
                backgroundColor: theme ? '#333333' : '#ccc'
              }]} onPress={() => {
                navigation.navigate(Screens.Security)
              }}>
                <Image
                  source={require('../../assets/images/baomat.png')}
                  style={styles.imgGrid}
                />
                <Text style={[styles.navText, {
                  color: theme ? '#fff' : Colors.background
                }]}>Quyền riêng tư và bảo mật</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navItem, {
                backgroundColor: theme ? '#333333' : '#ccc'
              }]} onPress={() => {
                navigation.navigate(Screens.Page)
              }}>
                <Image
                  source={require('../../assets/images/article.png')}
                  style={styles.imgGrid}
                />
                <Text style={[styles.navText, {
                  color: theme ? '#fff' : Colors.background
                }]}>Trang</Text>
              </TouchableOpacity>

            </View>
          </View>
          {/** footer */}
          <View style={styles.footer}>
            <View style={styles.footerItems}>
              <TouchableOpacity
                onPress={() => {
                  {/**Sử lí chuyển màn sang màn giới thiệu */ }
                  // navigation.navigate(Screens.Introduce)
                }}
              >
                <Text style={[styles.footerText, {
                  color: theme ? '#ccc' : Colors.background,
                }]}>Giới thiệu</Text>
              </TouchableOpacity>
              <Text style={[styles.footerText, {
                color: theme ? '#ccc' : Colors.background,
              }]}>Quyền riêng tư</Text>
              <Text style={[styles.footerText, {
                color: theme ? '#ccc' : Colors.background,
              }]}>Điều khoản và chính sách</Text>
            </View>


          </View >

        </View>
      </ScrollView >
      <View style={{ height: 1, backgroundColor: '#fff' }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, backgroundColor: theme ? Colors.background : Colors.light, }}>
        <Text style={styles.footerCopyright}>From CampusPoly</Text>
        <Text style={styles.footerCopyright}>© 2024 CampusPoly</Text>
      </View>
    </View >
  )
}

export default HelpCenterScreen
