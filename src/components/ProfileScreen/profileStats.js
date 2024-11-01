import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../navigation/Screens';

const ProfileStats = ({ data }) => {
  const navigation = useNavigation();

  // Ensure data.friends is an array before counting
  const friendsCount = Array.isArray(data?.friends) ? data.friends.length : 0;
  
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <Text style={styles.statNumber}>{friendsCount.toLocaleString()}</Text>
        <Text style={styles.statText}>Friends</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate(Screens.EditProfile, {
          user: data
        })}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
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
});

export default ProfileStats;
