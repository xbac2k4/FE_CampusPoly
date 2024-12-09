import React, { useContext, useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook cho navigation
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const SettingItem = ({ title, icon, subItems }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation(); // Khai báo hook navigation
  const { theme } = useContext(ThemeContext);

  // Hàm xử lý sự kiện nhấn vào subItem
  const handleSubItemPress = (subItem) => {
    // Kiểm tra tên subItem và điều hướng đến màn hình tương ứng
    if (subItem === 'Trung tâm trợ giúp') {
      navigation.navigate('HelpCenter'); // Điều hướng đến Trung tâm trợ giúp
    } else if (subItem === 'Báo cáo sự cố') {
      navigation.navigate('ReportIssue'); // Điều hướng đến Báo cáo sự cố
    } else if (subItem === 'Điều khoản & chính sách') {
      navigation.navigate('TermsAndPolic'); // Điều hướng đến Điều khoản & chính sách
    } else if (subItem === 'Trung tâm quyền riêng tư') {
      navigation.navigate('Privacy'); // Điều hướng đến Điều khoản & chính sách
    }
  };

  return (
    <View style={[styles.container,{

    }]}>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.leftSection}>
          <Image source={icon} style={styles.icon} />
          <Text style={[styles.title, {
            color: theme ? '#fff' : Colors.background
          }]}>{title}</Text>
        </View>
        <Image source={theme ? require('../../assets/images/arrowbottom.png') : require('../../assets/images/light_arrowbottom.png')} style={[styles.arrowIcon, expanded && styles.arrowUp]} />
      </TouchableOpacity>

      {/* Hiển thị các mục con khi expanded là true */}
      {expanded && (
        <View style={styles.subItemsContainer}>
          {subItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSubItemPress(item)} // Gọi hàm handleSubItemPress
            >
              <Text style={[styles.subItem,{
                color : theme? '#fff' : Colors.background
              }]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  subItemsContainer: {
    marginTop: 10,
    paddingLeft: 30,
  },
  subItem: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default SettingItem;
