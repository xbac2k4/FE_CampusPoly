import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileStats = ({ followers, following }) => (
  <View style={styles.statsContainer}>
    <View style={styles.stat}>
      {/* Sử dụng toLocaleString() để format số có dấu phẩy */}
      <Text style={styles.statNumber}>{followers.toLocaleString()}</Text>
      <Text style={styles.statText}>Followers</Text>
    </View>
    <View style={styles.stat}>
      {/* Sử dụng toLocaleString() để format số có dấu phẩy */}
      <Text style={styles.statNumber}>{following.toLocaleString()}</Text>
      <Text style={styles.statText}>Following</Text>
    </View>

    {/* Nút Edit Profile nằm ngang với Followers và Following */}
    <TouchableOpacity style={styles.editButton}>
      <Text style={styles.editButtonText}>Edit Profile</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row', // Các phần tử sẽ sắp xếp ngang
    justifyContent: 'space-between', // Căn đều giữa các phần tử
    alignItems: 'center', // Căn giữa các phần tử dọc
    width: '100%', // Chiếm hết chiều rộng màn hình
    marginTop: 16,
    paddingHorizontal: 20, // Đảm bảo không bị sát cạnh màn hình
  },
  stat: {
    alignItems: 'flex-start', // Căn giữa các phần tử trong mỗi View
  },
  statNumber: {
    fontSize: 16,
    color: 'white', // Màu trắng cho số
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 14,
    color: '#727477', // Màu xám cho chữ 'Followers' và 'Following'
  },
  editButton: {
    backgroundColor: 'transparent', // Nền trong suốt
    borderColor: 'white', // Viền trắng
    borderWidth: 1, // Độ dày viền
    borderRadius: 20, // Bo góc nút
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16, // Khoảng cách giữa nút và các số
  },
  editButtonText: {
    color: 'white', // Màu chữ trắng
    fontSize: 14, // Kích thước chữ
    fontWeight: 'bold',
  },
});

export default ProfileStats;
