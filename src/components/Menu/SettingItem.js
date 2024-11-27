import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const SettingItem = ({ title, icon, subItems }) => {
  const [expanded, setExpanded] = useState(false); // Trạng thái mở rộng

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.itemContainer} onPress={() => setExpanded(!expanded)}>
        <View style={styles.leftSection}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Image source={require('../../assets/images/arrowbottom.png')} style={[styles.arrowIcon, expanded && styles.arrowUp]} />
      </TouchableOpacity>

      {/* Hiển thị các mục con khi expanded là true */}
      {expanded && (
        <View style={styles.subItemsContainer}>
          {subItems.map((item, index) => (
            <Text key={index} style={styles.subItem}>
              {item}
            </Text>
          ))}
        </View>
      )}
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
    color: '#fff',
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
    paddingLeft: 30, // Để các mục con thụt vào một chút
  },
  subItem: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 5,
  },
});

export default SettingItem;
