import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import Screens from '../../navigation/Screens';

const FriendListConponent = ({ avatar, full_name, status, send_id, onDeleteFriend, onConfirm, navigation, friendId }) => {
  const isPending = status === 'Chờ phản hồi'; // Kiểm tra trạng thái
  // Xử lý khi bấm vào avatar và tên người dùng
  const handleProfileClick = (friendId) => {

    // Nếu không, chuyển đến màn hình Profile với tham số ID
    navigation.navigate(Screens.Profile, { id: friendId });

  };
  // console.log(isPending);

  // console.log(send_id);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleProfileClick(friendId)}>
        <Image source={{ uri: avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg' }} style={styles.imgavt} resizeMode={'contain'} />
      </TouchableOpacity>
      <View style={{ marginLeft: 20 }}>
        <TouchableOpacity onPress={() => handleProfileClick(friendId)}>
          <Text style={styles.username}>{full_name}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {
            isPending && send_id ? (
              <TouchableOpacity
                style={[
                  styles.statuscontainer,
                  { backgroundColor: isPending ? '#0866ff' : '#FF3B30' }, // Đổi màu theo trạng thái
                ]}
                onPress={onConfirm}>
                <Text style={{ color: '#FFF' }}>Chấp nhận</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={[
                  styles.statuscontainer,
                  { backgroundColor: isPending ? '#FF3B30' : '#0866ff' }, // Đổi màu theo trạng thái
                ]}
              >
                <Text style={styles.statusstyle}>{status}</Text>
              </View>
            )
          }
          <TouchableOpacity
            onPress={onDeleteFriend}
            style={[styles.statuscontainer, { backgroundColor: '#3b3d3e', marginLeft: 10 }]}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '400' }}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FriendListConponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181A1C',
    flexDirection: 'row',
    flex: 1,
    marginTop: 15,
    marginBottom: 10
  },
  imgavt: {
    width: 50,
    height: 50,
    borderRadius: 32,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  statuscontainer: {
    borderRadius: 7,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  statusstyle: {
    color: '#fff',
  },
});
