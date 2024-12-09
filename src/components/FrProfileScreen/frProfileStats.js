import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ADD_FRIEND, UPDATE_FRIEND } from '../../services/ApiConfig';
import { SocketContext } from '../../services/provider/SocketContext';
import { UserContext } from '../../services/provider/UseContext';
import { TYPE_ADD_FRIEND } from '../../services/TypeNotify';
import Colors from '../../constants/Color';
import { ThemeContext } from '../../services/provider/ThemeContext';

const FrProfileStats = ({ data, currentUserId }) => {
  const friendsData = data?.friends || [];
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { sendNotifySocket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
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
  // console.log(friendsData);
  useEffect(() => {
    setAcceptedFriends(() =>
      friendsData.filter(friend =>
        friend.status_id.status_name === 'Chấp nhận' &&
        friend.user_id.some(user => user._id === currentUserId)
      )
    );
  }, [friendsData, currentUserId]);

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
          await sendNotifySocket(user.full_name, user._id, 'đã gửi lời mời kết bạn', data._id, TYPE_ADD_FRIEND);
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
          await sendNotifySocket(user.full_name, user._id, 'đã chấp nhận kết bạn', data._id, TYPE_ADD_FRIEND);
          // console.log(response.data);
          setAcceptedFriends((prevFriends) => [
            ...prevFriends,
            {
              status_id: { status_name: 'Chấp nhận' },
              user_id: [
                { _id: currentUserId },
                { _id: data._id }
              ],
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Error handling friend request:', error);
    }
  };

  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={[styles.statNumber, {
          color: theme ? 'white' : Colors.background
        }]}>
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
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
