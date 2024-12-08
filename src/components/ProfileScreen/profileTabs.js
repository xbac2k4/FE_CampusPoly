import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Color';
import { ThemeContext } from '../../services/provider/ThemeContext';

const ProfileTabs = ({ onTabSelect }) => {
  const [activeTab, setActiveTab] = useState('Bài viết');
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.tabsContainer, {
      backgroundColor: theme ? '#181A1C' : '#f3f4f8',
    }]}>
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
              style={[styles.tabText, activeTab === tab && styles.activeTabText, {
                color: theme ? '#fff' : Colors.background,
              }]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        {/* Thanh màu xám dưới tất cả các tab */}
        <View style={[styles.grayUnderline, {
          backgroundColor: theme ? '#3E3E3E' : '#ccc',
        }]}>
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