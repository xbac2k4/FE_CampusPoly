import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const FriendListConponent = ({ avatar, full_name, status, onDeleteFriend }) => {
  const isPending = status === 'Chờ phản hồi'; // Kiểm tra trạng thái

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar.replace('localhost', '10.0.2.2') || 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-260nw-1706867365.jpg'  }} style={styles.imgavt} resizeMode={'contain'} />
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.username}>{full_name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <View
            style={[
              styles.statuscontainer,
              { backgroundColor: isPending ? '#FF3B30' : '#0866ff' }, // Đổi màu theo trạng thái
            ]}
          >
            <Text style={styles.statusstyle}>{status}</Text>
          </View>
          <TouchableOpacity style={[styles.statuscontainer, { backgroundColor: '#3b3d3e', marginLeft: 10 }]}>
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
    borderRadius: 10,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  statusstyle: {
    color: '#fff',
  },
});
