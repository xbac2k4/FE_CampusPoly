import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileTabs = ({ onTabSelect }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [tabWidths, setTabWidths] = useState({}); // Lưu độ rộng của từng text trong tab
  const [tabPositions, setTabPositions] = useState({}); // Lưu vị trí x của từng text trong tab

  // Handle the text layout to get its width
  const handleTextLayout = (event, tab) => {
    const { width } = event.nativeEvent.layout; // Lấy chiều rộng của text
    setTabWidths((prevWidths) => ({ ...prevWidths, [tab]: width }));
  };

  const handleTabLayout = (event, tab) => {
    const { x } = event.nativeEvent.layout; // Chỉ lấy vị trí x của tab (vị trí chữ)
    setTabPositions((prevPositions) => ({ ...prevPositions, [tab]: x }));
  };

  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabsWrapper}>
        {['Posts', 'Stories', 'Liked', 'Tagged'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab);
              onTabSelect(tab);
            }}
            style={styles.tab}
            onLayout={(event) => handleTabLayout(event, tab)} // Lấy vị trí x của tab
          >
            <Text
              onLayout={(event) => handleTextLayout(event, tab)} // Lấy chiều rộng của text
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
                width: tabWidths[activeTab] || 0, // Độ rộng thanh xanh bằng với chữ của tab
                left: tabPositions[activeTab] || 0, // Vị trí của thanh xanh theo chữ
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
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 5,
    width: '28%', // Cố định độ rộng của mỗi tab
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
    width: '99%',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#4F8EF7',
  },
});

export default ProfileTabs;
