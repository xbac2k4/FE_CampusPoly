import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ADD_FRIEND, UPDATE_FRIEND } from '../../services/ApiConfig';

const FrProfileStats = ({ data, currentUserId }) => {
  const friendsData = data?.friends || [];
  const [buttonState, setButtonState] = useState(() => {
    const currentFriend = friendsData.find(friend =>
      friend.user_id.some(user => user._id === currentUserId)
    );

    if (!currentFriend) return 'Thêm bạn bè';
    if (currentFriend.status_id.status_name === 'Chờ phản hồi') {
      return currentFriend.user_id[0]._id === currentUserId
        ? 'Đã gửi lời mời'
        : 'Chấp nhận';
    }
    return 'Bạn bè';
  });

  // Lọc chỉ những bạn bè có trạng thái 'Chấp nhận'
  const acceptedFriends = friendsData.filter(friend =>
    friend.status_id.status_name === 'Chấp nhận' && // Chỉ lấy bạn bè đã được chấp nhận
    friend.user_id.some(user => user._id === currentUserId)
  );
  console.log(acceptedFriends);
  

  const handleButtonPress = async () => {
    try {
      if (buttonState === 'Thêm bạn bè') {
        // Gửi lời mời kết bạn
        const response = await fetch(`${ADD_FRIEND}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: currentUserId,
            user_friend_id: data._id,
          }),
        });
        if (response.ok) {
          setButtonState('Đã gửi lời mời');
        }
      } else if (buttonState === 'Chấp nhận') {
        // Chấp nhận lời mời kết bạn
        const response = await fetch(`${UPDATE_FRIEND}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: data._id,
            user_friend_id: currentUserId,
          }),
        });
        if (response.ok) {
          setButtonState('Bạn bè');
        }
      }
    } catch (error) {
      console.error('Error handling friend request:', error);
    }
  };

  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>
          {Array.isArray(acceptedFriends) ? acceptedFriends.length.toLocaleString() : 0}
        </Text>
        <Text style={styles.statText}>Bạn bè</Text>
      </View>

      <LinearGradient colors={['#F7B733', '#FC4A1A']} style={styles.followButtonGradient}>
        <TouchableOpacity style={styles.followButton} onPress={handleButtonPress}>
          <Text style={styles.followButtonText}>{buttonState}</Text>
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
    borderRadius: 20,
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
