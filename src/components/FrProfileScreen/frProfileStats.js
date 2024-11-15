import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const FrProfileStats = ({ data }) => {
  const friendsCount = Array.isArray(data?.friends) ? data?.friends.length : 0;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        {/* Hiển thị số bạn bè với dấu phẩy */}
        <Text style={styles.statNumber}>{friendsCount.toLocaleString()}</Text>
        <Text style={styles.statText}>Bạn bè</Text>
      </View>

      {/* Nút Follow nằm ngang với số Friends */}
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
};

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
