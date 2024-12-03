import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Color';

const ProfileTabs = ({ onTabSelect }) => {
  const [activeTab, setActiveTab] = useState('Bài viết');

  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabsWrapper}>
        {['Bài viết', 'Đã thích'].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              onTabSelect(tab);
            }}
            style={styles.tab}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        {/* Thanh màu xám dưới tất cả các tab */}
        <View style={styles.grayUnderline}>
          {/* Thanh màu xanh dưới tab được chọn */}
          <View
            style={[
              styles.activeIndicator,
              {
                // Chiếm 1/2 chiều rộng của thanh xám
                width: '50%',
                // Căn trái theo chỉ số tab (index)
                left: activeTab === 'Bài viết' ? '0%' : '50%',
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    width: '100%',
    backgroundColor: '#181A1C',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  tabsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
  },
  tab: {
    alignItems: 'center', // Căn giữa theo chiều ngang
    justifyContent: 'center', // Căn giữa theo chiều dọc
    paddingVertical: 10,
    width: '50%', // Độ rộng tab chia đều
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  grayUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#3E3E3E',
    width: '100%',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: Colors.second,
  },
});

export default ProfileTabs;