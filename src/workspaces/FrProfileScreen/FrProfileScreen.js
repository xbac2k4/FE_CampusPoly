import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '../../components/ProfileScreen/header';
import FrProfileStats from '../../components/FrProfileScreen/frProfileStats';
import ProfileTabs from '../../components/ProfileScreen/profileTabs';
import ProfilePosts from '../../components/ProfileScreen/profilePosts';
import { GET_USER_ID } from '../../services/ApiConfig'; // Giả sử đây là API endpoint

const FrProfileScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const userId = route.params?.id; // Nhận ID người dùng từ params

  // Hàm gọi API để lấy thông tin người dùng
  const fetchUserData = async (id) => {
    setLoading(true); // Bắt đầu tải dữ liệu
    try {
      const response = await fetch(`${GET_USER_ID}${id}`);
      const data = await response.json();
      setUser(data.data); // Lưu dữ liệu người dùng vào state
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Dừng loading khi đã có dữ liệu
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData(userId); // Gọi API khi có id người dùng
    }
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="#FFF" style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView stickyHeaderIndices={[2]}>
        {/* Header and ProfileStats */}
        <Header user={user} />
        <FrProfileStats friends={user.friends} />
        
        {/* ProfileTabs (Sticky) */}
        <ProfileTabs onTabSelect={setActiveTab} />

        {/* Render posts chỉ khi activeTab là "Posts" */}
        {activeTab === 'Posts' && <ProfilePosts user={user} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#181A1C',
  },
});

export default FrProfileScreen;
