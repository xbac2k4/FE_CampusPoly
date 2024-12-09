import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';
import { ThemeContext } from '../../services/provider/ThemeContext';
import Colors from '../../constants/Color';

const ProfileStats = ({ data }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  // Ensure data.friends is an array before counting
  // const friendsCount = Array.isArray(data?.friends) ? data?.friends.length : 0;
  const friendsCount = Array.isArray(data?.friends) ? data?.friends.filter(item => item.status_id.status_name === "Chấp nhận").length : 0;

  // console.log(data.friends);


  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={[styles.statNumber, {
          color: theme ? '#fff' : Colors.background
        }]}>{friendsCount.toLocaleString()}</Text>
        <Text style={[styles.statText, {
          color: theme ? '#fff' : Colors.background
        }]}>Bạn bè</Text>
      </View>

      <TouchableOpacity
        style={[styles.editButton, {
          borderColor: theme? '#fff' : Colors.background,
        }]}
        onPress={() => navigation.navigate(Screens.EditProfile, {
          user: data
        })}
      >
        <Text style={[styles.editButtonText, {
          color: theme ? '#fff' : Colors.background
        }]}>Chỉnh sửa</Text>
      </TouchableOpacity>
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
    color: 'white',
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 14,
  },
  editButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ProfileStats;
