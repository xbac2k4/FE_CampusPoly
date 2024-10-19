import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FrProfileStats = ({ friends }) => (
  <View style={styles.statsContainer}>
    <View style={styles.stat}>
      {/* Hiển thị số bạn bè với dấu phẩy */} 
      <Text style={styles.statNumber}>{friends.toLocaleString()}</Text>
      <Text style={styles.statText}>Friends</Text>
    </View>

    {/* Nút Edit Profile nằm ngang với số Friends */}
    <LinearGradient
        colors={['#F7B733', '#FC4A1A']}
        style={styles.followButtonGradient}
      >
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </LinearGradient>
  </View>
);


const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center', 
    width: '100%', 
    marginTop: 16,
    paddingHorizontal: 20, 
  },
  stat: {
    alignItems: 'flex-start', 
  },
  statNumber: {
    fontSize: 16,
    color: 'white', 
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 14,
    color: '#727477', 
  },
  editButton: {
    backgroundColor: 'transparent', 
    borderColor: 'white', 
    borderWidth: 1, 
    borderRadius: 20, 
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16, 
  },
  editButtonText: {
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold',
  },
  followButtonGradient: {
    borderRadius: 20, // Ensure the gradient follows the button shape
    marginLeft: 16, 
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  followButtonText: {
    color: 'white', 
    fontSize: 14, 
    fontWeight: 'bold',
  },
});

export default FrProfileStats;